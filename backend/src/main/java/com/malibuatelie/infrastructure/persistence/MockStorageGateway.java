package com.malibuatelie.infrastructure.persistence;

import com.malibuatelie.domain.gateway.StorageGateway;
import org.springframework.stereotype.Component;
import java.io.InputStream;

@Component
public class MockStorageGateway implements StorageGateway {

    @Override
    public String uploadImage(String fileName, InputStream content, String contentType) {
        return "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&mock=" + System.currentTimeMillis();
    }
}
