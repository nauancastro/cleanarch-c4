package com.malibuatelie.application.usecase;

import com.malibuatelie.application.dto.CreateProductInput;
import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.domain.entity.Product;
import com.malibuatelie.domain.gateway.ProductGateway;
import com.malibuatelie.domain.gateway.StorageGateway;
import java.util.UUID;

public class CreateProductUseCase {

    private final ProductGateway productGateway;
    private final StorageGateway storageGateway;

    public CreateProductUseCase(ProductGateway productGateway, StorageGateway storageGateway) {
        this.productGateway = productGateway;
        this.storageGateway = storageGateway;
    }

    public ProductOutput execute(CreateProductInput input) {
        String imageUrl = null;
        if (input.imageContent() != null) {
            imageUrl = storageGateway.uploadImage(input.fileName(), input.imageContent(), input.contentType());
        }

        Product product = new Product(
                UUID.randomUUID(),
                input.name(),
                input.description(),
                imageUrl,
                input.price());

        Product savedProduct = productGateway.create(product);
        return ProductOutput.fromDomain(savedProduct);
    }
}
