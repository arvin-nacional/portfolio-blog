"use server";

import Subscriber from "@/database/subscriber";

import { connectToDatabase } from "../mongoose";
import { addSubscriberParams } from "./shared.types";
import { revalidatePath } from "next/cache";

// add a subscriber
export async function addSubscriber(params: addSubscriberParams) {
  try {
    connectToDatabase();
    const { email, path } = params;

    const subscriber = await Subscriber.create({ email });
    revalidatePath(path);
    return subscriber;
  } catch (error) {
    console.log(error);
  }
}
