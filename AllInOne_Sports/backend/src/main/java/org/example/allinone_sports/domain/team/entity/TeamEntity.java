package org.example.allinone_sports.domain.team.entity;

import org.example.allinone_sports.domain.sports.entity.SportEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "Team")
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sport_id")
    private SportEntity sport;

    private String name;
    private String logoUrl;
    private String league;
    private String snsLink;
    private String ticketLink;
    private String teamLink;

    public void setSport(SportEntity sport) {
        this.sport = sport;
    }

}
