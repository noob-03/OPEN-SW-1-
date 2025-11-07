package com.mysite.sbb.answer;

import com.mysite.sbb.question.Question;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;           // 기본 키

    @Column(columnDefinition = "TEXT")
    private String content;       // 답변 내용

    private LocalDateTime createDate; // 작성 일시

    @ManyToOne
    private Question question;    // 어떤 질문에 달린 답변인지 (N:1)
}

