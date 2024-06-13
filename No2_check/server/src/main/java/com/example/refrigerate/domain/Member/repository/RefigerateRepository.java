package com.example.refrigerate.domain.Member.repository;

import com.example.refrigerate.domain.Member.entity.Refrigerate;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefigerateRepository extends JpaRepository<Refrigerate, Long>{
    Optional<Refrigerate> findByMemberIdxAndRecipeIdx(Long member, Long recipe);
    List<Refrigerate> findByMemberIdx(Long member_id);
}
