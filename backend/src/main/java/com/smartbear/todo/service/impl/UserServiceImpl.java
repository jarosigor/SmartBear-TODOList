package com.smartbear.todo.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartbear.todo.dao.UserDao;
import com.smartbear.todo.dto.UserDto;
import com.smartbear.todo.entity.User;
import com.smartbear.todo.enums.UserRole;
import com.smartbear.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements com.smartbear.todo.service.UserService {

    private final UserRepository repository;
    private final ObjectMapper objectMapper;
    private final UserDao userDao;

    public UserDto getUser() {
        User user = userDao.getCurrentUser();
        System.out.println(user);
        return convertEntityToDto(user);
    }

    public UserDto getUserById(Long id) {
        return (UserDto) repository.findById(id)
                .stream()
                .map(this::convertEntityToDto);
    }

    public UserDto getUserByEmail(String email) {
        return convertEntityToDto(repository.findByEmail(email).orElse(null));
    }

    public List<UserDto> getUsers() {
        return repository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public UserDto saveUser(UserDto userDTO) {
        User userEntity = convertDtoToEntity(userDTO);
        userEntity.setRole(UserRole.USER);
        return convertEntityToDto(repository.save(userEntity));
    }

    public String deleteUserById(Long id) {
        repository.deleteById(id);
        return "User " + id + " deleted";
    }

    public UserDto updateUser(UserDto userDTO) {
        User existingUser = repository.findById(userDTO.getId()).orElse(null);

        if (existingUser == null) {
            System.out.println("Could not find given user to delete");
            return null;
        }

        existingUser.setFirstname(userDTO.getFirstname());
        existingUser.setLastname(userDTO.getLastname());

        return convertEntityToDto(existingUser);
    }

    public UserDto convertEntityToDto(User userEntity) {
        return objectMapper.convertValue(userEntity, UserDto.class);
    }

    public User convertDtoToEntity(UserDto userDTO) {
        return objectMapper.convertValue(userDTO, User.class);
    }




}
