package com.example.authenticationserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    public final static Role DMT_USER = new Role("DMT_USER");
//    public final static Role FACEBOOK_USER = new Role("FACEBOOK_USER");
//    public final static Role GOOGLE_USER = new Role("GOOGLE_USER");

    private String name;
}