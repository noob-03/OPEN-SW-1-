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
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

        while ((line = br.readLine()) != null) {
            PlayerEntity player = parseLineToPlayer(line);
            if (player != null) {
                playerRepository.save(player);
            }
        }

        System.out.println("✅ Player 데이터 로딩 완료!");
    }

    private PlayerEntity parseLineToPlayer(String line) {

        try {
            // 예제 입력:
            // PlayerEntity.builder().playerName("강민").playerNumber(100).team(teamMap.get("LG 트윈스")).build()

            String name = line.split("playerName\\(\"")[1].split("\"\\)")[0];

            String numberStr = line.split("playerNumber\\(")[1].split("\\)")[0].trim();
            Integer number = null;

            if (!numberStr.isEmpty()) {
                try {
                    number = Integer.parseInt(numberStr);
                } catch (Exception ignored) {
                    number = null; // 변환 실패 → null 처리
                }
            }


            String teamName = line.split("team\\(teamMap.get\\(\"")[1].split("\"\\)")[0];

            Optional<TeamEntity> teamOpt = teamRepository.findByName(teamName);
            TeamEntity team = teamOpt.orElse(null);

            if (team == null) {
                System.out.println("⚠️ 팀을 찾을 수 없음: " + teamName);
                return null;
            }

            return PlayerEntity.builder()
                    .playerName(name)
                    .playerNumber(number)
                    .team(team)
                    .build();

        } catch (Exception e) {
            System.out.println("⚠️ 파싱 실패: " + line);
            return null;
        }
    }
}
