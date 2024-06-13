package com.example.refrigerate.domain.Member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDTO {
    private Long idx;
    private String user_id;
    private String user_nm;
    private String user_email;
    private String user_pw;
    private String image;
}
