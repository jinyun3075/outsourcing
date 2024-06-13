package com.example.refrigerate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.refrigerate.domain.Member.dto.UploadDTO;
import com.example.refrigerate.service.construct.UploadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class UploadController {
    private final UploadService service;

    @PostMapping("")
    public ResponseEntity<List<UploadDTO>> uploadFile(@RequestParam("file") MultipartFile[] uploadFiles) throws Exception {
        return new ResponseEntity<>(service.uploadFile(uploadFiles), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<byte[]> getFile(@RequestParam("fileName") String fileName) {
        return service.getFile(fileName);
    }
    
}
