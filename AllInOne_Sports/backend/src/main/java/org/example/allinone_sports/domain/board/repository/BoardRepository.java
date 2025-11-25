package org.example.allinone_sports.domain.board.repository;

import java.util.List;
import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findAllByOrderByModifiedAtDesc();
}