import { z } from "zod";

export const SubscriberFormSchema = z.object({
  email: z.string().email(),
});

export const ContactFormSchema = z.object({
  fullName: z.string().min(1, { message: "Fullname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  typeOfService: z.string().min(1, { message: "Type of service is required" }),
  contactNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, { message: "Invalid contact number" }),
  message: z.string().min(1, { message: "Message is required" }),
});
