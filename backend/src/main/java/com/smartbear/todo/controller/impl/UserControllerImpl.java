package com.smartbear.todo.controller.impl;

import com.smartbear.todo.dto.UserDto;
import com.smartbear.todo.controller.UserController;
import com.smartbear.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class UserControllerImpl implements UserController {
    private final UserService service;

    @Autowired
    UserControllerImpl(UserService service) {
        this.service = service;
    }

    @PostMapping("/add-user")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.saveUser(userDTO));
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUser());
    }


    @GetMapping("/get-user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUserById(id));
    }

    @GetMapping("/get-user/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUserByEmail(email));
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUsers());
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.deleteUserById(id));
    }

    @PutMapping("/update-user")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDTO) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.updateUser(userDTO));
    }
}
