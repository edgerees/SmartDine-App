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