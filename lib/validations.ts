import { z } from "zod";

export const SubscriberFormSchema = z.object({
  email: z.string().email(),
});
