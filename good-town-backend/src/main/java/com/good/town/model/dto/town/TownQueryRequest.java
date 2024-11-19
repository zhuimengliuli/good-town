package com.good.town.model.dto.town;

import com.good.town.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询乡镇请求
 *
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TownQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * id
     */
    private Long notId;

    /**
     * 乡镇名
     */
    private String townName;

    /**
     * 所属省份
     */
    private String province;

    /**
     * 所属地市
     */
    private String city;

    /**
     * 查询词
     */
    private String searchText;

    /**
     * 创建用户 id
     */
    private Long userId;

    private static final long serialVersionUID = 1L;
}