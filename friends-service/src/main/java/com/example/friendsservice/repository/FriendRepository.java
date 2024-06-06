package com.example.friendsservice.repository;

import com.example.friendsservice.model.Friend;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FriendRepository extends MongoRepository<Friend, String> {
    List<Friend> findByUserId(String userId);
    List<Friend> findByFriendId(String friendId);
//    List<Friend> findByFriendNameContaining(String query);
}
