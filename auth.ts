import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { z } from "zod";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    const users = client.db("pantryapp").collection("users");
    const query = { email };
    const user = (await users.findOne(query)) as unknown as User | undefined;
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
});
