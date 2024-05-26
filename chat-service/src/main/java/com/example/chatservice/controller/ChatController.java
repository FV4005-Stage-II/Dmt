package com.example.chatservice.controller;

import com.example.chatservice.model.ChatMessage;
import com.example.chatservice.model.ChatNotification;
import com.example.chatservice.service.ChatMessageService;
import com.example.chatservice.service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@Slf4j
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired private ChatMessageService chatMessageService;
    @Autowired private ChatRoomService chatRoomService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId.get());

        ChatMessage saved = chatMessageService.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(),"/queue/messages",
                new ChatNotification(
                        saved.getId(),
                        saved.getSenderId(),
                        saved.getSenderName()));
    }

    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public ResponseEntity<Long> countNewMessages(
            @PathVariable String senderId,
            @PathVariable String recipientId) {
        log.info("countNewMessages");
        return ResponseEntity
                .ok(chatMessageService.countNewMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages ( @PathVariable String senderId,
                                                @PathVariable String recipientId) {
        log.info("findChatMessages");
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<?> findMessage ( @PathVariable String id) {
        log.info("findMessage");
        return ResponseEntity
                .ok(chatMessageService.findById(id));
    }
    @GetMapping("/test")
    public ResponseEntity<?> test () {
        log.info("test");
        return ResponseEntity
                .ok("test");
    }
}
