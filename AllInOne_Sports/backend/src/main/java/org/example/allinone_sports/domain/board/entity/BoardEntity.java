package org.example.allinone_sports.domain.board.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;

@Entity
@Table(name = "board")
@Getter
@NoArgsConstructor
public class BoardEntity extends TimeStampedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String contents;

    @Column(name = "author")
    private String author;

    @Column(name = "post_type", nullable = false)
    private String postType;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "price")
    private Long price;

    @Column(name = "sports_type")
    private String sportsType;

    @Column(name = "game_date")
    private String gameDate;

    @Column(name = "seat")
    private String seat;

    @Column(name = "view_count")
    private Long viewCount;

    @Column(name = "status")
    private String status;

    public BoardEntity(BoardRequestsDTO requestsDto) {
        this.title = requestsDto.getTitle();
        this.contents = requestsDto.getContents();
        this.author = requestsDto.getAuthor();
        this.postType = requestsDto.getPostType();
        this.userId = requestsDto.getUserId();
        this.price = requestsDto.getPrice();
        this.sportsType = requestsDto.getSportsType();
        this.gameDate = requestsDto.getGameDate();
        this.seat = requestsDto.getSeat();
        this.viewCount = requestsDto.getViewCount();
        this.status = requestsDto.getStatus();
    }

    public void update(BoardRequestsDTO requestsDto) {
        this.title = requestsDto.getTitle();
        this.contents = requestsDto.getContents();
        this.author = requestsDto.getAuthor();
        this.postType = requestsDto.getPostType();
        this.userId = requestsDto.getUserId();
        this.price = requestsDto.getPrice();
        this.sportsType = requestsDto.getSportsType();
        this.gameDate = requestsDto.getGameDate();
        this.seat = requestsDto.getSeat();
        this.viewCount = requestsDto.getViewCount();
        this.status = requestsDto.getStatus();
    }
}