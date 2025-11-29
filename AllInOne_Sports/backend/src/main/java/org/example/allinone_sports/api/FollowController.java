package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.follow.service.FollowService;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class FollowController {

    private final FollowService followService;

    // 1. 팔로우 버튼 클릭 시 호출
    @PostMapping("/{teamId}")
    public ResponseEntity<String> toggleFollow(
            @PathVariable Long teamId,
            @RequestParam String userId // [확인] String이어야 함
    ) {
        // 디버깅용 로그
        System.out.println("👉 팔로우 요청 도착! ID: " + userId);
        String result = followService.toggleFollow(userId, teamId);
        return ResponseEntity.ok(result);
    }

    // 2. 내 팔로우 목록 가져오기 (페이지 로딩 시 호출)
    // [중요] 여기가 Long이면 400 에러가 납니다! String으로 꼭 바꿔주세요.
    @GetMapping("/my")
    public ResponseEntity<List<TeamEntity>> getMyTeams(@RequestParam String userId) { // [확인] String이어야 함
        // 디버깅용 로그
        System.out.println("👉 목록 조회 요청 도착! ID: " + userId);

        List<TeamEntity> myTeams = followService.getMyFollowTeams(userId);
        return ResponseEntity.ok(myTeams);
    }
}