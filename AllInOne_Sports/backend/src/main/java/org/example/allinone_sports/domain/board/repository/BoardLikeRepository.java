package org.example.allinone_sports.domain.board.repository;

import org.example.allinone_sports.domain.board.entity.BoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {
    Optional<BoardLikeEntity> findByBoardIdAndUserId(Long boardId, Long userId);
    Long countByBoardId(Long boardId);
}