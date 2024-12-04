package com.good.town.model.dto.assistance;

import lombok.Data;

import java.io.Serializable;

/**
 * 创建助力服务请求
 *
 *
 */
@Data
public class AssistanceUserCountRequest implements Serializable {

    /**
     * 年份
     */
    private int year;

    /**
     * 乡镇名
     */
    private String townName;


    private static final long serialVersionUID = 1L;
}