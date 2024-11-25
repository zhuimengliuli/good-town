package com.good.town.controller;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.good.town.annotation.AuthCheck;
import com.good.town.common.BaseResponse;
import com.good.town.common.DeleteRequest;
import com.good.town.common.ErrorCode;
import com.good.town.common.ResultUtils;
import com.good.town.constant.UserConstant;
import com.good.town.exception.BusinessException;
import com.good.town.exception.ThrowUtils;
import com.good.town.model.dto.promotion.*;
import com.good.town.model.entity.Promotion;
import com.good.town.model.entity.User;
import com.good.town.model.vo.PromotionVO;
import com.good.town.service.PromotionService;
import com.good.town.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 宣传服务接口
 *
 *
 */
@RestController
@RequestMapping("/promotion")
@Slf4j
public class PromotionController {

    @Resource
    private PromotionService promotionService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建宣传服务
     *
     * @param promotionAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addPromotion(@RequestBody PromotionAddRequest promotionAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(promotionAddRequest == null, ErrorCode.PARAMS_ERROR);
        // todo 在此处将实体类和 DTO 进行转换
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionAddRequest, promotion);
        List<String> picture = promotionAddRequest.getPicture();
        List<String> video = promotionAddRequest.getVideo();
        if (picture != null) {
            promotion.setPicture(JSONUtil.toJsonStr(picture));
        }
        if (video != null) {
            promotion.setVideo(JSONUtil.toJsonStr(video));
        }
        // 数据校验
        promotionService.validPromotion(promotion, true);
        // todo 填充默认值
        User loginUser = userService.getLoginUser(request);
        promotion.setUserId(loginUser.getId());
        // 写入数据库
        boolean result = promotionService.save(promotion);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newPromotionId = promotion.getId();
        return ResultUtils.success(newPromotionId);
    }

    /**
     * 删除宣传服务
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deletePromotion(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Promotion oldPromotion = promotionService.getById(id);
        ThrowUtils.throwIf(oldPromotion == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldPromotion.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = promotionService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新宣传服务（仅管理员可用）
     *
     * @param promotionUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updatePromotion(@RequestBody PromotionUpdateRequest promotionUpdateRequest) {
        if (promotionUpdateRequest == null || promotionUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // todo 在此处将实体类和 DTO 进行转换
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionUpdateRequest, promotion);
        // 数据校验
        promotionService.validPromotion(promotion, false);
        // 判断是否存在
        long id = promotionUpdateRequest.getId();
        Promotion oldPromotion = promotionService.getById(id);
        ThrowUtils.throwIf(oldPromotion == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = promotionService.updateById(promotion);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取宣传服务（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<PromotionVO> getPromotionVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Promotion promotion = promotionService.getById(id);
        ThrowUtils.throwIf(promotion == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(promotionService.getPromotionVO(promotion, request));
    }

    /**
     * 分页获取宣传服务列表（仅管理员可用）
     *
     * @param promotionQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Promotion>> listPromotionByPage(@RequestBody PromotionQueryRequest promotionQueryRequest) {
        long current = promotionQueryRequest.getCurrent();
        long size = promotionQueryRequest.getPageSize();
        // 查询数据库
        Page<Promotion> promotionPage = promotionService.page(new Page<>(current, size),
                promotionService.getQueryWrapper(promotionQueryRequest));
        return ResultUtils.success(promotionPage);
    }

    /**
     * 分页获取宣传服务列表（封装类）
     *
     * @param promotionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<PromotionVO>> listPromotionVOByPage(@RequestBody PromotionQueryRequest promotionQueryRequest,
                                                               HttpServletRequest request) {
        long current = promotionQueryRequest.getCurrent();
        long size = promotionQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Promotion> promotionPage = promotionService.page(new Page<>(current, size),
                promotionService.getQueryWrapper(promotionQueryRequest));
        // 获取封装类
        return ResultUtils.success(promotionService.getPromotionVOPage(promotionPage, request));
    }

    /**
     * 分页获取当前登录用户创建的宣传服务列表
     *
     * @param promotionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<PromotionVO>> listMyPromotionVOByPage(PromotionQueryRequest promotionQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(promotionQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // 补充查询条件，只查询当前登录用户的数据
        User loginUser = userService.getLoginUser(request);
        promotionQueryRequest.setUserId(loginUser.getId());
        long current = promotionQueryRequest.getCurrent();
        long size = promotionQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Promotion> promotionPage = promotionService.page(new Page<>(current, size),
                promotionService.getQueryWrapper(promotionQueryRequest));
        // 获取封装类
        return ResultUtils.success(promotionService.getPromotionVOPage(promotionPage, request));
    }

    /**
     * 编辑宣传服务（给用户使用）
     *
     * @param promotionEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editPromotion(@RequestBody PromotionEditRequest promotionEditRequest, HttpServletRequest request) {
        if (promotionEditRequest == null || promotionEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // todo 在此处将实体类和 DTO 进行转换
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionEditRequest, promotion);
        // 数据校验
        promotionService.validPromotion(promotion, false);
        User loginUser = userService.getLoginUser(request);
        // 判断是否存在
        long id = promotionEditRequest.getId();
        Promotion oldPromotion = promotionService.getById(id);
        ThrowUtils.throwIf(oldPromotion == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldPromotion.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = promotionService.updateById(promotion);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    // endregion

    @GetMapping("/get/count")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<List<Integer>> getPromotionUserCount(Integer year, HttpServletRequest request) {
        List<Integer> promotionUserCountList = promotionService.getUserCount(year);
        return ResultUtils.success(promotionUserCountList);
    }
}
