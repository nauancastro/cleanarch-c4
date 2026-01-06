package com.malibuatelie.application.usecase;

import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.domain.gateway.ProductGateway;
import java.util.Optional;
import java.util.UUID;

public class GetProductUseCase {

    private final ProductGateway productGateway;

    public GetProductUseCase(ProductGateway productGateway) {
        this.productGateway = productGateway;
    }

    public Optional<ProductOutput> execute(UUID id) {
        return productGateway.findById(id).map(ProductOutput::fromDomain);
    }
}
