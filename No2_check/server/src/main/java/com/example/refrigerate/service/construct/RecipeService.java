package com.example.refrigerate.service.construct;

import java.util.List;

import com.example.refrigerate.domain.Member.dto.RecipeDTO;
import com.example.refrigerate.domain.Member.dto.RecipeSortDTO;
import com.example.refrigerate.domain.Member.entity.Member;
import com.example.refrigerate.domain.Member.entity.Recipe;
import com.example.refrigerate.domain.Member.entity.RecipeSort;

public interface RecipeService {
    RecipeDTO insertRecipe(RecipeDTO dto) throws Exception;
    List<RecipeDTO> selectRecipe(Long recipe_id) throws Exception;
    List<RecipeDTO> selectRecipeUser(Long user_id) throws Exception;
    List<RecipeDTO> searchRecipe(String search_content) throws Exception;
    RecipeDTO selectDetail(Long recipe_id) throws Exception;
    String scrapRecipe(RecipeDTO dto) throws Exception;
    RecipeDTO updateRecipe(RecipeDTO dto) throws Exception;
    String deleteRecipe(Long recipe_id, Long member_id) throws Exception;

    default Recipe dtoToEntity(RecipeDTO dto, Member member) {
        return Recipe.builder()
                .member(member)
                .title(dto.getTitle())
                .summery(dto.getSummery())
                .tip(dto.getTip())
                .userCount(dto.getUserCount())
                .time(dto.getTime())
                .level(dto.getLevel())
                .ingredient(dto.getIngredient())
                .seasoning(dto.getSeasoning())
                .image(dto.getImage())
                .score(dto.getScore())
                .visible(dto.getVisible())
                .build();
    }
    default RecipeDTO entityToDto(Recipe entity){
        return RecipeDTO.builder()
                .member_id(entity.getMember().getIdx())
                .writer(entity.getMember().getName())
                .writerImg(entity.getMember().getImage())
                .title(entity.getTitle())
                .summery(entity.getSummery())
                .tip(entity.getTip())
                .userCount(entity.getUserCount())
                .recipe_id(entity.getIdx())
                .time(entity.getTime())
                .level(entity.getLevel())
                .ingredient(entity.getIngredient())
                .seasoning(entity.getSeasoning())
                .image(entity.getImage())
                .regdate(entity.getRegDate().toString())
                .score(entity.getScore())
                .visible(entity.getVisible())
                .build();
    }
    default RecipeDTO entityToDto(Recipe entity, List<RecipeSort> entity2){
        return RecipeDTO.builder()
                .member_id(entity.getMember().getIdx())
                .writer(entity.getMember().getName())
                .writerImg(entity.getMember().getImage())
                .title(entity.getTitle())
                .summery(entity.getSummery())
                .tip(entity.getTip())
                .userCount(entity.getUserCount())
                .recipe_id(entity.getIdx())
                .time(entity.getTime())
                .level(entity.getLevel())
                .ingredient(entity.getIngredient())
                .seasoning(entity.getSeasoning())
                .image(entity.getImage())
                .regdate(entity.getRegDate().toString())
                .score(entity.getScore())
                .visible(entity.getVisible())
                .recipe_sort(entity2.stream().map(p->{
                    return RecipeSortDTO.builder()
                            .content(p.getContent())
                            .image(p.getImage())
                            .step(p.getStep())
                            .build();
                }).toList())
                .build();
    }
    default RecipeSort dtoToEntity(RecipeSortDTO dto, Recipe recipe){
        return RecipeSort.builder()
                .recipe(recipe)
                .content(dto.getContent())
                .image(dto.getImage())
                .step(dto.getStep())
                .build();
    }

    default void updateRecipeEntity(Recipe entity, RecipeDTO dto){
        entity.setImage(dto.getImage());
        entity.setTime(dto.getTime());
        entity.setIngredient(dto.getIngredient());
        entity.setTime(dto.getTime());
        entity.setLevel(dto.getLevel());
        entity.setTip(dto.getTip());
        entity.setTitle(dto.getTitle());
        entity.setSeasoning(dto.getSeasoning());
        entity.setSummery(dto.getSummery());
        entity.setUserCount(dto.getUserCount());
        entity.setVisible(dto.getVisible());
        entity.setImage(dto.getImage());
    }

    default void updateRecipeSortEntity(RecipeSort entity, RecipeSortDTO dto){
        entity.setContent(dto.getContent());
        entity.setImage(dto.getImage());
        entity.setStep(dto.getStep());
    }
}
