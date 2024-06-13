package com.example.refrigerate.domain.Member.repository;

import com.example.refrigerate.domain.Member.entity.Member;

import jakarta.transaction.Transactional;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long>{
    Optional<Member> findByName(String nick);
    Optional<Member> findByUserid(String user_id);
    Optional<Member> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Member e SET e.image = :image WHERE e.id = :id")
    int updateImage(@Param("id") Long id, @Param("image") String image);
}
