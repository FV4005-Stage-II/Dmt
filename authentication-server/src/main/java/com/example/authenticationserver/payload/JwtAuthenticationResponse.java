package com.example.authenticationserver.payload;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@RequiredArgsConstructor
public class JwtAuthenticationResponse {
    @NotBlank
    private String accessToken;
    private String tokenType = "Bearer";
}

