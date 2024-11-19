package com.good.town.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.good.town.model.dto.promotion.PromotionQueryRequest;
import com.good.town.model.entity.Promotion;
import com.good.town.model.vo.PromotionVO;

import javax.servlet.http.HttpServletRequest;

/**
 * 宣传服务服务
 *
 *
 */
public interface PromotionService extends IService<Promotion> {

    /**
     * 校验数据
     *
     * @param promotion
     * @param add 对创建的数据进行校验
     */
    void validPromotion(Promotion promotion, boolean add);

    /**
     * 获取查询条件
     *
     * @param promotionQueryRequest
     * @return
     */
    QueryWrapper<Promotion> getQueryWrapper(PromotionQueryRequest promotionQueryRequest);
    
    /**
     * 获取宣传服务封装
     *
     * @param promotion
     * @param request
     * @return
     */
    PromotionVO getPromotionVO(Promotion promotion, HttpServletRequest request);

    /**
     * 分页获取宣传服务封装
     *
     * @param promotionPage
     * @param request
     * @return
     */
    Page<PromotionVO> getPromotionVOPage(Page<Promotion> promotionPage, HttpServletRequest request);
}
