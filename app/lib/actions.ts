"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { Collection, MongoClient } from "mongodb";
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

const SignupSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

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
  const inputs = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  const validationError = validateCredentials(inputs);
  if (validationError) {
    return { ...validationError, inputs };
  }

  const client = new MongoClient(process.env.MONGODB_URI!);
  const usersCollection = client.db("pantryapp").collection("users");

  if (await userExists(usersCollection, inputs.email)) {
    return {
      message: "User already exists.",
      inputs,
    };
  }

  await createUser(usersCollection, inputs.email, inputs.password);

  await signIn("credentials", {
    email: inputs.email,
    password: inputs.password,
    redirectTo: "/pantry",
  });
}

function validateCredentials(inputs: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const parsedCredentials = SignupSchema.safeParse(inputs);

  if (!parsedCredentials.success) {
    const error = parsedCredentials.error.flatten();
    if (error.fieldErrors.confirmPassword) {
      return {
        message: "Passwords do not match.",
      };
    }
    return {
      message: "Invalid credentials.",
    };
  }
  return null;
}

async function userExists(usersCollection: Collection, email: string) {
  const user = await usersCollection.findOne({ email });
  return !!user;
}

async function createUser(
  usersCollection: Collection,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ email, password: hashedPassword });
}
