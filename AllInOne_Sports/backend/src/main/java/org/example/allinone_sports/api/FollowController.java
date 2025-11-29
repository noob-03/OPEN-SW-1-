package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.follow.service.FollowService;
import org.example.allinone_sports.domain.team.dto.TeamDto;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class FollowController {

    private final FollowService followService;

    // 1. 팔로우 토글
    @PostMapping("/{teamId}")
    public ResponseEntity<String> toggleFollow(
            @PathVariable Long teamId,
            @RequestParam("userId") String userId
    ) {
        System.out.println("👉 [POST] 팔로우 요청 도착! ID: " + userId);
        String result = followService.toggleFollow(userId, teamId);
        return ResponseEntity.ok(result);
    }

    // 2. 내 팔로우 목록 조회
    @GetMapping("/my")
    public ResponseEntity<List<TeamDto>> getMyTeams(@RequestParam(value = "userId", required = false) String userId) {
    //public List<TeamEntity> getMyTeams(@RequestParam(value = "userId", required = false) String userId) {
        System.out.println("👉 [GET] 목록 조회 요청 도착! ID: " + userId);

        List<TeamEntity> myTeams = followService.getMyFollowTeams(userId);

        // [핵심] Entity -> DTO 변환
        // DB 객체를 그대로 주지 않고, 껍데기만 갈아끼워서 줍니다. (JSON 변환 오류 해결)
        List<TeamDto> myTeamDTOs = myTeams.stream()
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());

        System.out.println("👉 조회된 팀 개수: " + myTeamDTOs.size());
        return new ResponseEntity<>(myTeamDTOs, HttpStatus.OK);
        //return myTeams;
    }
}