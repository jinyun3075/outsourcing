package com.example.refrigerate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.refrigerate.domain.Member.dto.RefrigerateDTO;
import com.example.refrigerate.service.construct.RefrigerateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/refrigerate")
@RequiredArgsConstructor
public class RefrigerateController {

    private final RefrigerateService service;

    @GetMapping("/{user_id}")
    public ResponseEntity<List<RefrigerateDTO>> selectRefrigerate(@PathVariable("user_id") Long user_id) throws Exception{
        return new ResponseEntity<>(service.selectRefrigerate(user_id), HttpStatus.OK);
    }
}
