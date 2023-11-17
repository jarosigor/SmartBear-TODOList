package com.smartbear.todo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartbear.todo.DTO.UserDTO;
import com.smartbear.todo.entity.User;
import com.smartbear.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository repository;
    private final ObjectMapper objectMapper;


    @Autowired
    UserService(UserRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public UserDTO getUserById(Long id) {
        return (UserDTO) repository.findById(id)
                .stream()
                .map(this::convertEntityToDto);
    }

    public UserDTO getUserByEmail(String email) {
        return convertEntityToDto(repository.findByEmail(email));
    }

    public List<UserDTO> getUsers() {
        return repository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public UserDTO saveUser(UserDTO userDTO) {
        User userEntity = convertDtoToEntity(userDTO);
        return convertEntityToDto(repository.save(userEntity));
    }

    public String deleteUserById(Long id) {
        repository.deleteById(id);
        return "User " + id + " deleted";
    }

    public UserDTO updateUser(UserDTO userDTO) {
        User existingUser = repository.findById(userDTO.getId()).orElse(null);

        if (existingUser == null) {
            System.out.println("Could not find given user to delete");
            return null;
        }

        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());

        return convertEntityToDto(existingUser);
    }

    public UserDTO convertEntityToDto(User userEntity) {
        return objectMapper.convertValue(userEntity, UserDTO.class);
    }

    public User convertDtoToEntity(UserDTO userDTO) {
        return objectMapper.convertValue(userDTO, User.class);
    }




}
