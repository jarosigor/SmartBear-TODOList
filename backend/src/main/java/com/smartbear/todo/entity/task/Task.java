package com.smartbear.todo.entity.task;

import com.smartbear.todo.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "todo")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @DateTimeFormat
    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "priority")
    private String priority;

    @Column(name = "completed")
    private boolean completed;

    @ManyToOne
    private User user;
}