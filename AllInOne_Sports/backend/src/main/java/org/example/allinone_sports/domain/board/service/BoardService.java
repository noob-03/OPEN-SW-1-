
package org.example.allinone_sports.domain.board.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;
import org.example.allinone_sports.domain.board.dto.BoardResponseDTO;
import org.example.allinone_sports.domain.board.dto.SuccessResponseDTO;
import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.example.allinone_sports.domain.board.repository.BoardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    // 게시글 보기
    @Transactional(readOnly = true)
    public List<BoardResponseDTO> getPosts() { // BoardRepository에서 수정일시 기준 내림차순으로 가져옴
        return boardRepository.findAllByOrderByModifiedAtDesc().stream().map(BoardResponseDTO::new).toList();
    }

    // 게시글 작성
    @Transactional
    public BoardResponseDTO createPost(BoardRequestsDTO requestsDto) {
        BoardEntity board = new BoardEntity(requestsDto);
        boardRepository.save(board);
        return new BoardResponseDTO(board);
    }

    // 선택한 게시글 조회
    @Transactional
    public BoardResponseDTO getPost(Long id) {
        return boardRepository.findById(id).map(BoardResponseDTO::new).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
    }

    // 선택한 게시글 수정
    @Transactional
    public BoardResponseDTO updatePost(Long id, BoardRequestsDTO requestsDto) throws Exception {
        BoardEntity board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );

        board.update(requestsDto);
        return new BoardResponseDTO(board);
    }

    // 선택한 게시글 삭제
    @Transactional
    public SuccessResponseDTO deletePost(Long id) throws Exception {
        BoardEntity board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );

        boardRepository.deleteById(id);
        return new SuccessResponseDTO(true);
    }
}
