package org.example.allinone_sports.domain.follow.repository;

import org.example.allinone_sports.domain.follow.entity.FollowEntity;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    // 1. 특정 유저가 팔로우한 기록 다 가져오기
    List<FollowEntity> findByUser(UserEntity user);

    // 2. 이미 팔로우 했는지 확인 (중복 체크용)
    boolean existsByUserAndTeam(UserEntity user, TeamEntity team);

    // 3. 팔로우 취소 (삭제)
    void deleteByUserAndTeam(UserEntity user, TeamEntity team);

    // 4. 특정 유저가 팔로우한 '팀 목록'만 뽑아오기 (성능 최적화용, 필요시 사용)
    // @Query("SELECT f.team FROM TeamFollowEntity f WHERE f.user.id = :userId")
    // List<TeamEntity> findTeamsByUserId(@Param("userId") Long userId);
}