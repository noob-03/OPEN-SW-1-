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
public class FollowController {

    private final FollowService followService;

    // 1. 팔로우 버튼 클릭 시 호출
    // 주소 예시: POST /api/follow/100?userId=1 (1번 유저가 100번 팀 팔로우)
    @PostMapping("/{teamId}")
    public ResponseEntity<String> toggleFollow(@PathVariable Long teamId, @RequestParam Long userId) {
        String result = followService.toggleFollow(userId, teamId);
        return ResponseEntity.ok(result); // 결과로 "FOLLOW" 또는 "UNFOLLOW" 문자열을 줍니다.
    }

    // 2. 내 팔로우 목록 가져오기
    // 주소 예시: GET /api/follow/my?userId=1
    @GetMapping("/my")
    public ResponseEntity<List<TeamEntity>> getMyTeams(@RequestParam Long userId) {
        List<TeamEntity> myTeams = followService.getMyFollowTeams(userId);
        return ResponseEntity.ok(myTeams);
    }
}