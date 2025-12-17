import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return session && <p>{session?.user!.email}</p>;
}
