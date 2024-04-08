package com.example.mainpageservice.config;

import com.example.mainpageservice.model.MainPage;
import com.example.mainpageservice.repository.MainPageRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class Example {
    final MainPageRepository mainPageRepository;

//    @Bean
//    public void beanExample() {
//        mainPageRepository.save(new MainPage(null, "examole"));
//    }
}
