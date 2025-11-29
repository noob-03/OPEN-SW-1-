package org.example.allinone_sports.domain.message.repository;

import org.example.allinone_sports.domain.message.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * 채팅방 엔티티에 대한 데이터 접근 리포지토리.
 */
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, UUID> {
}
