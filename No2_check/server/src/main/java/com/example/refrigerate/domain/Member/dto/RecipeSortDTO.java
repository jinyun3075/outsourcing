package com.example.refrigerate.domain.Member.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecipeSortDTO {
    private Integer step;
    private String content;
    private String image;
}
