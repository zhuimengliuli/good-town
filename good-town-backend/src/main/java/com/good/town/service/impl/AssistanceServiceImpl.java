package com.good.town.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.good.town.common.ErrorCode;
import com.good.town.constant.CommonConstant;
import com.good.town.exception.ThrowUtils;
import com.good.town.mapper.AssistanceMapper;
import com.good.town.model.dto.assistance.AssistanceQueryRequest;
import com.good.town.model.entity.Assistance;
import com.good.town.model.entity.User;
import com.good.town.model.vo.AssistanceVO;
import com.good.town.model.vo.UserVO;
import com.good.town.service.AssistanceService;
import com.good.town.service.UserService;
import com.good.town.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 助力服务服务实现
 *
 *
 */
@Service
@Slf4j
public class AssistanceServiceImpl extends ServiceImpl<AssistanceMapper, Assistance> implements AssistanceService {

    @Resource
    private UserService userService;

    /**
     * 校验数据
     *
     * @param assistance
     * @param add      对创建的数据进行校验
     */
    @Override
    public void validAssistance(Assistance assistance, boolean add) {
        ThrowUtils.throwIf(assistance == null, ErrorCode.PARAMS_ERROR);
        // todo 从对象中取值
        String description = assistance.getDescription();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(description), ErrorCode.PARAMS_ERROR);
        }
        // 修改数据时，有参数则校验
    }

    /**
     * 获取查询条件
     *
     * @param assistanceQueryRequest
     * @return
     */
    @Override
    public QueryWrapper<Assistance> getQueryWrapper(AssistanceQueryRequest assistanceQueryRequest) {
        QueryWrapper<Assistance> queryWrapper = new QueryWrapper<>();
        if (assistanceQueryRequest == null) {
            return queryWrapper;
        }
        // todo 从对象中取值
        Long id = assistanceQueryRequest.getId();
        Long notId = assistanceQueryRequest.getNotId();
        String searchText = assistanceQueryRequest.getSearchText();
        String sortField = assistanceQueryRequest.getSortField();
        String sortOrder = assistanceQueryRequest.getSortOrder();
        String description = assistanceQueryRequest.getDescription();
        Long userId = assistanceQueryRequest.getUserId();
        // todo 补充需要的查询条件
        // 从多字段中搜索
        if (StringUtils.isNotBlank(searchText)) {
            // 需要拼接查询条件
            queryWrapper.and(qw -> qw.like("description", searchText));
        }
        // 模糊查询
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
     * 获取助力服务封装
     *
     * @param assistance
     * @param request
     * @return
     */
    @Override
    public AssistanceVO getAssistanceVO(Assistance assistance, HttpServletRequest request) {
        // 对象转封装类
        AssistanceVO assistanceVO = AssistanceVO.objToVo(assistance);

        Long userId = assistance.getUserId();
        User user = null;
        if (userId != null && userId > 0) {
            user = userService.getById(userId);
        }
        UserVO userVO = userService.getUserVO(user);
        assistanceVO.setUser(userVO);

        return assistanceVO;
    }

    /**
     * 分页获取助力服务封装
     *
     * @param assistancePage
     * @param request
     * @return
     */
    @Override
    public Page<AssistanceVO> getAssistanceVOPage(Page<Assistance> assistancePage, HttpServletRequest request) {
        List<Assistance> assistanceList = assistancePage.getRecords();
        Page<AssistanceVO> assistanceVOPage = new Page<>(assistancePage.getCurrent(), assistancePage.getSize(), assistancePage.getTotal());
        if (CollUtil.isEmpty(assistanceList)) {
            return assistanceVOPage;
        }
        // 对象列表 => 封装对象列表
        List<AssistanceVO> assistanceVOList = assistanceList.stream().map(assistance -> {
            return AssistanceVO.objToVo(assistance);
        }).collect(Collectors.toList());

        // 关联查询用户信息
        Set<Long> userIdSet = assistanceList.stream().map(Assistance::getUserId).collect(Collectors.toSet());
        Map<Long, List<User>> userIdUserListMap = userService.listByIds(userIdSet).stream()
                .collect(Collectors.groupingBy(User::getId));
        // 填充信息
        assistanceVOList.forEach(assistanceVO -> {
            Long userId = assistanceVO.getUserId();
            User user = null;
            if (userIdUserListMap.containsKey(userId)) {
                user = userIdUserListMap.get(userId).get(0);
            }
            assistanceVO.setUser(userService.getUserVO(user));
        });

        assistanceVOPage.setRecords(assistanceVOList);
        return assistanceVOPage;
    }

}
