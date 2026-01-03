import { ExerciseType } from "@/prisma/generated/prisma/enums"
import { JsonValue } from "@prisma/client/runtime/client"
import { User } from "next-auth"
import * as z from "zod"
import { SubjectRelationsSchema, SubjectSchema, SubjectWithChildrenSchema } from "./zod/subjectSchema"
import { NodeTypeSchema, EdgeSchema, GraphNode } from "./zod/graphSchema"

export interface Subject {
    id: string
    name: string
    authorId: string
    author: User
    exercises: Exercise[]
    createdAt: Date
    updatedAt: Date
}

export interface Exercise {
    id: string
    type: ExerciseType
    question: string
    answer: JsonValue
    learnedExercises: LearnedExercises[]
}

export interface LearnedExercises {
    exerciseId: string
    userId: string
}

export type SubjectDTO = z.infer<typeof SubjectWithChildrenSchema>

export type SubjectRelationDTO = z.infer<typeof SubjectRelationsSchema>

export type NodeType = z.infer<typeof NodeTypeSchema>;
export type GraphEdge = z.infer<typeof EdgeSchema>;

export type GraphElement = GraphNode | GraphEdge;