package com.good.town.model.dto.user;

import com.good.town.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 用户查询请求
 *
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class UserQueryRequest extends PageRequest implements Serializable {
    /**
     * id
     */
    private Long id;


    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 电话
     */
    private String phone;

    /**
     * 查询词
     */
    private String searchText;

    /**
     * 用户昵称
     */
    private String userNickName;

    /**
     * 简介
     */
    private String userProfile;

    /**
     * 用户角色：user/admin/ban
     */
    private String userRole;

    private static final long serialVersionUID = 1L;
}