package com.example.refrigerate.domain.Member.repository;

import com.example.refrigerate.domain.Member.entity.Recipe;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<Recipe, Long>{
    @Query("SELECT e FROM Recipe e WHERE e.title LIKE %:keyword% OR e.ingredient LIKE %:keyword% OR e.seasoning LIKE %:keyword% OR e.tip LIKE %:keyword%")
    List<Recipe> findBySearch(@Param("keyword") String keyword);

    List<Recipe> findByMemberIdx(Long member_id);

    @Transactional
    @Modifying
    @Query("UPDATE Recipe e SET e.score = :score WHERE e.id = :id")
    int updateScore(@Param("id") Long id, @Param("score") double score);
}