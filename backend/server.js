const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const diningLocations = [
  {
    name: "Southside",
    lat: 38.83150265635538,
    lng: -77.30514112158578,
    wait: "5 minute wait",
    waitTime: 5,
    category: "Dining Hall",
    location: "4353 Chesapeake River Way, Fairfax, VA 22030",
    meals: [
      { meal: "Grilled Chicken Bowl", calories: 550, protein: 42, cost: 0 },
      { meal: "Beef Stir Fry", calories: 620, protein: 38, cost: 0 },
      { meal: "Veggie Pasta", calories: 410, protein: 15, cost: 0 }
    ]
  },
  {
    name: "Ike's",
    lat: 38.82893179281937,
    lng: -77.30238539044832,
    wait: "3 minute wait",
    waitTime: 3,
    category: "Dining Hall",
    location: "10445 Presidents Park Dr, Fairfax, VA 22030",
    meals: [
      { meal: "BBQ Bacon Burger", calories: 750, protein: 45, cost: 0 },
      { meal: "Grilled Salmon", calories: 520, protein: 48, cost: 0 },
      { meal: "Caesar Salad with Chicken", calories: 430, protein: 35, cost: 0 }
    ]
  },
  {
    name: "The Globe",
    lat: 38.829971882047424,
    lng: -77.31482782989757,
    wait: "2 minute wait",
    waitTime: 2,
    category: "Dining Hall",
    location: "4352 Mason Pond Dr, Fairfax, VA 22030",
    meals: [
      { meal: "Teriyaki Rice Bowl", calories: 600, protein: 28, cost: 0 },
      { meal: "Chicken Tikka Masala", calories: 650, protein: 40, cost: 0 },
      { meal: "Vegetable Curry", calories: 380, protein: 12, cost: 0 }
    ]
  },
  {
    name: "The Spot",
    lat: 38.83401551184035,
    lng: -77.30476631544347,
    wait: "No wait",
    waitTime: 0,
    category: "Dining Hall",
    location: "4401 Patriot Cir, Fairfax, VA 22030",
    meals: [
      { meal: "Impossible Burger", calories: 480, protein: 25, cost: 0 },
      { meal: "Vegan Buddha Bowl", calories: 420, protein: 18, cost: 0 },
      { meal: "Lentil Soup & Bread", calories: 350, protein: 16, cost: 0 }
    ]
  },
  {
    name: "Chick-fil-A",
    lat: 38.832156032080846,
    lng: -77.30717667810985,
    wait: "7 minute wait",
    waitTime: 7,
    category: "Retail",
    location: "Student Union Building 1, Fairfax, VA 22030",
    meals: [
      { meal: "Chicken Sandwich Combo", calories: 670, protein: 38, cost: 9 },
      { meal: "Grilled Nuggets", calories: 360, protein: 42, cost: 8 },
      { meal: "Spicy Deluxe Sandwich", calories: 720, protein: 40, cost: 10 }
    ]
  },
  {
    name: "Chipotle",
    lat: 38.8299389187838,
    lng: -77.30764331768073,
    wait: "10 minute wait",
    waitTime: 10,
    category: "Retail",
    location: "4477 Aquia Creek Ln, Fairfax, VA 22030",
    meals: [
      { meal: "Chicken Burrito Bowl", calories: 720, protein: 44, cost: 10 },
      { meal: "Steak Tacos", calories: 620, protein: 38, cost: 11 },
      { meal: "Veggie Burrito", calories: 530, protein: 18, cost: 9 }
    ]
  },
  {
    name: "Panera Bread",
    lat: 38.83036975323307,
    lng: -77.30746139154132,
    wait: "12 minute wait",
    waitTime: 12,
    category: "Retail",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "You Pick Two", calories: 500, protein: 22, cost: 11 },
      { meal: "Turkey Sandwich", calories: 450, protein: 28, cost: 10 },
      { meal: "Broccoli Cheddar Soup", calories: 340, protein: 12, cost: 8 }
    ]
  },
  {
    name: "Einstein Bros. Bagels",
    lat: 38.835040677389806,
    lng: -77.30785510934827,
    wait: "5 minute wait",
    waitTime: 5,
    category: "Cafe",
    location: "4441 George Mason Blvd, Fairfax, VA 22030",
    meals: [
      { meal: "Bagel with Cream Cheese", calories: 380, protein: 12, cost: 7 },
      { meal: "Turkey Sausage Sandwich", calories: 480, protein: 28, cost: 9 },
      { meal: "Avocado Toast Bagel", calories: 420, protein: 14, cost: 8 }
    ]
  },
  {
    name: "The Eaterie",
    lat: 38.83153575099319,
    lng: -77.30856358875654,
    wait: "8 minute wait",
    waitTime: 8,
    category: "Retail",
    location: "4469 Aquia Creek Ln, Fairfax, VA 22030",
    meals: [
      { meal: "Made-to-Order Sandwich", calories: 520, protein: 30, cost: 9 },
      { meal: "Grain Bowl", calories: 490, protein: 22, cost: 10 },
      { meal: "Chicken Wrap", calories: 560, protein: 35, cost: 9 }
    ]
  },
  {
    name: "Starbucks",
    lat: 38.834042672662456,
    lng: -77.30671415761209,
    wait: "7 minute wait",
    waitTime: 7,
    category: "Cafe",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "Protein Box & Latte", calories: 420, protein: 18, cost: 12 },
      { meal: "Egg & Cheese Sandwich", calories: 380, protein: 16, cost: 8 },
      { meal: "Overnight Oats", calories: 290, protein: 10, cost: 7 }
    ]
  },
  {
    name: "Panda Express",
    lat: 38.834841911267304,
    lng: -77.30795121927815,
    wait: "8 minute wait",
    waitTime: 8,
    category: "Retail",
    location: "4441 George Mason Blvd, Fairfax, VA 22030",
    meals: [
      { meal: "Orange Chicken Plate", calories: 890, protein: 32, cost: 10 },
      { meal: "Grilled Teriyaki Chicken", calories: 640, protein: 46, cost: 10 },
      { meal: "Kung Pao Chicken", calories: 720, protein: 38, cost: 10 }
    ]
  },
  {
    name: "The Halal Guys",
    lat: 38.83020252136437,
    lng: -77.30772336547868,
    wait: "9 minute wait",
    waitTime: 9,
    category: "Retail",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "Chicken Over Rice", calories: 790, protein: 48, cost: 11 },
      { meal: "Gyro Combo", calories: 820, protein: 44, cost: 12 },
      { meal: "Falafel Platter", calories: 650, protein: 22, cost: 10 }
    ]
  },
  {
    name: "Manhattan Pizza",
    lat: 38.83503591803712,
    lng: -77.30742417266477,
    wait: "6 minute wait",
    waitTime: 6,
    category: "Retail",
    location: "Fairfax Campus, VA 22030",
    meals: [
      { meal: "Cheese Pizza Slice", calories: 570, protein: 22, cost: 5 },
      { meal: "Pepperoni Pizza Slice", calories: 640, protein: 26, cost: 6 },
      { meal: "Chicken Caesar Wrap", calories: 520, protein: 32, cost: 9 }
    ]
  },
  {
    name: "Blaze Pizza",
    lat: 38.83003164817081,
    lng: -77.30775866389165,
    wait: "8 minute wait",
    waitTime: 8,
    category: "Retail",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "Build Your Own Pizza", calories: 640, protein: 22, cost: 10 },
      { meal: "Pepperoni Fast Fire'd Fold", calories: 580, protein: 24, cost: 10 },
      { meal: "Protein Pizza", calories: 720, protein: 48, cost: 12 }
    ]
  },
  {
    name: "Dunkin'",
    lat: 38.831978814229544,
    lng: -77.3061094593387,
    wait: "4 minute wait",
    waitTime: 4,
    category: "Cafe",
    location: "Fairfax Campus, VA 22030",
    meals: [
      { meal: "Egg White Veggie Omelet Bites", calories: 170, protein: 13, cost: 5 },
      { meal: "Bacon Egg & Cheese Sandwich", calories: 500, protein: 22, cost: 6 },
      { meal: "Wake-Up Wrap", calories: 180, protein: 8, cost: 3 }
    ]
  },
  {
    name: "Steak 'n Shake",
    lat: 38.830250024532326,
    lng: -77.30792476953822,
    wait: "10 minute wait",
    waitTime: 10,
    category: "Retail",
    location: "Fairfax Campus, VA 22030",
    meals: [
      { meal: "Original Double Steakburger", calories: 630, protein: 27, cost: 7 },
      { meal: "Frisco Melt", calories: 700, protein: 32, cost: 8 },
      { meal: "Grilled Chicken Sandwich", calories: 350, protein: 28, cost: 7 }
    ]
  },
  {
    name: "Flip Kitchen",
    lat: 38.82996430237734,
    lng: -77.30751238157286,
    wait: "5 minute wait",
    waitTime: 5,
    category: "Retail",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "Grilled Chicken Wrap", calories: 480, protein: 36, cost: 9 },
      { meal: "Acai Smoothie Bowl", calories: 390, protein: 12, cost: 10 },
      { meal: "Kale Caesar Salad", calories: 320, protein: 18, cost: 9 }
    ]
  },
  {
    name: "Ace Sushi",
    lat: 38.83021713736529,
    lng: -77.30780795494735,
    wait: "6 minute wait",
    waitTime: 6,
    category: "Retail",
    location: "Johnson Center, Fairfax, VA 22030",
    meals: [
      { meal: "Spicy Tuna Roll", calories: 290, protein: 18, cost: 8 },
      { meal: "Salmon Avocado Roll", calories: 320, protein: 20, cost: 9 },
      { meal: "Chicken Teriyaki Bowl", calories: 540, protein: 38, cost: 10 }
    ]
  }
];

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