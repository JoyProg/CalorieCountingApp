import React, { useState } from "react";
import axios from "axios";
import { CaloriesInput, CaloriesOutput, getTopCalories } from "../utils/CaloriesCalculator";

const CaloriePuzzle: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fixedK = 3; // fixed k (top) calories
  const apiBaseUrl = process.env.REACT_APP_CALORIES_API_BASE_URL; // Java API URL

  // Handle file input
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  };

  // Solve using JavaScript (client-side)
  const solveWithJS = () => {
    const caloriesInput: CaloriesInput = { calories: input, k: fixedK };
    const caloriesOutput: CaloriesOutput = getTopCalories(caloriesInput);

    if (caloriesOutput.message !== "Success") {
      setError(caloriesOutput.message || "An unknown error occurred.");
      setResult("");
    } else {
      setResult(`Max Calories: ${caloriesOutput.maxCalories}\nTop ${fixedK} Calories Sum: ${caloriesOutput.topKCaloriesSum}`);
      setError("");
    }
  };

  // Solve using Java (call API)
  const solveWithJava = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${apiBaseUrl}`, {
        calories: input,
        k: fixedK,
      });

      if (response.data.message !== "Success") {
        setError(response.data.message || "An unknown error occurred.");
        setResult("");
      } else {
        setResult(`Max Calories (Java API): ${response.data.maxCalories}\nTop 3 Calories Sum (Java API): ${response.data.topKCaloriesSum}`);
        setError("");
      }
    } catch (error) {
      setError("Error calling Java API");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Calorie Counting</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter or upload puzzle input here"
        rows={20}
        cols={70}
        style={{ resize: "none", overflowY: "scroll", whiteSpace: "pre-wrap" }}
      />
      <br />
      <input type="file" onChange={handleFileUpload} />
      <br />
      <button onClick={solveWithJS} disabled={loading}>
        Solve with JavaScript
      </button>
      <button onClick={solveWithJava} disabled={loading}>
        {loading ? "Solving..." : "Solve with Java API"}
      </button>
      <div>
        <h2>Result:</h2>
        {error ? <pre style={{ color: "red" }}>{error}</pre> : <pre>{result}</pre>}
      </div>
    </div>
  );
};

export default CaloriePuzzle;
