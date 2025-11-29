package org.example.allinone_sports.domain.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.allinone_sports.domain.team.entity.TeamEntity;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {
    private Long teamId;
    private String name;
    private String logoUrl;
    private String league;
    private String stadium; // 홈구장 정보가 있다면

    // Entity -> DTO 변환 메서드
    public static TeamDto fromEntity(TeamEntity team) {
        return TeamDto.builder()
                .teamId(team.getTeamId())
                .name(team.getName())
                .logoUrl(team.getLogoUrl())
                .league(team.getLeague())
                .build();
    }
}