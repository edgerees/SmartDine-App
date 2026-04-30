// import { useState } from "react";
// import "./App.css";
// import { filterDiningOptions, generateRecommendation } from "./services/RecommendationService";

// function App() {
//   const [showRecommendations, setShowRecommendations] = useState(false);
//   const [openMeal, setOpenMeal] = useState(null);
//   const [filterType, setFilterType] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [recommendation, setRecommendation] = useState("");
//   const [showMore, setShowMore] = useState(false);

//   const handleGetRecommendation = async () => {
//     const results = await filterDiningOptions(filterType);
//     setLocations(results);
//     const sentence = generateRecommendation(results[0], filterType);
//     setRecommendation(sentence);
//     setShowRecommendations(true);
//     setShowMore(false);
//   };

//   const handleFilterChange = (event) => {
//     setFilterType(event.target.value);
//   };

//   const toggleMealDetails = (locationName) => {
//     if (openMeal === locationName) {
//       setOpenMeal(null);
//     } else {
//       setOpenMeal(locationName);
//     }
//   };

//   const topLocations = locations.slice(0, 4);
//   const moreLocations = locations.slice(4);

//   // Renders a single location card
//   const renderCard = (location, index) => (
//     <div key={location.name} className="recommendation-card">
//       <div className="rank-badge">{index + 1}</div>
//       <h4>{location.name}</h4>
//       <p>{location.wait}</p>
//       {location.walkTimeText && <p>{location.walkTimeText} away</p>}

//       <button onClick={() => toggleMealDetails(location.name)}>
//         {openMeal === location.name ? "Hide Meal Details" : "View Meal Details"}
//       </button>

//       {openMeal === location.name && (
//         <div className="meal-details">
//           {location.meals.map((item, i) => (
//             <div key={i}>
//               <p>{item.meal}</p>
//               <p>Calories: {item.calories}</p>
//               <p>Protein: {item.protein}g</p>
//               <p>Cost: {item.cost === 0 ? "Meal Swipe" : `$${item.cost}`}</p>
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="phone">
//       <h1>SmartDine</h1>
//       <h2>Find the best place to eat between classes</h2>

//       <div className="filter-controls">
//         <select value={filterType} onChange={handleFilterChange}>
//           <option value="">Default Ranking</option>
//           <option value="protein">Highest Protein</option>
//           <option value="calories">Lowest Calories</option>
//           <option value="cost">Lowest Cost</option>
//         </select>

//         <button onClick={handleGetRecommendation}>
//           Get Recommendation
//         </button>

//         <button onClick={() => {
//           setFilterType("");
//           setLocations([]);
//           setShowRecommendations(false);
//           setOpenMeal(null);
//           setShowMore(false);
//         }}>
//           Reset Filters
//         </button>
//       </div>

//       {showRecommendations && (
//         <div className="recommendations">
//           <h3>Ranked Dining Recommendations</h3>

//           {/* One sentence recommendation */}
//           {recommendation && (
//             <p className="recommendation-sentence">{recommendation}</p>
//           )}

//           {/* Top 4 in a 2x2 grid */}
//           <div className="recommendations-grid">
//             {topLocations.map((location, index) => renderCard(location, index))}
//           </div>

//           {moreLocations.length > 0 && (
//             <div className="show-more-container">
//               <button
//                 className="show-more-btn"
//                 onClick={() => setShowMore(!showMore)}
//               >
//                 {showMore
//                   ? "Hide Other Locations ^ "
//                   : `Show ${moreLocations.length} More Locations v `}
//               </button>

//               {showMore && (
//                 <div className="more-locations">
//                   {moreLocations.map((location, index) => renderCard(location, index + 4))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import "./App.css";
import { getStudents } from "./repository/StudentRepository";
import {
  calculateCalorieInfo,
  filterDiningOptions,
  generateRecommendation
} from "./services/RecommendationService";

