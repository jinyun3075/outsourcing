package com.example.refrigerate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.refrigerate.domain.Member.dto.CommentsDTO;
import com.example.refrigerate.domain.Member.entity.Comments;
import com.example.refrigerate.domain.Member.entity.Recipe;
import com.example.refrigerate.domain.Member.repository.CommentsRepository;
import com.example.refrigerate.domain.Member.repository.RecipeRepository;
import com.example.refrigerate.service.construct.CommentsService;
import com.example.refrigerate.util.exception.ServiceExceptionCheck;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsServiceIMPL extends ServiceExceptionCheck implements CommentsService{

    public final CommentsRepository commentsRepository;
    public final RecipeRepository recipeRepository;

    @Override
    public CommentsDTO insertComments(CommentsDTO dto) throws Exception {
        Comments comments = commentsRepository.save(dtoToEntity(dto));

        Optional<Recipe> findR = recipeRepository.findById(dto.getRecipe_idx());

        List<Comments> commentList = commentsRepository.findByRecipe(findR.get());
        int sum = commentList.stream().reduce(0,(a,b)->a+b.getScore(),(a,b) -> a+b);
        double score = (double)sum / commentList.size();
        
        recipeRepository.updateScore(dto.getRecipe_idx(), score);
        
        return entityToDto(comments);
    }

    @Override
    public List<CommentsDTO> selectComments(Long recipe_idx) throws Exception {
        Optional<Recipe> recipe = recipeRepository.findById(recipe_idx);
        List<Comments> comment = commentsRepository.findByRecipe(recipe.get());
        return comment.stream().map(d->entityToDto(d)).toList();
    }
    
}
