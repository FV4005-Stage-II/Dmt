package com.example.authenticationserver.controller;

import com.example.authenticationserver.model.User;
import com.example.authenticationserver.payload.*;
import com.example.authenticationserver.service.AuthService;
import com.example.authenticationserver.service.CustomUserDetails;
import com.example.authenticationserver.service.JwtService;
import com.example.authenticationserver.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/authentication-server")
@AllArgsConstructor
@Slf4j
public class AuthController {

    final private AuthService authService;
    final private JwtService jwtService;
    final private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        log.info("sign-up");
        return new ResponseEntity<>(authService.registerUser(signUpRequest), HttpStatus.CREATED);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        log.info("sign-in");
        String token = authService.signIn(signInRequest.getUsername(), signInRequest.getPassword());
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        return ResponseEntity.ok(jwtService.validateToken(token));
    }

    @GetMapping(value = "/get-self-id", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSelfId(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("get-self-id");
        return ResponseEntity.ok(UserId.builder().id(userDetails.getId())
                        .name(userDetails.getUsername())
                        .profilePicture(userDetails.getProfilePictureUrl())
                        .build());
    }

    @GetMapping(value = "/users/summaries", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findAllUserSummaries(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("retrieving all users summaries");

        return ResponseEntity.ok(userService
                .findAll()
                .stream()
                .filter(user -> !user.getUsername().equals(userDetails.getUsername()))
                .map(this::convertTo));
    }

    private UserSummary convertTo(User user) {
        return UserSummary
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getUsername())
                .profilePicture(user.getProfilePictureUrl())
                .build();
    }
}
