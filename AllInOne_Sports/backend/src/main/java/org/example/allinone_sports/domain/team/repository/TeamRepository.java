package org.example.allinone_sports.domain.team.repository;


import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    Optional<TeamEntity> findByName(String name);

    List<TeamEntity> findBySportId(Integer sportId);

    Optional<TeamEntity> findByTeamCode(String teamCode);
}
