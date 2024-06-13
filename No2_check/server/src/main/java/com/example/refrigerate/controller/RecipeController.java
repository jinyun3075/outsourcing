package com.example.refrigerate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.refrigerate.domain.Member.dto.RecipeDTO;
import com.example.refrigerate.service.construct.RecipeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;
    
    @PostMapping("")
    public ResponseEntity<RecipeDTO> insertRecipe(@RequestBody RecipeDTO req) throws Exception {
        return new ResponseEntity<>(service.insertRecipe(req), HttpStatus.OK);
    }

    @GetMapping("/{recipe_id}")
    public ResponseEntity<List<RecipeDTO>> selectRecipe(@PathVariable("recipe_id") Long recipe_id) throws Exception {
        return new ResponseEntity<>(service.selectRecipe(recipe_id), HttpStatus.OK);
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<RecipeDTO>> selectRecipeUser(@PathVariable("user_id") Long user_id) throws Exception {
        return new ResponseEntity<>(service.selectRecipeUser(user_id), HttpStatus.OK);
    }

    @GetMapping("/detail/{recipe_id}")
    public ResponseEntity<RecipeDTO> selectDetail(@PathVariable("recipe_id") Long recipe_id) throws Exception {
        return new ResponseEntity<>(service.selectDetail(recipe_id), HttpStatus.OK);
    }

    @GetMapping("/search/{search_content}")
    public ResponseEntity<List<RecipeDTO>> searchRecipe(@PathVariable("search_content") String search_content) throws Exception {
        return new ResponseEntity<>(service.searchRecipe(search_content), HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<String> scrapRecipe(@RequestBody RecipeDTO req) throws Exception{
        return new ResponseEntity<>(service.scrapRecipe(req), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<RecipeDTO> updateRecipe(@RequestBody RecipeDTO req) throws Exception{
        return new ResponseEntity<>(service.updateRecipe(req), HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteRecipe(@RequestBody RecipeDTO req) throws Exception {
        return new ResponseEntity<>(service.deleteRecipe(req.getRecipe_id(), req.getMember_id()), HttpStatus.OK);
    }
}
