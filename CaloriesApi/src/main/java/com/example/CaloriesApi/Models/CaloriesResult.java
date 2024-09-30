package com.example.CaloriesApi.Models;

public class CaloriesResult {
    private int maxCalories;
    private int topKCaloriesSum;
    private String message;

    public CaloriesResult(int maxCalories, int topKCaloriesSum, String message) {
        this.maxCalories = maxCalories;
        this.topKCaloriesSum = topKCaloriesSum;
        this.message = message;
    }

    public int getMaxCalories() {
        return maxCalories;
    }

    public int getTopKCaloriesSum(){
        return topKCaloriesSum;
    }

    public String getMessage() {
        return message;
    }
}

