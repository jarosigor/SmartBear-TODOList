package com.smartbear.todo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartbear.todo.DTO.TaskDTO;
import com.smartbear.todo.DTO.UserDTO;
import com.smartbear.todo.entity.Task;
import com.smartbear.todo.entity.User;
import com.smartbear.todo.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;
    private final ObjectMapper objectMapper;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public TaskService(TaskRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public TaskDTO saveTask(TaskDTO taskDTO) {
        Task taskEntity = convertDtoToEntity(taskDTO);
        return convertEntityToDto(repository.save(taskEntity));
    }

    public List<TaskDTO> saveTasks(List<TaskDTO> tasks) {
        List<Task> tasksEntities = tasks.stream().map(this::convertDtoToEntity).toList();
        return repository.saveAll(tasksEntities)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasks() {
        return repository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskByTitle(String title) {
        return convertEntityToDto(repository.findByTitle(title));
    }

    public TaskDTO getTaskById(Long id) {
        var task = repository.findById(id);
        if(task.isPresent()) {
            return convertEntityToDto(task.get());
        }
        throw new RuntimeException("Task with given id not found");
    }

    public List<TaskDTO> getTasksByDate(LocalDate date) {
        return repository.findByDueDate(date)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public String deleteTaskById(Long id) {
        repository.deleteById(id);
        return "Task " + id + " deleted";
    }

    public TaskDTO updateTask(TaskDTO taskDTO) {
        Task existingTask = repository.findById(convertDtoToEntity(taskDTO).getId()).orElse(null);

        if (existingTask == null) {
            System.out.println("Could not find given task to delete");
            return null;
        }

        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setCompleted(taskDTO.isCompleted());
        existingTask.setDueDate(taskDTO.getDueDate());

        return convertEntityToDto(repository.save(existingTask));
    }

    public TaskDTO convertEntityToDto(Task taskEntity) {
        return objectMapper.convertValue(taskEntity, TaskDTO.class);
    }

    public Task convertDtoToEntity(TaskDTO taskDTO) {
        return objectMapper.convertValue(taskDTO, Task.class);
    }
}
