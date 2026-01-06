package com.malibuatelie.domain.gateway;

import com.malibuatelie.domain.entity.User;
import java.util.Optional;

public interface UserGateway {
    Optional<User> findByUsername(String username);

    User save(User user);
}
