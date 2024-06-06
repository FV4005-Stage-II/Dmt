package com.example.mainpageservice.service;



import com.example.mainpageservice.model.UserProfile;
import com.example.mainpageservice.repository.UserProfileRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@AllArgsConstructor
public class MainPageService {


    final private UserProfileRepository userProfileRepository;

    public List<UserProfile> getAllProfiles() {
        return userProfileRepository.findAll();
    }

    public Optional<UserProfile> getProfileById(String id) {
        return userProfileRepository.findById(id);
    }

    public void saveUserProfile(UserProfile userProfile) {
        userProfileRepository.save(userProfile);
    }

    public List<UserProfile> searchProfilesByUsername(String username) {
        return userProfileRepository.findByUsernameContaining(username);
    }

    public List<UserProfile> getProfilesByIds(List<String> ids) {
        return userProfileRepository.findAllById(ids);
    }

}
