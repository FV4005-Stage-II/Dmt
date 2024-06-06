package com.example.friendsservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "friends")
public class Friend {
    @Id
    private String id;
    private String userId;
    private String friendId;

}