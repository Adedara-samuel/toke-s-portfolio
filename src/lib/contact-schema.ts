import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().max(200).pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(3, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "Your message should be at least 10 characters.").max(5000),
})

export type ContactInput = z.infer<typeof contactSchema>
