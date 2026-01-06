package com.malibuatelie.infrastructure.persistence;

import com.malibuatelie.domain.entity.Product;
import com.malibuatelie.domain.gateway.ProductGateway;
import com.malibuatelie.infrastructure.persistence.entity.ProductEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PostgresProductGateway implements ProductGateway {

    private final JpaProductRepository repository;

    public PostgresProductGateway(JpaProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Product create(Product product) {
        ProductEntity entity = ProductEntity.fromDomain(product);
        return repository.save(entity).toDomain();
    }

    @Override
    public Product update(Product product) {
        ProductEntity entity = ProductEntity.fromDomain(product);
        return repository.save(entity).toDomain();
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Product> findById(UUID id) {
        return repository.findById(id).map(ProductEntity::toDomain);
    }

    @Override
    public List<Product> findAll() {
        return repository.findAll().stream()
                .map(ProductEntity::toDomain)
                .collect(Collectors.toList());
    }
}
