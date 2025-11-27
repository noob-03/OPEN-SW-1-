package org.example.allinone_sports.config;

import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TeamDataLoaderConfig implements CommandLineRunner {

    private final TeamRepository teamRepository;

    @Override
    public void run(String... args) {

        List<TeamEntity> teams = List.of(

                // ===========================
                // 🔵 K LEAGUE (sportId = 2)
                // ===========================
                TeamEntity.builder().sportId(2).name("울산HD").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K01@2x.png").league("K리그1").snsLink("https://instagram.com/uhdfc_1983").teamLink("https://www.uhdfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/66").build(),
                TeamEntity.builder().sportId(2).name("수원삼성블루윙즈").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K02@2x.png").league("K리그2").snsLink("https://instagram.com/suwonsamsungfc").teamLink("https://www.bluewings.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS003").build(),
                TeamEntity.builder().sportId(2).name("포항스틸러스").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K03@2x.png").league("K리그1").snsLink("https://instagram.com/fc.pohangsteelers").teamLink("https://www.steelers.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/74").build(),
                TeamEntity.builder().sportId(2).name("제주SK").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K04@2x.png").league("K리그1").snsLink("https://instagram.com/jejuskfc_official").teamLink("https://www.jejuskfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/76").build(),
                TeamEntity.builder().sportId(2).name("전북현대모터스").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K05@2x.png").league("K리그1").snsLink("https://instagram.com/jeonbuk1994").teamLink("https://hyundai-motorsfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/73").build(),
                TeamEntity.builder().sportId(2).name("부산아이파크").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K06@2x.png").league("K리그2").snsLink("https://instagram.com/busaniparkfc").teamLink("https://www.busanipark.com/main.php").ticketLink("https://www.ticketlink.co.kr/sports/138/82").build(),
                TeamEntity.builder().sportId(2).name("전남드래곤즈").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K07@2x.png").league("K리그2").snsLink("https://instagram.com/jeonnamdragons_fc").teamLink("https://www.dragons.co.kr/main/index").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS011").build(),
                TeamEntity.builder().sportId(2).name("성남FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K08@2x.png").league("K리그2").snsLink("https://instagram.com/sfc.seongnam").teamLink("https://www.seongnamfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS093").build(),
                TeamEntity.builder().sportId(2).name("FC서울").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K09@2x.png").league("K리그1").snsLink("https://instagram.com/fcseoul").teamLink("https://www.fcseoul.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/65").build(),
                TeamEntity.builder().sportId(2).name("대전하나시티즌").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K10@2x.png").league("K리그1").snsLink("https://instagram.com/daejeon_hana").teamLink("https://dhcfc.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/83").build(),
                TeamEntity.builder().sportId(2).name("대구FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K17@2x.png").league("K리그1").snsLink("https://instagram.com/daegufc.co.kr").teamLink("https://www.daegufc.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/138/84").build(),
                TeamEntity.builder().sportId(2).name("인천유나이티드").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K18@2x.png").league("K리그2").snsLink("https://instagram.com/incheonutd").teamLink("https://www.incheonutd.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/77").build(),
                TeamEntity.builder().sportId(2).name("경남FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K20@2x.png").league("K리그2").snsLink("https://instagram.com/gyeongnamfc").teamLink("https://www.gyeongnamfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/88").build(),
                TeamEntity.builder().sportId(2).name("강원FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K21@2x.png").league("K리그1").snsLink("https://instagram.com/gangwon_fc").teamLink("https://www.gangwon-fc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS014").build(),
                TeamEntity.builder().sportId(2).name("광주FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K22@2x.png").league("K리그1").snsLink("https://instagram.com/gwangju_fc").teamLink("https://www.gwangjufc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/79").build(),
                TeamEntity.builder().sportId(2).name("부천FC1995").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K26@2x.png").league("K리그2").snsLink("https://instagram.com/bucheonfc1995").teamLink("https://bfc1995.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS067").build(),
                TeamEntity.builder().sportId(2).name("FC안양").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K27@2x.png").league("K리그1").snsLink("https://instagram.com/fc_anyang").teamLink("https://www.fc-anyang.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/86").build(),
                TeamEntity.builder().sportId(2).name("수원FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K29@2x.png").league("K리그1").snsLink("https://instagram.com/suwonfc").teamLink("https://www.suwonfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS061").build(),
                TeamEntity.builder().sportId(2).name("서울이랜드FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K31@2x.png").league("K리그2").snsLink("https://instagram.com/seouleland").teamLink("https://www.seoulelandfc.com/").ticketLink("https://m.seoulelandfc.com/MATCH/SCHEDULERESULT?menuId=SCHEDULERESULT?menuId=EXTERNAL_f73a85c3-fc00-4b8b-a643-7d8ec4e0509d&lang=ko").build(),
                TeamEntity.builder().sportId(2).name("안산그리너스").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K32@2x.png").league("K리그2").snsLink("https://instagram.com/ansan_greeners_fc").teamLink("https://www.greenersfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS196").build(),
                TeamEntity.builder().sportId(2).name("충남아산").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K34@2x.png").league("K리그2").snsLink("https://instagram.com/asanfc2020").teamLink("https://www.asanfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS113").build(),
                TeamEntity.builder().sportId(2).name("김천상무").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K35@2x.png").league("K리그1").snsLink("https://instagram.com/gimcheonfc").teamLink("https://gimcheonfc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/80").build(),
                TeamEntity.builder().sportId(2).name("김포FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K36@2x.png").league("K리그2").snsLink("https://instagram.com/gimpofc_official").teamLink("https://www.gimpofc.com/").ticketLink("https://www.ticketlink.co.kr/sports/138/493").build(),
                TeamEntity.builder().sportId(2).name("충북청주FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K37@2x.png").league("K리그2").snsLink("https://instagram.com/chfc_2023").teamLink("https://chfc.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS173").build(),
                TeamEntity.builder().sportId(2).name("천안시티FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K38@2x.png").league("K리그2").snsLink("https://instagram.com/cheonancityfc").teamLink("https://cheonancityfc.kr/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS006").build(),
                TeamEntity.builder().sportId(2).name("화성FC").logoUrl("https://www.kleague.com/assets/images/emblem/emblem_K39@2x.png").league("K리그2").snsLink("https://instagram.com/hwaseongfc_official").teamLink("https://www.hwaseongfc.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07002&TeamCode=PS197").build(),

                // ===========================
                // 🔴 KBO (sportId = 1)
                // ===========================
                TeamEntity.builder().sportId(1).name("삼성 라이온즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/SS.png").league("KBO").snsLink("https://instagram.com/samsunglions_baseballclub").teamLink("https://www.samsunglions.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/57").build(),
                TeamEntity.builder().sportId(1).name("엔씨 다이노스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/NC.png").league("KBO").snsLink("https://instagram.com/ncdinos2011").teamLink("https://ncdinos.com/").ticketLink("https://ticket.ncdinos.com/").build(),
                TeamEntity.builder().sportId(1).name("KT 위즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/KT.png").league("KBO").snsLink("https://instagram.com/ktwiz.pr").teamLink("https://www.ktwiz.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/62").build(),
                TeamEntity.builder().sportId(1).name("롯데 자이언츠").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/LT.png").league("KBO").snsLink("https://instagram.com/busanlottegiants").teamLink("https://www.giantsclub.com/").ticketLink("https://ticket.giantsclub.com/loginForm.do").build(),
                TeamEntity.builder().sportId(1).name("기아 타이거즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/HT.png").league("KBO").snsLink("https://instagram.com/always_kia_tigers").teamLink("https://www.tigers.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/58").build(),
                TeamEntity.builder().sportId(1).name("두산 베어스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/OB.png").league("KBO").snsLink("https://instagram.com/doosanbears.1982").teamLink("https://www.doosanbears.com/").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB004").build(),
                TeamEntity.builder().sportId(1).name("LG 트윈스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/LG.png").league("KBO").snsLink("https://instagram.com/lgtwinsbaseballclub").teamLink("https://www.lgtwins.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/59").build(),
                TeamEntity.builder().sportId(1).name("한화 이글스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/HH.png").league("KBO").snsLink("https://instagram.com/hanwhaeagles_soori").teamLink("https://www.hanwhaeagles.co.kr/").ticketLink("https://www.ticketlink.co.kr/sports/137/63").build(),
                TeamEntity.builder().sportId(1).name("SSG 랜더스").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/SK.png").league("KBO").snsLink("https://instagram.com/ssglanders.incheon").teamLink("https://www.ssglanders.com/").ticketLink("https://www.ticketlink.co.kr/sports/137/476").build(),
                TeamEntity.builder().sportId(1).name("키움 히어로즈").logoUrl("https://sports-phinf.pstatic.net/team/kbo/default/WO.png").league("KBO").snsLink("https://instagram.com/herosbaseballclub").teamLink("https://www.heroesbaseball.co.kr/index.do").ticketLink("https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB003").build()
        );

        for (TeamEntity t : teams) {
            teamRepository.findByName(t.getName())
                    .map(existing -> {
                        // ⭐ 이미 DB에 존재하면 → 최신 데이터로 업데이트
                        existing.setSportId(t.getSportId());
                        existing.setLogoUrl(t.getLogoUrl());
                        existing.setLeague(t.getLeague());
                        existing.setSnsLink(t.getSnsLink());
                        existing.setTicketLink(t.getTicketLink());
                        existing.setTeamLink(t.getTeamLink());

                        return teamRepository.save(existing); // UPDATE
                    })
                    .orElseGet(() -> teamRepository.save(t)); // INSERT
        }


        System.out.println("=== Team Data Loaded (KBO + KLeague FULL) ===");
    }
}
