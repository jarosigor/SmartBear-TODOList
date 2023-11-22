package com.smartbear.todo.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String userEmail;

    @Async
    public void sendEmail(String emailTo,
                          String subject,
                          String body) {
        try {
            var mimeMessage = javaMailSender.createMimeMessage();
            var mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setText(body);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setTo(emailTo);
            mimeMessageHelper.setFrom(userEmail);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException exception) {
            logger.error("Failed to send email", exception);
            throw new IllegalStateException("Failed to send email");
        }
    }
}
