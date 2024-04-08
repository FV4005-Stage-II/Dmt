package com.example.mainpageservice.service;


import com.example.mainpageservice.model.MainPage;
import com.example.mainpageservice.repository.MainPageRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@AllArgsConstructor
public class MainPageService {

    final private MainPageRepository mainPageRepository;

    public Optional<MainPage> findByUsername(String username) {
        log.info("retrieving user {}", username);
        return mainPageRepository.findByUsername(username);
    }
}
