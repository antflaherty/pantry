"use client";

import ingredients from "@/app/pantry/ingredients";
import PantryItem from "./pantry-item";

export default function PantryList() {
  return (
    <div className="flex flex-col gap-4">
      {ingredients.map((ingredient) => (
        <PantryItem key={ingredient.name} ingredient={ingredient}></PantryItem>
      ))}
    </div>
  );
}
