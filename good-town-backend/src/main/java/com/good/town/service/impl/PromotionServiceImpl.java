package com.good.town.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.good.town.common.ErrorCode;
import com.good.town.constant.CommonConstant;
import com.good.town.exception.ThrowUtils;
import com.good.town.mapper.PromotionMapper;
import com.good.town.model.dto.promotion.PromotionQueryRequest;
import com.good.town.model.entity.Promotion;
import com.good.town.model.entity.User;
import com.good.town.model.vo.PromotionVO;
import com.good.town.model.vo.UserVO;
import com.good.town.service.AssistanceService;
import com.good.town.service.PromotionService;
import com.good.town.service.UserService;
import com.good.town.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 宣传服务服务实现
 *
 *
 */
@Service
@Slf4j
public class PromotionServiceImpl extends ServiceImpl<PromotionMapper, Promotion> implements PromotionService {

    @Resource
    private UserService userService;

    @Resource
    private AssistanceService assistanceService;

    /**
     * 校验数据
     *
     * @param promotion
     * @param add      对创建的数据进行校验
     */
    @Override
    public void validPromotion(Promotion promotion, boolean add) {
        ThrowUtils.throwIf(promotion == null, ErrorCode.PARAMS_ERROR);
        String themeName = promotion.getThemeName();
        String type = promotion.getType();

        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(themeName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(type), ErrorCode.PARAMS_ERROR);
        }
        // 修改数据时，有参数则校验
    }

    /**
     * 获取查询条件
     *
     * @param promotionQueryRequest
     * @return
     */
    @Override
    public QueryWrapper<Promotion> getQueryWrapper(PromotionQueryRequest promotionQueryRequest) {
        QueryWrapper<Promotion> queryWrapper = new QueryWrapper<>();
        if (promotionQueryRequest == null) {
            return queryWrapper;
        }
        Long id = promotionQueryRequest.getId();
        Long notId = promotionQueryRequest.getNotId();
        String searchText = promotionQueryRequest.getSearchText();
        String sortField = promotionQueryRequest.getSortField();
        String sortOrder = promotionQueryRequest.getSortOrder();
        String themeName = promotionQueryRequest.getThemeName();
        String description = promotionQueryRequest.getDescription();
        Long userId = promotionQueryRequest.getUserId();
        // 从多字段中搜索
        if (StringUtils.isNotBlank(searchText)) {
            // 需要拼接查询条件
            queryWrapper.and(qw -> qw.like("themeName", searchText).or().like("description", searchText));
        }
        // 模糊查询
        queryWrapper.like(StringUtils.isNotBlank(themeName), "themeName", themeName);
        queryWrapper.like(StringUtils.isNotBlank(description), "description", description);
        // 精确查询
        queryWrapper.ne(ObjectUtils.isNotEmpty(notId), "id", notId);
        queryWrapper.eq(ObjectUtils.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtils.isNotEmpty(userId), "userId", userId);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    /**
     * 获取宣传服务封装
     *
     * @param promotion
     * @param request
     * @return
     */
    @Override
    public PromotionVO getPromotionVO(Promotion promotion, HttpServletRequest request) {
        // 对象转封装类
        PromotionVO promotionVO = PromotionVO.objToVo(promotion);

        // 关联查询用户信息
        Long userId = promotion.getUserId();
        User user = null;
        if (userId != null && userId > 0) {
            user = userService.getById(userId);
        }
        UserVO userVO = userService.getUserVO(user);
        promotionVO.setUser(userVO);

        return promotionVO;
    }

    /**
     * 分页获取宣传服务封装
     *
     * @param promotionPage
     * @param request
     * @return
     */
    @Override
    public Page<PromotionVO> getPromotionVOPage(Page<Promotion> promotionPage, HttpServletRequest request) {
        List<Promotion> promotionList = promotionPage.getRecords();
        Page<PromotionVO> promotionVOPage = new Page<>(promotionPage.getCurrent(), promotionPage.getSize(), promotionPage.getTotal());
        if (CollUtil.isEmpty(promotionList)) {
            return promotionVOPage;
        }
        // 对象列表 => 封装对象列表
        List<PromotionVO> promotionVOList = promotionList.stream().map(promotion -> {
            return PromotionVO.objToVo(promotion);
        }).collect(Collectors.toList());

        // 关联查询用户信息
        Set<Long> userIdSet = promotionList.stream().map(Promotion::getUserId).collect(Collectors.toSet());
        Map<Long, List<User>> userIdUserListMap = userService.listByIds(userIdSet).stream()
                .collect(Collectors.groupingBy(User::getId));
        // 填充信息
        promotionVOList.forEach(promotionVO -> {
            Long userId = promotionVO.getUserId();
            User user = null;
            if (userIdUserListMap.containsKey(userId)) {
                user = userIdUserListMap.get(userId).get(0);
            }
            promotionVO.setUser(userService.getUserVO(user));

            Long id = promotionVO.getId();
            List<Long> userIdList = assistanceService.getUserIdListByPromotionId(id);
            List<UserVO> userVOList = new ArrayList<>();
            if (userIdList != null && userIdList.size() > 0) {
                userVOList = userService.getUserVO(userService.listByIds(userIdList));
            }
            promotionVO.setAssistanceUserList(userVOList);
        });
        // endregion

        promotionVOPage.setRecords(promotionVOList);
        return promotionVOPage;
    }

    @Override
    public List<Integer> getUserCount(Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
            return null;
        }
        List<Integer> list = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            Integer count = baseMapper.countByCreateTime(year, month);
            list.add(count == null ? 0 : count);
        }
        return list;
    }
}
