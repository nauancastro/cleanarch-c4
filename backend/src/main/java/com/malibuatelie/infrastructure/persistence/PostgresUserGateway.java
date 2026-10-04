package com.malibuatelie.infrastructure.persistence;

import com.malibuatelie.domain.entity.User;
import com.malibuatelie.domain.gateway.UserGateway;
import com.malibuatelie.infrastructure.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PostgresUserGateway implements UserGateway {

    private final JpaUserRepository repository;

    public PostgresUserGateway(JpaUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username).map(UserEntity::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        return repository.save(entity).toDomain();
    }
}
