package com.smartbear.todo.controller;

import com.smartbear.todo.dto.AuthenticationResponse;
import com.smartbear.todo.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;

public interface AuthenticationController {
    @PostMapping("/register")
    ResponseEntity<AuthenticationResponse> register(
            @RequestBody UserDto userDTO
    );

    @PostMapping("/authenticate")
    ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody UserDto userDTO
    );

    @PostMapping("/refresh-token")
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
