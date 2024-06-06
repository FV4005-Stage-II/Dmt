package com.example.friendsservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "friend_requests")
public class FriendRequest {
    @Id
    private String id;
    private String senderId;
    private String senderName; // Добавляем поле имени отправителя
    private String receiverId;
    private String status; // PENDING, ACCEPTED, DECLINED
}