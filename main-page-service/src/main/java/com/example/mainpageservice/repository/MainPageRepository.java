package com.example.mainpageservice.repository;

import com.example.mainpageservice.model.MainPage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;



public interface MainPageRepository extends MongoRepository<MainPage, String> {
    Optional<MainPage> findByUsername(String username);
}
