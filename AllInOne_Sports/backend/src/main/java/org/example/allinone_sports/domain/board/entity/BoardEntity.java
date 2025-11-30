package org.example.allinone_sports.domain.board.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.board.dto.BoardRequestsDTO;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String contents;

    @Column(name = "author")
    private String author;

    @Column(name = "post_type", nullable = false)
    private String postType; // FREE, TICKET, COMPANION

    @Column(name = "username")
    private String username;

    @Column(name = "price")
    private Long price;

    @Column(name = "sports_type")
    private String sportsType; // baseball, soccer

    @Column(name = "game_date")
    private String gameDate;

    @Column(name = "team_id")
    private String teamId;

    @Column(name = "view_count")
    private Long viewCount = 0L;

    @Column(name = "like_count")
    private Long likeCount = 0L;

    @Column(name = "status")
    private String status; // ONGOING, COMPLETED

    // 댓글 관계 (게시글 삭제 시 댓글 자동 삭제)
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt DESC")
    private List<CommentEntity> comments = new ArrayList<>();

    public BoardEntity(BoardRequestsDTO requestsDto) {
        this.title = requestsDto.getTitle();
        this.contents = requestsDto.getContents();
        this.author = requestsDto.getAuthor();
        this.postType = requestsDto.getPostType();
        this.username = requestsDto.getUsername();
        this.price = requestsDto.getPrice();
        this.sportsType = requestsDto.getSportsType();
        this.gameDate = requestsDto.getGameDate();
        this.teamId = requestsDto.getTeamId();
        this.viewCount = 0L;
        this.likeCount = 0L;
        this.status = "ONGOING";
    }

    public void update(BoardRequestsDTO requestsDto) {
        this.title = requestsDto.getTitle();
        this.contents = requestsDto.getContents();
        this.postType = requestsDto.getPostType();
        this.price = requestsDto.getPrice();
        this.gameDate = requestsDto.getGameDate();
        this.teamId = requestsDto.getTeamId();

        if (requestsDto.getStatus() != null) {
            this.status = requestsDto.getStatus();
        }
    }

    public void incrementViewCount() {
        this.viewCount++;
    }

    public void updateLikeCount(Long count) {
        this.likeCount = count;
    }
}