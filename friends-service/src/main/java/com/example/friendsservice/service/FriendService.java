package com.example.friendsservice.service;


import com.example.friendsservice.model.Friend;
import com.example.friendsservice.model.FriendRequest;
import com.example.friendsservice.model.UserProfile;
import com.example.friendsservice.repository.FriendRepository;
import com.example.friendsservice.repository.FriendRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class FriendService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendRepository friendRepository;
    final private RestTemplate restTemplate;
    public FriendRequest sendFriendRequest(String senderId, String receiverId) {
        String senderName = getSenderName(senderId);
        FriendRequest request = new FriendRequest();
        request.setSenderId(senderId);
        request.setSenderName(senderName); // Устанавливаем имя отправителя
        request.setReceiverId(receiverId);
        request.setStatus("PENDING");
        return friendRequestRepository.save(request);
    }

    private String getSenderName(String senderId) {
        String url = "http://localhost:8091/main-page/profiles/" + senderId;
        ResponseEntity<UserProfile> response = restTemplate.getForEntity(url, UserProfile.class);
        return response.getBody().getUsername();
    }
    public List<FriendRequest> getPendingRequests(String receiverId) {
        return friendRequestRepository.findByReceiverIdAndStatus(receiverId, "PENDING");
    }

    public void acceptFriendRequest(String requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("ACCEPTED");
        friendRequestRepository.save(request);

        Friend friend1 = new Friend();
        friend1.setUserId(request.getSenderId());
        friend1.setFriendId(request.getReceiverId());
        friendRepository.save(friend1);

        Friend friend2 = new Friend();
        friend2.setUserId(request.getReceiverId());
        friend2.setFriendId(request.getSenderId());
        friendRepository.save(friend2);
    }

    public void declineFriendRequest(String requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("DECLINED");
        friendRequestRepository.save(request);
    }

    public List<UserProfile> getFriendsWithProfiles(String userId) {
        List<Friend> friends = friendRepository.findByUserId(userId);
        List<String> friendIds = friends.stream().map(Friend::getFriendId).collect(Collectors.toList());

        // Запрос к сервису профилей для получения данных о пользователях
        ResponseEntity<List<UserProfile>> response = restTemplate.exchange(
                "http://localhost:8091/main-page/profiles/by-ids",
                HttpMethod.POST,
                new HttpEntity<>(friendIds),
                new ParameterizedTypeReference<List<UserProfile>>() {}
        );

        return response.getBody();
    }

}

