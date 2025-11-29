package org.example.allinone_sports.domain.follow.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.follow.entity.FollowEntity;
import org.example.allinone_sports.domain.follow.repository.FollowRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.example.allinone_sports.domain.user.entity.UserEntity;
import org.example.allinone_sports.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowService {

    private final FollowRepository followRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    // 팔로우 토글 기능 (했다가 안했다가)
    // [수정] userId를 String으로 변경 (로그인 아이디 "sang" 등을 받음)
    public String toggleFollow(String userId, Long teamId) {

        // [수정] findByUsernameAndIsLock 사용 (정지된 유저는 팔로우 불가)
        UserEntity user = userRepository.findByUsernameAndIsLock(userId, false)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 유저입니다 (ID 없음 또는 정지된 계정): " + userId));

        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("팀을 찾을 수 없습니다. ID: " + teamId));

        // 이미 팔로우 중이면 -> 취소(삭제)
        if (followRepository.existsByUserAndTeam(user, team)) {
            followRepository.deleteByUserAndTeam(user, team);
            return "UNFOLLOW";
        }
        // 팔로우 안 했으면 -> 추가(저장)
        else {
            FollowEntity follow = FollowEntity.builder()
                    .user(user)
                    .team(team)
                    .build();
            followRepository.save(follow);
            return "FOLLOW";
        }
    }

    // 내 팔로우 목록 가져오기
    // [수정] userId를 String으로 변경
    @Transactional(readOnly = true)
    public List<TeamEntity> getMyFollowTeams(String userId) {
        // [디버깅용 로그 추가] 서비스가 실행되는지 확인하는 감시 카메라
        System.out.println("✅ [Service] getMyFollowTeams 진입! 사용자: " + userId);
        // [수정] 마찬가지로 정지되지 않은 유저만 조회 가능
        UserEntity user = userRepository.findByUsernameAndIsLock(userId, false)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 유저입니다 (ID 없음 또는 정지된 계정): " + userId));
        System.out.printf("findByUser print" + followRepository.findByUser(user).stream()
                .toList().toString());
        System.out.println("✅ [Service1] getMyFollowTeams 진입! 사용자: " + userId);

        // Follow 테이블에서 내가 팔로우한 내역을 찾고 -> 거기서 Team 정보만 꺼냄
        return followRepository.findByUser(user).stream()
                .map(FollowEntity::getTeam)
                .collect(Collectors.toList());
    }
}