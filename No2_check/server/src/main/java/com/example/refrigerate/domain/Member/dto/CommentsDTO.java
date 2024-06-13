package com.example.refrigerate.domain.Member.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentsDTO {
    private Long member_idx;
    private Long recipe_idx;
    private String reg_date;
    private String user_nm;
    private String comment;
    private Integer score;
    private String user_image;
}
