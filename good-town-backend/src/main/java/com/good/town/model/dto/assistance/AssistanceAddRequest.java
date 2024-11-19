package com.good.town.model.dto.assistance;

import lombok.Data;

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
     * 助力描述
     */
    private String description;

    /**
     * 助力介绍图片
     */
    private String picture;

    private static final long serialVersionUID = 1L;
}