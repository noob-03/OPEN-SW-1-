package org.example.allinone_sports.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.repository.PlayerRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Order(2)
public class KBOPlayerDataLoaderConfig implements CommandLineRunner {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        InputStream is = getClass()
                .getClassLoader()
                .getResourceAsStream("kbo_players.txt");

        if (is == null) {
            System.out.println("❌ kbo_players.txt 파일을 찾을 수 없습니다.");
            return;
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line;
        int loadCount = 0;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 빈 줄 스킵

            PlayerEntity player = parseLineToPlayer(line);
            if (player != null) {
                try {
                    playerRepository.save(player);
                    loadCount++;
                } catch (Exception ex) {
                    System.out.println("❌ DB 저장 실패: " + player.getPlayerName());
                }
            }
        }

        System.out.println("✅ Player 데이터 로딩 완료! 총 " + loadCount + "개 저장됨");
    }


    private PlayerEntity parseLineToPlayer(String line) {

        try {
            // playerName("홍길동")
            String name = extractValue(line, "playerName\\(\"", "\"\\)");

            if (name == null || name.isEmpty()) {
                System.out.println("⚠️ 이름 파싱 실패 → " + line);
                return null;
            }

            // playerNumber(100) 또는 playerNumber(null)
            Integer number = parseIntegerOrNull(extractValue(line, "playerNumber\\(", "\\)"));

            // team(teamMap.get("LG 트윈스"))
            String teamName = extractValue(line, "team\\(teamMap.get\\(\"", "\"\\)");

            Optional<TeamEntity> teamOpt = teamRepository.findByName(teamName);
            TeamEntity team = teamOpt.orElse(null);

            if (team == null) {
                System.out.println("⚠️ 팀 매핑 실패 → " + teamName);
                return null;
            }

            return PlayerEntity.builder()
                    .playerName(name)
                    .playerNumber(number)
                    .team(team)
                    .build();

        } catch (Exception e) {
            System.out.println("⚠️ 파싱 실패 → " + line);
            return null;
        }
    }


    /** 범용 문자열 추출 함수 */
    private String extractValue(String line, String startRegex, String endRegex) {
        try {
            return line.split(startRegex)[1].split(endRegex)[0];
        } catch (Exception e) {
            return null;
        }
    }

    /** "100" → 100 / "null" → null / "" → null */
    private Integer parseIntegerOrNull(String value) {
        if (value == null) return null;
        value = value.trim();

        if (value.equalsIgnoreCase("null")) return null;
        if (value.isEmpty()) return null;

        try {
            return Integer.parseInt(value);
        } catch (Exception e) {
            return null;
        }
    }
}
