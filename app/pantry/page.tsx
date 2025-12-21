import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

import PantryList from "@/app/ui/pantry/pantry-list";
import { getPantryWithIngredients } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  const id = session?.user?.id;

  if (!id) {
    throw new Error("not logged in?");
  }

  const ingredients = await getPantryWithIngredients(id);

  return (
    <>
      <Link href="/pantry/add/">
        <PlusIcon className="h-10 bg-primary fill-foreground rounded-lg transition-all hover:opacity-80 active:scale-95" />
      </Link>
      <div className="my-10 max-w-md mx-auto w-full px-4">
        <PantryList ingredients={ingredients}></PantryList>
      </div>
    </>
  );
}
