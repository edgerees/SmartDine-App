import { useState } from "react";
import "./App.css";

function App() {
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleClick = () => {
    setShowRecommendation(true);
  };

  return (
    <div className="phone">

      <h1>SmartDine</h1>

      <h2>Find the best place to eat between classes</h2>

      <button onClick={handleClick}>
        Get Recommendation
      </button>

      {showRecommendation && (
        <div className="recommendation">
          <h3>Go to Southside now</h3>
          <p>Wait time: 2 minutes</p>
          <p>High-protein wraps available</p>
          <p>You will arrive to class on time</p>
        </div>
      )}

    </div>
  );
}

export default App;