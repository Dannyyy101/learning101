import { ExerciseType } from "@/prisma/generated/prisma/enums"
import { JsonValue } from "@prisma/client/runtime/client"
import { User } from "next-auth"

export interface Subject {
    id: string
    name: string
    authorId: string
    author: User
    exercises: Exercise[]
    createdAt: Date
    updatedAt: Date
}

export interface Exercise{
    id:string
    type: ExerciseType
    question:string
    answer: JsonValue
    learnedExercises: LearnedExercises[]
}

export interface LearnedExercises{
    exerciseId:string
    userId:string
}