package org.example.allinone_sports.domain.match.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.example.allinone_sports.domain.team.dto.TeamDto;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchDto {
    private Long id;
    private String league;
    private TeamDto homeTeam; // TeamEntity 대신 TeamDTO 사용
    private TeamDto awayTeam; // TeamEntity 대신 TeamDTO 사용
    private LocalDateTime matchDate;
    private String stadium;
    private String status; // Enum을 String으로 변환
    private Integer homeScore;
    private Integer awayScore;

// MatchDto.java 내부의 fromEntity 메서드 수정

    public static MatchDto fromEntity(MatchEntity match) {
        return MatchDto.builder()
                .id(match.getId())
                .league(match.getLeague())
                // ⭐ 팀 정보가 없을 경우 null 처리 (안전장치 추가)
                .homeTeam(match.getHomeTeam() != null ? TeamDto.fromEntity(match.getHomeTeam()) : null)
                .awayTeam(match.getAwayTeam() != null ? TeamDto.fromEntity(match.getAwayTeam()) : null)

                .matchDate(match.getMatchDate())
                .stadium(match.getStadium())

                // ⭐ status가 null일 경우 에러 방지 (핵심 원인 해결)
                .status(match.getStatus() != null ? match.getStatus().name() : null)

                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build();
    }
}