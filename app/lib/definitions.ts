import { ObjectId } from "mongodb";

export type User = {
  _id: string;
  email: string;
  password: string;
  pantry: IngredientStock[];
};

export type IngredientStock = {
  ingredientId: ObjectId;
  quantity: number;
};

export type Ingredient = {
  _id: ObjectId;
  name: string;
  units: string;
};
