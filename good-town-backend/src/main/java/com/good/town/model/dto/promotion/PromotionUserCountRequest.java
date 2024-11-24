package com.good.town.model.dto.promotion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author hjc
 * @version 1.0
 */
@Data
public class PromotionUserCountRequest implements Serializable {
    /**
     * 统计年份
     */
    private Integer year;
    /**
     * 统计月份
     */
    private List<Integer> monthList;

    private static final long serialVersionUID = 1L;
}
