import { z } from "zod";
 
export const contactFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
});
 
export type ContactFormSchema = typeof contactFormSchema;
