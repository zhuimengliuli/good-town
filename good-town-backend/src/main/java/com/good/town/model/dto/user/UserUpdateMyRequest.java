package com.good.town.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户更新个人信息请求
 *
 *
 */
@Data
public class UserUpdateMyRequest implements Serializable {

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 电话
     */
    private String phone;

    /**
     * 简介
     */
    private String userProfile;

    private static final long serialVersionUID = 1L;
}