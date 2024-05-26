package com.example.authenticationserver.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserId {
    private String userId;
}
