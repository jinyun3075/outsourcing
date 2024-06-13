package com.example.refrigerate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.refrigerate.domain.Member.dto.CommentsDTO;
import com.example.refrigerate.service.construct.CommentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentsController {
    public final CommentsService service;
    
    @PostMapping("")
    public ResponseEntity<CommentsDTO> insertComments(@RequestBody CommentsDTO req) throws Exception {
        return new ResponseEntity<>(service.insertComments(req), HttpStatus.OK);
    }

    @GetMapping("/{recipe_id}")
    public ResponseEntity<List<CommentsDTO>> selectComments(@PathVariable("recipe_id") Long recipe_id) throws Exception {
        return new ResponseEntity<>(service.selectComments(recipe_id), HttpStatus.OK);
    }
}
