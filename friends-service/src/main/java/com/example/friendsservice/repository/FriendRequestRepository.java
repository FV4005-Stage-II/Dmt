package com.example.friendsservice.repository;


import com.example.friendsservice.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    List<FriendRequest> findByReceiverIdAndStatus(String receiverId, String status);
    List<FriendRequest> findBySenderIdAndStatus(String senderId, String status);
}