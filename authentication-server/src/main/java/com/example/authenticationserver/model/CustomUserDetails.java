package com.example.authenticationserver.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails extends User implements UserDetails {

    public CustomUserDetails(final User user) {
        super(user);
    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//
//        return getRoles()
//                .stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" +role.getName()))
//                .collect(Collectors.toSet());
//    }

//    @Override
//    public Set<Role> getRoles() {
//        return roles;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}