package com.good.town.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.good.town.model.dto.town.TownQueryRequest;
import com.good.town.model.entity.Town;
import com.good.town.model.vo.TownVO;

import javax.servlet.http.HttpServletRequest;

/**
 * 乡镇服务
 *
 *
 */
public interface TownService extends IService<Town> {

    /**
     * 校验数据
     *
     * @param town
     * @param add 对创建的数据进行校验
     */
    void validTown(Town town, boolean add);

    /**
     * 获取查询条件
     *
     * @param townQueryRequest
     * @return
     */
    QueryWrapper<Town> getQueryWrapper(TownQueryRequest townQueryRequest);

    /**
     * 获取乡镇封装
     *
     * @param town
     * @param request
     * @return
     */
    TownVO getTownVO(Town town, HttpServletRequest request);

    /**
     * 分页获取乡镇封装
     *
     * @param townPage
     * @param request
     * @return
     */
    Page<TownVO> getTownVOPage(Page<Town> townPage, HttpServletRequest request);

    /**
     * 根据名称获取乡镇
     * @param name
     * @return
     */
    Town getTownByName(String name);
}
