"use client";

import PantryItem from "./pantry-item";
import { Ingredient } from "@/app/lib/definitions";

export default function PantryList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {ingredients.map((ingredient) => (
        <PantryItem key={ingredient.name} ingredient={ingredient}></PantryItem>
      ))}
    </div>
  );
}
