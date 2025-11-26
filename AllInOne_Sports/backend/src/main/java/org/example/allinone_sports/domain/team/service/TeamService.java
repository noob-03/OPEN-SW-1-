package org.example.allinone_sports.domain.team.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    // 전체 팀 조회
    public List<TeamEntity> findAllTeams() {
        return teamRepository.findAll();
    }

    // 특정 teamid 로 팀 조회하는 기능
    public TeamEntity findById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Team not found: " + id));
    }

    public List<TeamEntity> findBySportId(Long sportId) {
        return teamRepository.findBySport_Sportid(sportId);
    }

}
