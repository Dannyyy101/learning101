import { ExerciseType } from "@/prisma/generated/prisma/enums"
import * as z from "zod"

export const SubjectSchema = z.object({
    id: z.cuid(),
    name: z.string(),
    color: z.string().startsWith("#"),
    relations: z.lazy(() => SubjectRelationsSchema.array()),
    parentId: z.string().nullable(),
    authorId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

export const SubjectWithChildrenSchema = SubjectSchema.extend({
    children: z.lazy(() => SubjectSchema.array()),
});

export const SubjectRelationsSchema = z.object({
    id: z.uuid(),
    sourceId: z.string(),
    targetId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

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
    relations: z.array
})
