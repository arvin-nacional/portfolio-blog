"use server";

import Contact from "@/database/contact";
import { connectToDatabase } from "../mongoose";
import { addContactParams } from "./shared.types";
import { revalidatePath } from "next/cache";

// add contact
export async function addContact(params: addContactParams) {
  try {
    connectToDatabase();
    const { fullName, email, contactNumber, path, message, typeOfService } =
      params;

    const contact = await Contact.create({
      fullName,
      email,
      contactNumber,
      message,
      typeOfService,
    });

    revalidatePath(path);
    return { contact };
  } catch (error) {
    console.log(error);
  }
}
