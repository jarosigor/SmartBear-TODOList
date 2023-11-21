package com.smartbear.todo.controller.auth;

import com.smartbear.todo.DTO.user.UserDTO;
import com.smartbear.todo.service.auth.AuthenticationService;
import com.smartbear.todo.util.auth.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody UserDTO userDTO
    ) {
        return ResponseEntity.ok(service.register(userDTO));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> response(
            @RequestBody UserDTO userDTO
    ) {
        return ResponseEntity.ok(service.authenticate(userDTO));
    }
}
