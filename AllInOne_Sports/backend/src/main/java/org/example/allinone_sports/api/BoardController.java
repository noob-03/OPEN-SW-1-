package org.example.allinone_sports.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.example.allinone_sports.domain.board.service.BoardService;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board")
    public List<BoardEntity> getAllBoards() {
        return boardService.findAllBoard();
    }
}
