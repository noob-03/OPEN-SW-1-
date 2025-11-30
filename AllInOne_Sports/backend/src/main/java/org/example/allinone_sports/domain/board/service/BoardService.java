package org.example.allinone_sports.domain.board.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;
import org.example.allinone_sports.domain.board.dto.BoardResponseDTO;
import org.example.allinone_sports.domain.board.dto.CommentRequestDTO;
import org.example.allinone_sports.domain.board.dto.CommentResponseDTO;
import org.example.allinone_sports.domain.board.dto.SuccessResponseDTO;
import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.example.allinone_sports.domain.board.entity.CommentEntity;
import org.example.allinone_sports.domain.board.repository.BoardRepository;
import org.example.allinone_sports.domain.board.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    // 게시글 보기 (필터링 적용)
    @Transactional(readOnly = true)
    public List<BoardResponseDTO> getPosts(String sportsType, String postType) {
        List<BoardEntity> boards;

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
        BoardEntity board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );

        // 조회수 증가
        board.incrementViewCount();

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

    // 좋아요
    @Transactional
    public void toggleLike(Long id) throws Exception {
        BoardEntity board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );

        board.updateLikeCount(board.getLikeCount() + 1);
    }

    // 댓글 작성
    @Transactional
    public CommentResponseDTO createComment(Long boardId, CommentRequestDTO requestDto) {
        System.out.println("pass2");
        BoardEntity board = boardRepository.findById(boardId).orElseThrow(
                () -> new IllegalArgumentException("게시글을 찾을 수 없습니다.")
        );
        // username 전달
        System.out.println("pass3");
        CommentEntity comment = new CommentEntity(requestDto, board);
        commentRepository.save(comment);
        System.out.println("pass4");
        return new CommentResponseDTO(comment);
    }

    // 댓글 삭제
    @Transactional
    public SuccessResponseDTO deleteComment(Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("댓글을 찾을 수 없습니다.")
        );

        commentRepository.delete(comment);
        return new SuccessResponseDTO(true);
    }
}