package com.malibuatelie.infrastructure.controller;

import com.malibuatelie.application.dto.ProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/products")
@CrossOrigin(origins = "*")
public class PublicProductController {

    // Dados mockados para o MVP
    private final List<ProductDTO> mockProducts = List.of(
        new ProductDTO(
            UUID.randomUUID(),
            "Top Crochê Floral",
            "Top de crochê feito à mão com detalhes florais, perfeito para o verão.",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
            new BigDecimal("129.90")
        ),
        new ProductDTO(
            UUID.randomUUID(),
            "Bolsa Praia Artesanal",
            "Bolsa de praia em crochê, espaçosa e estilosa para seus dias de sol.",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
            new BigDecimal("189.90")
        ),
        new ProductDTO(
            UUID.randomUUID(),
            "Vestido Longo Boho",
            "Vestido longo em crochê estilo boho, ideal para ensaios fotográficos.",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
            new BigDecimal("299.90")
        ),
        new ProductDTO(
            UUID.randomUUID(),
            "Biquíni Crochê",
            "Conjunto de biquíni em crochê, peça exclusiva feita sob medida.",
            "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400",
            new BigDecimal("159.90")
        )
    );

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(mockProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable UUID id) {
        return mockProducts.stream()
            .filter(p -> p.id().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
