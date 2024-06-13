package com.example.refrigerate.service.construct;

import java.util.List;

import com.example.refrigerate.domain.Member.dto.CommentsDTO;
import com.example.refrigerate.domain.Member.entity.Comments;
import com.example.refrigerate.domain.Member.entity.Member;
import com.example.refrigerate.domain.Member.entity.Recipe;

public interface CommentsService {
    CommentsDTO insertComments(CommentsDTO dto) throws Exception;
    List<CommentsDTO> selectComments(Long recipe_idx) throws Exception;

    default Comments dtoToEntity(CommentsDTO dto) {
        Member member = Member.builder()
                .idx(dto.getMember_idx())
                .build();
        Recipe recipe = Recipe.builder()
                .idx(dto.getRecipe_idx())
                .build();
        return Comments.builder()
                .member(member)
                .recipe(recipe)
                .comment(dto.getComment())
                .score(dto.getScore())
                .build();
    }
    default CommentsDTO entityToDto(Comments entity) {
        return CommentsDTO.builder()
                .comment(entity.getComment())
                .score(entity.getScore())
                .user_nm(entity.getMember().getName())
                .reg_date(entity.getRegDate().toString())
                .user_image(entity.getMember().getImage())
                .build();
    }
}
