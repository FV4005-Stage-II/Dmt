package com.example.mainpageservice.repository;

import com.example.mainpageservice.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    List<UserProfile> findByUsernameContaining(String username);
}