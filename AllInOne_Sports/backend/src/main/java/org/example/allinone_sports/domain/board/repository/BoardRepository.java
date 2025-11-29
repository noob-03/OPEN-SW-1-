package org.example.allinone_sports.domain.board.repository;

import java.util.List;
import org.example.allinone_sports.domain.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    // 기존 전체 조회 (사용 안함)
    List<BoardEntity> findAllByOrderByModifiedAtDesc();

    // 1. 스포츠 종목(sportsType)만으로 필터링 (전체 탭용)
    List<BoardEntity> findAllBySportsTypeOrderByModifiedAtDesc(String sportsType);

    // 2. 스포츠 종목 + 게시글 타입(postType)으로 필터링 (티켓, 동행 탭용)
    List<BoardEntity> findAllBySportsTypeAndPostTypeOrderByModifiedAtDesc(String sportsType, String postType);
}