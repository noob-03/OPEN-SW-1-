package org.example.allinone_sports.domain.board.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.allinone_sports.domain.board.entity.BoardEntity;

@Getter
@Setter
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
    private String teamId;
    private Long viewCount;
    private Long likeCount;
    private String status;
    private List<CommentResponseDTO> comments;
    private boolean likedByCurrentUser;

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
        this.teamId = entity.getTeamId();
        this.viewCount = entity.getViewCount();
        this.likeCount = entity.getLikeCount();
        this.status = entity.getStatus();
        this.comments = entity.getComments().stream()
                .map(CommentResponseDTO::new)
                .collect(Collectors.toList());
        this.likedByCurrentUser = false;
    }
}