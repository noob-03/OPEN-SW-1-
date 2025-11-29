package org.example.allinone_sports.domain.player.repository;

import org.example.allinone_sports.domain.player.entity.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PlayerRepository extends JpaRepository<PlayerEntity, Long> {

    List<PlayerEntity> findByTeamId(Long teamId);

    void deleteByTeamId(Long teamId);
}


