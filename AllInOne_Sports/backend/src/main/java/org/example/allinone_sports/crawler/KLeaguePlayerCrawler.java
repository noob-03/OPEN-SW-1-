package org.example.allinone_sports.crawler;

import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class KLeaguePlayerCrawler {

    public List<PlayerEntity> KLeagueCrawl(String teamCode) {

        List<PlayerEntity> players = new ArrayList<>();

        try {
            String url = "https://www.kleague.com/club/club.do?teamId=" + teamCode;
            Document doc = Jsoup.connect(url).get();

            // 전체 선수/감독 카드
            Elements cards = doc.select(".player .player-hover");

            for (Element card : cards) {

                // ✔ 사진
                String imgUrl = card.selectFirst(".img-box img").attr("src");

                // ✔ 이름
                Element nameEl = card.selectFirst(".txt .name");
                if (nameEl == null) continue;
                String name = nameEl.ownText();  // "고종현"

                // ✔ 등번호 or 직책(감독/코치 등)
                Element numEl = card.selectFirst(".num");
                if (numEl == null) continue;

                String numRaw = numEl.text();  // ex) "No.7", "감독", "코치"

                // ================================
                //    감독 / 선수 판별 로직
                // ================================

                Integer playerNumber = null;

                // 선수인 경우 → No.xx 있음
                if (numRaw.startsWith("No.")) {
                    String numberOnly = numRaw.replaceAll("\\D+", "");
                    playerNumber = Integer.valueOf(numberOnly);

                } else if (numRaw.equals("감독")) {
                    // 감독은 번호 없이 NULL로 저장
                    playerNumber = null;

                } else {
                    // 코치, 스카우터, 전력분석관 등 → 제외
                    continue;
                }

                // ================================
                //   PlayerEntity 생성
                // ================================
                PlayerEntity p = PlayerEntity.builder()
                        .playerName(name)
                        .playerUrl(imgUrl)
                        .playerNumber(playerNumber)   // 선수는 번호, 감독은 null
                        .build();

                players.add(p);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return players;
    }
}