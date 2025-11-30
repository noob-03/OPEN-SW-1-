package org.example.allinone_sports.domain.match.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.example.allinone_sports.domain.match.repository.MatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final MatchRepository matchRepository;

    public List<MatchEntity> getMonthlyMatches(String league, int year, int month) {
        // 해당 월의 1일 00:00:00 부터 마지막 날 23:59:59 까지 조회
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDateTime start = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime end = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        // DB에는 "K리그1", "K리그2", "KBO"로 저장되어 있다고 가정하고 변환
        String dbLeagueName = convertLeagueName(league);

        return matchRepository.findByLeagueAndMatchDateBetweenOrderByMatchDateAsc(dbLeagueName, start, end);
    }

    private String convertLeagueName(String leagueCode) {
        if ("K1".equals(leagueCode)) return "K리그1";
        if ("K2".equals(leagueCode)) return "K리그2";
        if ("baseball".equals(leagueCode)) return "KBO"; // 프론트에서 sportMode로 넘길 경우 대비
        return leagueCode; // KBO 등은 그대로
    }
}