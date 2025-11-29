package org.example.allinone_sports.config;

import org.example.allinone_sports.crawler.KLeaguePlayerCrawler;
import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.example.allinone_sports.domain.player.service.PlayerService;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class KLeaguePlayerDataLoaderConfig implements CommandLineRunner {

    private final TeamRepository teamRepository;
    private final KLeaguePlayerCrawler crawler;
    private final PlayerService playerService;

    @Override
    public void run(String... args) throws Exception {

        List<TeamEntity> teams = teamRepository.findAll();

        for (TeamEntity team : teams) {

            // teamCode 없는 팀 스킵
            if (team.getTeamCode() == null || team.getTeamCode().isEmpty()) {
                continue;
            }

            System.out.println("K리그 크롤링 시작: " + team.getName()
                    + " (teamCode=" + team.getTeamCode() + ")");

            // ⭐ K리그 전용 크롤링 호출
            List<PlayerEntity> players = crawler.KLeagueCrawl(team.getTeamCode());

            // DB 저장
            playerService.savePlayers(team.getTeamId(), players);

            System.out.println("저장 완료: " + team.getName()
                    + ", 인원수=" + players.size());
        }
    }
}
