package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.match.dto.MatchDto;
import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.example.allinone_sports.domain.match.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    // ⭐ 월별 경기 조회 API
    @GetMapping
    public ResponseEntity<List<MatchDto>> getMatches(
            @RequestParam String league,
            @RequestParam int year,
            @RequestParam int month
    ) {
        List<MatchEntity> matches = matchService.getMonthlyMatches(league, year, month);
        List<MatchDto> matchDTOs = matches.stream()
                .map(MatchDto::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(matchDTOs);
    }



    // ⭐ 팀별 경기 조회 API
    @GetMapping("/by-team/{teamId}")
    public ResponseEntity<List<MatchDto>> getTeamMatches(@PathVariable Long teamId) {
        List<MatchEntity> matches = matchService.getTeamMatches(teamId);

        List<MatchDto> matchDTOs = matches.stream()
                .map(MatchDto::fromEntity) // ⭐ 추가됨
                .collect(Collectors.toList());

        return ResponseEntity.ok(matchDTOs);
    }
}
