package com.example.refrigerate.domain.Member.repository;

import com.example.refrigerate.domain.Member.entity.Comments;
import com.example.refrigerate.domain.Member.entity.Recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments, Long>{
    List<Comments> findByRecipe(Recipe recipe);
}
