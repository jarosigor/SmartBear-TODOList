package com.smartbear.todo.service;

import com.smartbear.todo.entity.Task;
import com.smartbear.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    @Autowired
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task saveTask(Task task) {
        return repository.save(task);
    }

    public List<Task> saveTasks(List<Task> tasks) {
        return repository.saveAll(tasks);
    }

    public List<Task> getTasks() {
        return repository.findAll();
    }

    public Task getTaskById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Task> getTasksByDate(LocalDate date) {
        return repository.findByDueDate(date);
    }

}
