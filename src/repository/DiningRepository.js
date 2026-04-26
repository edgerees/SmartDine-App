export async function getDiningLocations() {
  const response = await fetch("http://localhost:3001/api/dining");
  const data = await response.json();
  return data;
}

export async function getDiningLocationsByCategory(category) {
  const locations = await getDiningLocations();
  return locations.filter((location) => location.category === category);
}