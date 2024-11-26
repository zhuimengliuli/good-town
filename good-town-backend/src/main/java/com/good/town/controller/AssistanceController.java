package com.good.town.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.good.town.annotation.AuthCheck;
import com.good.town.common.*;
import com.good.town.constant.UserConstant;
import com.good.town.exception.BusinessException;
import com.good.town.exception.ThrowUtils;
import com.good.town.model.dto.assistance.AssistanceAddRequest;
import com.good.town.model.dto.assistance.AssistanceEditRequest;
import com.good.town.model.dto.assistance.AssistanceQueryRequest;
import com.good.town.model.dto.assistance.AssistanceUpdateRequest;
import com.good.town.model.entity.Assistance;
import com.good.town.model.entity.User;
import com.good.town.model.vo.AssistanceVO;
import com.good.town.service.AssistanceService;
import com.good.town.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 助力服务接口
 *
 *
 */
@RestController
@RequestMapping("/assistance")
@Slf4j
public class AssistanceController {

    @Resource
    private AssistanceService assistanceService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建助力服务
     *
     * @param assistanceAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addAssistance(@RequestBody AssistanceAddRequest assistanceAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(assistanceAddRequest == null, ErrorCode.PARAMS_ERROR);
        Assistance assistance = new Assistance();
        BeanUtils.copyProperties(assistanceAddRequest, assistance);
        // 数据校验
        assistanceService.validAssistance(assistance, true);
        User loginUser = userService.getLoginUser(request);
        assistance.setUserId(loginUser.getId());
        assistance.setState(AssistanceStateEnum.PENDING.getCode());
        // 写入数据库
        boolean result = assistanceService.save(assistance);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newAssistanceId = assistance.getId();
        return ResultUtils.success(newAssistanceId);
    }

    /**
     * 删除助力服务
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteAssistance(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Assistance oldAssistance = assistanceService.getById(id);
        ThrowUtils.throwIf(oldAssistance == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldAssistance.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = assistanceService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新助力服务（仅管理员可用）
     *
     * @param assistanceUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateAssistance(@RequestBody AssistanceUpdateRequest assistanceUpdateRequest) {
        if (assistanceUpdateRequest == null || assistanceUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Assistance assistance = new Assistance();
        BeanUtils.copyProperties(assistanceUpdateRequest, assistance);
        // 数据校验
        assistanceService.validAssistance(assistance, false);
        // 判断是否存在
        long id = assistanceUpdateRequest.getId();
        Assistance oldAssistance = assistanceService.getById(id);
        ThrowUtils.throwIf(oldAssistance == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = assistanceService.updateById(assistance);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取助力服务（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<AssistanceVO> getAssistanceVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Assistance assistance = assistanceService.getById(id);
        ThrowUtils.throwIf(assistance == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(assistanceService.getAssistanceVO(assistance, request));
    }

    /**
     * 分页获取助力服务列表（仅管理员可用）
     *
     * @param assistanceQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Assistance>> listAssistanceByPage(@RequestBody AssistanceQueryRequest assistanceQueryRequest) {
        long current = assistanceQueryRequest.getCurrent();
        long size = assistanceQueryRequest.getPageSize();
        // 查询数据库
        Page<Assistance> assistancePage = assistanceService.page(new Page<>(current, size),
                assistanceService.getQueryWrapper(assistanceQueryRequest));
        return ResultUtils.success(assistancePage);
    }

    /**
     * 分页获取助力服务列表（封装类）
     *
     * @param assistanceQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<AssistanceVO>> listAssistanceVOByPage(@RequestBody AssistanceQueryRequest assistanceQueryRequest,
                                                               HttpServletRequest request) {
        long current = assistanceQueryRequest.getCurrent();
        long size = assistanceQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Assistance> assistancePage = assistanceService.page(new Page<>(current, size),
                assistanceService.getQueryWrapper(assistanceQueryRequest));
        // 获取封装类
        return ResultUtils.success(assistanceService.getAssistanceVOPage(assistancePage, request));
    }

    /**
     * 分页获取当前登录用户创建的助力服务列表
     *
     * @param assistanceQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<AssistanceVO>> listMyAssistanceVOByPage(@RequestBody AssistanceQueryRequest assistanceQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(assistanceQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // 补充查询条件，只查询当前登录用户的数据
        User loginUser = userService.getLoginUser(request);
        assistanceQueryRequest.setUserId(loginUser.getId());
        long current = assistanceQueryRequest.getCurrent();
        long size = assistanceQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Assistance> assistancePage = assistanceService.page(new Page<>(current, size),
                assistanceService.getQueryWrapper(assistanceQueryRequest));
        // 获取封装类
        return ResultUtils.success(assistanceService.getAssistanceVOPage(assistancePage, request));
    }

    /**
     * 编辑助力服务（给用户使用）
     *
     * @param assistanceEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editAssistance(@RequestBody AssistanceEditRequest assistanceEditRequest, HttpServletRequest request) {
        if (assistanceEditRequest == null || assistanceEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Assistance assistance = new Assistance();
        BeanUtils.copyProperties(assistanceEditRequest, assistance);
        // 数据校验
        assistanceService.validAssistance(assistance, false);
        User loginUser = userService.getLoginUser(request);
        // 判断是否存在
        long id = assistanceEditRequest.getId();
        Assistance oldAssistance = assistanceService.getById(id);
        ThrowUtils.throwIf(oldAssistance == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldAssistance.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = assistanceService.updateById(assistance);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    // endregion

    @GetMapping("/get/count")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<List<Integer>> getAssistanceUserCount(Integer year, HttpServletRequest request) {
        List<Integer> assistanceUserCountList = assistanceService.getUserCount(year);
        return ResultUtils.success(assistanceUserCountList);
    }
}
