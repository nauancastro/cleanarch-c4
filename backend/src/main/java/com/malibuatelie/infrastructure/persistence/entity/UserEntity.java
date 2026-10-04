package com.malibuatelie.infrastructure.persistence.entity;

import com.malibuatelie.domain.entity.Role;
import com.malibuatelie.domain.entity.User;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    private UUID id;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UserEntity() {
    }

    public UserEntity(UUID id, String username, String password, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public static UserEntity fromDomain(User user) {
        return new UserEntity(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole());
    }

    public User toDomain() {
        return new User(
                this.id,
                this.username,
                this.password,
                this.role);
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
