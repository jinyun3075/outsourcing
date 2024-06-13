package com.example.refrigerate.domain.Member.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecipeDTO {
    private Long member_id;
    private Long recipe_id;
    private String writer;
    private String writerImg;
    private String title;
    private String summery;
    private String tip;
    private Integer userCount;
    private Integer time;
    private Integer level;
    private String ingredient;
    private String seasoning;
    private String image;
    private String regdate;
    private Double score;
    private String visible;
    private List<RecipeSortDTO> recipe_sort;
}
