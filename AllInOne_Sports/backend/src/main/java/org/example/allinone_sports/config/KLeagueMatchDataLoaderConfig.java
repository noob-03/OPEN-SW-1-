package org.example.allinone_sports.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.example.allinone_sports.domain.match.repository.MatchRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class KLeagueMatchDataLoaderConfig implements CommandLineRunner {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // ==============================
        // 1. 팀 불러오기 (sportId = 2)
        // ==============================
        List<TeamEntity> teams = teamRepository.findBySportId(2);

        // Map 형태로 빠르게 찾기 위해 이름 → Entity 변환
        var teamMap = teams.stream()
                .collect(java.util.stream.Collectors.toMap(
                        TeamEntity::getName, t -> t
                ));


        // ==============================
        // 2. 직접 경기 데이터 입력 템플릿
        // ==============================

        List<MatchEntity> matches = List.of(

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 2, 15, 13, 00))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 2, 15, 15, 30))
                        .stadium("제주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 2, 15, 16, 30))
                        .stadium("광주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 2, 16, 14, 00))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 2, 16, 16, 30))
                        .stadium("전주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 2, 16, 16, 30))
                        .stadium("대구iM뱅크PARK")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 2, 22, 14, 00))
                        .stadium("제주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),
                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 2, 22, 16, 30))
                        .stadium("상암 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),
                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 2, 22, 16, 30))
                        .stadium("대구iM뱅크PARK")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 2, 23, 14, 00))
                        .stadium("대전 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 2, 23, 16, 30))
                        .stadium("전주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 2, 23, 16, 30))
                        .stadium("춘천 송암 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 3, 1, 14, 00))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 1, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 3, 1, 16, 30))
                        .stadium("광주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 2, 14, 00))
                        .stadium("대전 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 3, 2, 16, 30))
                        .stadium("춘천 송암 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 3, 3, 14, 00))
                        .stadium("상암 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 3, 8, 14, 00))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 3, 8, 16, 30))
                        .stadium("대구iM뱅크PARK")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 3, 8, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 3, 9, 14, 00))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 9, 16, 30))
                        .stadium("전주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 3, 15, 14, 00))
                        .stadium("제주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 3, 15, 16, 30))
                        .stadium("춘천 송암 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 3, 15, 16, 30))
                        .stadium("대구iM뱅크PARK")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 3, 16, 14, 00))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 16, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 3, 16, 16, 30))
                        .stadium("전주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 3, 22, 16, 30))
                        .stadium("광주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 29, 14, 00))
                        .stadium("상암 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 3, 29, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 29, 16, 30))
                        .stadium("대전 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 30, 14, 00))
                        .stadium("제주 월드컵 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 3, 30, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 3, 30, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 4, 1, 19, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 4, 5, 14, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 5, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 4, 5, 16, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 4, 5, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 6, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 4, 6, 16, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 9, 19, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 4, 12, 14, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 4, 12, 16, 30))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 4, 12, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 13, 14, 0))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 4, 13, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 4, 13, 16, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 19, 14, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 4, 19, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 19, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 19, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 4, 20, 16, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 20, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 4, 23, 19, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 4, 26, 14, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 4, 26, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 4, 27, 14, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 4, 27, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 4, 27, 16, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 2, 19, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 5, 2, 19, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 5, 3, 16, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 5, 3, 16, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 5, 3, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 3, 19, 0))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 5, 5, 16, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 5, 5, 16, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 5, 6, 14, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 6, 16, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 5, 6, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 6, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 10, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 5, 10, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 10, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 5, 11, 16, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 5, 11, 19, 0))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(4)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 5, 11, 19, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 5, 17, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 5, 17, 19, 0))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 5, 17, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 18, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 5, 18, 16, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 5, 18, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 5, 23, 19, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 5, 23, 19, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 24, 16, 30))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 5, 24, 19, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 24, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 5, 25, 16, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 5, 27, 19, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 5, 27, 19, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 5, 27, 19, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(4)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 5, 28, 19, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 5, 28, 19, 30))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 5, 28, 19, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 5, 31, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 5, 31, 19, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 5, 31, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 1, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 1, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 1, 19, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 6, 13, 19, 30))
                        .stadium("춘천 송암 스포츠타운")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 6, 13, 19, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 6, 14, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 6, 14, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 14, 19, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 17, 19, 30))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 17, 19, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 6, 17, 19, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 18, 19, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 6, 18, 19, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 21, 19, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 6, 21, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 6, 21, 19, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 6, 22, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 6, 22, 19, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 6, 27, 19, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 6, 27, 19, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 28, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 6, 28, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 6, 29, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(4)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 7, 12, 19, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 7, 18, 19, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 7, 18, 19, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 7, 19, 19, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 7, 19, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 7, 19, 19, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 7, 20, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 7, 22, 19, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(5)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 7, 22, 19, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 7, 22, 19, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(4)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 7, 23, 19, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 7, 23, 19, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 7, 23, 19, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 7, 26, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 7, 26, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 7, 26, 19, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 7, 27, 19, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 7, 27, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 7, 27, 19, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 2, 19, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 8, 19, 30))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 8, 8, 19, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 8, 9, 19, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 8, 9, 19, 30))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 10, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 10, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 15, 19, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 8, 15, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 16, 19, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 8, 16, 20, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(4)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 8, 17, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(6)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 8, 17, 19, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 23, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 8, 23, 19, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 23, 19, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 8, 24, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 8, 24, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 8, 24, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 8, 30, 19, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 30, 19, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 8, 30, 19, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 8, 31, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 8, 31, 19, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 8, 31, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 9, 13, 19, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 9, 13, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 9, 13, 19, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 9, 14, 19, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 14, 19, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 14, 19, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(4)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 9, 20, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 20, 19, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 9, 21, 16, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 21, 16, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 21, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 9, 21, 19, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 9, 27, 14, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 9, 27, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 9, 27, 16, 30))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 9, 27, 19, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 28, 16, 30))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(4)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 9, 28, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 10, 3, 14, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 4, 14, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 10, 5, 14, 0))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 10, 5, 14, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 10, 5, 16, 30))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 10, 5, 16, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 10, 18, 14, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(4)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 10, 25, 14, 0))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 10, 25, 14, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 10, 25, 16, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 26, 14, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 10, 26, 14, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(4)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 10, 26, 16, 30))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 11, 1, 14, 0))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 11, 1, 14, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 11, 1, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 11, 1, 16, 30))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 11, 2, 14, 0))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 2, 16, 30))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 11, 8, 14, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 8, 14, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 8, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 11, 8, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(3)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 11, 9, 14, 0))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 9, 16, 30))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC안양"))
                        .awayTeam(teamMap.get("수원FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 22, 14, 0))
                        .stadium("안양 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("FC서울"))
                        .awayTeam(teamMap.get("김천상무"))
                        .matchDate(LocalDateTime.of(2025, 11, 22, 14, 0))
                        .stadium("서울월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대전하나시티즌"))
                        .awayTeam(teamMap.get("강원FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 22, 14, 0))
                        .stadium("대전 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("광주FC"))
                        .awayTeam(teamMap.get("울산HD"))
                        .matchDate(LocalDateTime.of(2025, 11, 22, 16, 30))
                        .stadium("광주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("포항스틸러스"))
                        .awayTeam(teamMap.get("전북현대모터스"))
                        .matchDate(LocalDateTime.of(2025, 11, 22, 16, 30))
                        .stadium("포항 스틸야드")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(0)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("제주SK"))
                        .awayTeam(teamMap.get("대구FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 23, 14, 0))
                        .stadium("제주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(1)
                        .build(),


                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("대구FC"))
                        .awayTeam(teamMap.get("FC안양"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 14, 0))
                        .stadium("대구 iM뱅크 파크")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(2)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("수원FC"))
                        .awayTeam(teamMap.get("광주FC"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 14, 0))
                        .stadium("수원 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("울산HD"))
                        .awayTeam(teamMap.get("제주SK"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 14, 0))
                        .stadium("울산 문수 경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("전북현대모터스"))
                        .awayTeam(teamMap.get("FC서울"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 16, 30))
                        .stadium("전주 월드컵경기장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(2)
                        .awayScore(1)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("김천상무"))
                        .awayTeam(teamMap.get("대전하나시티즌"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 16, 30))
                        .stadium("김천 종합 운동장")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(0)
                        .awayScore(3)
                        .build(),

                MatchEntity.builder()
                        .league("K리그1")
                        .homeTeam(teamMap.get("강원FC"))
                        .awayTeam(teamMap.get("포항스틸러스"))
                        .matchDate(LocalDateTime.of(2025, 11, 30, 16, 30))
                        .stadium("강릉하이원아레나")
                        .status(MatchEntity.MatchStatus.FINISHED)
                        .homeScore(1)
                        .awayScore(0)
                        .build(),


                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,2,22,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,2,22,14,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,2,22,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,2,22,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,2,23,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,2,23,16,30)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,2,23,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,3,1,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,3,1,16,30)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,3,1,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,3,2,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,3,2,14,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,3,2,16,30)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,3,3,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,3,8,14,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,3,8,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,3,8,16,30)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,3,8,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,3,9,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,3,9,14,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,3,9,16,30)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,3,15,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,3,15,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,3,15,16,30)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,3,15,16,30)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,3,16,14,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,3,16,14,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,3,16,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,3,29,14,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,3,29,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,3,29,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,3,29,16,30)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,3,30,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,3,30,14,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,3,30,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),


                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,4,5,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,4,5,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,4,5,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,4,6,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,4,6,14,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,4,6,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,4,6,16,30)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,4,12,14,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,4,12,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,4,12,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,4,12,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,4,13,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,4,13,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,4,13,16,30)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,4,19,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,4,19,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,4,19,16,30)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,4,19,16,30)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,4,20,14,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,4,20,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,4,20,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,4,26,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,4,26,14,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,4,26,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,4,26,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,4,27,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,4,27,14,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,4,27,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(2).build(),


                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,5,4,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,5,4,14,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,5,4,16,30)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,5,4,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,5,4,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,5,4,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,5,4,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,5,10,16,30)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,5,10,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,5,10,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,5,10,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,5,11,16,30)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,5,11,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,5,11,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("충남아산FC")).matchDate(LocalDateTime.of(2025,5,17,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,5,17,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,5,17,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,5,17,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(4).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,5,18,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,5,18,16,30)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,5,18,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,5,24,16,30)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,5,24,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,5,24,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,5,24,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,5,25,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,5,25,16,30)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,5,25,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,5,31,16,30)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,5,31,16,30)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(4).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,5,31,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,5,31,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,6,1,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,6,1,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,6,1,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,6,6,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,6,6,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,6,7,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,6,7,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,6,7,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,6,8,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,6,8,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,6,14,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,6,14,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,6,14,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,6,15,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,6,15,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,6,15,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,6,15,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,6,21,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,6,21,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,6,21,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,6,21,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),

                MatchEntity.builder().league("К리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,6,22,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,6,22,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,6,22,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,6,28,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,6,28,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,6,28,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,6,28,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,6,29,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,6,29,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,6,29,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,7,5,19,0)).stadium("아산 이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,7,5,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,7,5,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,7,5,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,7,6,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,7,6,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,7,6,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,7,12,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,7,12,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,7,12,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,7,12,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,7,13,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,7,13,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,7,13,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,7,19,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(4).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,7,19,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,7,19,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,7,19,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,7,20,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(5).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,7,20,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,7,20,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,7,26,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,7,26,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,7,26,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,7,26,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,7,27,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,7,27,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,7,27,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,8,2,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,8,9,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,8,9,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,8,9,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,8,9,20,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,8,10,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,8,10,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(4).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,8,10,19,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,8,15,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,8,15,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,8,16,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,8,16,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,8,16,19,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,8,16,20,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,8,17,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,8,23,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,8,23,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,8,23,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,8,23,19,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,8,24,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(4).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,8,24,19,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,8,24,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,8,30,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,8,30,19,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,8,30,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,8,30,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,8,30,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,8,31,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,8,31,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(5).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,9,6,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,9,6,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,9,6,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,9,6,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,9,7,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,9,7,19,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,9,7,19,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,9,13,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,9,13,19,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,9,13,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,9,13,19,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(4).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,9,14,19,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,9,14,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,9,14,19,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,9,20,16,30)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,9,20,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,9,20,19,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,9,20,19,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,9,21,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,9,21,16,30)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,9,21,19,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,9,27,14,0)).stadium("순천팔마종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,9,27,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,9,27,19,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,9,28,16,30)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,9,28,16,30)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,9,28,19,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,9,28,19,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,10,3,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,10,4,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,10,4,14,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,10,4,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,10,4,16,30)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,10,5,14,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,10,5,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,10,7,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,10,7,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,10,8,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,10,8,14,0)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,10,8,14,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,10,8,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,10,8,16,30)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,10,11,14,0)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,10,11,16,30)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,10,12,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(5).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,10,12,14,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,10,12,14,0)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,10,12,16,30)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,10,12,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,10,19,14,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,10,19,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,10,19,14,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,10,19,14,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,10,19,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,10,19,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,10,19,16,30)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,10,25,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,10,25,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,10,25,16,30)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,10,25,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,10,25,16,30)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,10,26,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(3).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,10,26,16,30)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(4).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,11,1,14,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,11,1,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,11,1,16,30)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,11,1,16,30)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(5).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,11,2,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,11,2,14,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,11,2,16,30)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("전남드래곤즈")).awayTeam(teamMap.get("인천유나이티드")).matchDate(LocalDateTime.of(2025,11,8,14,0)).stadium("광양전용구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("화성FC")).awayTeam(teamMap.get("경남FC")).matchDate(LocalDateTime.of(2025,11,8,14,0)).stadium("화성종합경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부산아이파크")).awayTeam(teamMap.get("충남아산")).matchDate(LocalDateTime.of(2025,11,8,16,30)).stadium("부산구덕운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(3).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("천안시티FC")).awayTeam(teamMap.get("성남FC")).matchDate(LocalDateTime.of(2025,11,8,16,30)).stadium("천안종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(3).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충북청주FC")).awayTeam(teamMap.get("서울이랜드FC")).matchDate(LocalDateTime.of(2025,11,9,14,0)).stadium("청주종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(2).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("안산그리너스")).awayTeam(teamMap.get("수원삼성블루윙즈")).matchDate(LocalDateTime.of(2025,11,9,14,0)).stadium("안산와~스타디움").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("김포FC")).awayTeam(teamMap.get("부천FC1995")).matchDate(LocalDateTime.of(2025,11,9,16,30)).stadium("김포솔터축구장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),

                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("충남아산")).awayTeam(teamMap.get("전남드래곤즈")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("아산이순신종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("인천유나이티드")).awayTeam(teamMap.get("충북청주FC")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("인천축구전용경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("수원삼성블루윙즈")).awayTeam(teamMap.get("김포FC")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("수원월드컵경기장").status(MatchEntity.MatchStatus.FINISHED).homeScore(1).awayScore(1).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("부천FC1995")).awayTeam(teamMap.get("화성FC")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("부천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(0).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("서울이랜드FC")).awayTeam(teamMap.get("안산그리너스")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("목동종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(6).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("경남FC")).awayTeam(teamMap.get("천안시티FC")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("창원축구센터").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(0).build(),
                MatchEntity.builder().league("K리그2").homeTeam(teamMap.get("성남FC")).awayTeam(teamMap.get("부산아이파크")).matchDate(LocalDateTime.of(2025,11,23,14,0)).stadium("탄천종합운동장").status(MatchEntity.MatchStatus.FINISHED).homeScore(2).awayScore(1).build()

        );


        // ==============================
        // 3. 저장 (Update가 필요하면 find 후 수정)
        // ==============================
        for (MatchEntity m : matches) {
            matchRepository.save(m);
        }

        System.out.println("=== K리그 Match 기본 데이터 삽입 완료 ===");
    }
}
