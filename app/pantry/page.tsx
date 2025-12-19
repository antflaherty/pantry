import PantryList from "@/app/ui/pantry/pantry-list";
import { getPantryForUser } from "@/app/lib/actions";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  const id = session?.user?.id;

  if (!id) {
    throw new Error("not logged in?");
  }

  const ingredients = await getPantryForUser(id);

  return (
    <div className="my-10 max-w-md mx-auto w-full px-4">
      <PantryList ingredients={ingredients}></PantryList>
    </div>
  );
}
