package com.malibuatelie.application.usecase;

import com.malibuatelie.application.dto.FreightDTO;
import java.math.BigDecimal;
import java.util.Random;

public class CalculateFreightUseCase {

    public FreightDTO execute(String zipCode) {
        // Simulation: Generate random price between 15.00 and 50.00
        double randomValue = 15.0 + (new Random().nextDouble() * 35.0);
        BigDecimal price = BigDecimal.valueOf(randomValue).setScale(2, java.math.RoundingMode.HALF_UP);

        int firstDigit = (zipCode != null && zipCode.length() > 0) ? Character.getNumericValue(zipCode.charAt(0)) : 1;
        int days = firstDigit <= 2 ? 3 : (firstDigit <= 5 ? 7 : 12);

        return new FreightDTO(zipCode, price, days);
    }
}
