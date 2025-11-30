package org.example.allinone_sports.crawler;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class KLeagueTeamCrawler {

    private static final String URL = "https://www.kleague.com/record/team.do";

    public void crawl(List<TeamEntity> teamList) {

        Map<String, TeamEntity> map =
                teamList.stream().collect(Collectors.toMap(TeamEntity::getTeamCode, t -> t));

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized"); // 화면 크게
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--remote-allow-origins=*");

        WebDriver driver = new ChromeDriver(options);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get(URL);
            Thread.sleep(2000);

            // 1️⃣ K리그1 먼저 크롤링
            System.out.println("===== [K리그1] 크롤링 시작 =====");
            parseKLeague1(driver, map);

            // 2️⃣ 대회 select → K리그2 선택
            System.out.println("===== [K리그2] 화면 변경 =====");

            WebElement select = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("leagueId")));
            select.findElement(By.cssSelector("option[value='2']")).click();

            // 페이지가 실제로 K리그2로 바뀌었는지 기다림
            wait.until(ExpectedConditions.or(
                    ExpectedConditions.textToBePresentInElementLocated(
                            By.cssSelector("#leagueId option[value='2']"), "K리그2"),
                    ExpectedConditions.presenceOfElementLocated(By.cssSelector("#team-rank-tbl"))
            ));

            Thread.sleep(2000); // JS 후처리 대기

            // 3️⃣ K리그2 크롤링
            parseKLeague2(driver, map);

        } catch (Exception e) {
            System.out.println("Selenium 크롤링 오류 : " + e.getMessage());
        } finally {
            driver.quit();
        }
    }

    /* ============================================================
     * 🔵 K리그1 테이블 파싱 (ts1, ts2, ts3)
     * ============================================================ */
    private void parseKLeague1(WebDriver driver, Map<String, TeamEntity> map) {

        for (String tableId : List.of("ts1", "ts2", "ts3")) {

            List<WebElement> rows = driver.findElements(By.cssSelector("#" + tableId + " tbody tr"));
            System.out.println("▶ 테이블 [" + tableId + "] : " + rows.size() + "개 행 발견");

            for (WebElement r : rows) {
                try {
                    WebElement img = r.findElement(By.cssSelector("img"));
                    String src = img.getAttribute("src");
                    String code = extractCodeFromImg(src);

                    if (!map.containsKey(code)) continue;

                    List<WebElement> td = r.findElements(By.tagName("td"));
                    if (td.size() < 7) continue;

                    TeamEntity team = map.get(code);

                    int rank = toInt(td.get(0).getText());
                    int played = toInt(td.get(2).getText());
                    int points = toInt(td.get(3).getText());
                    int won = toInt(td.get(4).getText());
                    int draw = toInt(td.get(5).getText());
                    int lost = toInt(td.get(6).getText());

                    team.setTeamRank(rank);
                    team.setTeamPlayed(played);
                    team.setTeamPoint(points);
                    team.setTeamWon(won);
                    team.setTeamDraw(draw);
                    team.setTeamLost(lost);

                    System.out.printf("✔ %s(%s): %d위 / %d점 / %d승 %d무 %d패\n",
                            team.getName(), code, rank, points, won, draw, lost);

                } catch (NoSuchElementException ignore) {}
            }
        }
    }


    /* ============================================================
     * 🟣 K리그2 테이블 파싱
     * (team-rank-tbl 내부 구조: a[href], title, teamId 이용)
     * ============================================================ */
    private void parseKLeague2(WebDriver driver, Map<String, TeamEntity> map) {

        List<WebElement> rows = driver.findElements(By.cssSelector("#team-rank-tbl tr"));
        System.out.println("▶ K리그2 rows : " + rows.size());

        for (WebElement r : rows) {
            try {
                List<WebElement> td = r.findElements(By.tagName("td"));
                if (td.size() < 7) continue;

                // 1) 순위
                int rank = toInt(td.get(0).getText());

                // 2) <a href="/club/club.do?teamId=K18" title="인천">
                WebElement a = td.get(1).findElement(By.tagName("a"));
                String teamCode = extractTeamCodeFromLink(a.getAttribute("href")); // → K18
                String teamName = a.getAttribute("title"); // → 인천

                if (!map.containsKey(teamCode)) {
                    System.out.println("⛔ K리그2 팀 매핑 실패: " + teamCode + " / " + teamName);
                    continue;
                }

                TeamEntity team = map.get(teamCode);

                int played = toInt(td.get(2).getText());
                int points = toInt(td.get(3).getText());
                int won = toInt(td.get(4).getText());
                int draw = toInt(td.get(5).getText());
                int lost = toInt(td.get(6).getText());

                team.setTeamRank(rank);
                team.setTeamPlayed(played);
                team.setTeamPoint(points);
                team.setTeamWon(won);
                team.setTeamDraw(draw);
                team.setTeamLost(lost);

                System.out.printf("✔ [K리그2] %s(%s): %d위 / %d점 / %d승 %d무 %d패\n",
                        teamName, teamCode, rank, points, won, draw, lost);

            } catch (NoSuchElementException ignore) {}
        }
    }

    /* ============================================================
     * 🔤 문자열 → 숫자 변환
     * ============================================================ */
    private int toInt(String s) {
        try { return Integer.parseInt(s.trim()); }
        catch (Exception e) { return 0; }
    }

    /* ============================================================
     * 🟦 이미지 URL에서 코드 추출 (K01, K09…)
     * ============================================================ */
    private String extractCodeFromImg(String url) {
        int idx = url.indexOf("emblem_");
        if (idx == -1) return "";
        return url.substring(idx + 7, idx + 10); // K01 ~ K39
    }

    /* ============================================================
     * 🟧 팀 링크에서 teamCode(K18 등) 추출
     * ============================================================ */
    private String extractTeamCodeFromLink(String href) {
        if (href == null) return "";
        if (!href.contains("teamId=")) return "";
        return href.substring(href.indexOf("teamId=") + 7); // teamId=K18 → K18
    }
}
