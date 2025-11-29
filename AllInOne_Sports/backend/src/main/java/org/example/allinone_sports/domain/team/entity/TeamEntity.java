package org.example.allinone_sports.domain.team.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "team")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long teamId;

    private Integer sportId; // 1 = KBO, 2 = KLeague
    private String teamCode;   // K01, K02, ...
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
}
