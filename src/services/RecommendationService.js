import { getDiningLocations } from "../repository/DiningRepository";

export async function filterDiningOptions(filterType) {
  // Fetch all dining locations from the backend
  const locations = await getDiningLocations();

  const flatLocations = locations.map((location) => {
    const lowestCaloriesMeal = location.meals.reduce((min, meal) =>
      meal.calories < min.calories ? meal : min
    );

    const highestProteinMeal = location.meals.reduce((max, meal) =>
      meal.protein > max.protein ? meal : max
    );

    const lowestCostMeal = location.meals.reduce((min, meal) =>
      meal.cost < min.cost ? meal : min
    );

    return {
      ...location,

      // Sort meals inside each restaurant
      meals: [...location.meals].sort((a, b) => {
        if (filterType === "calories") {
          return a.calories - b.calories;
        }

        if (filterType === "protein") {
          return b.protein - a.protein;
        }

        if (filterType === "cost") {
          return a.cost - b.cost;
        }

        return 0;
      }),

      lowestCalories: lowestCaloriesMeal.calories,
      highestProtein: highestProteinMeal.protein,
      lowestCost: lowestCostMeal.cost
    };
  });

  // Sort restaurants by highest protein
  if (filterType === "protein") {
    return flatLocations.sort((a, b) => {
      if (b.highestProtein !== a.highestProtein)
        return b.highestProtein - a.highestProtein;
      return a.waitTime - b.waitTime;
    });
  }

  // Sort restaurants by lowest calories
  if (filterType === "calories") {
    return flatLocations.sort((a, b) => {
      if (a.lowestCalories !== b.lowestCalories)
        return a.lowestCalories - b.lowestCalories;
      return a.waitTime - b.waitTime;
    });
  }

  // Sort restaurants by lowest cost
  if (filterType === "cost") {
    return flatLocations.sort((a, b) => {
      if (a.lowestCost !== b.lowestCost)
        return a.lowestCost - b.lowestCost;
      return a.waitTime - b.waitTime;
    });
  }

  // Default sort by wait time
  return flatLocations.sort((a, b) => a.waitTime - b.waitTime);
}

// Generates a one sentence recommendation based on the top ranked location
export function generateRecommendation(topLocation, filterType) {
  const name = topLocation.name;
  const wait = topLocation.wait;
  const walk = topLocation.walkTimeText ? topLocation.walkTimeText : "nearby";

  // Pick a reason based on the filter the student selected
  let reason = "";
  if (filterType === "protein") reason = "high protein options available";
  if (filterType === "calories") reason = "low calorie options available";
  if (filterType === "cost") reason = "lowest cost options available";
  if (!filterType) reason = "shortest wait time";

  // Check if it uses a meal swipe or costs money
  const mealCost = topLocation.meals[0].cost;
  const payment = mealCost === 0 ? "meal swipe accepted" : `$${mealCost}`;

  return `Go to ${name} now: ${wait}, ${walk}, ${reason}, and ${payment}.`;
}