package org.example.allinone_sports.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.match.entity.MatchEntity;
import org.example.allinone_sports.domain.match.repository.MatchRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(3)
public class KBOMatchDataLoaderConfig implements CommandLineRunner {

    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        InputStream is = getClass().getClassLoader().getResourceAsStream("kbo_matches.txt");

        if (is == null) {
            System.out.println("❌ kbo_matches.txt not found!");
            return;
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line;

        while ((line = br.readLine()) != null) {
            MatchEntity match = parseMatchLine(line);
            if (match != null) {
                matchRepository.save(match);
            }
        }

        System.out.println("✅ Match 데이터 로딩 완료!");
    }


    private MatchEntity parseMatchLine(String line) {

        try {
            // league("KBO")
            String league = line.split("league\\(\"")[1].split("\"\\)")[0];

            // homeTeam(teamMap.get("한화 이글스"))
            String homeTeamName = line.split("homeTeam\\(teamMap.get\\(\"")[1].split("\"\\)")[0];

            // awayTeam(teamMap.get("삼성 라이온즈"))
            String awayTeamName = line.split("awayTeam\\(teamMap.get\\(\"")[1].split("\"\\)")[0];

            // LocalDateTime.of(2025,6,24,18,30)
            String dateRaw = line.split("LocalDateTime.of\\(")[1].split("\\)")[0];
            String[] arr = dateRaw.split(",");
            LocalDateTime matchDate = LocalDateTime.of(
                    Integer.parseInt(arr[0].trim()),
                    Integer.parseInt(arr[1].trim()),
                    Integer.parseInt(arr[2].trim()),
                    Integer.parseInt(arr[3].trim()),
                    Integer.parseInt(arr[4].trim())
            );

            // stadium("대구삼성라이온즈파크")
            String stadium = line.split("stadium\\(\"")[1].split("\"\\)")[0];

            // status(MatchEntity.MatchStatus.CANCELLED)
            String statusRaw = line.split("status\\(MatchEntity.MatchStatus\\.")[1].split("\\)")[0];
            MatchEntity.MatchStatus status = MatchEntity.MatchStatus.valueOf(statusRaw);

            // ⚠️ 점수 optional 처리
            Integer homeScore = null;
            Integer awayScore = null;

            if (line.contains("homeScore(")) {
                String homeScoreStr = line.split("homeScore\\(")[1].split("\\)")[0].trim();
                if (!homeScoreStr.isEmpty()) {
                    homeScore = Integer.parseInt(homeScoreStr);
                }
            }

            if (line.contains("awayScore(")) {
                String awayScoreStr = line.split("awayScore\\(")[1].split("\\)")[0].trim();
                if (!awayScoreStr.isEmpty()) {
                    awayScore = Integer.parseInt(awayScoreStr);
                }
            }

            // 팀 매핑
            TeamEntity homeTeam = teamRepository.findByName(homeTeamName).orElse(null);
            TeamEntity awayTeam = teamRepository.findByName(awayTeamName).orElse(null);

            return MatchEntity.builder()
                    .league(league)
                    .homeTeam(homeTeam)
                    .awayTeam(awayTeam)
                    .matchDate(matchDate)
                    .stadium(stadium)
                    .status(status)
                    .homeScore(homeScore)
                    .awayScore(awayScore)
                    .build();

        } catch (Exception e) {
            System.out.println("⚠️ Match 파싱 실패 → " + line);
            return null;
        }
    }


}

