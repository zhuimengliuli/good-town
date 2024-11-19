package com.good.town.model.dto.assistance;

import com.good.town.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询助力服务请求
 *
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AssistanceQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * id
     */
    private Long notId;

    /**
     * 助力描述
     */
    private String description;

    /**
     * 查询词
     */
    private String searchText;

    /**
     * 助力介绍图片
     */
    private String picture;

    /**
     * 创建用户 id
     */
    private Long userId;

    private static final long serialVersionUID = 1L;
}