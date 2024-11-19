package com.good.town.model.dto.promotion;

import com.good.town.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询宣传服务请求
 *
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PromotionQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * id
     */
    private Long notId;

    /**
     * 查询词
     */
    private String searchText;

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
     * 创建用户 id
     */
    private Long userId;

    private static final long serialVersionUID = 1L;
}