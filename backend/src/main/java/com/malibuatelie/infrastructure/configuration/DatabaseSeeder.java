package com.malibuatelie.infrastructure.configuration;

import com.malibuatelie.domain.entity.Role;
import com.malibuatelie.domain.entity.User;
import com.malibuatelie.domain.gateway.UserGateway;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedUsers(UserGateway userGateway, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userGateway.findByUsername("admin").isEmpty()) {
                userGateway.save(new User(
                        UUID.randomUUID(),
                        "admin",
                        passwordEncoder.encode("admin"),
                        Role.ADMIN));
                System.out.println("✅ Default Admin User Created: admin / admin");
            }
        };
    }
}
