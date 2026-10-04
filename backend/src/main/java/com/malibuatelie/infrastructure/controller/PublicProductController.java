package com.malibuatelie.infrastructure.controller;

import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.application.usecase.GetProductUseCase;
import com.malibuatelie.application.usecase.ListProductsUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/products")
@CrossOrigin(origins = "*")
public class PublicProductController {

    private final ListProductsUseCase listProductsUseCase;
    private final GetProductUseCase getProductUseCase;

    public PublicProductController(ListProductsUseCase listProductsUseCase, GetProductUseCase getProductUseCase) {
        this.listProductsUseCase = listProductsUseCase;
        this.getProductUseCase = getProductUseCase;
    }

    @GetMapping
    public ResponseEntity<List<ProductOutput>> getAllProducts() {
        return ResponseEntity.ok(listProductsUseCase.execute());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductOutput> getProductById(@PathVariable UUID id) {
        return getProductUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
