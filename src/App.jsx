import { useState } from "react";
import "./App.css";
import { filterDiningOptions, generateRecommendation } from "./services/RecommendationService";

function App() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [openMeal, setOpenMeal] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [locations, setLocations] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleGetRecommendation = async () => {
    const results = await filterDiningOptions(filterType);
    setLocations(results);
    const sentence = generateRecommendation(results[0], filterType);
    setRecommendation(sentence);
    setShowRecommendations(true);
    setShowMore(false);
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

  const topLocations = locations.slice(0, 4);
  const moreLocations = locations.slice(4);

  // Renders a single location card
  const renderCard = (location, index) => (
    <div key={location.name} className="recommendation-card">
      <div className="rank-badge">{index + 1}</div>
      <h4>{location.name}</h4>
      <p>{location.wait}</p>
      {location.walkTimeText && <p>{location.walkTimeText} away</p>}

      <button onClick={() => toggleMealDetails(location.name)}>
        {openMeal === location.name ? "Hide Meal Details" : "View Meal Details"}
      </button>

      {openMeal === location.name && (
        <div className="meal-details">
          {location.meals.map((item, i) => (
            <div key={i}>
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
  );

  return (
    <div className="phone">
      <h1>SmartDine</h1>
      <h2>Find the best place to eat between classes</h2>

      <div className="filter-controls">
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">Default Ranking</option>
          <option value="protein">Highest Protein</option>
          <option value="calories">Lowest Calories</option>
          <option value="cost">Lowest Cost</option>
        </select>

        <button onClick={handleGetRecommendation}>
          Get Recommendation
        </button>

        <button onClick={() => {
          setFilterType("");
          setLocations([]);
          setShowRecommendations(false);
          setOpenMeal(null);
          setShowMore(false);
        }}>
          Reset Filters
        </button>
      </div>

      {showRecommendations && (
        <div className="recommendations">
          <h3>Ranked Dining Recommendations</h3>

          {/* One sentence recommendation */}
          {recommendation && (
            <p className="recommendation-sentence">{recommendation}</p>
          )}

          {/* Top 4 in a 2x2 grid */}
          <div className="recommendations-grid">
            {topLocations.map((location, index) => renderCard(location, index))}
          </div>

          {moreLocations.length > 0 && (
            <div className="show-more-container">
              <button
                className="show-more-btn"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore
                  ? "Hide Other Locations ^ "
                  : `Show ${moreLocations.length} More Locations v `}
              </button>

              {showMore && (
                <div className="more-locations">
                  {moreLocations.map((location, index) => renderCard(location, index + 4))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;