package com.smartbear.todo.DTO;

import com.smartbear.todo.entity.Role;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private Role role;
}
