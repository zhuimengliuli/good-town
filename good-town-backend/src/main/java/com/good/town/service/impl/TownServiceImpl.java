package com.good.town.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.good.town.common.ErrorCode;
import com.good.town.constant.CommonConstant;
import com.good.town.exception.ThrowUtils;
import com.good.town.mapper.TownMapper;
import com.good.town.model.dto.town.TownQueryRequest;
import com.good.town.model.entity.Promotion;
import com.good.town.model.entity.Town;
import com.good.town.model.entity.User;
import com.good.town.model.vo.PromotionVO;
import com.good.town.model.vo.TownVO;
import com.good.town.model.vo.UserVO;
import com.good.town.service.TownService;
import com.good.town.service.UserService;
import com.good.town.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 乡镇服务实现
 *
 *
 */
@Service
@Slf4j
public class TownServiceImpl extends ServiceImpl<TownMapper, Town> implements TownService {

    @Resource
    private UserService userService;

    /**
     * 校验数据
     *
     * @param town
     * @param add      对创建的数据进行校验
     */
    @Override
    public void validTown(Town town, boolean add) {
        ThrowUtils.throwIf(town == null, ErrorCode.PARAMS_ERROR);
        String townName = town.getTownName();
        String province = town.getProvince();
        String city = town.getCity();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(townName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(province), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(city), ErrorCode.PARAMS_ERROR);
        }
        // 修改数据时，有参数则校验
    }

    /**
     * 获取查询条件
     *
     * @param townQueryRequest
     * @return
     */
    @Override
    public QueryWrapper<Town> getQueryWrapper(TownQueryRequest townQueryRequest) {
        QueryWrapper<Town> queryWrapper = new QueryWrapper<>();
        if (townQueryRequest == null) {
            return queryWrapper;
        }
        Long id = townQueryRequest.getId();
        Long notId = townQueryRequest.getNotId();
        String sortField = townQueryRequest.getSortField();
        String sortOrder = townQueryRequest.getSortOrder();
        String searchText = townQueryRequest.getSearchText();
        String townName = townQueryRequest.getTownName();
        String city = townQueryRequest.getCity();
        String province = townQueryRequest.getProvince();
        Long userId = townQueryRequest.getUserId();
        // 精确查询
        queryWrapper.ne(ObjectUtils.isNotEmpty(notId), "id", notId);
        queryWrapper.eq(ObjectUtils.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtils.isNotEmpty(userId), "userId", userId);
        queryWrapper.eq(ObjectUtils.isNotEmpty(townName), "townName", townName);
        queryWrapper.eq(ObjectUtils.isNotEmpty(city), "city", city);
        queryWrapper.eq(ObjectUtils.isNotEmpty(province), "province", province);

        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }



    /**
     * 获取乡镇封装
     *
     * @param town
     * @param request
     * @return
     */
    @Override
    public TownVO getTownVO(Town town, HttpServletRequest request) {
        // 对象转封装类
        TownVO townVO = TownVO.objToVo(town);

        return townVO;
    }

    /**
     * 分页获取乡镇封装
     *
     * @param townPage
     * @param request
     * @return
     */
    @Override
    public Page<TownVO> getTownVOPage(Page<Town> townPage, HttpServletRequest request) {
        List<Town> townList = townPage.getRecords();
        Page<TownVO> townVOPage = new Page<>(townPage.getCurrent(), townPage.getSize(), townPage.getTotal());
        if (CollUtil.isEmpty(townList)) {
            return townVOPage;
        }
        // 对象列表 => 封装对象列表
        List<TownVO> townVOList = townList.stream().map(town -> {
            return TownVO.objToVo(town);
        }).collect(Collectors.toList());

        townVOPage.setRecords(townVOList);
        return townVOPage;
    }

}
