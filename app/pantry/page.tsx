import PantryList from "@/app/ui/pantry/pantry-list";
import { getIngredients, getPantryForUser } from "@/app/lib/actions";
import { auth } from "@/auth";
import type { IngredientWithQuantity } from "@/app/lib/definitions";

export default async function Page() {
  const session = await auth();

  const id = session?.user?.id;

  if (!id) {
    throw new Error("not logged in?");
  }

  const userIngredients = await getPantryForUser(id);

  const ingredientIds = userIngredients.map(
    (ingredientStock) => ingredientStock.ingredientId
  );

  const ingredients = await getIngredients(ingredientIds);

  const ingredientsWithQuantity = userIngredients.reduce<IngredientWithQuantity[]>(
    (acc, ingredientStock) => {
      const ingredient = ingredients.find(
        (ing) => ing._id.toString() === ingredientStock.ingredientId.toString()
      );

      if (!ingredient) {
        return acc;
      }

      return [
        ...acc,
        {
          name: ingredient.name,
          units: ingredient.units,
          quantity: ingredientStock.quantity,
        },
      ];
    },
    []
  );

  return (
    <div className="my-10 max-w-md mx-auto w-full px-4">
      <PantryList ingredients={ingredientsWithQuantity}></PantryList>
    </div>
  );
}
