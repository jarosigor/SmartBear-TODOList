package com.smartbear.todo.controller;

import com.smartbear.todo.DTO.TaskDTO;
import com.smartbear.todo.entity.Task;
import com.smartbear.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
public class TaskController {

    private final TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/add-task")
    public ResponseEntity<TaskDTO> addTask(@RequestBody TaskDTO task) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.saveTask(task));
    }

    @PostMapping("/add-tasks")
    public ResponseEntity<List<TaskDTO>> addTasks(@RequestBody List<TaskDTO> tasks) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.saveTasks(tasks));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDTO>> getTasks() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getTasks());
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getTaskById(id));
    }

    @GetMapping("/tasks/{date}")
    public ResponseEntity<List<TaskDTO>> getTasksByDate(@PathVariable LocalDate date) {
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
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO task) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.updateTask(task));
    }
}
