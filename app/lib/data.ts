import {
  getIngredientsCollection,
  getUsersCollection,
} from "@/app/lib/database";
import { Ingredient, IngredientStock } from "@/app/lib/definitions";
import { ObjectId } from "mongodb";

export async function getPantryForUser(id: string): Promise<IngredientStock[]> {
  const user = await getUsersCollection().findOne({ _id: new ObjectId(id) });

  if (!user) {
    throw new Error("user not found");
  }
  return user.ingredients;
}

export async function getIngredients(ids: ObjectId[]): Promise<Ingredient[]> {
  const ingredients = await getIngredientsCollection()
    .find({
      _id: { $in: ids },
    })
    .toArray();

  return ingredients;
}
