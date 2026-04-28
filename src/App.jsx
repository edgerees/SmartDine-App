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

  const toggleMealDetails = (locationName) => {
    if (openMeal === locationName) {
      setOpenMeal(null);
    } else {
      setOpenMeal(locationName);
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
              key={location.name}
              className="recommendation-card"
            >
              <h4>{location.name}</h4>
              <p>{location.wait}</p>
              {location.walkTimeText && <p>{location.walkTimeText} away</p>}

              <button
                onClick={() => toggleMealDetails(location.name)}
              >
                {openMeal === location.name
                  ? "Hide Meal Details"
                  : "View Meal Details"}
              </button>

              {openMeal === location.name && (
                <div className="meal-details">
                  {location.meals.map((item, index) => (
                    <div key={index}>
                      <p>{item.meal}</p>
                      <p>Calories: {item.calories}</p>
                      <p>Protein: {item.protein}g</p>
                      <p>Cost: {item.cost === 0 ? "Meal Swipe" : `$${item.cost}`}</p>
                      <hr />
                    </div>
                  ))}
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