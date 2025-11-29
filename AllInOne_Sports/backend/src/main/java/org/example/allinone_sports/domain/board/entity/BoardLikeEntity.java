package org.example.allinone_sports.domain.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "board_likes")
@Getter
@NoArgsConstructor
public class BoardLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    @Column(nullable = false)
    private Long userId;

    public BoardLikeEntity(BoardEntity board, Long userId) {
        this.board = board;
        this.userId = userId;
    }
}