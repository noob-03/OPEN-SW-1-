package org.example.allinone_sports.domain.team.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.crawler.KLeagueTeamCrawler;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;


import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository repo;
    private final KLeagueTeamCrawler crawler;

    public List<TeamEntity> getAllTeams() {
        return repo.findAll();
    }

    public TeamEntity getTeam(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found: " + id));
    }

    public TeamEntity getTeamByName(String name) {
        return repo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Team not found: " + name));
    }

    public String getTeamLogo(Long id) {
        return getTeam(id).getLogoUrl();
    }

    public String getTeamLogoByName(String name) {
        return getTeamByName(name).getLogoUrl();
    }

    public List<TeamEntity> getTeamsBySport(int sportId) {
        return repo.findBySportId(sportId);
    }

}
