import { useState } from "react";
import "./App.css";

function App() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [openMeal, setOpenMeal] = useState(null);

  const handleGetRecommendation = () => {
    setShowRecommendations(true);
  };

  const toggleMealDetails = (mealNumber) => {
    if (openMeal === mealNumber) {
      setOpenMeal(null);
    } else {
      setOpenMeal(mealNumber);
    }
  };

  return (
    <div className="phone">
      <h1>SmartDine</h1>
      <h2>Find the best place to eat between classes</h2>

      <button onClick={handleGetRecommendation}>Get Recommendation</button>

      {showRecommendations && (
        <div className="recommendations">
          <h3>Ranked Dining Recommendations</h3>

          <div className="recommendation-card">
            <h4>1. Southside</h4>
            <p>3-minute wait, high-protein option available</p>
            <button onClick={() => toggleMealDetails(1)}>
              {openMeal === 1 ? "Hide Meal Details" : "View Meal Details"}
            </button>

            {openMeal === 1 && (
              <div className="meal-details">
                <p>Meal: Grilled Chicken Bowl</p>
                <p>Calories: 550</p>
                <p>Protein: 42g</p>
                <p>Cost: 1 meal swipe</p>
              </div>
            )}
          </div>

          <div className="recommendation-card">
            <h4>2. Eastside</h4>
            <p>5-minute wait, balanced meal option available</p>
            <button onClick={() => toggleMealDetails(2)}>
              {openMeal === 2 ? "Hide Meal Details" : "View Meal Details"}
            </button>

            {openMeal === 2 && (
              <div className="meal-details">
                <p>Meal: Turkey Sandwich Combo</p>
                <p>Calories: 620</p>
                <p>Protein: 30g</p>
                <p>Cost: $8 dining dollars</p>
              </div>
            )}
          </div>

          <div className="recommendation-card">
            <h4>3. Northside</h4>
            <p>7-minute wait, lighter option available</p>
            <button onClick={() => toggleMealDetails(3)}>
              {openMeal === 3 ? "Hide Meal Details" : "View Meal Details"}
            </button>

            {openMeal === 3 && (
              <div className="meal-details">
                <p>Meal: Veggie Wrap</p>
                <p>Calories: 430</p>
                <p>Protein: 18g</p>
                <p>Cost: $7 dining dollars</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;