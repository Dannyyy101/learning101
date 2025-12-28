'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"; // Recommended for UI updates

export async function setLearned(exerciseId: string) {
    const session = await auth()
    
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized")
    }

    const userId = session.user.id

    const existing = await prisma.learnedExercises.findFirst({
        where: {
            userId: userId,
            exerciseId: exerciseId
        }
    })

    if (existing) {
        return { success: true, message: "Already learned" };
    }

    await prisma.learnedExercises.create({
        data: {
            userId: userId,
            exerciseId: exerciseId
        }
    });
    
    return { success: true };
}