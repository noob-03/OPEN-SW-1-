package org.example.allinone_sports.domain.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.board.dto.CommentRequestDTO;

@Entity
@Table(name = "comments")
@Getter
@NoArgsConstructor
public class CommentEntity extends TimeStampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    public CommentEntity(CommentRequestDTO requestDTO, BoardEntity board) {
        this.content = requestDTO.getContent();
        this.author = requestDTO.getAuthor();
        this.username = requestDTO.getUsername();
        this.board = board;
    }

    public void update(String content) {
        this.content = content;
    }
}