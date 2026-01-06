package com.malibuatelie.application.dto;

import java.math.BigDecimal;

public record FreightDTO(String zipCode, BigDecimal value, Integer days) {
}
