package org.example.allinone_sports.domain.follow.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.user.entity.UserEntity;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "user_team_follow",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "team_id"}) // 중복 팔로우 방지 (DB 레벨)
        }
)
public class FollowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // UserEntity와 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    // referencedColumnName을 생략하면 UserEntity의 @Id 컬럼을 자동으로 찾습니다.
    private UserEntity user;

    // TeamEntity와 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, referencedColumnName = "team_id")
    // 중요: TeamEntity의 @Column(name="teamid")와 철자가 정확히 일치해야 합니다.
    private TeamEntity team;
}