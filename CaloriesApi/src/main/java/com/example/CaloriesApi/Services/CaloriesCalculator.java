
package com.example.CaloriesApi.Services;

import java.util.PriorityQueue;

import com.example.CaloriesApi.Models.CaloriesResult;
 

public class CaloriesCalculator {
    public static CaloriesResult getTopCalories(String data, int k) {
        String[] lines = data.split("\\r?\\n");

            PriorityQueue<Integer> topCalories = new PriorityQueue<>();
            int currentElfCalories = 0;
            int maxCalories = Integer.MIN_VALUE;

            for (String line : lines) {
                line = line.trim();
                    if (!line.isEmpty()) {
                        try {
                            currentElfCalories += Integer.parseInt(line);
                        } catch (NumberFormatException e) {
                            return new CaloriesResult(0, 0, "Invalid input: '" + line + "' is not a valid number.");
                        }
                    } else {
                        maxCalories = Math.max(maxCalories, currentElfCalories);
                        addElfCalories(topCalories, currentElfCalories, k);
                        currentElfCalories = 0;
                    }
            }

            maxCalories = Math.max(maxCalories, currentElfCalories);
            addElfCalories(topCalories, currentElfCalories, k);

            int topKCaloriesSum = 0;
            for (int calories : topCalories) {
                topKCaloriesSum += calories;
            }

            return  new CaloriesResult(maxCalories, topKCaloriesSum, "Success");
    }

    private static void addElfCalories(PriorityQueue<Integer> pq, int calories, int k) {
        if (calories > 0) {
            pq.add(calories);
            if (pq.size() > k) {
                pq.poll();
            }
        }
    }
}
