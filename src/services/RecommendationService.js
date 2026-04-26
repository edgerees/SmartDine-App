import { getDiningLocations } from "../repository/DiningRepository";

export async function filterDiningOptions(filterType) {
  const locations = await getDiningLocations();

  const flatLocations = locations.map((location) => ({
    ...location,
    meal: location.meals[0].meal,
    calories: location.meals[0].calories,
    protein: location.meals[0].protein,
    cost: location.meals[0].cost
  }));

  if (filterType === "protein") {
    return flatLocations.sort((a, b) => {
      if (b.protein !== a.protein) return b.protein - a.protein;
      return a.waitTime - b.waitTime;
    });
  }
  if (filterType === "calories") {
    return flatLocations.sort((a, b) => {
      if (a.calories !== b.calories) return a.calories - b.calories;
      return a.waitTime - b.waitTime;
    });
  }
  if (filterType === "cost") {
    return flatLocations.sort((a, b) => {
      if (a.cost !== b.cost) return a.cost - b.cost;
      return a.waitTime - b.waitTime;
    });
  }

  return flatLocations.sort((a, b) => a.waitTime - b.waitTime);
}