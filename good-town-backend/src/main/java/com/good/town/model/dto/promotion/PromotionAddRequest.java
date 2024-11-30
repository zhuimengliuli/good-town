package com.good.town.model.dto.promotion;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
    private MultipartFile picture;

    /**
     * 视频
     */
    private MultipartFile video;

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