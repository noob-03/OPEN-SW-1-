package org.example.allinone_sports.domain.message.repository;

import org.example.allinone_sports.domain.message.entity.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * 채팅 메시지 엔티티에 대한 데이터 접근 리포지토리.
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {

    /**
     * 특정 방 ID에 대한 메시지 목록을 시간순으로 조회합니다.
     */
    List<ChatMessageEntity> findByRoomIdOrderByTimestampAsc(UUID roomId);
}