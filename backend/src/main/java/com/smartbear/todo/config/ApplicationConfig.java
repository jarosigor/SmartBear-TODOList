package com.smartbear.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface ApplicationConfig {
    @Bean
    UserDetailsService userDetailsService();

    @Bean
    AuthenticationProvider authenticationProvider();

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception;

    @Bean
    PasswordEncoder passwordEncoder();

    @Bean
    JavaMailSender javaMailSender();
}
