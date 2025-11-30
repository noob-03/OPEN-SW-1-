package org.example.allinone_sports.domain.match.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.allinone_sports.domain.team.entity.TeamEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "match_schedule")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String league; // KBO, K리그1, K리그2

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_team_id")
    private TeamEntity homeTeam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "away_team_id")
    private TeamEntity awayTeam;

    private LocalDateTime matchDate; // 경기 날짜 및 시간
    private String stadium;

    @Enumerated(EnumType.STRING)
    private MatchStatus status; // SCHEDULED(예정), FINISHED(종료), CANCELLED(취소)

    private Integer homeScore;
    private Integer awayScore;

    public enum MatchStatus {
        SCHEDULED, FINISHED, CANCELLED
    }
}