package com.example.refrigerate.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.refrigerate.domain.Member.dto.RecipeDTO;
import com.example.refrigerate.domain.Member.entity.Member;
import com.example.refrigerate.domain.Member.entity.Recipe;
import com.example.refrigerate.domain.Member.entity.RecipeSort;
import com.example.refrigerate.domain.Member.entity.Refrigerate;
import com.example.refrigerate.domain.Member.repository.CommentsRepository;
import com.example.refrigerate.domain.Member.repository.MemberRepository;
import com.example.refrigerate.domain.Member.repository.RecipeRepository;
import com.example.refrigerate.domain.Member.repository.RecipeSortRepository;
import com.example.refrigerate.domain.Member.repository.RefigerateRepository;
import com.example.refrigerate.service.construct.RecipeService;
import com.example.refrigerate.util.exception.ServiceExceptionCheck;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceIMPL extends ServiceExceptionCheck implements RecipeService{

    public final RecipeRepository recipeRepository;
    public final RecipeSortRepository recipeSortRepository;
    public final MemberRepository memberRepository;
    public final CommentsRepository commentsRepository;
    public final RefigerateRepository refigerateRepository;
    @Override
    @Transactional
    public RecipeDTO insertRecipe(RecipeDTO dto) throws Exception {
        Optional<Member> member = memberRepository.findById(dto.getMember_id());
        Recipe recipe = recipeRepository.save(dtoToEntity(dto, member.get()));
        List<RecipeSort> recipeSorts = recipeSortRepository.saveAll(dto.getRecipe_sort().stream().map(p->dtoToEntity(p, recipe)).toList());
        return entityToDto(recipe, recipeSorts);
    }

    @Override
    @Transactional
    public RecipeDTO selectDetail(Long recipe_id) throws Exception {
        Recipe recipe = recipeRepository.findById(recipe_id).get();
        List<RecipeSort> recipeSorts = recipeSortRepository.findByRecipeIdx(recipe_id);
        return entityToDto(recipe, recipeSorts);
    }

    @Override
    @Transactional
    public List<RecipeDTO> selectRecipe(Long recipe_id) throws Exception {
        List<Recipe> resList = new ArrayList<>();
    
        if(recipe_id == 0 ){
            resList = recipeRepository.findAll();
        }else {
            resList.add(recipeRepository.findById(recipe_id).get());
        }
        
        return resList.stream().map(d->entityToDto(d)).toList();
    }

    @Override
    public List<RecipeDTO> selectRecipeUser(Long user_id) throws Exception {
        List<Recipe> resList = recipeRepository.findByMemberIdx(user_id);
        return resList.stream().map(d->entityToDto(d)).toList();
    }
    
    @Override
    @Transactional
    public List<RecipeDTO> searchRecipe(String search_content) throws Exception {
        List<Recipe> resList = new ArrayList<>();
    
        if(search_content.equals("")){
            resList = recipeRepository.findAll();
        }else {
            String[] contents = search_content.split(",");
            for(String content : contents){
                resList.addAll(recipeRepository.findBySearch(content));
            }
        }
        
        return resList.stream().map(d->entityToDto(d)).toList();
    }

    @Override
    @Transactional
    public String deleteRecipe(Long recipe_id, Long member_id) throws Exception {
        Optional<Recipe> entity = recipeRepository.findById(recipe_id);
        checkRecipeEntity(entity);

        if (entity.get().getMember().getIdx() == member_id) {
            recipeRepository.deleteById(recipe_id);
            return "삭제 완료";
        }
        return "삭제 실패 ex) 작성자가 다릅니다.";
    }

    @Override
    @Transactional
    public String scrapRecipe(RecipeDTO dto) throws Exception {
        Optional<Refrigerate> ref = refigerateRepository.findByMemberIdxAndRecipeIdx(dto.getMember_id(),dto.getRecipe_id());
        Optional<Member> member = memberRepository.findById(dto.getMember_id());
        Optional<Recipe> recipe = recipeRepository.findById(dto.getRecipe_id());

        String result = "";
        if(ref.isPresent()){
            refigerateRepository.deleteById(ref.get().getIdx());
            result = "스크랩 취소";
        }else {
            refigerateRepository.save(Refrigerate.builder().member(member.get()).recipe(recipe.get()).build());
            result = "스크랩";
        }
        return result;
    }

    @Override
    @Transactional
    public RecipeDTO updateRecipe(RecipeDTO dto) throws Exception {
        Optional<Recipe> recipe = recipeRepository.findById(dto.getRecipe_id());
        checkRecipeEntity(recipe);

        if (recipe.get().getMember().getIdx() != dto.getMember_id()) {
            throw new Exception("만든이가 아닙니다.");
        }

        updateRecipeEntity(recipe.get(), dto);
        List<RecipeSort> recipeSorts = recipeSortRepository.findByRecipeIdx(recipe.get().getIdx());
        for(int i = 0 ; i < recipeSorts.size(); i++){
            updateRecipeSortEntity(recipeSorts.get(i),dto.getRecipe_sort().get(i));
        }

        recipeRepository.save(recipe.get());
        recipeSortRepository.saveAll(recipeSorts);

        return entityToDto(recipe.get(), recipeSorts);
    }
}
