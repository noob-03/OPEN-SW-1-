package org.example.allinone_sports.api;

import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teams") // SecurityConfig와 프론트엔드 요청에 맞춰 경로 수정
public class TeamController {

    private final TeamService teamService;

    // 통합된 팀 목록 조회 (전체 조회 + 파라미터 필터링)
    // GET /api/teams?sport=soccer
    @GetMapping
    public List<TeamEntity> getTeams(@RequestParam(value = "sport", required = false) String sport) {

        if ("baseball".equals(sport)) {
            return teamService.getTeamsBySport(1); // 1 = KBO
        } else if ("soccer".equals(sport)) {
            return teamService.getTeamsBySport(2); // 2 = KLeague
        } else {
            // 파라미터가 없으면 전체 반환
            return teamService.getAllTeams();
        }
    }

    // 스포츠 ID로 직접 조회 (기존 유지)
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

    // 이름으로 SNS 링크 조회
    @GetMapping("/name/{teamName}/sns")
    public String getTeamSnsByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getSnsLink();
    }

    // 이름으로 팀 홈페이지 링크 조회
    @GetMapping("/name/{teamName}/teamlink")
    public String getTeamLinkByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTeamLink();
    }

    // 이름으로 티켓 링크 조회
    @GetMapping("/name/{teamName}/ticketlink")
    public String getTicketLinkByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName).getTicketLink();
    }
}