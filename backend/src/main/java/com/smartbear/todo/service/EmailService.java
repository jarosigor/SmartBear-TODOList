package com.smartbear.todo.service;

import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.MimeMessageHelper;

public interface EmailService {
    public void sendEmail(String emailTo,
                          String subject,
                          String body);
}
