package org.example.allinone_sports.domain.player.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.repository.PlayerRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    /**
     * 특정 팀 선수 전체 조회
     */
    public List<PlayerEntity> getPlayersByTeam(Long teamId) {
        return playerRepository.findByTeamId(teamId);
    }

    /**
     * 특정 팀 선수 전체 삭제 (크롤링 재갱신을 위해)
     */
    @Transactional
    public void deletePlayersByTeam(Long teamId) {
        playerRepository.deleteByTeamId(teamId);
    }

    /**
     * 크롤링으로 받은 선수 목록을 팀에 저장
     */
    @Transactional
    public void savePlayers(Long teamId, List<PlayerEntity> players) {

        // 팀 조회
        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("해당 팀이 존재하지 않습니다. teamId=" + teamId));

        // 기존 선수 삭제
        playerRepository.deleteByTeamId(teamId);

        // 선수 저장
        for (PlayerEntity p : players) {
            p.setTeam(team);
            playerRepository.save(p);
        }
    }
}
