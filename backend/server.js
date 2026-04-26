const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const diningLocations = [
  {
    id: 1,
    name: "Southside",
    wait: "3-minute wait",
    waitTime: 3,
    category: "Dining Hall",
    location: "Center of Campus",
    meals: [
      { meal: "Grilled Chicken Bowl", calories: 550, protein: 42, cost: 0 },
      { meal: "Beef Stir Fry", calories: 620, protein: 38, cost: 0 },
      { meal: "Veggie Pasta", calories: 410, protein: 15, cost: 0 }
    ]
  },
  {
    id: 2,
    name: "Ike's",
    wait: "5-minute wait",
    waitTime: 5,
    category: "Dining Hall",
    location: "Presidents Park",
    meals: [
      { meal: "BBQ Bacon Burger", calories: 750, protein: 45, cost: 0 },
      { meal: "Grilled Salmon", calories: 520, protein: 48, cost: 0 },
      { meal: "Caesar Salad with Chicken", calories: 430, protein: 35, cost: 0 }
    ]
  },
  {
    id: 3,
    name: "The Globe",
    wait: "7-minute wait",
    waitTime: 7,
    category: "Dining Hall",
    location: "Globe Building",
    meals: [
      { meal: "Teriyaki Rice Bowl", calories: 600, protein: 28, cost: 0 },
      { meal: "Chicken Tikka Masala", calories: 650, protein: 40, cost: 0 },
      { meal: "Vegetable Curry", calories: 380, protein: 12, cost: 0 }
    ]
  },
  {
    id: 4,
    name: "The Spot",
    wait: "4-minute wait",
    waitTime: 4,
    category: "Dining Hall",
    location: "Fairfax Campus",
    meals: [
      { meal: "Impossible Burger", calories: 480, protein: 25, cost: 0 },
      { meal: "Vegan Buddha Bowl", calories: 420, protein: 18, cost: 0 },
      { meal: "Lentil Soup & Bread", calories: 350, protein: 16, cost: 0 }
    ]
  },
  {
    id: 5,
    name: "Chick-fil-A",
    wait: "8-minute wait",
    waitTime: 8,
    category: "Retail",
    location: "Johnson Center",
    meals: [
      { meal: "Chicken Sandwich Combo", calories: 670, protein: 38, cost: 9 },
      { meal: "Grilled Nuggets", calories: 360, protein: 42, cost: 8 },
      { meal: "Spicy Deluxe Sandwich", calories: 720, protein: 40, cost: 10 }
    ]
  },
  {
    id: 6,
    name: "Chipotle",
    wait: "10-minute wait",
    waitTime: 10,
    category: "Retail",
    location: "Johnson Center",
    meals: [
      { meal: "Chicken Burrito Bowl", calories: 720, protein: 44, cost: 10 },
      { meal: "Steak Tacos", calories: 620, protein: 38, cost: 11 },
      { meal: "Veggie Burrito", calories: 530, protein: 18, cost: 9 }
    ]
  },
  {
    id: 7,
    name: "Panera Bread",
    wait: "6-minute wait",
    waitTime: 6,
    category: "Retail",
    location: "Johnson Center",
    meals: [
      { meal: "You Pick Two", calories: 500, protein: 22, cost: 11 },
      { meal: "Turkey Sandwich", calories: 450, protein: 28, cost: 10 },
      { meal: "Broccoli Cheddar Soup", calories: 340, protein: 12, cost: 8 }
    ]
  },
  {
    id: 8,
    name: "Einstein Bros. Bagels",
    wait: "5-minute wait",
    waitTime: 5,
    category: "Cafe",
    location: "Merten Hall",
    meals: [
      { meal: "Bagel with Cream Cheese", calories: 380, protein: 12, cost: 7 },
      { meal: "Turkey Sausage Sandwich", calories: 480, protein: 28, cost: 9 },
      { meal: "Avocado Toast Bagel", calories: 420, protein: 14, cost: 8 }
    ]
  },
  {
    id: 9,
    name: "The Eaterie",
    wait: "6-minute wait",
    waitTime: 6,
    category: "Retail",
    location: "Fairfax Campus",
    meals: [
      { meal: "Made-to-Order Sandwich", calories: 520, protein: 30, cost: 9 },
      { meal: "Grain Bowl", calories: 490, protein: 22, cost: 10 },
      { meal: "Chicken Wrap", calories: 560, protein: 35, cost: 9 }
    ]
  },
  {
    id: 10,
    name: "Starbucks",
    wait: "7-minute wait",
    waitTime: 7,
    category: "Cafe",
    location: "Johnson Center",
    meals: [
      { meal: "Protein Box & Latte", calories: 420, protein: 18, cost: 12 },
      { meal: "Egg & Cheese Sandwich", calories: 380, protein: 16, cost: 8 },
      { meal: "Overnight Oats", calories: 290, protein: 10, cost: 7 }
    ]
  },
  {
    id: 11,
    name: "Panda Express",
    wait: "8-minute wait",
    waitTime: 8,
    category: "Retail",
    location: "Johnson Center",
    meals: [
      { meal: "Orange Chicken Plate", calories: 890, protein: 32, cost: 10 },
      { meal: "Grilled Teriyaki Chicken", calories: 640, protein: 46, cost: 10 },
      { meal: "Kung Pao Chicken", calories: 720, protein: 38, cost: 10 }
    ]
  },
  {
    id: 12,
    name: "The Halal Guys",
    wait: "9-minute wait",
    waitTime: 9,
    category: "Retail",
    location: "Johnson Center",
    meals: [
      { meal: "Chicken Over Rice", calories: 790, protein: 48, cost: 11 },
      { meal: "Gyro Combo", calories: 820, protein: 44, cost: 12 },
      { meal: "Falafel Platter", calories: 650, protein: 22, cost: 10 }
    ]
  }
];

app.get("/", (req, res) => {
  res.send("SmartDine backend is running");
});

app.get("/api/dining", (req, res) => {
  res.json(diningLocations);
});

app.listen(PORT, () => {
  console.log(`SmartDine backend running on http://localhost:${PORT}`);
});