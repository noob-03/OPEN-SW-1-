package org.example.allinone_sports.domain.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestsDTO {
    private String title;
    private String contents;
    private String author;
    private String postType;
    private Long userId;
    private Long price;
    private String sportsType;
    private String gameDate;
    private String teamId;
    private Long viewCount;
    private String status;
}