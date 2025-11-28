package org.example.allinone_sports.domain.message.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.allinone_sports.domain.message.entity.ChatMessageEntity;
import org.example.allinone_sports.domain.message.entity.ChatRoomEntity;
import org.example.allinone_sports.domain.message.entity.MessageType;
import org.example.allinone_sports.domain.message.repository.ChatMessageRepository;
import org.example.allinone_sports.domain.message.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * 채팅방, 메시지 처리 및 WebSocket 통신을 담당하는 서비스 레이어.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ObjectMapper objectMapper;
    private final ChatRoomRepository roomRepository;
    private final ChatMessageRepository messageRepository;

    // --- Room Management ---

    @Transactional
    public ChatRoomEntity createRoom(String roomName) {
        ChatRoomEntity room = new ChatRoomEntity();
        room.setName(roomName);
        return roomRepository.save(room);
    }

    public List<ChatRoomEntity> findAllRooms() {
        return roomRepository.findAll();
    }

    public ChatRoomEntity findRoomById(UUID roomId) {
        // DB에서 방을 찾은 후, 현재 메모리에 있는 세션 정보로 다시 로드하여 반환 (핸들러에서 사용)
        return roomRepository.findById(roomId).orElse(null);
    }

    // --- Message Management ---

    @Transactional
    public ChatMessageEntity saveMessage(ChatMessageEntity message) {
        // TALK 타입 메시지만 DB에 저장
        if (message.getType() == MessageType.TALK) {
            return messageRepository.save(message);
        }
        return message;
    }

    public List<ChatMessageEntity> getMessageHistory(UUID roomId) {
        return messageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }

    // --- WebSocket Communication ---

    /**
     * 특정 세션으로 메시지를 전송합니다.
     */
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            // 메시지 객체를 JSON 문자열로 변환하여 TextMessage로 래핑 후 전송
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
