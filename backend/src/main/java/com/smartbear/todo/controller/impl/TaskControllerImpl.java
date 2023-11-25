package com.smartbear.todo.controller.impl;

import com.smartbear.todo.dto.TaskDto;
import com.smartbear.todo.controller.TaskController;
import com.smartbear.todo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("")
@RestController
@RequiredArgsConstructor
public class TaskControllerImpl implements TaskController {

    private final TaskService service;

    @PostMapping("/add-task")
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto task) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.saveTask(task));
    }

    @PostMapping("/add-tasks")
    public ResponseEntity<List<TaskDto>> addTasks(@RequestBody List<TaskDto> tasks) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.saveTasks(tasks));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDto>> getTasks() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getTasks());
    }

    @GetMapping("/task-by-id/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getTaskById(id));
    }

    @GetMapping("/tasks-by-date/{date}")
    public ResponseEntity<List<TaskDto>> getTasksByDate(@PathVariable LocalDate date) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getTasksByDate(date));
    }

    @DeleteMapping("/delete-task/{id}")
    public ResponseEntity<String> deleteTaskById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.deleteTaskById(id));
    }

    @PutMapping("/update-task")
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto task) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.updateTask(task));
    }
}
