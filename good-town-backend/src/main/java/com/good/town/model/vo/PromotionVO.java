package com.good.town.model.vo;

import cn.hutool.json.JSONUtil;
import com.good.town.model.entity.Promotion;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 宣传服务视图
 *
 *
 */
@Data
public class PromotionVO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 用户id
     */
    private Long userId;

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
     * 图片（JSON数组）
     */
    private String picture;

    /**
     * 视频（JSON数组）
     */
    private String video;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;


    /**
     * 创建用户信息
     */
    private UserVO user;

    /**
     * 封装类转对象
     *
     * @param promotionVO
     * @return
     */
    public static Promotion voToObj(PromotionVO promotionVO) {
        if (promotionVO == null) {
            return null;
        }
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionVO, promotion);
        return promotion;
    }

    /**
     * 对象转封装类
     *
     * @param promotion
     * @return
     */
    public static PromotionVO objToVo(Promotion promotion) {
        if (promotion == null) {
            return null;
        }
        PromotionVO promotionVO = new PromotionVO();
        BeanUtils.copyProperties(promotion, promotionVO);
        return promotionVO;
    }
}
