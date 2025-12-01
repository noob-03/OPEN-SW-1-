package org.example.allinone_sports.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
public class KBOTeamDataLoaderConfig implements CommandLineRunner {

    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // =======================================================================
        // 1. 팀 기본 정보(K리그 + KBO) Insert or Update
        // =======================================================================
        List<TeamEntity> teams = List.of(
                // ===========================
                // 🔴 KBO (sportId = 1)
                // ===========================
                TeamEntity.builder().sportId(1).teamWon(74).teamDraw(2).teamLost(68).teamRank(4).teamPoint(521).teamPlayed(144).teamStadium("대구삼성라이온즈파크").name("삼성 라이온즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/SS.png").teamCode("SS").league("KBO").snsLink("https://instagram.com/samsunglions_baseballclub").teamLink("https://www.samsunglions.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/57").build(),
                TeamEntity.builder().sportId(1).teamWon(71).teamDraw(6).teamLost(67).teamRank(5).teamPoint(514).teamPlayed(144).teamStadium("창원NC파크").name("엔씨 다이노스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/NC.png").teamCode("NC").league("KBO").snsLink("https://instagram.com/ncdinos2011").teamLink("https://ncdinos.com/").ticketLink("https://ticket.ncdinos.com/").build(),
                TeamEntity.builder().sportId(1).teamWon(71).teamDraw(5).teamLost(68).teamRank(6).teamPoint(511).teamPlayed(144).teamStadium("수원KT위즈파크").name("KT 위즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/KT.png").teamCode("KT").league("KBO").snsLink("https://instagram.com/ktwiz.pr").teamLink("https://www.ktwiz.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/62").build(),
                TeamEntity.builder().sportId(1).teamWon(66).teamDraw(6).teamLost(72).teamRank(7).teamPoint(478).teamPlayed(144).teamStadium("사직 야구장").name("롯데 자이언츠").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/LT.png").teamCode("LT").league("KBO").snsLink("https://instagram.com/busanlottegiants").teamLink("https://www.giantsclub.com/").ticketLink("https://ticket.giantsclub.com/loginForm.do").build(),
                TeamEntity.builder().sportId(1).teamWon(65).teamDraw(4).teamLost(75).teamRank(8).teamPoint(464).teamPlayed(144).teamStadium("광주기아챔피언스필드").name("기아 타이거즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/HT.png").teamCode("HT").league("KBO").snsLink("https://instagram.com/always_kia_tigers").teamLink("https://www.tigers.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/58").build(),
                TeamEntity.builder().sportId(1).teamWon(61).teamDraw(6).teamLost(77).teamRank(9).teamPoint(442).teamPlayed(144).teamStadium("잠실 종합 운동장").name("두산 베어스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/OB.png").teamCode("OB").league("KBO").snsLink("https://instagram.com/doosanbears.1982").teamLink("https://www.doosanbears.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB004").build(),
                TeamEntity.builder().sportId(1).teamWon(85).teamDraw(3).teamLost(56).teamRank(1).teamPoint(603).teamPlayed(144).teamStadium("잠실 종합 운동장").name("LG 트윈스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/LG.png").teamCode("LG").league("KBO").snsLink("https://instagram.com/lgtwinsbaseballclub").teamLink("https://www.lgtwins.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/59").build(),
                TeamEntity.builder().sportId(1).teamWon(75).teamDraw(4).teamLost(65).teamRank(3).teamPoint(536).teamPlayed(144).teamStadium("인천SSG랜더스필드").name("SSG 랜더스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/SK.png").teamCode("SK").league("KBO").snsLink("https://instagram.com/ssglanders.incheon").teamLink("https://www.ssglanders.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/476").build(),
                TeamEntity.builder().sportId(1).teamWon(83).teamDraw(4).teamLost(57).teamRank(2).teamPoint(593).teamPlayed(144).teamStadium("대전 한화생명볼파크").name("한화 이글스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/HH.png").teamCode("HH").league("KBO").snsLink("https://instagram.com/hanhwaeagles_soori").teamLink("https://www.hanwhaeagles.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/63").build(),
                TeamEntity.builder().sportId(1).teamWon(47).teamDraw(4).teamLost(93).teamRank(10).teamPoint(336).teamPlayed(144).teamStadium("고척 스카이돔").name("키움 히어로즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/WO.png").teamCode("WO").league("KBO").snsLink("https://instagram.com/herosbaseballclub").teamLink("https://www.heroesbaseball.co.kr/index.do").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB003").build()
        );

        // Insert or Update
        for (TeamEntity t : teams) {
            teamRepository.findByName(t.getName())
                    .map(exist -> {
                        exist.setSportId(t.getSportId());
                        exist.setLogoUrl(t.getLogoUrl());
                        exist.setLeague(t.getLeague());
                        exist.setSnsLink(t.getSnsLink());
                        exist.setTicketLink(t.getTicketLink());
                        exist.setTeamLink(t.getTeamLink());
                        exist.setTeamCode(t.getTeamCode());
                        exist.setTeamStadium(t.getTeamStadium());

                        exist.setTeamWon(t.getTeamWon());
                        exist.setTeamRank(t.getTeamRank());
                        exist.setTeamPoint(t.getTeamPoint());
                        exist.setTeamPlayed(t.getTeamPlayed());
                        exist.setTeamLost(t.getTeamLost());
                        exist.setTeamDraw(t.getTeamDraw());
                        return teamRepository.save(exist);
                    })
                    .orElseGet(() -> teamRepository.save(t));
        }

        System.out.println("=== Team 기본 데이터 삽입 완료 ===");

    }
}