function App() {
  // Changed/Added by Edrees
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [openMeal, setOpenMeal] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [locations, setLocations] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Changed/Added by Edrees
  useEffect(() => {
    async function loadStudents() {
      const studentData = await getStudents();

      setStudents(studentData);
      setSelectedStudentId(studentData[0].id);
      setSelectedStudent(studentData[0]);
    }

    loadStudents();
  }, []);

  // Changed/Added by Edrees
  const handleStudentChange = (event) => {
    const studentId = Number(event.target.value);
    const student = students.find((item) => item.id === studentId);

    setSelectedStudentId(studentId);
    setSelectedStudent(student);
    setShowRecommendations(false);
    setRecommendation("");
    setLocations([]);
    setOpenMeal(null);
    setShowMore(false);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleGetRecommendation = async () => {
    if (!selectedStudent) {
      alert("Please select a student first.");
      return;
    }

    setLoading(true);

    const results = await filterDiningOptions(filterType, selectedStudent);

    setLocations(results);
    setRecommendation(generateRecommendation(results[0], filterType, selectedStudent));
    setShowRecommendations(true);
    setShowMore(false);
    setLoading(false);
  };

  const toggleMealDetails = (locationName) => {
    if (openMeal === locationName) {
      setOpenMeal(null);
    } else {
      setOpenMeal(locationName);
    }
  };

  // Changed/Added by Edrees
  const handleReset = () => {
    setFilterType("");
    setLocations([]);
    setRecommendation("");
    setShowRecommendations(false);
    setOpenMeal(null);
    setShowMore(false);
  };

  const topLocations = locations.slice(0, 4);
  const moreLocations = locations.slice(4);

  // Changed/Added by Edrees
  const calorieInfo = selectedStudent ? calculateCalorieInfo(selectedStudent) : null;

  // Changed/Added by Edrees
  const renderCard = (location, index) => (
    <div key={location.name} className="recommendation-card">
      <div className="card-top-row">
        <span className="rank-badge">#{index + 1}</span>
        <span className="score-pill">Score {location.score}</span>
      </div>

      <h4>{location.name}</h4>

      <div className="mini-tags">
        <span>{location.category}</span>
        <span>{location.trafficLabel}</span>
        <span>{location.wait}</span>
      </div>

      <div className="best-meal-box">
        <p className="section-label">Best Match</p>
        <h5>{location.bestMeal.meal}</h5>
        <p>{location.bestMeal.calories} calories</p>
        <p>{location.bestMeal.protein}g protein</p>
        <p>{location.paymentText}</p>
      </div>

      <div className="why-box">
        <p className="section-label">SmartDine Reason</p>
        <p>{location.reasonList[0]}</p>
        <p>{location.reasonList[2]}</p>
      </div>

      <button onClick={() => toggleMealDetails(location.name)}>
        {openMeal === location.name ? "Hide Full Menu" : "View Full Menu"}
      </button>

      {openMeal === location.name && (
        <div className="meal-details">
          {location.meals.map((item, i) => (
            <div key={i} className="meal-row">
              <p className="meal-name">{item.meal}</p>
              <p>Calories: {item.calories}</p>
              <p>Protein: {item.protein}g</p>
              <p>Cost: {item.cost === 0 ? "Meal Swipe" : `$${item.cost}`}</p>
              <p>Meal Score: {item.smartScore}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="app-page">
      <header className="hero">
        <div>
          <p className="eyebrow">Campus Dining Decision Support</p>
          <h1>SmartDine</h1>
          <h2>
            Personalized dining recommendations based on schedule, nutrition,
            traffic, swipes, and dining dollars.
          </h2>
        </div>
      </header>

      <main className="main-layout">
        <section className="student-panel">
          <h3>Student Demo Profile</h3>

          <label>Select Student</label>
          <select value={selectedStudentId} onChange={handleStudentChange}>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          {selectedStudent && (
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar">
                  {selectedStudent.name.charAt(0)}
                </div>

                <div>
                  <h4>{selectedStudent.name}</h4>
                  <p>{selectedStudent.scheduleStatus}</p>
                </div>
              </div>

              <div className="profile-grid">
                <div>
                  <span>Age</span>
                  <strong>{selectedStudent.age}</strong>
                </div>

                <div>
                  <span>Height</span>
                  <strong>
                    {selectedStudent.heightFeet}'{selectedStudent.heightInches}"
                  </strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{selectedStudent.weight} lbs</strong>
                </div>

                <div>
                  <span>Goal</span>
                  <strong>{selectedStudent.goal}</strong>
                </div>

                <div>
                  <span>Swipes</span>
                  <strong>{selectedStudent.swipesLeft}</strong>
                </div>

                <div>
                  <span>Dollars</span>
                  <strong>${selectedStudent.diningDollars}</strong>
                </div>

                <div>
                  <span>Diet</span>
                  <strong>{selectedStudent.dietaryPreference}</strong>
                </div>

                <div>
                  <span>Preference</span>
                  <strong>{selectedStudent.preferredCategory}</strong>
                </div>
              </div>

              {calorieInfo && (
                <div className="calorie-box">
                  <p>Estimated Target</p>
                  <strong>{calorieInfo.target} cal/day</strong>
                  <span>About {calorieInfo.perMealTarget} calories per meal</span>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="controls-panel">
          <h3>Recommendation Settings</h3>

          <label>Ranking Priority</label>
          <select value={filterType} onChange={handleFilterChange}>
            <option value="">Smart Overall Ranking</option>
            <option value="protein">Prioritize Protein</option>
            <option value="calories">Prioritize Calorie Fit</option>
            <option value="cost">Prioritize Lowest Cost</option>
          </select>

          <div className="button-row">
            <button onClick={handleGetRecommendation}>
              {loading ? "Loading..." : "Get Recommendation"}
            </button>

            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className="system-card">
            <p className="section-label">What SmartDine Uses</p>
            <ul>
              <li>Student height, weight, age, and goal</li>
              <li>Meal swipes and dining dollars</li>
              <li>Dining hall wait time and traffic level</li>
              <li>Calories, protein, and cost</li>
              <li>Dietary preference and schedule pressure</li>
            </ul>
          </div>
        </section>
      </main>

      {showRecommendations && (
        <section className="results-panel">
          <h3>Ranked Dining Recommendations</h3>

          {recommendation && (
            <p className="recommendation-sentence">{recommendation}</p>
          )}

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
                  ? "Hide Other Locations"
                  : `Show ${moreLocations.length} More Locations`}
              </button>

              {showMore && (
                <div className="more-locations">
                  {moreLocations.map((location, index) =>
                    renderCard(location, index + 4)
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;