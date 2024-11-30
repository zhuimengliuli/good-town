package com.good.town.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 助力
 * @TableName assistance
 */
@TableName(value ="assistance")
@Data
public class Assistance implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 宣传id
     */
    private Long promotionId;

    /**
     * 助力用户id
     */
    private Long userId;

    /**
     * 助力描述
     */
    private String description;

    /**
     * 助力介绍图片
     */
    private String picture;

    /**
     * 助力介绍视频
     */
    private String video;

    /**
     * 状态：0：待接收 1：同意 2：拒绝 3：取消
     */
    private Integer state;

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