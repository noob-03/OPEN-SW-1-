package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.team.dto.TeamDto;
import org.example.allinone_sports.domain.team.service.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    // 1. 전체 팀 목록 조회 (TeamEntity -> TeamDto 변환 후 반환)
    @GetMapping
    public List<TeamDto> getAllTeams() {
        // teamService.getAllTeams()이 List<TeamEntity>를 반환한다고 가정
        return teamService.getAllTeams()
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 2. 스포츠별 팀 조회 (TeamEntity -> TeamDto 변환 후 반환)
    @GetMapping("/sport/{sportId}")
    public List<TeamDto> getTeamsBySport(@PathVariable Integer sportId) {
        // teamService.getTeamsBySport(sportId)가 List<TeamEntity>를 반환한다고 가정
        return teamService.getTeamsBySport(sportId)
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 3. teamId로 상세 조회 (TeamDto 전체를 반환하는 핵심 엔드포인트)
     * - 프론트엔드의 TeamDetailPage.jsx에서 이 엔드포인트를 호출하여 팀의 모든 정보 (순위, 전적, 링크, 구장 등)를 가져갑니다.
     */
    @GetMapping("/{teamId}")
    public TeamDto getTeam(@PathVariable Long teamId) {
        // teamService.getTeam(teamId)가 TeamEntity를 반환한다고 가정하고 DTO로 변환하여 전송
        // (TeamService에 정의된 getTeamDetail 메서드를 사용할 수도 있습니다.)
        return TeamDto.fromEntity(teamService.getTeam(teamId));
    }

    // 4. KLeague 기록 조회 (sportId=2)
    @GetMapping("/kleague/records")
    public List<TeamDto> getKLeagueRecords() {
        return teamService.getTeamsBySport(2)
                .stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    // -------------------------------------------------------------------------
    // 아래 엔드포인트들은 비효율적/중복으로 판단되어 제거했습니다.
    // 이유: @GetMapping("/{teamId}")가 이미 TeamDto 전체(로고, SNS, 구장 등 모든 필드 포함)를
    // 프론트엔드에 제공하고 있기 때문에, 단일 필드를 다시 조회할 필요가 없습니다.
    // -------------------------------------------------------------------------
    /*
    @GetMapping("/{teamId}/logo")
    public String getTeamLogo(@PathVariable Long teamId) { return teamService.getTeamLogo(teamId); }

    @GetMapping("/name/{teamName}")
    public TeamDto getTeamByName(@PathVariable String teamName) { ... }

    @GetMapping("/name/{teamName}/sns")
    public String getTeamSns(@PathVariable String teamName) { ... }

    // ... 등 단일 필드 조회 엔드포인트들
    */
}