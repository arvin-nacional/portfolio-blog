import "server-only";
import { connectToDatabase } from "@/lib/mongoose";

// One shared account: a database counter enforces the limit across server instances.
export async function allowLoginAttempt(): Promise<boolean> {
  const mongoose = await connectToDatabase();
  const collection = mongoose.connection.collection("admin_login_attempts");
  const now = new Date();
  const windowStart = new Date(now.getTime() - 15 * 60 * 1000);
  const reset = { $lt: [{ $ifNull: ["$windowStart", new Date(0)] }, windowStart] };
  const result = await collection.findOneAndUpdate(
    { _id: "single-admin" as any },
    [{ $set: {
      windowStart: { $cond: [reset, now, "$windowStart"] },
      attempts: { $cond: [reset, 1, { $add: ["$attempts", 1] }] },
    } }],
    { upsert: true, returnDocument: "after" },
  );
  return !!result && result.attempts <= 10;
}
