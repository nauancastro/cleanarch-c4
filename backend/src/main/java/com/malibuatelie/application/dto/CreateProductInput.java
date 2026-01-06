package com.malibuatelie.application.dto;

import java.io.InputStream;
import java.math.BigDecimal;

public record CreateProductInput(
        String name,
        String description,
        BigDecimal price,
        String fileName,
        InputStream imageContent,
        String contentType) {
}
