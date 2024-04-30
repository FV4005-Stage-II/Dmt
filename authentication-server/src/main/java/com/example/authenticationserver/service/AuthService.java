package com.example.authenticationserver.service;


import com.example.authenticationserver.model.User;
import com.example.authenticationserver.payload.SignUpRequest;
import com.example.authenticationserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {


    final private UserRepository userRepository;
    final private PasswordEncoder passwordEncoder;
    final private AuthenticationManager authenticationManager;
    final private JwtService jwtService;

    public String registerUser(SignUpRequest signUpRequest) { // внести правки - проверки

        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(
                User.builder()
                        .username(signUpRequest.getUsername())
                        .email(signUpRequest.getEmail())
                        .password(passwordEncoder.encode(signUpRequest.getPassword()))
                        .build()
        );
        log.info("user is registered");
        return "user is registered";
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
