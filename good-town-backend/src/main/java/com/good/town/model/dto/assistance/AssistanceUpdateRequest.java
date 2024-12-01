package com.good.town.model.dto.assistance;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

/**
 * 更新助力服务请求
 *
 *
 */
@Data
public class AssistanceUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 助力用户id
     */
    private Long userId;

    /**
     * 宣传id
     */
    private Long promotionId;

    /**
     * 助力描述
     */
    private String description;


    /**
     * 状态：0：待接收 1：同意 2：拒绝 3：取消
     */
    private Integer state;

    private static final long serialVersionUID = 1L;
}