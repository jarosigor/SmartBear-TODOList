package com.smartbear.todo.service;

import com.smartbear.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    @Autowired
    UserService(UserRepository repository) {
        this.repository = repository;
    }
}
