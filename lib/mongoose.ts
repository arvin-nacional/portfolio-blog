import mongoose from "mongoose";

// Share in-flight connections across requests and development hot reloads.
const databaseGlobal = globalThis as typeof globalThis & {
  portfolioDatabasePromise?: Promise<typeof mongoose>;
};
export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!process.env.MONGODB_URL) throw new Error("Database is not configured");
  mongoose.set("strictQuery", true);
  if (!databaseGlobal.portfolioDatabasePromise) {
    databaseGlobal.portfolioDatabasePromise = mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "arvin-portfolio-blog",
        serverSelectionTimeoutMS: 5000,
      })
      .finally(() => {
        databaseGlobal.portfolioDatabasePromise = undefined;
      });
  }
  return databaseGlobal.portfolioDatabasePromise;
};
