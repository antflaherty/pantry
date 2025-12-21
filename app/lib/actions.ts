"use server";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { z } from "zod";

import { signIn, auth } from "@/auth";
import { getUsersCollection } from "@/app/lib/database";
import { ObjectId } from "mongodb";

const IngredientStockSchema = z.object({
  ingredientId: z.string(),
  quantity: z.number(),
});

export async function addIngredientToPantry(
  _prevState: string | undefined,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return "not logged in?";
  }

  const userId = session.user.id;

  const parsedInput = IngredientStockSchema.safeParse({
    ingredientId: formData.get("ingredientId"),
    quantity: Number(formData.get("quantity")),
  });

  if (!parsedInput.success) {
    return "invalid input";
  }

  try {
    await getUsersCollection().updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          ingredients: {
            ingredientId: new ObjectId(parsedInput.data.ingredientId),
            quantity: parsedInput.data.quantity,
          },
        },
      }
    );
  } catch (error) {
    return "failed to add ingredient";
  }

  revalidatePath("/pantry");
  redirect("/pantry");
}

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

  if (await userExists(inputs.email)) {
    return {
      message: "User already exists.",
      inputs,
    };
  }

  await createUser(inputs.email, inputs.password);

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

async function userExists(email: string) {
  const user = await getUsersCollection().findOne({ email });
  return !!user;
}

async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await getUsersCollection().insertOne({
    email,
    password: hashedPassword,
    ingredients: [],
  });
}
