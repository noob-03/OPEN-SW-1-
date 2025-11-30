package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.match.dto.MatchDto; // MatchDTO 임포트
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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MatchController {

    private final MatchService matchService;

    @GetMapping
    public ResponseEntity<List<MatchDto>> getMatches(
            @RequestParam String league,
            @RequestParam int year,
            @RequestParam int month
    ) {
        List<MatchEntity> matches = matchService.getMonthlyMatches(league, year, month);

        // [수정] Entity List -> DTO List 변환
        List<MatchDto> matchDTOs = matches.stream()
                .map(MatchDto::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(matchDTOs);
    }
}