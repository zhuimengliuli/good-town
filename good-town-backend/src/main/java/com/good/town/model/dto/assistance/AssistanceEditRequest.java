package com.good.town.model.dto.assistance;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 编辑助力服务请求
 *
 *
 */
@Data
public class AssistanceEditRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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