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
    private String username;
    private Long price;
    private String sportsType;
    private String gameDate;
    private String teamId;
    private String status;
}