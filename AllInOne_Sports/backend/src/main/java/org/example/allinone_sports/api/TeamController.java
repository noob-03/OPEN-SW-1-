package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.team.dto.TeamDto;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.service.TeamService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    // ✔ 전체 팀 목록 조회 (DTO로 반환)
    @GetMapping
    public List<TeamDto> getAllTeams() {
        return teamService.getAllTeams()
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ✔ 스포츠별 팀 조회
    @GetMapping("/sport/{sportId}")
    public List<TeamDto> getTeamsBySport(@PathVariable Integer sportId) {
        return teamService.getTeamsBySport(sportId)
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ✔ teamId로 상세 조회
    @GetMapping("/{teamId}")
    public TeamDto getTeam(@PathVariable Long teamId) {
        return TeamDto.fromEntity(teamService.getTeam(teamId));
    }

    // ✔ teamId로 로고 조회 (문자열은 그대로 반환)
    @GetMapping("/{teamId}/logo")
    public String getTeamLogo(@PathVariable Long teamId) {
        return teamService.getTeamLogo(teamId);
    }

    // ✔ 이름으로 상세 조회
    @GetMapping("/name/{teamName}")
    public TeamDto getTeamByName(@PathVariable String teamName) {
        return TeamDto.fromEntity(teamService.getTeamByName(teamName));
    }

    // ✔ 이름으로 로고 조회
    @GetMapping("/name/{teamName}/logo")
    public String getTeamLogoByName(@PathVariable String teamName) {
        return teamService.getTeamLogoByName(teamName);
    }

    @GetMapping("/name/{teamName}/sns")
    public String getTeamSns(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getSnsLink();
    }

    @GetMapping("/name/{teamName}/teamlink")
    public String getTeamHomepage(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTeamLink();
    }

    @GetMapping("/name/{teamName}/ticketlink")
    public String getTeamTicketLink(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTicketLink();
    }

    @GetMapping("/name/{teamName}/teamstadium")
    public String getTeamStadium(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTeamStadium();
    }

    @GetMapping("/kleague/records")
    public List<TeamDto> getKLeagueRecords() {
        return teamService.getTeamsBySport(2)
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }
}
