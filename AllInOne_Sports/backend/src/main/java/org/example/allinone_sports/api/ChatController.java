package org.example.allinone_sports.api;

import lombok.RequiredArgsConstructor;
import org.example.allinone_sports.domain.message.entity.ChatMessageEntity;
import org.example.allinone_sports.domain.message.entity.ChatRoomEntity;
import org.example.allinone_sports.domain.message.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * 채팅방 목록 조회, 생성, 히스토리 조회를 위한 REST API 컨트롤러.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatService chatService;

    // 1. 모든 채팅방 목록 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomEntity>> findAllRooms() {
        return ResponseEntity.ok(chatService.findAllRooms());
    }

    // 2. 채팅방 생성
    @PostMapping("/rooms")
    public ResponseEntity<ChatRoomEntity> createRoom(@RequestBody ChatRoomEntity room) {
        return ResponseEntity.ok(chatService.createRoom(room.getName()));
    }

    // 3. 채팅방 히스토리 조회
    @GetMapping("/rooms/{roomId}/history")
    public ResponseEntity<List<ChatMessageEntity>> getHistory(@PathVariable UUID roomId) {
        return ResponseEntity.ok(chatService.getMessageHistory(roomId));
    }
}