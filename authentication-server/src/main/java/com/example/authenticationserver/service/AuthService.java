package com.example.authenticationserver.service;


import com.example.authenticationserver.model.User;
import com.example.authenticationserver.payload.SignUpRequest;
import com.example.authenticationserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {


    final private UserRepository userRepository;
    final private PasswordEncoder passwordEncoder;
    final private AuthenticationManager authenticationManager;
    final private JwtService jwtService;


    final private RestTemplate restTemplate;

    private static final String MAIN_PAGE_SERVICE_URL = "http://localhost:8091/main-page/add-profile";

    public String registerUser(SignUpRequest signUpRequest) {
        // Проверка на существование пользователя с таким же именем пользователя
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        // Проверка на существование пользователя с таким же email
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Сохранение пользователя
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .gender(signUpRequest.getGender())
                .dateOfBirth(signUpRequest.getDateOfBirth())
                .active(true)
                .build();
        userRepository.save(user);

        // Отправка данных пользователя на микросервис главной страницы
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(MAIN_PAGE_SERVICE_URL, user, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                userRepository.deleteById(user.getId());
                throw new RuntimeException("Failed to send user data to main page service");
            }
        } catch (Exception e) {
            userRepository.deleteById(user.getId());
            throw new RuntimeException("Failed to send user data to main page service", e);

        }

        return "User is registered";
    }

    public String signIn(String username, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        log.info("AuthService");
        return jwtService.generateToken(authentication);
    }


//    public String signIn(String username) {
//        Authentication authentication = authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
//
//        return tokenProvider.generateToken(authentication);
//    }

}
