package com.mysite.sbb.question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    // 기본 CRUD는 JpaRepository에서 제공
}

