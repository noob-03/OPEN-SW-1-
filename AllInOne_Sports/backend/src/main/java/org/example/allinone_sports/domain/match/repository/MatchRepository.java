package org.example.allinone_sports.domain.match.repository;

import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<MatchEntity, Long> {

    // 특정 리그의 특정 기간(월) 경기 조회
    // SELECT * FROM match_schedule WHERE league = ? AND match_date BETWEEN ? AND ? ORDER BY match_date
    List<MatchEntity> findByLeagueAndMatchDateBetweenOrderByMatchDateAsc(
            String league,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
    // 홈팀 또는 원정팀이 특정 ID인 경기 조회 (날짜순 정렬)
    List<MatchEntity> findByHomeTeam_TeamIdOrAwayTeam_TeamIdOrderByMatchDateAsc(Long homeTeamId, Long awayTeamId);
}