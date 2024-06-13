package com.example.refrigerate.domain.Member.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.refrigerate.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Recipe extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Column(length = 500, nullable = true)
    private String title;

    @Column(length = 500, nullable = true)
    private String summery;

    @Column(length = 2000, nullable = true)
    private String tip;

    @Column
    private Integer userCount;

    @Column
    private Integer time;

    @Column
    private Integer level;

    @Column(length = 2000, nullable = true)
    private String ingredient;

    @Column(length = 2000, nullable = true)
    private String seasoning;   

    @Column(length = 200, nullable = true)
    private String image;

    @Column(nullable = false)
    private Double score;

    @Column(length = 10)
    private String visible;
}
