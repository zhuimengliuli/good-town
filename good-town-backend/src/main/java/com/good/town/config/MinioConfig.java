package com.good.town.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class MinioConfig {
    @Value("${minio.server}")
    private String server;
    @Value("${minio.accesskey}")
    private String accessKey;

    @Value("${minio.secretkey}")
    private String secretKey;

    @Value("${minio.bucket}")
    private String bucket;
}
