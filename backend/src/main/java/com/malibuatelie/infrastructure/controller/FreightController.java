package com.malibuatelie.infrastructure.controller;

import com.malibuatelie.application.dto.FreightDTO;
import com.malibuatelie.application.usecase.CalculateFreightUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/freight")
@CrossOrigin(origins = "*")
public class FreightController {

    private final CalculateFreightUseCase calculateFreightUseCase;

    public FreightController(CalculateFreightUseCase calculateFreightUseCase) {
        this.calculateFreightUseCase = calculateFreightUseCase;
    }

    @GetMapping
    public ResponseEntity<FreightDTO> calculate(@RequestParam String zip) {
        return ResponseEntity.ok(calculateFreightUseCase.execute(zip));
    }
}
