package com.good.town.service.impl;

import com.good.town.common.ErrorCode;
import com.good.town.config.MinioConfig;
import com.good.town.exception.ThrowUtils;
import com.good.town.service.FileService;
import io.minio.*;
import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
    private MinioClient minioClient;
    private MinioConfig minioConfig;

    @Autowired
    public FileServiceImpl(MinioConfig minioConfig)throws  Exception{
        this.minioConfig = minioConfig;
        this.minioClient = MinioClient.builder().endpoint(this.minioConfig.getServer()).credentials(this.minioConfig.getAccessKey(),this.minioConfig.getSecretKey()).build();
        log.info(this.minioConfig.getAccessKey());
        log.info(this.minioConfig.getSecretKey());
        boolean found=minioClient.bucketExists(BucketExistsArgs.builder().bucket(this.minioConfig.getBucket()).build());
        if(!found){
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(this.minioConfig.getBucket()).build());
        }else{
            log.info("Bucket "+this.minioConfig.getBucket()+" already exists");
        }
    }

    @Override
    public String UploadFile(String fileName, MultipartFile file) throws Exception{
        String originalFileName =  file.getOriginalFilename();
        String fileExtension =  originalFileName.substring(originalFileName.lastIndexOf(".")+1);
        if(!fileExtension.isEmpty()){
            fileName = fileName+"."+fileExtension;
        }
        String contentType = file.getContentType();
        long fileSize =file.getSize();
        minioClient.putObject(PutObjectArgs.builder().contentType(contentType).bucket(this.minioConfig.getBucket()).object(fileName).stream(file.getInputStream(),fileSize,-1).build());
        return this.minioConfig.getServer()+"/"+this.minioConfig.getBucket()+"/"+fileName;
    }

    @Override
    public void EraseByUrl(String fileUrl){
        try{
            URL url =new URL(fileUrl);
            String path = url.getPath();
            path =path.startsWith("/")?path.substring(1):path;
            String [] parts = path.split("/",2);
            ThrowUtils.throwIf(parts.length<2, ErrorCode.PARAMS_ERROR);
            String bucket = parts[0];
            String object = parts[1];
            minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(object).build());
        }catch (Exception e){
            log.warn(e.getMessage());
        }
    }
//    public String UpdateFile(String fileName,MultipartFile file) throws Exception{
//        String originalFileName =  file.getOriginalFilename();
//        String fileExtension =  originalFileName.substring(originalFileName.lastIndexOf(".")+1);
//        String contentType = file.getContentType();
//        long fileSize =file.getSize();
//        minioClient.putObject(PutObjectArgs.builder().contentType(contentType).bucket(this.minioConfig.getBucket()).object(fileName).stream(file.getInputStream(),fileSize,-1).build());
//        return this.minioConfig.getServer()+"/"+this.minioConfig.getBucket()+"/"+fileName;
//    }
}
