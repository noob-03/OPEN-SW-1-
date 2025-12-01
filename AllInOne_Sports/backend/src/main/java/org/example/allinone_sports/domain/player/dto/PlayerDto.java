package org.example.allinone_sports.domain.player.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {

    private Long playerId;
    private String playerName;
    private Integer playerNumber;
    private String playerUrl;
    private Long teamId;
}
