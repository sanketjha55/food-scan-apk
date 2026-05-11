// Utility functions for food analysis and harm detection

// Database of known harmful ingredients
export const HARMFUL_INGREDIENTS_DB = {
  HIGH_RISK: [
    'aflatoxin', 'salmonella', 'e.coli', 'listeria',
    'mercury', 'lead', 'cadmium', 'arsenic',
    'artificial trans fat', 'BHA', 'BHT', 'TBHQ',
  ],
  MEDIUM_RISK: [
    'high fructose corn syrup', 'sodium nitrite', 'potassium bromate',
    'azodicarbonamide', 'butylated hydroxyanisole',
  ],
  ALLERGENS: [
    'peanuts', 'tree nuts', 'milk', 'eggs', 'fish', 'shellfish',
    'soy', 'wheat', 'sesame',
  ],
  AVOID_FOR: {
    diabetes: ['high sugar', 'refined carbs', 'high glycemic index'],
    hypertension: ['high sodium', 'high salt'],
    obesity: ['high calorie', 'high fat', 'high sugar'],
    celiac: ['gluten', 'wheat', 'barley', 'rye'],
    vegan: ['animal products', 'meat', 'fish', 'dairy', 'eggs', 'honey'],
  },
};

// Country-specific banned ingredients
export const COUNTRY_BANS = {
  US: ['unpasteurized milk', 'casu marzu cheese'],
  EU: ['BHA', 'BHT', 'TBHQ', 'brominated vegetable oil'],
  JP: ['certain additives and colorants'],
  IN: ['artificial colors (some)', 'certain artificial sweeteners'],
  AU: ['certain food dyes', 'high sodium content limits'],
};

// Analyze food for harmful ingredients
export function analyzeFoodForHarms(foodData) {
  const harms = {
    highRisk: [],
    mediumRisk: [],
    allergens: [],
  };
  
  const ingredients = (foodData.ingredients || '').toLowerCase();
  
  // Check high risk ingredients
  HARMFUL_INGREDIENTS_DB.HIGH_RISK.forEach(ingredient => {
    if (ingredients.includes(ingredient.toLowerCase())) {
      harms.highRisk.push(ingredient);
    }
  });
  
  // Check medium risk ingredients
  HARMFUL_INGREDIENTS_DB.MEDIUM_RISK.forEach(ingredient => {
    if (ingredients.includes(ingredient.toLowerCase())) {
      harms.mediumRisk.push(ingredient);
    }
  });
  
  // Check allergens
  HARMFUL_INGREDIENTS_DB.ALLERGENS.forEach(allergen => {
    if (ingredients.includes(allergen.toLowerCase())) {
      harms.allergens.push(allergen);
    }
  });
  
  return harms;
}

// Check if ingredient is banned in region
export function checkRegionalBans(foodData, region) {
  const bannedIngredients = COUNTRY_BANS[region] || [];
  const ingredients = (foodData.ingredients || '').toLowerCase();
  const foundBans = [];
  
  bannedIngredients.forEach(banned => {
    if (ingredients.includes(banned.toLowerCase())) {
      foundBans.push(banned);
    }
  });
  
  return foundBans;
}

// Calculate nutrition score (0-100)
export function calculateNutritionScore(foodData) {
  let score = 100;
  
  // Deduct for excessive nutrients
  if (foodData.sugar > 25) score -= 15;
  if (foodData.fat > 20) score -= 10;
  if (foodData.sodium > 500) score -= 10;
  if (foodData.calories > 300) score -= 5;
  
  // Add points for beneficial nutrients
  if (foodData.fiber > 5) score += 10;
  if (foodData.protein > 10) score += 10;
  if (foodData.vitamins) score += 5;
  
  return Math.max(0, Math.min(100, score));
}

// Get health recommendation based on nutrition
export function getHealthRecommendation(foodData, healthProfile = {}) {
  const recommendations = [];
  
  if (foodData.calories > 500) {
    recommendations.push('This is a high-calorie food. Consume in moderation.');
  }
  
  if (foodData.sugar > 20) {
    recommendations.push('This food is high in sugar. Limit consumption, especially for diabetics.');
  }
  
  if (foodData.sodium > 400) {
    recommendations.push('This food is high in sodium. Those with hypertension should limit intake.');
  }
  
  if (foodData.fat > 15) {
    recommendations.push('This food is high in fat. Pair with exercise or reduce portion size.');
  }
  
  if (foodData.protein > 15) {
    recommendations.push('This food is a good protein source. Excellent for muscle building and recovery.');
  }
  
  if (foodData.fiber > 5) {
    recommendations.push('This food is high in fiber. Great for digestive health.');
  }
  
  return recommendations;
}

// Check for food combination risks
export function checkFoodCombinationRisks(food1, food2) {
  const risks = [];
  
  // High protein + High fat combination
  if ((food1.protein > 15 && food2.fat > 15) || (food1.fat > 15 && food2.protein > 15)) {
    risks.push('This combination is high in both protein and fat. May be heavy on digestion.');
  }
  
  // High sugar foods
  if (food1.sugar > 20 && food2.sugar > 20) {
    risks.push('Both foods are high in sugar. Avoid combining for better health.');
  }
  
  return risks;
}

// Get food poisoning risk
export function assessFoodPoisoningRisk(foodData) {
  const risks = [];
  
  if (foodData.harmfulIngredients?.includes('salmonella')) {
    risks.push('⚠️ Salmonella contamination risk detected. Ensure proper cooking.');
  }
  
  if (foodData.harmfulIngredients?.includes('e.coli')) {
    risks.push('⚠️ E. coli contamination risk. Ensure food is thoroughly washed/cooked.');
  }
  
  if (foodData.harmfulIngredients?.includes('listeria')) {
    risks.push('⚠️ Listeria risk. Avoid if pregnant or immunocompromised.');
  }
  
  // Check expiration or spoilage indicators
  if (foodData.expiryDate && new Date(foodData.expiryDate) < new Date()) {
    risks.push('⚠️ This food has expired. Do not consume.');
  }
  
  return risks;
}

// Generate detailed analysis report
export function generateAnalysisReport(foodData, region, language = 'en') {
  const report = {
    foodName: foodData.name,
    timeGenerated: new Date().toISOString(),
    region: region,
    language: language,
    
    nutrition: {
      score: calculateNutritionScore(foodData),
      calories: foodData.calories,
      macronutrients: {
        protein: foodData.protein,
        fat: foodData.fat,
        carbs: foodData.carbs,
      },
      sugar: foodData.sugar,
      fiber: foodData.fiber,
    },
    
    safety: {
      harmfulIngredients: analyzeFoodForHarms(foodData),
      regionalBans: checkRegionalBans(foodData, region),
      foodPoisoningRisks: assessFoodPoisoningRisk(foodData),
    },
    
    health: {
      recommendations: getHealthRecommendation(foodData),
      allergenWarnings: analyzeFoodForHarms(foodData).allergens,
    },
  };
  
  return report;
}

export default {
  analyzeFoodForHarms,
  checkRegionalBans,
  calculateNutritionScore,
  getHealthRecommendation,
  checkFoodCombinationRisks,
  assessFoodPoisoningRisk,
  generateAnalysisReport,
};
