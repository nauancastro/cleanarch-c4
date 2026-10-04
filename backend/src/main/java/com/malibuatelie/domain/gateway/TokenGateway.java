package com.malibuatelie.domain.gateway;

import com.malibuatelie.domain.entity.User;

public interface TokenGateway {
    String generateToken(User user);

    String validateTokenAndGetUsername(String token);

    String getRoleFromToken(String token);
}
