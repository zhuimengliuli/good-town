package com.good.town.model.dto.promotion;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

/**
 * 编辑宣传服务请求
 *
 *
 */
@Data
public class PromotionEditRequest implements Serializable {

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
     * 图片
     */
    private MultipartFile picture;

    /**
     * 视频
     */
    private MultipartFile video;

    /**
     * 状态：0：已发布无助力 1：已发布有助力
     */
    private Integer state;

    private static final long serialVersionUID = 1L;
}