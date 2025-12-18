import { Collection, Db, MongoClient } from "mongodb";

let client: MongoClient;

export function getUsersCollection(): Collection {
  return getPantryappDb().collection("users");
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
