package org.example.allinone_sports.domain.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRequestDTO {
    private String content;
    private String author;
    private String username;
}