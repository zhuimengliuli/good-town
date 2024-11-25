package com.good.town.model.dto.promotion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 创建宣传服务请求
 *
 *
 */
@Data
public class PromotionAddRequest implements Serializable {

    /**
     * 宣传主题名称
     */
    private String themeName;

    /**
     * 宣传描述
     */
    private String description;

    /**
     * 图片
     */
    private List<String> picture;

    /**
     * 视频
     */
    private List<String> video;

    /**
     * 宣传类型
     */
    private String type;

    /**
     * 乡镇
     */
    private String townName;

    private static final long serialVersionUID = 1L;
}