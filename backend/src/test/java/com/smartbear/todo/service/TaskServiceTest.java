package com.smartbear.todo.service;

import com.smartbear.todo.entity.task.Task;
import com.smartbear.todo.repository.task.TaskRepository;
import com.smartbear.todo.service.task.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    @Mock
    private TaskRepository repository;
    @InjectMocks
    private TaskService underTest;

    @Nested
    class WhenSavingTask {
        @Mock
        private Task task;

        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenSavingTasks {
        @Mock
        private Task task;

        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenGettingTasks {
        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenGettingTaskByTitle {
        private final String TITLE = "TITLE";

        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenGettingTaskById {
        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenGettingTasksByDate {
        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenDeletingTaskById {
        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenUpdatingTask {
        @Mock
        private Task task;

        @BeforeEach
        void setup() {
        }
    }
}
