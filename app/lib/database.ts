import { Collection, Db, MongoClient } from "mongodb";
import type { UserDocument, IngredientDocument } from "./definitions";

let client: MongoClient;

export function getUsersCollection(): Collection<UserDocument> {
  return getPantryappDb().collection<UserDocument>("users");
}

export function getIngredientsCollection(): Collection<IngredientDocument> {
  return getPantryappDb().collection<IngredientDocument>("ingredients");
}

function getPantryappDb(): Db {
  return getClient().db("pantryapp");
}

function getClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
  }

  return client;
}
