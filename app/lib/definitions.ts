import { ObjectId } from "mongodb";

// MongoDB document types (what's actually stored in the database)
export interface UserDocument {
  _id?: ObjectId; // Optional because MongoDB auto-generates on insert
  email: string;
  password: string;
  ingredients: IngredientStock[];
}

export interface IngredientDocument {
  _id?: ObjectId; // Optional because MongoDB auto-generates on insert
  name: string;
  units: string;
}

// Application types (for use throughout the app)
export type User = {
  _id: string; // Converted to string for Next.js/JSON serialization
  email: string;
  password: string;
  pantry: IngredientStock[];
};

export type IngredientStock = {
  ingredientId: ObjectId;
  quantity: number;
};

export type Ingredient = {
  id: string;
  name: string;
  units: string;
};

export type IngredientWithQuantity = {
  name: string;
  units: string;
  quantity: number;
};
