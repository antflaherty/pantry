"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { z } from "zod";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(
  _prevState: string | undefined,
  formData: FormData
) {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!parsedCredentials.success) {
    return "Invalid credentials.";
  }

  const { email, password } = parsedCredentials.data;

  const client = new MongoClient(process.env.MONGODB_URI!);
  const users = client.db("pantryapp").collection("users");
  const query = { email };
  const user = await users.findOne(query);

  if (user) {
    return "User already exists.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ email, password: hashedPassword });

  await signIn("credentials", { email, password, redirectTo: "/pantry" });
}
