import {
  getIngredientsCollection,
  getUsersCollection,
} from "@/app/lib/database";
import { Ingredient, IngredientWithQuantity } from "@/app/lib/definitions";
import { ObjectId } from "mongodb";

export async function getPantryWithIngredients(
  userId: string
): Promise<IngredientWithQuantity[]> {
  const result = await getUsersCollection()
    .aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $unwind: "$ingredients" },
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredients.ingredientId",
          foreignField: "_id",
          as: "ingredientDetails",
        },
      },
      { $unwind: "$ingredientDetails" },
      {
        $project: {
          _id: 0, // Don't include MongoDB _id
          name: "$ingredientDetails.name",
          units: "$ingredientDetails.units",
          quantity: "$ingredients.quantity",
        },
      },
    ])
    .toArray();

  return result as IngredientWithQuantity[];
}

export async function fetchIngredients(): Promise<Ingredient[]> {
  const result = await getIngredientsCollection().find({}).toArray();

  return result.map((ingredient) => {
    return {
      id: ingredient._id.toString(),
      name: ingredient.name,
      units: ingredient.units,
    };
  }) as Ingredient[];
}
