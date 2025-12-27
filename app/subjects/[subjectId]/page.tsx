import { getSubjectById } from "@/app/action"
import { ExercisesSwitch } from "../../../components/exercises/exercisesSwitch"
import { ExerciseModal } from "../../../components/exercises/exerciseModal"

export default async function Subject({
    params,
}: {
    params: Promise<{ subjectId: string }>
}) {
    const subject = await getSubjectById(parseInt((await params).subjectId))

    return <main className="w-screen h-screen flex justify-center items-center">
        <ExerciseModal />
    </main>
}