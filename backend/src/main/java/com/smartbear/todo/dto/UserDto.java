package com.smartbear.todo.dto;

import com.smartbear.todo.enums.UserRole;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private UserRole role;
}
