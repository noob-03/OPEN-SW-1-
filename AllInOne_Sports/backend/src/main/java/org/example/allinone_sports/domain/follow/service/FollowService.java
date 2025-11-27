package org.example.allinone_sports.domain.follow.service;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.follow.entity.FollowEntity;
import org.example.allinone_sports.domain.follow.repository.FollowRepository;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.team.repository.TeamRepository;
import org.example.allinone_sports.domain.user.entity.UserEntity;
import org.example.allinone_sports.domain.user.repository.UserRepository; // 유저 레포지토리 경로 확인
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
    private final UserRepository userRepository; // 유저 정보를 가져오기 위해 필요

    // 팔로우 토글 기능 (했다가 안했다가)
    public String toggleFollow(Long userId, Long teamId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("팀을 찾을 수 없습니다."));

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
    @Transactional(readOnly = true)
    public List<TeamEntity> getMyFollowTeams(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        // Follow 테이블에서 내가 팔로우한 내역을 찾고 -> 거기서 Team 정보만 꺼냄
        return followRepository.findByUser(user).stream()
                .map(FollowEntity::getTeam)
                .collect(Collectors.toList());
    }
}