package org.example.allinone_sports.domain.board.service;

import java.util.List;
import java.util.stream.Collectors;
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

    // 게시글 보기 (필터링 적용)
    @Transactional(readOnly = true)
    public List<BoardResponseDTO> getPosts(String sportsType, String postType) {
        List<BoardEntity> boards;

        // postType이 'ALL'이거나 'free'(통합)인 경우 해당 종목 전체 조회
        // (주의: 기획 의도에 따라 'free'가 자유게시판만 의미한다면 아래 else 로직을 타야 함)
        if ("ALL".equalsIgnoreCase(postType)) {
            boards = boardRepository.findAllBySportsTypeOrderByModifiedAtDesc(sportsType);
        } else {
            // 특정 타입(TICKET, COMPANION 등)만 조회
            boards = boardRepository.findAllBySportsTypeAndPostTypeOrderByModifiedAtDesc(sportsType, postType);
        }

        return boards.stream().map(BoardResponseDTO::new).collect(Collectors.toList());
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