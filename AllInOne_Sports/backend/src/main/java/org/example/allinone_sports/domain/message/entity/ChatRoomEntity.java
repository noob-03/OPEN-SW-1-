package org.example.allinone_sports.domain.message.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * 채팅방 정보를 담는 JPA 엔티티.
 * transient 필드인 sessions를 사용하여 웹소켓 세션 정보를 임시 관리합니다.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chat_room")
public class ChatRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    private String name;

    // --- WebSocket Session Management (Transient) ---
    // @Transient: JPA가 이 필드를 DB 컬럼으로 매핑하지 않도록 지시합니다.
    // 이 필드는 서버 메모리에서 실시간 세션을 관리하는 데 사용됩니다.
    @Transient
    private Set<WebSocketSession> sessions = new HashSet<>();

    public void addSession(WebSocketSession session) {
        sessions.add(session);
    }

    public void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }
}