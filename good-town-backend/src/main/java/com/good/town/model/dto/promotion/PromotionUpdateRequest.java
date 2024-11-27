package com.good.town.model.dto.promotion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 更新宣传服务请求
 *
 *
 */
@Data
public class PromotionUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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
     * 状态：0：已发布无助力 1：已发布有助力
     */
    private Integer state;

    private static final long serialVersionUID = 1L;
}