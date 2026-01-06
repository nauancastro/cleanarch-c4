package com.malibuatelie.application.dto;

import com.malibuatelie.domain.entity.Product;
import java.math.BigDecimal;
import java.util.UUID;

public record ProductOutput(
        UUID id,
        String name,
        String description,
        String imageUrl,
        BigDecimal price) {
    public static ProductOutput fromDomain(Product product) {
        return new ProductOutput(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getPrice());
    }
}
