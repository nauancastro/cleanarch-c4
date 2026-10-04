package com.malibuatelie.domain.gateway;

import java.io.InputStream;

public interface StorageGateway {
    String uploadImage(String fileName, InputStream content, String contentType);
}
