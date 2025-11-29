package org.example.allinone_sports.domain.follow.repository;

import org.example.allinone_sports.domain.follow.entity.FollowEntity;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {

    // 1. 특정 유저가 팔로우한 기록 다 가져오기
    // select * from user_team_follow where user_id = ?
    List<FollowEntity> findByUser(UserEntity user);

    // 2. 이미 팔로우 했는지 확인 (중복 체크용)
    // select count(*) from user_team_follow where user_id = ? and team_id = ?
    boolean existsByUserAndTeam(UserEntity user, TeamEntity team);

    // 3. 팔로우 취소 (삭제)
    // delete from user_team_follow where user_id = ? and team_id = ?
    void deleteByUserAndTeam(UserEntity user, TeamEntity team);

    // 참고: 성능 최적화를 위해 ID만으로 조회하고 싶다면 아래와 같은 메서드를 추가할 수 있습니다.
    // boolean existsByUser_IdAndTeam_TeamId(Long userId, Long teamId);
}