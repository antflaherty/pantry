"use client";

export default function PantryItem({
  ingredient,
}: {
  ingredient: { name: string; units: string; quantity: number };
}) {
  return (
    <div className="bg-card p-4 rounded-xl shadow-sm flex justify-between items-center border border-black/5">
      <span className="font-medium text-lg">{ingredient.name}</span>
      <span className="px-3 py-1 rounded-full">
        {ingredient.quantity}
        {ingredient.units}
      </span>
    </div>
  );
}
