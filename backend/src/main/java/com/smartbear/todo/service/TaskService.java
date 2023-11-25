package com.smartbear.todo.service;

import com.smartbear.todo.dto.TaskDto;
import com.smartbear.todo.entity.Task;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {
    TaskDto saveTask(TaskDto taskDTO);

    List<TaskDto> saveTasks(List<TaskDto> tasks);

    List<TaskDto> getTasks();

    TaskDto getTaskById(Long id);

    List<TaskDto> getTasksByDate(LocalDate date);

    String deleteTaskById(Long id);

    TaskDto updateTask(TaskDto taskDTO);

    @Scheduled(cron = "0 0 7 * * ?")
    void sendScheduledEmail();

    TaskDto convertEntityToDto(Task taskEntity);

    Task convertDtoToEntity(TaskDto taskDTO);
}
