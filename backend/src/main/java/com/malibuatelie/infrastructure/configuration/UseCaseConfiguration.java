package com.malibuatelie.infrastructure.configuration;

import com.malibuatelie.application.usecase.*;
import com.malibuatelie.domain.gateway.ProductGateway;
import com.malibuatelie.domain.gateway.StorageGateway;
import com.malibuatelie.domain.gateway.UserGateway;
import com.malibuatelie.domain.gateway.TokenGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UseCaseConfiguration {

    @Bean
    public CreateProductUseCase createProductUseCase(ProductGateway productGateway, StorageGateway storageGateway) {
        return new CreateProductUseCase(productGateway, storageGateway);
    }

    @Bean
    public ListProductsUseCase listProductsUseCase(ProductGateway productGateway) {
        return new ListProductsUseCase(productGateway);
    }

    @Bean
    public GetProductUseCase getProductUseCase(ProductGateway productGateway) {
        return new GetProductUseCase(productGateway);
    }

    @Bean
    public UpdateProductUseCase updateProductUseCase(ProductGateway productGateway, StorageGateway storageGateway) {
        return new UpdateProductUseCase(productGateway, storageGateway);
    }

    @Bean
    public DeleteProductUseCase deleteProductUseCase(ProductGateway productGateway) {
        return new DeleteProductUseCase(productGateway);
    }

    @Bean
    public LoginUseCase loginUseCase(UserGateway userGateway, TokenGateway tokenGateway,
            PasswordEncoder passwordEncoder) {
        return new LoginUseCase(userGateway, tokenGateway, passwordEncoder);
    }

    @Bean
    public CalculateFreightUseCase calculateFreightUseCase() {
        return new CalculateFreightUseCase();
    }
}
