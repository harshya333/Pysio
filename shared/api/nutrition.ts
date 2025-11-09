const USDA_API_KEY = "DEMO_KEY"; // Replace with your actual API key
const USDA_API_BASE = "https://api.nal.usda.gov/fdc/v1";

export interface NutrientData {
  nutrientId: number;
  nutrientName: string;
  value: number;
  unitName: string;
}

export interface FoodData {
  fdcId: number;
  description: string;
  dataType: string;
  servingSize?: number;
  servingSizeUnit?: string;
  foodNutrients: NutrientData[];
}

export interface SearchResult {
  foods: FoodData[];
  totalHits: number;
}

export const searchFoods = async (query: string): Promise<SearchResult> => {
  const url = `${USDA_API_BASE}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error searching foods: ${response.statusText}`);
  }
  return response.json();
};

export const getFoodDetails = async (fdcId: number): Promise<FoodData> => {
  const url = `${USDA_API_BASE}/food/${fdcId}?api_key=${USDA_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error getting food details: ${response.statusText}`);
  }
  return response.json();
};

export interface NutrientInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

// Helper function to extract macronutrients from USDA API response
export const extractMacronutrients = (foodData: FoodData): NutrientInfo => {
  const nutrients = foodData.foodNutrients;
  let info: NutrientInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Map USDA nutrient IDs to our properties
  const nutrientMap: { [key: number]: keyof NutrientInfo } = {
    1008: "calories",   // Energy (kcal)
    1003: "protein",    // Protein
    1005: "carbs",      // Carbohydrates
    1004: "fat",        // Total fat
    1079: "fiber"       // Fiber
  };

  nutrients.forEach(nutrient => {
    const propertyName = nutrientMap[nutrient.nutrientId];
    if (propertyName) {
      info[propertyName] = nutrient.value;
    }
  });

  return info;
};