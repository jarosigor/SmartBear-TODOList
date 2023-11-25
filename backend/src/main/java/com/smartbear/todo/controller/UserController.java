package com.smartbear.todo.controller;

import com.smartbear.todo.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface UserController {
    @PostMapping("/add-user")
    ResponseEntity<UserDto> addUser(@RequestBody UserDto userDTO);

    @GetMapping("/get-user/{id}")
    ResponseEntity<UserDto> getUserById(@PathVariable Long id);

    @GetMapping("/get-user/{email}")
    ResponseEntity<UserDto> getUserByEmail(@PathVariable String email);

    @GetMapping("/get-users")
    ResponseEntity<List<UserDto>> getUsers();

    @DeleteMapping("/delete-user/{id}")
    ResponseEntity<String> deleteUserById(@PathVariable Long id);

    @PutMapping("/update-user")
    ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDTO);
}
