package com.good.town.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.good.town.annotation.AuthCheck;
import com.good.town.common.BaseResponse;
import com.good.town.common.DeleteRequest;
import com.good.town.common.ErrorCode;
import com.good.town.common.ResultUtils;
import com.good.town.constant.UserConstant;
import com.good.town.exception.BusinessException;
import com.good.town.exception.ThrowUtils;
import com.good.town.model.dto.town.TownAddRequest;
import com.good.town.model.dto.town.TownEditRequest;
import com.good.town.model.dto.town.TownQueryRequest;
import com.good.town.model.dto.town.TownUpdateRequest;
import com.good.town.model.entity.Town;
import com.good.town.model.entity.User;
import com.good.town.model.vo.TownVO;
import com.good.town.service.TownService;
import com.good.town.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 乡镇接口
 *
 *
 */
@RestController
@RequestMapping("/town")
@Slf4j
public class TownController {

    @Resource
    private TownService townService;

    @Resource
    private UserService userService;

    // region 增删改查



    /**
     * 更新乡镇（仅管理员可用）
     *
     * @param townUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateTown(@RequestBody TownUpdateRequest townUpdateRequest) {
        if (townUpdateRequest == null || townUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Town town = new Town();
        BeanUtils.copyProperties(townUpdateRequest, town);
        // 数据校验
        townService.validTown(town, false);
        // 判断是否存在
        long id = townUpdateRequest.getId();
        Town oldTown = townService.getById(id);
        ThrowUtils.throwIf(oldTown == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = townService.updateById(town);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取乡镇（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<TownVO> getTownVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Town town = townService.getById(id);
        ThrowUtils.throwIf(town == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(townService.getTownVO(town, request));
    }

    /**
     * 分页获取乡镇列表（仅管理员可用）
     *
     * @param townQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Town>> listTownByPage(@RequestBody TownQueryRequest townQueryRequest) {
        long current = townQueryRequest.getCurrent();
        long size = townQueryRequest.getPageSize();
        // 查询数据库
        Page<Town> townPage = townService.page(new Page<>(current, size),
                townService.getQueryWrapper(townQueryRequest));
        return ResultUtils.success(townPage);
    }

    /**
     * 分页获取乡镇列表（封装类）
     *
     * @param townQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<TownVO>> listTownVOByPage(@RequestBody TownQueryRequest townQueryRequest,
                                                               HttpServletRequest request) {
        long current = townQueryRequest.getCurrent();
        long size = townQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Town> townPage = townService.page(new Page<>(current, size),
                townService.getQueryWrapper(townQueryRequest));
        // 获取封装类
        return ResultUtils.success(townService.getTownVOPage(townPage, request));
    }

    /**
     * 分页获取当前登录用户创建的乡镇列表
     *
     * @param townQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<TownVO>> listMyTownVOByPage(@RequestBody TownQueryRequest townQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(townQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // 补充查询条件，只查询当前登录用户的数据
        User loginUser = userService.getLoginUser(request);
        townQueryRequest.setUserId(loginUser.getId());
        long current = townQueryRequest.getCurrent();
        long size = townQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Town> townPage = townService.page(new Page<>(current, size),
                townService.getQueryWrapper(townQueryRequest));
        // 获取封装类
        return ResultUtils.success(townService.getTownVOPage(townPage, request));
    }


    // endregion
}
