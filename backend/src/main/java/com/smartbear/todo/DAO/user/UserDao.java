package com.smartbear.todo.DAO.user;

import com.smartbear.todo.entity.User;
import com.smartbear.todo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserDao {

    private final UserRepository userRepository;

    public UserDao(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return  userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("DAO sie wyjebao"));
    }
}