import { RequestHandler } from "express";
import fetch from "node-fetch";

// Normalized response format for nutrient data
interface NutrientPer100 {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number | null;
}

interface FoodApiResponse {
  item: string;
  per100: NutrientPer100 | null;
}

// Helper to parse USDA FDC response
const parseFdcFood = (food: any): NutrientPer100 | null => {
  if (!food || !food.foodNutrients) return null;
  
  // Map USDA nutrient IDs to our fields
  const nutrientMap: Record<number, keyof NutrientPer100> = {
    1008: 'calories',    // Energy (kcal)
    1003: 'protein',     // Protein
    1005: 'carbs',       // Carbohydrate, by difference
    1004: 'fat',         // Total lipids (fat)
    1079: 'fiber',       // Fiber, total dietary
  };
  
  const result: Partial<NutrientPer100> = {};
  
  for (const nutrient of food.foodNutrients) {
    const nutrientId = nutrient.nutrientId || nutrient.nutrient?.id;
    if (!nutrientId) continue;
    
    const field = nutrientMap[nutrientId];
    if (!field) continue;
    
    const amount = nutrient.amount || nutrient.value || 0;
    result[field] = Math.round(amount * 10) / 10;
  }
  
  // Require at least some basic nutrients
  if (!result.calories && !result.protein && !result.carbs && !result.fat) {
    return null;
  }
  
  return {
    calories: result.calories || 0,
    protein: result.protein || 0,
    carbs: result.carbs || 0,
    fat: result.fat || 0,
    fiber: result.fiber || undefined
  };
};

export const handleFood: RequestHandler = async (req, res) => {
  const query = (req.query.query || '') as string;
  if (!query) {
    return res.status(400).json({ error: 'query parameter is required' });
  }

  const fdcKey = process.env.FDC_API_KEY;
  if (!fdcKey) {
    return res.status(500).json({ error: 'USDA FoodData Central API key not configured' });
  }

  try {
    // Query USDA FoodData Central API
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(fdcKey)}&query=${encodeURIComponent(query)}&pageSize=1&dataType=SR%20Legacy,Survey%20(FNDDS)`;
    const response = await fetch(url);
    const data: any = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'USDA API request failed');
    }

    const firstFood = data.foods?.[0];
    if (!firstFood) {
      return res.json({ 
        item: query,
        per100: null,
        message: 'No results found'
      });
    }

    const per100 = parseFdcFood(firstFood);
    const resp: FoodApiResponse = {
      item: firstFood.description || firstFood.lowercaseDescription || query,
      per100
    };

    return res.json(resp);
  } catch (err: any) {
    console.error('[food-api-error]', err?.message || err);
    return res.status(500).json({ 
      error: 'Failed to fetch food data',
      detail: err?.message || String(err)
    });
  }
};