"use client";

import { Ingredient } from "@/app/lib/definitions";

export default function AddToPantryForm({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <form>
      <div className="flex-1 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>ingredient</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="ingredient"
            >
              ingredient
            </label>
            <div className="relative">
              <select
                id="ingredient"
                name="ingredientId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  choose an ingredient
                </option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="quantity"
            >
              quantity
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="quantity"
                type="number"
                name="quantity"
                min="1"
                step="1"
                placeholder="enter quantity"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-center">
          <button className="flex mt-4 bg-primary h-10 items-center justify-center rounded-lg px-6 text-sm transition-all hover:opacity-80 active:scale-95">
            add
          </button>
        </div>
      </div>
      <input type="hidden" name="redirectTo" value="/pantry" />
    </form>
  );
}
