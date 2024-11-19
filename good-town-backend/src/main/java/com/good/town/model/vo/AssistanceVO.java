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
     * @param assistanceVO
     * @return
     */
    public static Assistance voToObj(AssistanceVO assistanceVO) {
        if (assistanceVO == null) {
            return null;
        }
        Assistance assistance = new Assistance();
        BeanUtils.copyProperties(assistanceVO, assistance);
        List<String> tagList = assistanceVO.getTagList();
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
