package com.malibuatelie.application.dto;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.UUID;

public record UpdateProductInput(
        UUID id,
        String name,
        String description,
        BigDecimal price,
        String fileName,
        InputStream imageContent,
        String contentType) {
}
