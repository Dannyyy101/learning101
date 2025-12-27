'use server'

import { prisma } from "@/lib/prisma/prisma";
import { createSubjectSchema } from "@/lib/zod/schema/subject.schema";
import { revalidatePath } from "next/cache";
import * as z from "zod"

export async function createNewSubject(data: z.infer<typeof createSubjectSchema>) {
    await prisma.subject.create({
        data: {
            name: data.name,
            exercises: { create: data.exercises }
        }
    })
    revalidatePath("/")
}

export async function getAllSubjects() {
    return await prisma.subject.findMany()
}

export async function getSubjectById(subjectId: number) {
    return await prisma.subject.findUnique({ where: { id: subjectId }, include: {exercises: true}})
}