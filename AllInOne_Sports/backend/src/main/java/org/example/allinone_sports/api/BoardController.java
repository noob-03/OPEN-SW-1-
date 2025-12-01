package org.example.allinone_sports.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;
import org.example.allinone_sports.domain.board.dto.BoardResponseDTO;
import org.example.allinone_sports.domain.board.dto.CommentRequestDTO;
import org.example.allinone_sports.domain.board.dto.CommentResponseDTO;
import org.example.allinone_sports.domain.board.dto.SuccessResponseDTO;
import org.example.allinone_sports.domain.board.service.BoardService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/api/posts")
    public List<BoardResponseDTO> getPosts(
            @RequestParam(required = false, defaultValue = "baseball") String sportsType,
            @RequestParam(required = false, defaultValue = "ALL") String postType) {
        return boardService.getPosts(sportsType, postType);
    }

    @PostMapping("/api/post")
    public BoardResponseDTO createPost(@RequestBody BoardRequestsDTO requestsDto) {
        return boardService.createPost(requestsDto);
    }

    @GetMapping("/api/post/{id}")
    public BoardResponseDTO getPost(@PathVariable Long id) {
        return boardService.getPost(id);
    }

    @PutMapping("/api/post/{id}")
    public BoardResponseDTO updatePost(@PathVariable Long id, @RequestBody BoardRequestsDTO requestsDto) throws Exception {
        return boardService.updatePost(id, requestsDto);
    }

    @DeleteMapping("/api/post/{id}")
    public SuccessResponseDTO deletePost(@PathVariable Long id) throws Exception {
        return boardService.deletePost(id);
    }

    @PostMapping("/api/post/{id}/like")
    public void toggleLike(@PathVariable Long id) throws Exception {
        boardService.toggleLike(id);
    }

    @PostMapping("/api/post/{id}/comment")
    public CommentResponseDTO createComment(
            @PathVariable Long id,
            @RequestBody CommentRequestDTO requestDto
    ) {
        System.out.println("pass1");
        return boardService.createComment(id, requestDto);
    }

    @DeleteMapping("/api/comment/{commentId}")
    public SuccessResponseDTO deleteComment(
            @PathVariable Long commentId
    ) {
        return boardService.deleteComment(commentId);
    }
}