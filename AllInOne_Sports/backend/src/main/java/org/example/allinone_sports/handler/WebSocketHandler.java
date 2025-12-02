package org.example.allinone_sports.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.allinone_sports.domain.message.entity.ChatMessageEntity;
import org.example.allinone_sports.domain.message.entity.ChatRoomEntity;
import org.example.allinone_sports.domain.message.entity.MessageType;
import org.example.allinone_sports.domain.message.service.ChatService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    // [중요] 세션 관리를 위한 메모리 저장소 추가 (Key: Room ID, Value: Session Set)
    // DB 조회 객체에 의존하지 않고, 핸들러가 직접 활성화된 세션을 관리합니다.
    private final Map<UUID, Set<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();

    /**
     * 클라이언트가 접속 시 호출
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("[웹소켓 연결 성공] Session ID: {}", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        try {
            // 1. 수신된 JSON 메시지를 파싱
            String payload = textMessage.getPayload();
            ChatMessageEntity chatMessage = objectMapper.readValue(payload, ChatMessageEntity.class);
            UUID roomId = chatMessage.getRoomId();

            // 2. 방 존재 여부 확인 (DB 조회)
            ChatRoomEntity chatRoom = chatService.findRoomById(roomId);

            if (chatRoom != null) {
                // 3. 메시지 타입에 따른 로직 처리
                if (chatMessage.getType().equals(MessageType.ENTER)) {
                    // [수정] 입장 시 roomSessions 맵에 세션 추가
                    // computeIfAbsent: 해당 방 ID의 Set이 없으면 새로 생성, 있으면 가져와서 세션 추가
                    roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);

                    chatMessage.setEnterMessage();
                    log.info("{} 님이 방 {} 에 입장했습니다.", chatMessage.getSender(), roomId);

                } else if (chatMessage.getType().equals(MessageType.QUIT)) {
                    // [수정] 퇴장 시 roomSessions 맵에서 세션 제거
                    Set<WebSocketSession> sessions = roomSessions.get(roomId);
                    if (sessions != null) {
                        sessions.remove(session);
                    }
                    chatMessage.setContent(chatMessage.getSender() + "님이 퇴장하셨습니다.");
                }

                // 4. DB에 일반 메시지 저장 (ENTER, QUIT는 저장 안 함, TALK만 저장)
                if (chatMessage.getType().equals(MessageType.TALK)) {
                    chatService.saveMessage(chatMessage);
                }

                // 5. [수정] 메모리에 저장된 해당 방의 모든 세션에게 메시지 전송
                // chatRoom.getSessions() 대신 roomSessions 맵을 사용
                Set<WebSocketSession> sessions = roomSessions.getOrDefault(roomId, Collections.emptySet());

                sessions.parallelStream().forEach(s -> {
                    chatService.sendMessage(s, chatMessage);
                });
            }
        } catch (Exception e) {
            log.error("메시지 처리 중 오류 발생", e);
        }
    }

    /**
     * 접속 종료 시 호출
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("[웹소켓 연결 해제] Session ID: {}", session.getId());

        // [수정] 연결이 끊어진 세션을 모든 방 목록에서 제거하여 메모리 누수 방지
        roomSessions.values().forEach(sessions -> sessions.remove(session));
    }
}