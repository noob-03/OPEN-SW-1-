package org.example.allinone_sports.domain.message.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 채팅 메시지 내용을 담는 JPA 엔티티.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chat_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 메시지 전송 시점
    @CreationTimestamp
    private LocalDateTime timestamp;

    // 메시지 유형 (ENTER, QUIT, TALK)
    @Enumerated(EnumType.STRING)
    private MessageType type;

    // 메시지 내용
    private String content;

    // 메시지 발신자
    private String sender;

    // 메시지가 속한 방 ID (Entity 참조 대신 단순 ID 사용)
    private UUID roomId;

    // Getter와 Setter가 모두 필요합니다.
    public void setEnterMessage() {
        this.content = this.sender + "님이 입장하셨습니다.";
        this.type = MessageType.ENTER;
    }
}