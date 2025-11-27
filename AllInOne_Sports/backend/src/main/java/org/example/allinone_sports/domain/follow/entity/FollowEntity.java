package org.example.allinone_sports.domain.follow.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.example.allinone_sports.domain.user.entity.UserEntity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "user_team_follow",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "team_id"}) // 중복 팔로우 방지
        }
)
public class FollowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, referencedColumnName = "teamid")
    private TeamEntity team;
}