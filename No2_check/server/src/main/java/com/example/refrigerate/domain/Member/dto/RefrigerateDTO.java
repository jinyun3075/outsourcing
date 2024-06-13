package com.example.refrigerate.domain.Member.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RefrigerateDTO {
    private Long member_id;
    private Long recipe_id;
}
