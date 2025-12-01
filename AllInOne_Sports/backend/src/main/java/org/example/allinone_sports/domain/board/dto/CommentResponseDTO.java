package org.example.allinone_sports.domain.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.board.entity.CommentEntity;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentResponseDTO {
    private Long id;
    private String content;
    private String author;
    private String username;
    private LocalDateTime createdAt;

    public CommentResponseDTO(CommentEntity entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.username = entity.getUsername();
        this.createdAt = entity.getCreatedAt();
    }
}