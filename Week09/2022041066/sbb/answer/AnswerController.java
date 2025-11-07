package com.mysite.sbb.answer;

import com.mysite.sbb.question.Question;
import com.mysite.sbb.question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@RequestMapping("/answer")
public class AnswerController {

    private final AnswerService answerService;
    private final QuestionService questionService;

    // 답변 등록 처리: POST /answer/create/{id}
    @PostMapping("/create/{id}")
    public String create(@PathVariable("id") Integer id,
                         @RequestParam String content) {

        Question question = this.questionService.getQuestion(id);
        this.answerService.create(question, content);

        // 다시 해당 질문 상세 화면으로 이동
        return String.format("redirect:/question/detail/%d", id);
    }
}

