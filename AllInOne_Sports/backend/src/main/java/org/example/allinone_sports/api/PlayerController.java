package org.example.allinone_sports.api;

import org.example.allinone_sports.domain.player.dto.PlayerDto;
import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/by-team/{teamId}")
    public ResponseEntity<?> getPlayersByTeam(@PathVariable("teamId") Long teamId) {
        System.out.println("🎯 Player API 호출! teamId=" + teamId);

        try {
            List<PlayerEntity> players = playerService.getPlayersByTeam(teamId);
            System.out.println("🎯 조회된 플레이어 수: " + players.size());

            List<PlayerDto> dtoList = players.stream()
                    .map(p -> PlayerDto.builder()
                            .playerId(p.getPlayerId())
                            .playerName(p.getPlayerName())
                            .playerNumber(p.getPlayerNumber())
                            .playerUrl(p.getPlayerUrl())
                            .teamId(p.getTeam().getTeamId())
                            .build())
                    .toList();

            return ResponseEntity.ok(dtoList);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류 발생: " + e.getMessage());
        }
    }
}




