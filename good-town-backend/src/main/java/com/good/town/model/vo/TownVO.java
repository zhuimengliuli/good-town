package com.good.town.model.vo;

import cn.hutool.json.JSONUtil;
import com.good.town.model.entity.Town;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 乡镇视图
 *
 *
 */
@Data
public class TownVO implements Serializable {

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
     * @param townVO
     * @return
     */
    public static Town voToObj(TownVO townVO) {
        if (townVO == null) {
            return null;
        }
        Town town = new Town();
        BeanUtils.copyProperties(townVO, town);
        List<String> tagList = townVO.getTagList();
        return town;
    }

    /**
     * 对象转封装类
     *
     * @param town
     * @return
     */
    public static TownVO objToVo(Town town) {
        if (town == null) {
            return null;
        }
        TownVO townVO = new TownVO();
        BeanUtils.copyProperties(town, townVO);
        return townVO;
    }
}
