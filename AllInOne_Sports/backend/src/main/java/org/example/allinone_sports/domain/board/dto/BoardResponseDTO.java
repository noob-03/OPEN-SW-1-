package org.example.allinone_sports.domain.board.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.board.entity.BoardEntity;

@Getter
@NoArgsConstructor
public class BoardResponseDTO {
    private Long id;
    private String title;
    private String contents;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String postType;
    private Long userId;
    private Long price;
    private String sportsType;
    private String gameDate;
    private String seat;
    private Long viewCount;
    private String status;

    public BoardResponseDTO(BoardEntity entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.contents = entity.getContents();
        this.author = entity.getAuthor();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getModifiedAt();
        this.postType = entity.getPostType();
        this.userId = entity.getUserId();
        this.price = entity.getPrice();
        this.sportsType = entity.getSportsType();
        this.gameDate = entity.getGameDate();
        this.seat = entity.getSeat();
        this.viewCount = entity.getViewCount();
        this.status = entity.getStatus();
    }
}