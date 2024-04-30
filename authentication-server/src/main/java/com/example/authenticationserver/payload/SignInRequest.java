package com.example.authenticationserver.payload;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignInRequest {
    @NotBlank
    @Size(min = 3, max = 40)
    String username;

    @NotBlank
    @Size(min = 6, max = 20)
    String password;
}
