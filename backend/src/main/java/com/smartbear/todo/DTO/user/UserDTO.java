package com.smartbear.todo.DTO.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
}
