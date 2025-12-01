package org.example.allinone_sports.domain.board.dto;

import lombok.Getter;

@Getter
public class SuccessResponseDTO {
    private boolean success;

    public SuccessResponseDTO(boolean success) {
        this.success = success;
    }
}