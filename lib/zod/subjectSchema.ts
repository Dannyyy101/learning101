import { ExerciseType } from "@/prisma/generated/prisma/enums"
import * as z from "zod"

export const createSubjectSchema = z.object({
    name: z
        .string()
        .min(2, "Name title must be at least 2 characters.")
        .max(32, "Name title must be at most 32 characters."),
    exercises: z.array(
        z.object({
            question: z.string(),
            type: z.enum(ExerciseType),
            answer: z.any(),
        })
    ),
})
