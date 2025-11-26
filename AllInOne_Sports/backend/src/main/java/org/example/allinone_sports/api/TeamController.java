package org.example.allinone_sports.api;

import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    // 팀 전체 조회
    @GetMapping
    public List<TeamEntity> getAllTeams() {
        return teamService.findAllTeams();
    }

    @GetMapping("/sport/{sportId}")
    public List<TeamEntity> getTeamsBySport(@PathVariable Long sportId) {
        return teamService.findBySportId(sportId);
    }


    // 팀 로고 이미지 반환 API
    @GetMapping("/logo/{teamid}")
    public ResponseEntity<byte[]> getTeamLogo(@PathVariable Long teamid) throws IOException {
        TeamEntity team = teamService.findById(teamid);

        if (team == null || team.getLogoUrl() == null) {
            return ResponseEntity.notFound().build();
        }

        URL url = new URL(team.getLogoUrl());

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try (InputStream is = url.openStream()) {
            byte[] buffer = new byte[1024];
            int n;
            while ((n = is.read(buffer)) != -1) {
                baos.write(buffer, 0, n);
            }
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(baos.toByteArray());
    }
}
