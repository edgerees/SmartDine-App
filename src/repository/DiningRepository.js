export async function getDiningLocations() {
  // get the current GPS location
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch(() => null); // If location is denied, return null instead of crashing

  if (position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Call the backend endpoint using query parameters to avoid URL issues
    const response = await fetch(
      `http://localhost:3001/api/dining/location?lat=${lat}&lng=${lng}`
    );
    return response.json();
  }

  const response = await fetch("http://localhost:3001/api/dining");
  return response.json();
}

export async function getDiningLocationsByCategory(category) {
  const locations = await getDiningLocations();
  return locations.filter((location) => location.category === category);
}