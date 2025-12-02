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
}