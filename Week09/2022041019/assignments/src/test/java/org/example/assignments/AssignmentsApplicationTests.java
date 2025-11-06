package org.example.assignments;

import static org.hamcrest.MatcherAssert.assertThat;

import org.example.assignments.question.QuestionRepository;
import org.example.assignments.question.Question;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AssignmentsApplicationTests {

    @Autowired
    private QuestionRepository questionRepository;
    @Test
    void contextLoads() {
    }
    @Test
    void testJpa() {
        Question q = this.questionRepository.findBySubject("sbb가 무엇인가요?");
        asserEquals(1,q.getId());
    }

}
