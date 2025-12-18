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
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    });

  if (!parsedCredentials.success) {
    const error = parsedCredentials.error.flatten();
    if (error.fieldErrors.confirmPassword) {
      return "Passwords do not match.";
    }
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
