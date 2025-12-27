import * as z from "zod"

export const exerciseSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
})