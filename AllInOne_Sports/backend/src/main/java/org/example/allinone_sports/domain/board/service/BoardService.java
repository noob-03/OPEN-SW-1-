package org.example.allinone_sports.domain.board.service;

import java.util.List;
import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.example.allinone_sports.domain.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public List<BoardEntity> findAllBoard() {
        return boardRepository.findAll();
    }
}
