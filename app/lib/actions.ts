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
  _prevState:
    | {
        message: string;
        inputs: {
          email: string;
          password: string;
          confirmPassword: string;
        };
      }
    | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

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
      email,
      password,
      confirmPassword,
    });

  if (!parsedCredentials.success) {
    const error = parsedCredentials.error.flatten();
    if (error.fieldErrors.confirmPassword) {
      return {
        message: "Passwords do not match.",
        inputs: { email, password, confirmPassword },
      };
    }
    return {
      message: "Invalid credentials.",
      inputs: { email, password, confirmPassword },
    };
  }

  const { email: validatedEmail, password: validatedPassword } =
    parsedCredentials.data;

  const client = new MongoClient(process.env.MONGODB_URI!);
  const users = client.db("pantryapp").collection("users");
  const query = { email: validatedEmail };
  const user = await users.findOne(query);

  if (user) {
    return {
      message: "User already exists.",
      inputs: { email, password, confirmPassword },
    };
  }

  const hashedPassword = await bcrypt.hash(validatedPassword, 10);
  await users.insertOne({ email: validatedEmail, password: hashedPassword });

  await signIn("credentials", {
    email: validatedEmail,
    password: validatedPassword,
    redirectTo: "/pantry",
  });
}
