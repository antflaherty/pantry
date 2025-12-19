import { Collection, Db, MongoClient } from "mongodb";
import type { UserDocument } from "./definitions";

let client: MongoClient;

export function getUsersCollection(): Collection<UserDocument> {
  return getPantryappDb().collection<UserDocument>("users");
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
