package org.example.allinone_sports.api;

import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    // 전체 팀 목록
    @GetMapping
    public List<TeamEntity> getAllTeams() {
        return teamService.getAllTeams();
    }

    // 스포츠별 팀 조회
    @GetMapping("/sport/{sportId}")
    public List<TeamEntity> getTeamsBySport(@PathVariable Integer sportId) {
        return teamService.getTeamsBySport(sportId);
    }

    // teamId 로 상세 조회
    @GetMapping("/{teamId}")
    public TeamEntity getTeam(@PathVariable Long teamId) {
        return teamService.getTeam(teamId);
    }

    // teamId 로 로고 조회
    @GetMapping("/{teamId}/logo")
    public String getLogo(@PathVariable Long teamId) {
        return teamService.getTeamLogo(teamId);
    }

    // 이름으로 팀 상세 조회
    @GetMapping("/name/{teamName}")
    public TeamEntity getTeamByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName);
    }

    // 이름으로 로고 조회
    @GetMapping("/name/{teamName}/logo")
    public String getLogoByName(@PathVariable String teamName) {
        return teamService.getTeamLogoByName(teamName);
    }

    @GetMapping("/name/{teamName}/sns")
    public String getTeamSnsByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getSnsLink();
    }

    @GetMapping("/name/{teamName}/teamlink")
    public String getTeamLinkByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTeamLink();
    }

    @GetMapping("/name/{teamName}/ticketlink")
    public String getTicketLinkByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTicketLink();
    }
}
