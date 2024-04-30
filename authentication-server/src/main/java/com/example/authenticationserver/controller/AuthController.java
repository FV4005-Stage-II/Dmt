package com.example.authenticationserver.controller;


import com.example.authenticationserver.model.User;
import com.example.authenticationserver.payload.JwtAuthenticationResponse;
import com.example.authenticationserver.payload.SignInRequest;
import com.example.authenticationserver.payload.SignUpRequest;
import com.example.authenticationserver.service.AuthService;
import com.example.authenticationserver.service.JwtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AuthController {

    final private AuthService authService;
    final private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        return new ResponseEntity<>(authService.registerUser(signUpRequest),HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        String token = authService.signIn(signInRequest.getUsername(), signInRequest.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody String token) {
        return new ResponseEntity<>(jwtService.validateToken(token), HttpStatus.OK);
    }
//    @GetMapping("/get-token")
//    public ResponseEntity<?> getToken(User user) {
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

//    доделать все запросы на контроллеры и доделать конфиги с безопасностью,
//    потом допилить полное объединение двух проектов и шлюз протестить
}
