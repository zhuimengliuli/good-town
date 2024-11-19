package com.good.town.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户注册请求体
 *
 *
 */
@Data
public class UserRegisterRequest implements Serializable {

    private static final long serialVersionUID = 3191241716373120793L;

    /**
     * 账号
     */
    private String userAccount;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 确认密码
     */
    private String checkPassword;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 电话
     */
    private String phone;

    /**
     * 用户证件号码
     */
    private String userIDCard;

    /**
     * 用户证件类型
     */
    private String userIDCardType;
}
