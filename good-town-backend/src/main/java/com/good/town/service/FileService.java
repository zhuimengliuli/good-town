package com.good.town.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public String UploadFile(String fileName, MultipartFile file) throws Exception;
    public void EraseByUrl(String fileUrl);
}
