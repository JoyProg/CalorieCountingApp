package com.example.CaloriesApi.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CaloriesApi.Models.CaloriesRequest;
import com.example.CaloriesApi.Models.CaloriesResult;
import com.example.CaloriesApi.Services.CaloriesCalculator;

import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Calories", description = "API for calculating calories")
public class CaloriesController {
    @PostMapping("/calories")
    public ResponseEntity<CaloriesResult> getTopCalories(
            @RequestBody CaloriesRequest payload) { 
                String calories = payload.getCalories();
                int k = payload.getK();
                CaloriesResult result = CaloriesCalculator.getTopCalories(calories, k);     
                return ResponseEntity.ok(result);
    }
}
