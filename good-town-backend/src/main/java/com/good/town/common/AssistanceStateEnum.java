package com.good.town.common;

import lombok.Data;

/**
 * @author hjc
 * @version 1.0
 */
public enum AssistanceStateEnum {
    /**
     * 待接收
     */
    PENDING(0, "待接收"),
    /**
     * 已通过
     */
    APPROVED(1, "同意"),
    /**
     * 已拒绝
     */
    REJECTED(2, "拒绝"),
    /**
     * 已取消
     */
    CANCELED(3, "已取消");
    private int code;
    private String desc;
    AssistanceStateEnum(int code, String desc) {
        this.code = code;
    this.desc = desc;
    }

    public int getCode() {
        return code;
    }
    public String getDesc() {
        return desc;
    }
}
