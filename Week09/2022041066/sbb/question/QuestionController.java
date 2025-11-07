package com.mysite.sbb.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;

    // 목록 화면: /question/list
    @GetMapping("/list")
    public String list(Model model) {
        List<Question> questionList = this.questionService.getList();
        model.addAttribute("questionList", questionList);
        return "question_list";  // templates/question_list.html
    }

    // 상세 화면: /question/detail/{id}
    @GetMapping("/detail/{id}")
    public String detail(Model model, @PathVariable("id") Integer id) {
        Question question = this.questionService.getQuestion(id);
        model.addAttribute("question", question);
        return "question_detail"; // templates/question_detail.html
    }

    // 질문 등록 화면: GET /question/create
    @GetMapping("/create")
    public String createForm() {
        return "question_form";  // templates/question_form.html
    }

    // 질문 등록 처리: POST /question/create
    @PostMapping("/create")
    public String create(@RequestParam String subject,
                         @RequestParam String content) {
        this.questionService.create(subject, content);
        // 등록 후 목록으로 이동
        return "redirect:/question/list";
    }
}

