import "server-only";
import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as { mongoClient?: Promise<MongoClient> };

export const hasDatabase = () => Boolean(process.env.MONGODB_URI);

/** One shared client per server instance (and per dev hot-reload). */
export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  globalForMongo.mongoClient ??= new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 }).connect().catch((error) => {
    // Let the next call try again instead of reusing a failed connection.
    globalForMongo.mongoClient = undefined;
    throw error;
  });
  const client = await globalForMongo.mongoClient;
  return client.db(process.env.MONGODB_DB || "website");
}
