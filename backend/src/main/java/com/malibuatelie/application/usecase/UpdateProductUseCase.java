package com.malibuatelie.application.usecase;

import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.application.dto.UpdateProductInput;
import com.malibuatelie.domain.entity.Product;
import com.malibuatelie.domain.gateway.ProductGateway;
import com.malibuatelie.domain.gateway.StorageGateway;

public class UpdateProductUseCase {

    private final ProductGateway productGateway;
    private final StorageGateway storageGateway;

    public UpdateProductUseCase(ProductGateway productGateway, StorageGateway storageGateway) {
        this.productGateway = productGateway;
        this.storageGateway = storageGateway;
    }

    public ProductOutput execute(UpdateProductInput input) {
        Product existingProduct = productGateway.findById(input.id())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (input.name() != null)
            existingProduct.setName(input.name());
        if (input.description() != null)
            existingProduct.setDescription(input.description());
        if (input.price() != null)
            existingProduct.setPrice(input.price());

        if (input.imageContent() != null) {
            String newImageUrl = storageGateway.uploadImage(input.fileName(), input.imageContent(),
                    input.contentType());
            existingProduct.updateImage(newImageUrl);
        }

        Product updatedProduct = productGateway.update(existingProduct);
        return ProductOutput.fromDomain(updatedProduct);
    }
}
