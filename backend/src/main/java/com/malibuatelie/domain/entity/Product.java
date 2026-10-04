package com.malibuatelie.domain.entity;

import java.math.BigDecimal;
import java.util.UUID;

public class Product {

    // Domain rules consts can go here if needed

    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;

    public Product() {
    }

    public Product(UUID id, String name, String description, String imageUrl, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        validate();
    }

    public void validate() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        if (price == null || price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Product price must be greater than or equal to zero");
        }
    }

    public void updateImage(String newImageUrl) {
        this.imageUrl = newImageUrl;
        // Business rule: maybe validate URL format here
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        validate();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
        validate();
    }
}
