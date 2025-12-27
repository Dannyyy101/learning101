import { Exercise } from "@/generated/prisma/client"
import * as z from "zod"
import { exerciseSchema } from "./exercise.schema"

export const createSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters.")
    .max(32, "Subject name must be at most 32 characters."),
    exercises:z.array(exerciseSchema)
})

