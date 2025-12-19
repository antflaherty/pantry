import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";

import type { UserDocument } from "@/app/lib/definitions";
import { getUsersCollection } from "./app/lib/database";

async function getUser(email: string): Promise<UserDocument | null> {
  try {
    const query = { email };
    const user = await getUsersCollection().findOne(query);
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
              id: user._id!.toString(), // _id is always present when fetched from MongoDB
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
});
