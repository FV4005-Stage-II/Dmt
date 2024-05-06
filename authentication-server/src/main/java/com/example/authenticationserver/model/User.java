package com.example.authenticationserver.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    public User(User user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        this.active = user.active;
//        this.userProfile = user.userProfile;
//        this.roles = user.roles;
    }

    @Id
    protected String id;

    @NotBlank
    @Size(max = 15)
    protected String username;

    @NotBlank
    @Size(max = 100)
    @JsonIgnore
    protected String password;

    @NotBlank
    @Size(max = 40)
    @Email
    protected String email;

    @CreatedDate
    protected Instant createdAt;

    @LastModifiedDate
    protected Instant updatedAt;

    protected boolean active;
//    protected Profile userProfile;
//    protected Set<Role> roles;
}
