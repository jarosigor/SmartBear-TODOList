package com.smartbear.todo.controller;

import com.smartbear.todo.entity.Task;
import com.smartbear.todo.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {
    @Mock
    private TaskService service;
    @InjectMocks
    private TaskController underTest;

    @Nested
    class WhenAddingTask {
        @Mock
        private Task task;

        @BeforeEach
        void setup() {
        }
    }

    @Nested
    class WhenAddingTasks {
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
    class WhenGettingTaskById {
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
