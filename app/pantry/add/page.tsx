import { Metadata } from "next";

import { fetchIngredients } from "@/app/lib/data";
import AddToPantryForm from "@/app/ui/pantry/add/add-to-pantry-form";

export const metadata: Metadata = {
  title: "add to pantry",
};

export default async function Page() {
  const ingredients = await fetchIngredients();

  return (
    <div className="my-10 max-w-md mx-auto w-full px-4">
      <AddToPantryForm ingredients={ingredients} />
    </div>
  );
}
