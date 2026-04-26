import { useState } from "react";
import "./App.css";
import { filterDiningOptions } from "./services/RecommendationService";

function App() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [openMeal, setOpenMeal] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [locations, setLocations] = useState([]);

  const handleGetRecommendation = async () => {
    const results = await filterDiningOptions(filterType);
    setLocations(results);
    setShowRecommendations(true);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
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

      <select onChange={handleFilterChange}>
        <option value="">Select Filter</option>
        <option value="protein">Highest Protein</option>
        <option value="calories">Lowest Calories</option>
        <option value="cost">Lowest Cost</option>
      </select>

      <button onClick={handleGetRecommendation}>
        Get Recommendation
      </button>

      {showRecommendations && (
        <div className="recommendations">
          <h3>Ranked Dining Recommendations</h3>

          {locations.map((location) => (
            <div
              key={location.id}
              className="recommendation-card"
            >
              <h4>
                {location.id}. {location.name}
              </h4>

              <p>
                {location.wait}
              </p>

              <button
                onClick={() =>
                  toggleMealDetails(location.id)
                }
              >
                {openMeal === location.id
                  ? "Hide Meal Details"
                  : "View Meal Details"}
              </button>

              {openMeal === location.id && (
                <div className="meal-details">
                  <p>Meal: {location.meal}</p>
                  <p>Calories: {location.calories}</p>
                  <p>Protein: {location.protein}g</p>
                  <p>Cost: ${location.cost}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;