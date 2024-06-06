package com.example.friendsservice.controller;

import com.example.friendsservice.model.Friend;
import com.example.friendsservice.model.FriendRequest;
import com.example.friendsservice.model.UserProfile;
import com.example.friendsservice.service.FriendService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/friends-service")
@AllArgsConstructor
public class FriendController {

    final private FriendService friendService;

    // Отправить заявку в друзья
    @PostMapping("/request")
    public ResponseEntity<FriendRequest> sendFriendRequest(@RequestParam String senderId, @RequestParam String receiverId) {
        FriendRequest request = friendService.sendFriendRequest(senderId, receiverId);
        return ResponseEntity.ok(request);
    }

    // Получить список заявок в друзья
    @GetMapping("/requests")
    public ResponseEntity<List<FriendRequest>> getPendingRequests(@RequestParam String receiverId) {
        List<FriendRequest> requests = friendService.getPendingRequests(receiverId);
        return ResponseEntity.ok(requests);
    }

    // Принять заявку в друзья
    @PostMapping("/request/{requestId}/accept")
    public ResponseEntity<Void> acceptFriendRequest(@PathVariable String requestId) {
        friendService.acceptFriendRequest(requestId);
        return ResponseEntity.ok().build();
    }

    // Отклонить заявку в друзья
    @PostMapping("/request/{requestId}/decline")
    public ResponseEntity<Void> declineFriendRequest(@PathVariable String requestId) {
        friendService.declineFriendRequest(requestId);
        return ResponseEntity.ok().build();
    }

    // Получить список друзей пользователя

    @GetMapping("/friends-with-profiles")
    public ResponseEntity<List<UserProfile>> getFriendsWithProfiles(@RequestParam String userId) {
        List<UserProfile> friendsWithProfiles = friendService.getFriendsWithProfiles(userId);
        return ResponseEntity.ok(friendsWithProfiles);
    }

}

