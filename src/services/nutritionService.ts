import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface NutritionInfo {
  foodName: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  additionalNutrients: {
    name: string;
    amount: string;
  }[];
}

export async function searchNutrition(query: string, language: string = "English"): Promise<NutritionInfo | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide comprehensive nutritional information for a standard serving of: ${query}. Please output all text fields (foodName, servingSize, ingredients, and the names of all additional nutrients) translated into ${language}. Include a rich array of additional nutrients (like Fiber, Sugar, Sodium, Vitamins, Minerals, etc.) to give every available detail. If the query is not a food or not recognized, return a response with foodName as "NOT_FOUND"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: {
              type: Type.STRING,
              description: "The common name of the food. Return 'NOT_FOUND' if the query is not a recognized food item.",
            },
            servingSize: {
              type: Type.STRING,
              description: "A standard serving size (e.g., '1 cup', '100g', '1 medium apple').",
            },
            calories: {
              type: Type.NUMBER,
              description: "Total calories per serving.",
            },
            protein: {
              type: Type.NUMBER,
              description: "Protein in grams.",
            },
            carbs: {
              type: Type.NUMBER,
              description: "Total carbohydrates in grams.",
            },
            fat: {
              type: Type.NUMBER,
              description: "Total fat in grams.",
            },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Main ingredients or components, if applicable. Can be empty for single items.",
            },
            additionalNutrients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING }
                },
                required: ["name", "amount"]
              },
              description: "A comprehensive list of every other available nutritional metric (Fiber, Sugar, Sodium, Cholesterol, Potassium, Vitamins, Minerals, etc.).",
            }
          },
          required: ["foodName", "servingSize", "calories", "protein", "carbs", "fat", "additionalNutrients"],
        },
      },
    });

    const jsonStr = response.text?.trim() || "";
    if (!jsonStr) return null;
    
    const data = JSON.parse(jsonStr) as NutritionInfo;
    if (data.foodName === 'NOT_FOUND' || !data.foodName) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    throw error;
  }
}
