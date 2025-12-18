"use client";

import ingredients from "@/app/pantry/ingredients";
import PantryItem from "./pantry-item";

export default function PantryList() {
  return (
    <>
      {ingredients.map((ingredient) => (
        <PantryItem key={ingredient.name} ingredient={ingredient}></PantryItem>
      ))}
    </>
  );
}
