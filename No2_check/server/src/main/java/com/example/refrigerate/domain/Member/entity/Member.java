package com.example.refrigerate.domain.Member.entity;

import com.example.refrigerate.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(length = 45, nullable = false, unique = true)
    private String userid;

    @Column(length = 45, nullable = false)
    private String pwd;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = true, unique = true)
    private String name;

    @Column(length = 200, nullable = true)
    private String image;
}
