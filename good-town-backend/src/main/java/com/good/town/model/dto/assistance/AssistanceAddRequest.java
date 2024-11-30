package com.good.town.model.dto.assistance;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

/**
 * 创建助力服务请求
 *
 *
 */
@Data
public class AssistanceAddRequest implements Serializable {

    /**
     * 助力用户id
     */
    private Long userId;

    /**
     * 宣传id
     */
    private Long promotionId;

    /**
     * 助力描述
     */
    private String description;

    /**
     * 助力介绍图片
     */
    private MultipartFile picture;

    /**
     * 助力介绍视频
     */
    private MultipartFile video;

    private static final long serialVersionUID = 1L;
}