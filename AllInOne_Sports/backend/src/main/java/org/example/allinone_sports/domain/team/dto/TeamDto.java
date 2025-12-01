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

    private Integer sportId;
    private String teamCode;
    private String name;
    private String logoUrl;
    private String league;
    private String snsLink;
    private String ticketLink;
    private String teamLink;
    private String teamStadium;
    private Integer teamRank;
    private Integer teamPlayed;
    private Integer teamPoint;
    private Integer teamWon;
    private Integer teamLost;
    private Integer teamDraw;

    // Entity → DTO 전체 변환
    public static TeamDto fromEntity(TeamEntity team) {
        // ⭐ [추가] team 객체가 null이면 바로 null 리턴 (NPE 방지)
        if (team == null) {
            return null;
        }
        return TeamDto.builder()
                .teamId(team.getTeamId())
                .sportId(team.getSportId())
                .teamCode(team.getTeamCode())
                .name(team.getName())
                .logoUrl(team.getLogoUrl())
                .league(team.getLeague())
                .snsLink(team.getSnsLink())
                .ticketLink(team.getTicketLink())
                .teamLink(team.getTeamLink())
                .teamStadium(team.getTeamStadium())
                .teamRank(team.getTeamRank())
                .teamPlayed(team.getTeamPlayed())
                .teamPoint(team.getTeamPoint())
                .teamWon(team.getTeamWon())
                .teamLost(team.getTeamLost())
                .teamDraw(team.getTeamDraw())
                .build();
    }
}
