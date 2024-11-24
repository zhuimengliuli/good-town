package com.good.town.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.good.town.model.dto.assistance.AssistanceQueryRequest;
import com.good.town.model.entity.Assistance;
import com.good.town.model.vo.AssistanceVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 助力服务服务
 *
 *
 */
public interface AssistanceService extends IService<Assistance> {

    /**
     * 校验数据
     *
     * @param assistance
     * @param add 对创建的数据进行校验
     */
    void validAssistance(Assistance assistance, boolean add);

    /**
     * 获取查询条件
     *
     * @param assistanceQueryRequest
     * @return
     */
    QueryWrapper<Assistance> getQueryWrapper(AssistanceQueryRequest assistanceQueryRequest);
    
    /**
     * 获取助力服务封装
     *
     * @param assistance
     * @param request
     * @return
     */
    AssistanceVO getAssistanceVO(Assistance assistance, HttpServletRequest request);

    /**
     * 分页获取助力服务封装
     *
     * @param assistancePage
     * @param request
     * @return
     */
    Page<AssistanceVO> getAssistanceVOPage(Page<Assistance> assistancePage, HttpServletRequest request);
    /**
     * 获取用户数量
     * @param year
     * @return
     */
    List<Integer> getUserCount(Integer year);
}
