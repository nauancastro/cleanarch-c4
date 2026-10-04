package com.malibuatelie.application.usecase;

import com.malibuatelie.domain.entity.User;
import com.malibuatelie.domain.gateway.TokenGateway;
import com.malibuatelie.domain.gateway.UserGateway;
import org.springframework.security.crypto.password.PasswordEncoder;

public class LoginUseCase {

    private final UserGateway userGateway;
    private final TokenGateway tokenGateway;
    private final PasswordEncoder passwordEncoder;

    public LoginUseCase(UserGateway userGateway, TokenGateway tokenGateway, PasswordEncoder passwordEncoder) {
        this.userGateway = userGateway;
        this.tokenGateway = tokenGateway;
        this.passwordEncoder = passwordEncoder;
    }

    public String execute(String username, String password) {
        User user = userGateway.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return tokenGateway.generateToken(user);
    }
}
