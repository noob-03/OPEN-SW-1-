package org.example.allinone_sports.api;

import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/{teamId}")
    public List<PlayerEntity> getPlayers(@PathVariable Long teamId) {
        return playerService.getPlayersByTeam(teamId);
    }
}


