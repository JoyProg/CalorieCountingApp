package com.example.CaloriesApi.Models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CaloriesRequest {
    @JsonProperty("calories")
    private String calories;
    @JsonProperty("k")
    private int k;

    public String getCalories() {
        return this.calories;
    }

    public void setCalories(String calories) {
        System.out.println("Setting calories: " + calories);
        this.calories = calories;
    }

    public int getK() {
        return this.k;
    }

    public void setK(int k) {
        System.out.println("Setting k: " + k);
        this.k = k;
    }

    @Override
    public String toString() {
        return "CaloriesRequest{" +
               "calories='" + calories + '\'' +
               ", k=" + k +
               '}';
    }
}
