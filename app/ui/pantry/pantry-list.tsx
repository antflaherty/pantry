"use client";

import PantryItem from "./pantry-item";

export default function PantryList({
  ingredients,
}: {
  ingredients: { name: string; units: string; quantity: number }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {ingredients.map((ingredient) => (
        <PantryItem key={ingredient.name} ingredient={ingredient}></PantryItem>
      ))}
    </div>
  );
}
