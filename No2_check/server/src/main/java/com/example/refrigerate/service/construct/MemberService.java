package com.example.refrigerate.service.construct;

import com.example.refrigerate.domain.Member.dto.MemberDTO;
import com.example.refrigerate.domain.Member.entity.Member;

public interface MemberService {
    MemberDTO insertUser(MemberDTO dto) throws Exception;
    String checkUser(String user_id) throws Exception;
    MemberDTO selectUser(MemberDTO dto) throws Exception;
    
    MemberDTO updateUser(Long member_id, String image) throws Exception;

    default Member dtoToEntity(MemberDTO dto) {
        return Member.builder()
                .userid(dto.getUser_id())
                .email(dto.getUser_email())
                .pwd(dto.getUser_pw())
                .name(dto.getUser_nm())
                .image(dto.getImage())
                .build();
    }

    default MemberDTO entityToDto(Member entity) {
        return MemberDTO.builder()
                .idx(entity.getIdx())
                .user_id(entity.getUserid())
                .user_email(entity.getEmail())
                .user_nm(entity.getName())
                .user_pw("none")
                .image(entity.getImage())
                .build();
    }
}
