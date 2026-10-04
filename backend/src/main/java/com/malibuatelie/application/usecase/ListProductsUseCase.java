package com.malibuatelie.application.usecase;

import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.domain.gateway.ProductGateway;
import java.util.List;
import java.util.stream.Collectors;

public class ListProductsUseCase {

    private final ProductGateway productGateway;

    public ListProductsUseCase(ProductGateway productGateway) {
        this.productGateway = productGateway;
    }

    public List<ProductOutput> execute() {
        return productGateway.findAll().stream()
                .map(ProductOutput::fromDomain)
                .collect(Collectors.toList());
    }
}
