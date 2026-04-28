const express = require("express");
const diningLocations = require("./diningData.json");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


// Formula to calculate the distance in miles between two GPS coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns distance in miles
}

// Estimates walk time based on average walking speed of 20 min per mile
function getWalkTime(miles) {
  return Math.max(1, Math.round(miles * 20)); // Minimum 1 minute walk
}

function getEstimatedWaitTime(baseWaitTime) {
  const hour = new Date().getHours();

  // Early morning - very quiet
  if (hour >= 6 && hour < 8) return baseWaitTime - 1;
  // Breakfast rush
  if (hour >= 8 && hour < 10) return baseWaitTime + 2;
  // Mid morning - quiet
  if (hour >= 10 && hour < 11) return baseWaitTime;
  // Lunch rush
  if (hour >= 11 && hour < 13) return baseWaitTime + 5;
  // Early afternoon - moderate
  if (hour >= 13 && hour < 17) return baseWaitTime + 1;
  // Dinner rush
  if (hour >= 17 && hour < 19) return baseWaitTime + 4;
  // Late evening - busy
  if (hour >= 19 && hour < 22) return baseWaitTime + 2;
  // Late night
  return baseWaitTime - 1;
}

app.get("/", (req, res) => {
  res.send("SmartDine backend is running");
});

app.get("/api/dining", (req, res) => {
  const results = diningLocations.map((location) => {
    const finalWait = Math.max(0, getEstimatedWaitTime(location.waitTime));

    return {
      ...location,
      waitTime: finalWait,
      wait: `${finalWait} minute wait`
    };
  });

  res.json(results);
});

// Endpoint that accepts student's GPS location as query parameters
app.get("/api/dining/location", (req, res) => {
  const studentLat = parseFloat(req.query.lat);
  const studentLng = parseFloat(req.query.lng);

  const results = diningLocations.map((location) => {
    // Calculate dynamic wait time based on current hour
    const finalWait = Math.max(0, getEstimatedWaitTime(location.waitTime));

    // Calculate distance from student to this dining location
    const distance = calculateDistance(
      studentLat, studentLng,
      location.lat, location.lng
    );

    // Calculate walk time from distance
    const walkTime = getWalkTime(distance);

    return {
      ...location,
      waitTime: finalWait,
      wait: `${finalWait} minute wait`,
      distance: distance.toFixed(2),
      walkTimeText: `${walkTime} min walk`
    };
  });

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`SmartDine backend running on http://localhost:${PORT}`);
});