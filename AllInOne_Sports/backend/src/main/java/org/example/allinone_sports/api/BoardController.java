package org.example.allinone_sports.api;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;
import org.example.allinone_sports.domain.board.dto.BoardResponseDTO;
import org.example.allinone_sports.domain.board.dto.SuccessResponseDTO;
import org.example.allinone_sports.domain.board.service.BoardService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 전체 목록 조회
    @GetMapping("/api/posts")
    public List<BoardResponseDTO> getPosts() {
        return boardService.getPosts();
    }

    // 게시글 작성
    @PostMapping("/api/post")
    public BoardResponseDTO createPost(@RequestBody BoardRequestsDTO requestsDto) {
        return boardService.createPost(requestsDto);
    }

    // 선택한 게시글 조회
    @GetMapping("/api/post/{id}")
    public BoardResponseDTO getPost(@PathVariable Long id) {
        return boardService.getPost(id);
    }

    // 선택한 게시글 수정
    @PutMapping("/api/post/{id}")
    public BoardResponseDTO updatePost(@PathVariable Long id, @RequestBody BoardRequestsDTO requestsDto) throws Exception {
        return boardService.updatePost(id, requestsDto);
    }

    @DeleteMapping("/api/post/{id}")
    public SuccessResponseDTO deletePost(@PathVariable Long id) throws Exception {
        return boardService.deletePost(id);
    }
}
