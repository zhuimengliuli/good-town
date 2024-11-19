package com.good.town.model.dto.town;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 编辑乡镇请求
 *
 *
 */
@Data
public class TownEditRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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

    private static final long serialVersionUID = 1L;
}