package com.mysite.sbb.question;

import com.mysite.sbb.answer.Answer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;           // 기본 키

    @Column(length = 200)
    private String subject;       // 제목

    @Column(columnDefinition = "TEXT")
    private String content;       // 내용(긴 글)

    private LocalDateTime createDate; // 작성 일시

    // 하나의 질문에 여러 답변(1:N)
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Answer> answerList;
}

