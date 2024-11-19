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
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

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
     * 标签列表
     */
    private List<String> tagList;

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
        List<String> tagList = promotionVO.getTagList();
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
