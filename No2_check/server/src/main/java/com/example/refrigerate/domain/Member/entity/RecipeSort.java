package com.example.refrigerate.domain.Member.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RecipeSort {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Recipe recipe;

    @Column
    private Integer step;

    @Column(length = 1000, nullable = true)
    private String content;

    @Column(length = 300, nullable = true)
    private String image;
}
