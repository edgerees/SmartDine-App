import { getDiningLocations } from "../repository/DiningRepository";

// Changed/Added by Edrees
function toNumber(value) {
  return Number(value) || 0;
}

// Changed/Added by Edrees
function getActivityFactor(activityLevel) {
  if (activityLevel === "light") return 1.375;
  if (activityLevel === "moderate") return 1.55;
  if (activityLevel === "active") return 1.725;

  return 1.2;
}

// Changed/Added by Edrees
export function calculateCalorieInfo(student) {
  const weightKg = toNumber(student.weight) * 0.453592;
  const heightCm =
    toNumber(student.heightFeet) * 30.48 + toNumber(student.heightInches) * 2.54;
  const age = toNumber(student.age);

  let bmr = 0;

  if (student.gender === "female") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  const maintenance = Math.round(bmr * getActivityFactor(student.activityLevel));
  let target = maintenance;

  if (student.goal === "lose") {
    target = maintenance - 400;
  }

  if (student.goal === "gain") {
    target = maintenance + 350;
  }

  return {
    maintenance,
    target,
    perMealTarget: Math.round(target / 3)
  };
}

// Changed/Added by Edrees
function getGoalLabel(goal) {
  if (goal === "lose") return "weight loss";
  if (goal === "gain") return "weight gain";
  return "maintenance";
}

// Changed/Added by Edrees
function getTrafficLabel(waitTime) {
  if (waitTime <= 3) return "Low traffic";
  if (waitTime <= 8) return "Moderate traffic";
  return "High traffic";
}

// Changed/Added by Edrees
function mealMatchesDiet(meal, student) {
  const preference = student.dietaryPreference;
  const tags = meal.dietaryTags || [];

  if (preference === "none") {
    return true;
  }

  return tags.includes(preference);
}

// Changed/Added by Edrees
function canAffordMeal(meal, student) {
  const swipesLeft = toNumber(student.swipesLeft);
  const diningDollars = toNumber(student.diningDollars);

  if (meal.cost === 0 && swipesLeft > 0) {
    return true;
  }

  if (meal.cost > 0 && diningDollars >= meal.cost) {
    return true;
  }

  return false;
}

// Changed/Added by Edrees
function getPaymentText(meal, student) {
  if (meal.cost === 0) {
    if (toNumber(student.swipesLeft) > 0) {
      return "Uses 1 meal swipe";
    }

    return "Meal swipe required, but no swipes left";
  }

  return `$${meal.cost} dining dollars`;
}

// Changed/Added by Edrees
function scoreMeal(meal, location, student, filterType, calorieInfo) {
  let score = 100;

  const waitTime = toNumber(location.waitTime);
  const perMealTarget = calorieInfo.perMealTarget;

  score -= waitTime * 2;

  if (location.category === student.preferredCategory) {
    score += 12;
  }

  if (meal.cost === 0) {
    score += 8;
  }

  if (student.goal === "lose") {
    score += meal.protein * 1.2;
    score -= Math.max(0, meal.calories - perMealTarget) / 8;
  }

  if (student.goal === "gain") {
    score += meal.protein * 1.4;
    score += meal.calories / 25;
  }

  if (student.goal === "maintain") {
    score += meal.protein * 0.7;
    score -= Math.abs(meal.calories - perMealTarget) / 12;
  }

  if (filterType === "protein") {
    score += meal.protein * 1.5;
  }

  if (filterType === "calories") {
    score -= Math.abs(meal.calories - perMealTarget) / 8;
  }

  if (filterType === "cost") {
    score -= meal.cost * 4;
  }

  return Math.round(score);
}

// Changed/Added by Edrees
function buildReasonList(location, bestMeal, student, calorieInfo) {
  const reasons = [];

  reasons.push(`${getTrafficLabel(location.waitTime)} with ${location.wait}.`);

  if (bestMeal.cost === 0) {
    reasons.push(`Uses a meal swipe, and ${student.name} has ${student.swipesLeft} swipes left.`);
  } else {
    reasons.push(`Costs $${bestMeal.cost}, and ${student.name} has $${student.diningDollars} dining dollars.`);
  }

  reasons.push(
    `Matches the ${getGoalLabel(student.goal)} goal with ${bestMeal.calories} calories and ${bestMeal.protein}g protein.`
  );

  if (student.dietaryPreference !== "none") {
    reasons.push(`Only showing meals tagged as ${student.dietaryPreference}.`);
  } else {
    reasons.push("No dietary restriction was selected, so all meals are allowed.");
  }

  reasons.push(`Daily calorie target is about ${calorieInfo.target} calories.`);

  return reasons;
}

// Changed/Added by Edrees
function rankLocation(location, student, filterType, calorieInfo) {
  const allowedMeals = location.meals.filter((meal) => {
    return mealMatchesDiet(meal, student) && canAffordMeal(meal, student);
  });

  if (allowedMeals.length === 0) {
    return null;
  }

  const scoredMeals = allowedMeals.map((meal) => {
    return {
      ...meal,
      smartScore: scoreMeal(meal, location, student, filterType, calorieInfo)
    };
  });

  scoredMeals.sort((a, b) => b.smartScore - a.smartScore);

  const bestMeal = scoredMeals[0];

  const locationScore =
    bestMeal.smartScore -
    toNumber(location.waitTime) +
    (location.category === student.preferredCategory ? 8 : 0);

  return {
    ...location,
    meals: scoredMeals,
    bestMeal,
    score: Math.round(locationScore),
    trafficLabel: getTrafficLabel(location.waitTime),
    paymentText: getPaymentText(bestMeal, student),
    reasonList: buildReasonList(location, bestMeal, student, calorieInfo)
  };
}

// Changed/Added by Edrees
export async function filterDiningOptions(filterType, student) {
  const locations = await getDiningLocations();
  const calorieInfo = calculateCalorieInfo(student);

  const rankedLocations = locations
    .map((location) => rankLocation(location, student, filterType, calorieInfo))
    .filter((location) => location !== null);

  return rankedLocations.sort((a, b) => b.score - a.score);
}

// Changed/Added by Edrees
export function generateRecommendation(topLocation, filterType, student) {
  if (!topLocation || !topLocation.bestMeal) {
    return `SmartDine could not find a dining option that matches ${student.name}'s dietary preference and budget.`;
  }

  const meal = topLocation.bestMeal;
  const swipesAfter =
    meal.cost === 0
      ? Math.max(toNumber(student.swipesLeft) - 1, 0)
      : toNumber(student.swipesLeft);

  let filterText = "overall best match";

  if (filterType === "protein") {
    filterText = "highest protein priority";
  }

  if (filterType === "calories") {
    filterText = "best calorie fit";
  }

  if (filterType === "cost") {
    filterText = "lowest cost priority";
  }

  return `SmartDine recommends ${topLocation.name} for ${student.name}. The best meal is ${meal.meal}, using the ${filterText}. It has ${meal.calories} calories, ${meal.protein}g protein, ${topLocation.wait}, and ${topLocation.paymentText}. After this choice, ${student.name} would have ${swipesAfter} meal swipes left.`;
}