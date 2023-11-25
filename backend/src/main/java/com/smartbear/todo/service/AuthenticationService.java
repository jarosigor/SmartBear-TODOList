package com.smartbear.todo.service;

import com.smartbear.todo.dto.AuthenticationResponse;
import com.smartbear.todo.dto.UserDto;
import com.smartbear.todo.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    public AuthenticationResponse authenticate(UserDto userDTO);
    public AuthenticationResponse register(UserDto userDTO);
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    public void saveUserToken(User user, String jwtToken);
    public void revokeAllUserTokens(User user);
}
