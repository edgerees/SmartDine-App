import { getDiningLocations } from "../repository/DiningRepository";

export function filterDiningOptions(filterType) {
  let locations = getDiningLocations();

  if (filterType === "protein") {
    return locations.sort((a, b) => b.protein - a.protein);
  }

  if (filterType === "calories") {
    return locations.sort((a, b) => a.calories - b.calories);
  }

  if (filterType === "cost") {
    return locations.sort((a, b) => a.cost - b.cost);
  }

  return locations;
}