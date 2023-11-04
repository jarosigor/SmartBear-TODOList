package com.smartbear.todo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "todo")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description = "";

    @DateTimeFormat
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "completed")
    private boolean completed;

    @ManyToOne
    private User user;
}