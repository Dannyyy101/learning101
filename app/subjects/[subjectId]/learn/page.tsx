import { getSubjectById } from "@/actions/subjectAction"
import { ExerciseCardHolder } from "@/components/exercises/ExerciseCardHolder"

export default async function LearnSubject({
    params,
}: {
    params: Promise<{ subjectId: string }>
}) {
    const subject = await getSubjectById((await params).subjectId)

    return <main className="w-screen h-screen flex justify-center items-center">
        <ExerciseCardHolder
            exercises={subject.exercises.map((exercise: any) => ({
                ...exercise,
                learnedExercises: exercise.learnedExercises ?? [],
            }))}
        />
    </main>
}