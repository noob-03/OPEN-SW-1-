package org.example.allinone_sports.domain.player.service;

import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.repository.PlayerRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public List<PlayerEntity> getPlayersByTeam(Long teamId) {
        return playerRepository.findByTeam_TeamId(teamId);
    }

    @Transactional
    public void savePlayers(Long teamId, List<PlayerEntity> players) {

        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("팀 없음: " + teamId));

        // 팀 기존 선수 삭제 후 새로운 선수 저장 (항상 최신 유지)
        playerRepository.deleteByTeam_TeamId(teamId);

        for (PlayerEntity p : players) {
            p.setTeam(team);  // fk 연결
            playerRepository.save(p);
        }
    }
}
