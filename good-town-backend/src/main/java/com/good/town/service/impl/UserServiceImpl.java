package com.good.town.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.good.town.common.ErrorCode;
import com.good.town.constant.CommonConstant;
import com.good.town.exception.BusinessException;
import com.good.town.exception.ThrowUtils;
import com.good.town.mapper.UserMapper;
import com.good.town.model.dto.user.UserQueryRequest;
import com.good.town.model.entity.User;
import com.good.town.model.enums.UserRoleEnum;
import com.good.town.model.vo.LoginUserVO;
import com.good.town.model.vo.UserVO;
import com.good.town.service.UserService;
import com.good.town.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.CharUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.good.town.constant.UserConstant.USER_LOGIN_STATE;

/**
 * 用户服务实现
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * 盐值，混淆密码
     */
    public static final String SALT = "xcx";

    private static final int userAccountMinLength = 3;
    private static final int userPasswordMinLength = 3;


    @Override
    public long userRegister(User user, String checkPassword) {
        String userAccount = user.getUserAccount();
        String userPassword = user.getUserPassword();
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < userAccountMinLength) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        boolean hasLower = false,hasUpper = false;
        int digitCnt = 0;
        for(int i=0;i<checkPassword.length();i++){
            char tmp =checkPassword.charAt(i);
            if(CharUtils.isAsciiAlphaLower(tmp)){
                hasLower = true;
            }else if(CharUtils.isAsciiAlphaUpper(tmp)){
                hasUpper = true;
            }else if(CharUtils.isAsciiNumeric(tmp)){
                digitCnt++;
            }else{
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码包含非法字符(密码只能包含数字和字母)");
            }
        }
        for(int i=0;i<user.getPhone().length();i++){
            char tmp =user.getPhone().charAt(i);
            if(!CharUtils.isAsciiNumeric(tmp)){
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"电话号码包含非法字符");
            }
        }

        if(!hasLower||!hasUpper){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码必须同时包含大写字母和小写字母");
        }else if(digitCnt<2){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码必须包含至少2位数字");
        }else if(checkPassword.length()<6){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码长度不得少于6位");
        }
        // 密码和校验密码相同
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }
        if(user.getUserIDCardType().equals("身份证")){
            for(int i=0;i<user.getUserIDCard().length();i++){
                char tmp =user.getUserIDCard().charAt(i);
                if(!CharUtils.isAsciiNumeric(tmp)&&tmp!='X'&&tmp!='x'){
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"身份证内容非法");
                }
            }
            if(user.getUserIDCard().length()!=18){
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"身份证内容非法");
            }
        }else if(user.getUserIDCardType().equals("港澳通行证")){//http://www.locpg.hk/fuzn/2013-03/05/c_125939266.htm
            if(user.getUserIDCard().length()!=11){
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"港澳通行证内容非法");
            }
            for(int i=0;i<user.getUserIDCard().length();i++){
                char tmp =user.getUserIDCard().charAt(i);
                if(i==1&&tmp!='H'&&tmp!='h'&&tmp!='M'&&tmp!='m'){
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"港澳通行证内容非法");
                }else if(!CharUtils.isAsciiNumeric(tmp)) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"护照内容非法");
                }
            }
        }else if(user.getUserIDCardType().equals("护照")){//https://ga.sz.gov.cn/ZDYW/SHQZ/SHQZWD/content/post_10895700.html
            if(user.getUserIDCard().length()!=9){
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"护照内容非法");
            }
            for(int i=0;i<user.getUserIDCard().length();i++){
                char tmp =user.getUserIDCard().charAt(i);
                if(i==1&&!CharUtils.isAsciiAlpha(tmp)){
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"护照内容非法");
                }else if(i==2&&!CharUtils.isAsciiAlpha(tmp)&&!CharUtils.isAsciiNumeric(tmp)){
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"护照内容非法");
                }else if(!CharUtils.isAsciiNumeric(tmp)) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"护照内容非法");
                }
            }
        }

        synchronized (userAccount.intern()) {
            // 账户不能重复
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("userAccount", userAccount);
            long count = this.baseMapper.selectCount(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
            }
            // 2. 加密
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
            // 3. 插入数据
            user.setUserPassword(encryptPassword);
            boolean saveResult = this.save(user);
            if (!saveResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
            }
            return user.getId();
        }
    }

    @Override
    public LoginUserVO userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < userAccountMinLength) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号错误");
        }
        if (userPassword.length() < userPasswordMinLength) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码错误");
        }
        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        // 查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", encryptPassword);
        User user = this.baseMapper.selectOne(queryWrapper);
        // 用户不存在
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在或密码错误");
        }
        // 3. 记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, user);
        return this.getLoginUserVO(user);
    }


    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUser(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }

    /**
     * 获取当前登录用户（允许未登录）
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUserPermitNull(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            return null;
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        return this.getById(userId);
    }

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    @Override
    public boolean isAdmin(HttpServletRequest request) {
        // 仅管理员可查询
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userObj;
        return isAdmin(user);
    }

    @Override
    public boolean isAdmin(User user) {
        return user != null && UserRoleEnum.ADMIN.getValue().equals(user.getUserRole());
    }

    /**
     * 用户注销
     *
     * @param request
     */
    @Override
    public boolean userLogout(HttpServletRequest request) {
        if (request.getSession().getAttribute(USER_LOGIN_STATE) == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        // 移除登录态
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return true;
    }

    @Override
    public LoginUserVO getLoginUserVO(User user) {
        if (user == null) {
            return null;
        }
        LoginUserVO loginUserVO = new LoginUserVO();
        BeanUtils.copyProperties(user, loginUserVO);
        return loginUserVO;
    }

    @Override
    public UserVO getUserVO(User user) {
        if (user == null) {
            return null;
        }
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return userVO;
    }

    @Override
    public List<UserVO> getUserVO(List<User> userList) {
        if (CollUtil.isEmpty(userList)) {
            return new ArrayList<>();
        }
        return userList.stream().map(this::getUserVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest) {
        if (userQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = userQueryRequest.getId();
        String userName = userQueryRequest.getUserName();
        String userProfile = userQueryRequest.getUserProfile();
        String userRole = userQueryRequest.getUserRole();
        String sortField = userQueryRequest.getSortField();
        String sortOrder = userQueryRequest.getSortOrder();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(StringUtils.isNotBlank(userRole), "userRole", userRole);
        queryWrapper.like(StringUtils.isNotBlank(userProfile), "userProfile", userProfile);
        queryWrapper.like(StringUtils.isNotBlank(userName), "userName", userName);
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }



}
