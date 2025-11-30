package org.example.allinone_sports.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.crawler.KLeagueTeamCrawler;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.example.allinone_sports.domain.team.service.TeamService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class KLeagueTeamDataLoaderConfig implements CommandLineRunner {

    private final TeamRepository teamRepository;
    private final KLeagueTeamCrawler kleagueCrawler;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // =======================================================================
        // 1. 팀 기본 정보(K리그 + KBO) Insert or Update
        // =======================================================================
        List<TeamEntity> teams = List.of(

                // ===========================
                // 🔵 K LEAGUE (sportId = 2)
                // ===========================
                TeamEntity.builder().sportId(2).name("울산HD").teamStadium("울산 문수 축구경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K01@2x.png").teamCode("K01").league("K리그1").snsLink("https://instagram.com/uhdfc_1983").teamLink("https://www.uhdfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/66").build(),
                TeamEntity.builder().sportId(2).name("수원삼성블루윙즈").teamStadium("수원 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K02@2x.png").teamCode("K02").league("K리그2").snsLink("https://instagram.com/suwonsamsungfc").teamLink("https://www.bluewings.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS003").build(),
                TeamEntity.builder().sportId(2).name("포항스틸러스").teamStadium("포항 스틸야드").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K03@2x.png").teamCode("K03").league("K리그1").snsLink("https://instagram.com/fc.pohangsteelers").teamLink("https://www.steelers.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/74").build(),
                TeamEntity.builder().sportId(2).name("제주SK").teamStadium("제주 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K04@2x.png").teamCode("K04").league("K리그1").snsLink("https://instagram.com/jejuskfc_official").teamLink("https://www.jejuskfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/76").build(),
                TeamEntity.builder().sportId(2).name("전북현대모터스").teamStadium("전주 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K05@2x.png").teamCode("K05").league("K리그1").snsLink("https://instagram.com/jeonbuk1994").teamLink("https://hyundai-motorsfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/73").build(),
                TeamEntity.builder().sportId(2).name("부산아이파크").teamStadium("부산 구덕 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K06@2x.png").teamCode("K06").league("K리그2").snsLink("https://instagram.com/busaniparkfc").teamLink("https://www.busanipark.com/main.php").ticketLink("https://www.ticketlink.co.kr/sports/138/82").build(),
                TeamEntity.builder().sportId(2).name("전남드래곤즈").teamStadium("광양 전용 구장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K07@2x.png").teamCode("K07").league("K리그2").snsLink("https://instagram.com/jeonnamdragons_fc").teamLink("https://www.dragons.co.kr/main/index").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS011").build(),
                TeamEntity.builder().sportId(2).name("성남FC").teamStadium("탄천 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K08@2x.png").teamCode("K08").league("K리그2").snsLink("https://instagram.com/sfc.seongnam").teamLink("https://www.seongnamfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS093").build(),
                TeamEntity.builder().sportId(2).name("FC서울").teamStadium("상암 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K09@2x.png").teamCode("K09").league("K리그1").snsLink("https://instagram.com/fcseoul").teamLink("https://www.fcseoul.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/65").build(),
                TeamEntity.builder().sportId(2).name("대전하나시티즌").teamStadium("대전 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K10@2x.png").teamCode("K10").league("K리그1").snsLink("https://instagram.com/daejeon_hana").teamLink("https://dhcfc.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/83").build(),
                TeamEntity.builder().sportId(2).name("대구FC").teamStadium("대구iM뱅크PARK").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K17@2x.png").teamCode("K17").league("K리그1").snsLink("https://instagram.com/daegufc.co.kr").teamLink("https://www.daegufc.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/84").build(),
                TeamEntity.builder().sportId(2).name("인천유나이티드").teamStadium("인천 축구 전용경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K18@2x.png").teamCode("K18").league("K리그2").snsLink("https://instagram.com/incheonutd").teamLink("https://www.incheonutd.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/77").build(),
                TeamEntity.builder().sportId(2).name("경남FC").teamStadium("창원 축구 센터").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K20@2x.png").teamCode("K20").league("K리그2").snsLink("https://instagram.com/gyeongnamfc").teamLink("https://www.gyeongnamfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/88").build(),
                TeamEntity.builder().sportId(2).name("강원FC").teamStadium("강릉 하이원 아레나").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K21@2x.png").teamCode("K21").league("K리그1").snsLink("https://instagram.com/gangwon_fc").teamLink("https://www.gangwon-fc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS014").build(),
                TeamEntity.builder().sportId(2).name("광주FC").teamStadium("광주 월드컵 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K22@2x.png").teamCode("K22").league("K리그1").snsLink("https://instagram.com/gwangju_fc").teamLink("https://www.gwangjufc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/79").build(),
                TeamEntity.builder().sportId(2).name("부천FC1995").teamStadium("부천 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K26@2x.png").teamCode("K26").league("K리그2").snsLink("https://instagram.com/bucheonfc1995").teamLink("https://bfc1995.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS067").build(),
                TeamEntity.builder().sportId(2).name("FC안양").teamStadium("안양 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K27@2x.png").teamCode("K27").league("K리그1").snsLink("https://instagram.com/fc_anyang").teamLink("https://www.fc-anyang.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/86").build(),
                TeamEntity.builder().sportId(2).name("수원FC").teamStadium("수원 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K29@2x.png").teamCode("K29").league("K리그1").snsLink("https://instagram.com/suwonfc").teamLink("https://www.suwonfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS061").build(),
                TeamEntity.builder().sportId(2).name("서울이랜드FC").teamStadium("목동 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K31@2x.png").teamCode("K31").league("K리그2").snsLink("https://instagram.com/seouleland").teamLink("https://www.seoulelandfc.com/").ticketLink("https://m.seoulelandfc.com/MATCH/SCHEDULERESULT?menuId=SCHEDULERESULT?menuId=EXTERNAL_f73a85c3-fc00-4b8b-a643-7d8ec4e0509d&lang=ko").build(),
                TeamEntity.builder().sportId(2).name("안산그리너스").teamStadium("안산 와~스타디움").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K32@2x.png").teamCode("K32").league("K리그2").snsLink("https://instagram.com/ansan_greeners_fc").teamLink("https://www.greenersfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS196").build(),
                TeamEntity.builder().sportId(2).name("충남아산").teamStadium("이순신 종합운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K34@2x.png").teamCode("K34").league("K리그2").snsLink("https://instagram.com/asanfc2020").teamLink("https://www.asanfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS113").build(),
                TeamEntity.builder().sportId(2).name("김천상무").teamStadium("김천 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K35@2x.png").teamCode("K35").league("K리그1").snsLink("https://instagram.com/gimcheonfc").teamLink("https://gimcheonfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/80").build(),
                TeamEntity.builder().sportId(2).name("김포FC").teamStadium("김포솔터축구장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K36@2x.png").teamCode("K36").league("K리그2").snsLink("https://instagram.com/gimpofc_official").teamLink("https://www.gimpofc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/493").build(),
                TeamEntity.builder().sportId(2).name("충북청주FC").teamStadium("청주 종합 경기장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K37@2x.png").teamCode("K37").league("K리그2").snsLink("https://instagram.com/chfc_2023").teamLink("https://chfc.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS173").build(),
                TeamEntity.builder().sportId(2).name("천안시티FC").teamStadium("천안 종합 운동장").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K38@2x.png").teamCode("K38").league("K리그2").snsLink("https://instagram.com/cheonancityfc").teamLink("https://cheonancityfc.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS006").build(),
                TeamEntity.builder().sportId(2).name("화성FC").teamStadium("화성종합경기타운").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K39@2x.png").teamCode("K39").league("K리그2").snsLink("https://instagram.com/hwaseongfc_official").teamLink("https://www.hwaseongfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS197").build()

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
                        return teamRepository.save(exist);
                    })
                    .orElseGet(() -> teamRepository.save(t));
        }

        System.out.println("=== Team 기본 데이터 삽입 완료 ===");

        // 1) DB에서 sportId가 2인 팀(K리그)만 다시 조회하여 가져옵니다.
        // 이는 DB에서 관리되는 TeamEntity 객체를 가져와서 크롤러가 직접 값을 업데이트하도록 하기 위함입니다.
        List<TeamEntity> kLeagueTeamsFromDB = teamRepository.findBySportId(2);

        // 2) K리그 팀 리스트를 크롤러에 전달하여 성적 정보를 업데이트합니다.
        System.out.println("=== 🔵 K리그 팀 성적 크롤링 (Selenium) 시작... ===");
        kleagueCrawler.crawl(kLeagueTeamsFromDB);
        // 크롤러 내부에서 kLeagueTeamsFromDB 리스트의 객체들이 업데이트됩니다.

        // 3) 업데이트된 K리그 팀 정보를 DB에 일괄 저장합니다.
        teamRepository.saveAll(kLeagueTeamsFromDB);

        System.out.println("=== 🔵 K리그 팀 성적 크롤링 및 DB 저장 완료.");
    }
}
