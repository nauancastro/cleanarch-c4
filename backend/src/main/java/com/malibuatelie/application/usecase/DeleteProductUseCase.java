package com.malibuatelie.application.usecase;

import com.malibuatelie.domain.gateway.ProductGateway;
import java.util.UUID;

public class DeleteProductUseCase {

    private final ProductGateway productGateway;

    public DeleteProductUseCase(ProductGateway productGateway) {
        this.productGateway = productGateway;
    }

    public void execute(UUID id) {
        productGateway.delete(id);
    }
}
