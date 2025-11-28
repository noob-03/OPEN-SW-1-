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
    @Column(name = "teamid") // DB에는 teamid (전체 소문자)로 되어있음
    private Long teamId;

    @Column(name = "sportId") // DB의 sportId 컬럼과 직접 매핑 (자동 변환 방지)
    private Integer sportId; // 1 = KBO, 2 = KLeague

    @Column(name = "name")
    private String name;

    @Column(name = "logoUrl") // 중요! JPA가 자동으로 logo_url로 찾는 것을 방지
    private String logoUrl;

    @Column(name = "league")
    private String league;

    @Column(name = "snsLink") // 중요! sns_link로 변환 방지
    private String snsLink;

    @Column(name = "ticketLink") // 중요! ticket_link로 변환 방지
    private String ticketLink;

    @Column(name = "teamLink") // 중요! team_link로 변환 방지
    private String teamLink;
}