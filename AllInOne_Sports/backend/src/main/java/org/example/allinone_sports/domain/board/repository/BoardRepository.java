package org.example.allinone_sports.domain.board.repository;

import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
}
