import { getDiningLocations } from "../repository/DiningRepository";

export async function filterDiningOptions(filterType) {
  // Fetch all dining locations from the backend
  const locations = await getDiningLocations();

  const flatLocations = locations.map((location) => ({
    ...location,
    meal: location.meals[0].meal,
    calories: location.meals[0].calories,
    protein: location.meals[0].protein,
    cost: location.meals[0].cost
  }));

  // Sort by highest protien
  if (filterType === "protein") {
    return flatLocations.sort((a, b) => {
      if (b.protein !== a.protein) return b.protein - a.protein;
      return a.waitTime - b.waitTime;
    });
  }
  // Sort by lowest calories
  if (filterType === "calories") {
    return flatLocations.sort((a, b) => {
      if (a.calories !== b.calories) return a.calories - b.calories;
      return a.waitTime - b.waitTime;
    });
  }
  // Sort by lowest protien
  if (filterType === "cost") {
    return flatLocations.sort((a, b) => {
      if (a.cost !== b.cost) return a.cost - b.cost;
      return a.waitTime - b.waitTime;
    });
  }

  return flatLocations.sort((a, b) => a.waitTime - b.waitTime);
}

// Generates a one sentence recommendation based on the top ranked location
export function generateRecommendation(topLocation, filterType) {
  const name = topLocation.name;
  const wait = topLocation.wait;
  const walk = topLocation.walkTimeText ? `${topLocation.walkTimeText} walk` : "nearby";

  // Pick a reason based on the filter the student selected
  let reason = "";
  if (filterType === "protein") reason = "high protein options available";
  if (filterType === "calories") reason = "low calorie options available";
  if (filterType === "cost") reason = "lowest cost options available";
  if (!filterType) reason = "shortest wait time";

  // Check if it uses a meal swipe or costs money
  const payment = topLocation.cost === 0 ? "meal swipe accepted" : `$${topLocation.cost}`;

  return `Go to ${name} now: ${wait}, ${walk}, ${reason}, and ${payment}.`;
}