package com.malibuatelie.application.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductDTO(
    UUID id,
    String name,
    String description,
    String imageUrl,
    BigDecimal price
) {}
