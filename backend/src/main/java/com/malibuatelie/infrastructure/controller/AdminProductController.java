package com.malibuatelie.infrastructure.controller;

import com.malibuatelie.application.dto.CreateProductInput;
import com.malibuatelie.application.dto.ProductOutput;
import com.malibuatelie.application.dto.UpdateProductInput;
import com.malibuatelie.application.usecase.CreateProductUseCase;
import com.malibuatelie.application.usecase.DeleteProductUseCase;
import com.malibuatelie.application.usecase.UpdateProductUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "*")
public class AdminProductController {

    private final CreateProductUseCase createProductUseCase;
    private final UpdateProductUseCase updateProductUseCase;
    private final DeleteProductUseCase deleteProductUseCase;

    public AdminProductController(CreateProductUseCase createProductUseCase,
            UpdateProductUseCase updateProductUseCase,
            DeleteProductUseCase deleteProductUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductOutput> createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        CreateProductInput input = new CreateProductInput(
                name,
                description,
                price,
                image != null ? image.getOriginalFilename() : null,
                image != null ? image.getInputStream() : null,
                image != null ? image.getContentType() : null);

        ProductOutput output = createProductUseCase.execute(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(output);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductOutput> updateProduct(
            @PathVariable UUID id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        UpdateProductInput input = new UpdateProductInput(
                id,
                name,
                description,
                price,
                image != null ? image.getOriginalFilename() : null,
                image != null ? image.getInputStream() : null,
                image != null ? image.getContentType() : null);

        return ResponseEntity.ok(updateProductUseCase.execute(input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        deleteProductUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
