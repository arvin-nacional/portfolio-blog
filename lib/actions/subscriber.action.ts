"use server";

import Subscriber from "@/database/subscriber";

import { connectToDatabase } from "../mongoose";
import { addSubscriberParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { SubscriberFormSchema } from "../validations";

// add a subscriber
export async function addSubscriber(params: addSubscriberParams) {
  try {
    const parsed = SubscriberFormSchema.safeParse({ email: params.email });
    if (!parsed.success)
      return { success: false, message: "Enter a valid email address." };
    await connectToDatabase();
    const { email } = parsed.data;
    const { path } = params;

    await Subscriber.create({ email });
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "We couldn't save your subscription. Please try again.",
    };
  }
}
