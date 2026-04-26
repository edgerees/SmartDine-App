import { getDiningLocations } from "../repository/DiningRepository";

export async function filterDiningOptions(filterType) {
  const locations = await getDiningLocations();
  console.log("locations:", locations)

  const flatLocations = locations.map((location) => ({
    ...location,
    meal: location.meals[0].meal,
    calories: location.meals[0].calories,
    protein: location.meals[0].protein,
    cost: location.meals[0].cost
  }));

  if (filterType === "protein") {
    return flatLocations.sort((a, b) => b.protein - a.protein);
  }
  if (filterType === "calories") {
    return flatLocations.sort((a, b) => a.calories - b.calories);
  }
  if (filterType === "cost") {
    return flatLocations.sort((a, b) => a.cost - b.cost);
  }

  return flatLocations;
}