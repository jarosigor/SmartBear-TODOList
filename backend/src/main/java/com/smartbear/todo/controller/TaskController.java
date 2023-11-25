package com.smartbear.todo.controller;

import com.smartbear.todo.dto.TaskDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

public interface TaskController {
    @PostMapping("/add-task")
    ResponseEntity<TaskDto> addTask(@RequestBody TaskDto task);

    @PostMapping("/add-tasks")
    ResponseEntity<List<TaskDto>> addTasks(@RequestBody List<TaskDto> tasks);

    @GetMapping("/tasks")
    ResponseEntity<List<TaskDto>> getTasks();

    @GetMapping("/task-by-id/{id}")
    ResponseEntity<TaskDto> getTaskById(@PathVariable Long id);

    @GetMapping("/tasks-by-date/{date}")
    ResponseEntity<List<TaskDto>> getTasksByDate(@PathVariable LocalDate date);

    @DeleteMapping("/delete-task/{id}")
    ResponseEntity<String> deleteTaskById(@PathVariable Long id);

    @PutMapping("/update-task")
    ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto task);
}
