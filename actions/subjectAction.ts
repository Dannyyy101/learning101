'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Subject } from "@/lib/types";
import { createSubjectSchema } from "@/lib/zod/subjectSchema";
import { revalidatePath } from "next/cache";
import * as z from "zod"

export async function createNewSubject(data: z.infer<typeof createSubjectSchema>) {

    const session = await auth()
    if (!session || !session.user || !session.user.id) throw new Error("No session or user id")

    await prisma.subject.create({
        data: {
            name: data.name,
            authorId: session.user.id,
            exercises: { create: data.exercises }
        }
    })
    revalidatePath("/")
}

export async function getSubjectById(subjectId: string) {
    const subject = await prisma.subject.findUnique({ where: { id: subjectId }, include: { exercises: true, author: true } })

    if (!subject) throw new Error("Subject not found")
    return subject
}

export async function updateSubjectById(subjectId: string, data: z.infer<typeof createSubjectSchema>) {
    const subject = await prisma.subject.update({
        where: { id: subjectId },
        data: {
            name: data.name,
            exercises: {
                deleteMany: {},

                create: data.exercises.map((exercise) => ({
                    question: exercise.question,
                    type: exercise.type,
                    answer: exercise.answer
                }))
            }
        }
    })

    if (!subject) throw new Error("Subject not found")
    revalidatePath("/")
    return subject
}

export async function getAllSubjects() {
    return await prisma.subject.findMany({ include: { exercises: true, author: true } }) as Subject[]
}
export async function deleteSubjectById(subjectId: string) {
    await prisma.subject.delete({ where: { "id": subjectId } })
    revalidatePath("/")
}