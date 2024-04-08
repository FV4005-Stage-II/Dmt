package com.example.mainpageservice;

import com.example.mainpageservice.model.MainPage;
import com.example.mainpageservice.repository.MainPageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class MainPageServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(MainPageServiceApplication.class, args);
	}

}
