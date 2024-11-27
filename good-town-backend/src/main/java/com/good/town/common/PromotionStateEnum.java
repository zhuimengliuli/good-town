package com.good.town.common;

/**
 * @author hjc
 * @version 1.0
 */
public enum PromotionStateEnum {
    ASSISTED(1, "已助力"),
    NOT_ASSISTED(0, "未助力");;
    private Integer code;
    private String msg;

    PromotionStateEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
