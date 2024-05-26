package com.example.authenticationserver.payload;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class JwtAuthenticationResponse {
    @NotBlank
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String token) {
        this.accessToken = token;
    }


}

