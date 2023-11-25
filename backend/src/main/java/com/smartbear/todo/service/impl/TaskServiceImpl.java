package com.smartbear.todo.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartbear.todo.dao.UserDao;
import com.smartbear.todo.dto.TaskDto;
import com.smartbear.todo.entity.Task;
import com.smartbear.todo.repository.TaskRepository;
import com.smartbear.todo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository repository;
    private final ObjectMapper objectMapper;
    private final UserDao userDao;
    private final EmailServiceImpl emailService;

    @Value("${spring.mail.properties.scheduledEmailTo}")
    private String scheduledEmailTo;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public TaskDto saveTask(TaskDto taskDTO) {
        var user = userDao.getCurrentUser();
        Task taskEntity = convertDtoToEntity(taskDTO);
        taskEntity.setUser(user);
        return convertEntityToDto(repository.save(taskEntity));
    }

    public List<TaskDto> saveTasks(List<TaskDto> tasks) {
        List<Task> tasksEntities = tasks.stream().map(this::convertDtoToEntity).toList();
        return repository.saveAll(tasksEntities)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> getTasks() {
        var user = userDao.getCurrentUser();
        return repository.findByUser_Id(user.getId())
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public TaskDto getTaskById(Long id) {
        var task = repository.findById(id);
        if(task.isPresent()) {
            return convertEntityToDto(task.get());
        }
        throw new RuntimeException("Task with given id not found");
    }

    public List<TaskDto> getTasksByDate(LocalDate date) {
        return repository.findByDueDate(date)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    public String deleteTaskById(Long id) {
        repository.deleteById(id);
        return "Task " + id + " deleted";
    }

    public TaskDto updateTask(TaskDto taskDTO) {
        Task existingTask = repository.findById(convertDtoToEntity(taskDTO).getId()).orElse(null);
        System.out.println(existingTask);
        if (existingTask == null) {
            logger.error("Could not find given task to delete");
            return null;
        }

        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setCompleted(taskDTO.isCompleted());
        existingTask.setDueDate(taskDTO.getDueDate());
        existingTask.setPriority(taskDTO.getPriority());

        return convertEntityToDto(repository.save(existingTask));
    }

    @Scheduled(cron = "0 0 7 * * ?")
    public void sendScheduledEmail() {
        var tasks = getTasks();
        StringBuilder body = new StringBuilder();
        body.append("Dear User,\n\n");
        body.append("Here are your tasks for today:\n");

        for (int i = 0; i < tasks.size(); i++) {
            body.append(String.format("%d. %s\n", i + 1, tasks.get(i)));
        }

        body.append("\n\nBest regards,\nYour Task Reminder");
        String scheduledSubject = "Tasks Reminder";
        logger.info("Sending email to: " + scheduledEmailTo);
        emailService.sendEmail(scheduledEmailTo, scheduledSubject, body.toString());
    }

    public TaskDto convertEntityToDto(Task taskEntity) {
        return objectMapper.convertValue(taskEntity, TaskDto.class);
    }

    public Task convertDtoToEntity(TaskDto taskDTO) {
        return objectMapper.convertValue(taskDTO, Task.class);
    }
}
