import PantryList from "@/app/ui/pantry/pantry-list";
import { getPantryForUser } from "@/app/lib/actions";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  const email = session?.user?.email;

  // do this properly with user id

  if (!email) {
    throw new Error("not logged in?");
  }

  const ingredients = await getPantryForUser(email);

  return (
    <div className="my-10 max-w-md mx-auto w-full px-4">
      <PantryList ingredients={ingredients}></PantryList>
    </div>
  );
}
