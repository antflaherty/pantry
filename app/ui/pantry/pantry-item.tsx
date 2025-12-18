"use client";

import { Ingredient } from "@/app/lib/definitions";

export default function PantryItem({ ingredient }: { ingredient: Ingredient }) {
  return (
    <p>{`${ingredient.name}: ${ingredient.quantity}${ingredient.units}`}</p>
  );
}
