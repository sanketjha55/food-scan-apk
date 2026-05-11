// Format utility functions

export function formatCalories(calories) {
  return `${Math.round(calories)} kcal`;
}

export function formatGrams(grams) {
  if (grams < 1) {
    return `${(grams * 1000).toFixed(0)}mg`;
  }
  return `${grams.toFixed(1)}g`;
}

export function formatPercentage(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date) {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function formatNutritionLabel(label) {
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Daily Value percentages
export function calculateDV(nutrient, value) {
  const dvValues = {
    calories: 2000,
    protein: 50,
    fat: 78,
    carbs: 275,
    fiber: 28,
    sugar: 50,
    sodium: 2300,
    cholesterol: 300,
    vitaminA: 900,
    vitaminC: 90,
    calcium: 1300,
    iron: 18,
  };
  
  const dv = dvValues[nutrient.toLowerCase()];
  if (!dv) return null;
  
  return formatPercentage(value / dv);
}

export function getRiskColor(riskLevel) {
  const colors = {
    high: '#E74C3C',
    medium: '#F39C12',
    low: '#27AE60',
    none: '#95A5A6',
  };
  return colors[riskLevel?.toLowerCase()] || colors.none;
}

export function getRiskLabel(riskLevel) {
  const labels = {
    high: '🔴 High Risk',
    medium: '🟡 Medium Risk',
    low: '🟢 Low Risk',
    none: '⚪ Safe',
  };
  return labels[riskLevel?.toLowerCase()] || 'Unknown';
}

export default {
  formatCalories,
  formatGrams,
  formatPercentage,
  formatDate,
  formatTime,
  formatDateTime,
  truncateText,
  formatNutritionLabel,
  calculateDV,
  getRiskColor,
  getRiskLabel,
};
