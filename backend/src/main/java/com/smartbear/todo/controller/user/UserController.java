package com.smartbear.todo.controller.user;

import com.smartbear.todo.DTO.user.UserDTO;
import com.smartbear.todo.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService service;

    @Autowired
    UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/add-user")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.saveUser(user));
    }

    @GetMapping("/get-user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUserById(id));
    }

    @GetMapping("/get-user/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getUserByEmail(email));
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserDTO>> getUsers() {
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
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.updateUser(user));
    }
}
