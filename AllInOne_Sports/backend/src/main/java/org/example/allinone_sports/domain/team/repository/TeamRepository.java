package org.example.allinone_sports.domain.team.repository;


import org.example.allinone_sports.domain.team.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    // sport_id 로 팀 조회
    List<TeamEntity> findBySport_Sportid(Long sportId);
}
