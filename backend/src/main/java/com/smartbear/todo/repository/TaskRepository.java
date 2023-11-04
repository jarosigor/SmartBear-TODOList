package com.smartbear.todo.repository;

import com.smartbear.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("select t from Task t where t.dueDate = ?1")
    List<Task> findByDueDate(LocalDate dueDate);
}
