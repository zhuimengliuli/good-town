package com.good.town.model.vo;

import cn.hutool.json.JSONUtil;
import com.good.town.model.entity.Assistance;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 助力服务视图
 *
 *
 */
@Data
public class AssistanceVO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 宣传id
     */
    private Long promotionId;

    /**
     * 助力描述
     */
    private String description;

    /**
     * 助力介绍图片
     */
    private String picture;

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 状态：0：待接收 1：同意 2：拒绝 3：取消
     */
    private Integer state;

    /**
     * 创建用户信息
     */
    private UserVO user;

    /**
     * 封装类转对象
     *
     * @param assistanceVO
     * @return
     */
    public static Assistance voToObj(AssistanceVO assistanceVO) {
        if (assistanceVO == null) {
            return null;
        }
        Assistance assistance = new Assistance();
        BeanUtils.copyProperties(assistanceVO, assistance);
        return assistance;
    }

    /**
     * 对象转封装类
     *
     * @param assistance
     * @return
     */
    public static AssistanceVO objToVo(Assistance assistance) {
        if (assistance == null) {
            return null;
        }
        AssistanceVO assistanceVO = new AssistanceVO();
        BeanUtils.copyProperties(assistance, assistanceVO);
        return assistanceVO;
    }
}
