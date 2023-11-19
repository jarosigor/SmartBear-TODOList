package com.smartbear.todo.DTO.task;

import lombok.Data;
import java.util.Date;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String priority;
    private Date dueDate;
    private boolean completed;
}
