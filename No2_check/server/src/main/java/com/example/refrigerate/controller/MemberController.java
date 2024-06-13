package com.example.refrigerate.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.refrigerate.domain.Member.dto.MemberDTO;
import com.example.refrigerate.service.construct.MemberService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService service;
    
    @PostMapping("")
    public ResponseEntity<MemberDTO> insertUser(@RequestBody MemberDTO req) throws Exception {
        return new ResponseEntity<>(service.insertUser(req), HttpStatus.OK);
    }

    @GetMapping("/{strCheck}")
    public ResponseEntity<String> checkUser(@PathVariable("strCheck") String strCheck) throws Exception {
        return new ResponseEntity<>(service.checkUser(strCheck), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberDTO> selectUser(@RequestBody MemberDTO req) throws Exception {
        return new ResponseEntity<>(service.selectUser(req), HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<MemberDTO> updateUser(@RequestBody MemberDTO req) throws Exception {
        return new ResponseEntity<>(service.updateUser(req.getIdx(), req.getImage()), HttpStatus.OK);
    }
    
}
