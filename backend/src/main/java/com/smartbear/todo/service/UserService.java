package com.smartbear.todo.service;

import com.smartbear.todo.dto.UserDto;
import com.smartbear.todo.entity.User;

import java.util.List;

public interface UserService {
    UserDto getUserById(Long id);

    UserDto getUserByEmail(String email);

    List<UserDto> getUsers();

    UserDto saveUser(UserDto userDTO);

    String deleteUserById(Long id);

    UserDto updateUser(UserDto userDTO);

    UserDto convertEntityToDto(User userEntity);

    User convertDtoToEntity(UserDto userDTO);

    UserDto getUser();
}
