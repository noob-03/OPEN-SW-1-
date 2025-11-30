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

    public static MatchDto fromEntity(MatchEntity match) {
        return MatchDto.builder()
                .id(match.getId())
                .league(match.getLeague())
                .homeTeam(TeamDto.fromEntity(match.getHomeTeam())) // 팀 정보도 DTO로 변환
                .awayTeam(TeamDto.fromEntity(match.getAwayTeam())) // 팀 정보도 DTO로 변환
                .matchDate(match.getMatchDate())
                .stadium(match.getStadium())
                .status(match.getStatus().name())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build();
    }
}