package com.example.refrigerate.service.construct;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.refrigerate.domain.Member.dto.UploadDTO;

public interface UploadService {
    List<UploadDTO> uploadFile(MultipartFile[] uploadFiles) throws Exception;
    ResponseEntity<byte[]> getFile(String fileName);
}
