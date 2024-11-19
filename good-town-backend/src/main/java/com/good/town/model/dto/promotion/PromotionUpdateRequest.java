package com.good.town.model.dto.promotion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 更新宣传服务请求
 *
 *
 */
@Data
public class PromotionUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;


    private static final long serialVersionUID = 1L;
}