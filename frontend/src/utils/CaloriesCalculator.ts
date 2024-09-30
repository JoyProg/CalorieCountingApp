export interface CaloriesInput {
  calories: string;
  k: number;
}

export interface CaloriesOutput {
  maxCalories: number;
  topKCaloriesSum: number;
  message?: string;
}

export const getTopCalories = (input: CaloriesInput): CaloriesOutput => {
  const totalCalories: number[] = [];
  let elfCalories = 0;

  const lines = input.calories.split(/\r?\n/);

  try {
    for (let line of lines) {
      if (line.trim()) {
        const num = Number(line.trim());

        if (isNaN(num)) {
          throw new Error(
            `Invalid input: '${line.trim()}' is not a valid number.`
          );
        }

        elfCalories += num;
      } else {
        if (elfCalories > 0) {
          totalCalories.push(elfCalories);
        }
        elfCalories = 0;
      }
    }

    if (elfCalories > 0) {
      totalCalories.push(elfCalories);
    }

    totalCalories.sort((a, b) => b - a);

    const maxCalories = totalCalories[0] || 0;

    const topKCaloriesSum = totalCalories
      .slice(0, input.k)
      .reduce((a, b) => a + b, 0);

    return {
      maxCalories,
      topKCaloriesSum,
      message: "Success",
    };
  } catch (error) {
    return {
      maxCalories: 0,
      topKCaloriesSum: 0,
      message: (error as Error).message,
    };
  }
};
