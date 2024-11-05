import { z } from "zod";
import { validateDate } from "./utils";

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

export const PostSchema = z.object({
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
  title: z.string().min(5).max(130),
  content: z.string().min(5).max(10000),
  image: z.string(),
  images: z.array(
    z.object({
      src: z.string().url(),
      alt: z.string().min(1),
      _id: z.string().min(1).max(30),
    })
  ),
});

export const ProjectSchema = z.object({
  category: z.array(z.string().min(1).max(30)).min(1),
  title: z.string().min(5).max(130),
  content: z.string().min(5).max(10000),
  mainImage: z.string(),
  clientName: z.string().min(1),
  softwareUsed: z.array(z.string().min(1).max(20)).min(1),
  images: z.array(
    z.object({
      src: z.string().url(),
      alt: z.string().min(1),
      _id: z.string().min(1).max(30),
    })
  ),
  dateFinished: z.string().trim().refine(validateDate, {
    message:
      "Invalid date. Please use the MM/DD/YYYY format and ensure the date is valid.",
  }),
  url: z.string(),
});
