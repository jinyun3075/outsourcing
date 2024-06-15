package com.example.refrigerate.domain.Member.repository;

import com.example.refrigerate.domain.Member.entity.RecipeSort;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RecipeSortRepository extends JpaRepository<RecipeSort, Long>{
    List<RecipeSort> findByRecipeIdx(Long idx);
}
