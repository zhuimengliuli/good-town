package com.good.town.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 宣传
 * @TableName promotion
 */
@TableName(value ="promotion")
@Data
public class Promotion implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 乡镇id
     */
    private Long townId;

    /**
     * 宣传类型
     */
    private String type;

    /**
     * 宣传主题名称
     */
    private String themeName;

    /**
     * 宣传描述
     */
    private String description;

    /**
     * 图片（JSON数组）
     */
    private String picture;

    /**
     * 视频（JSON数组）
     */
    private String video;

    /**
     * 状态：0：已发布 -1：已取消
     */
    private String state;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}