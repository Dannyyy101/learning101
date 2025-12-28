import { Exercise } from "@/lib/types";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ExerciseType } from "@/prisma/generated/prisma/enums";
import { Textarea } from "../ui/textarea";
import { ValidationWrapper } from "../ui/validation";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { setLearned } from "@/actions/exerciseAction";
import Latex from 'react-latex-next';

export function ExerciseLearnCard({ exercise }: { exercise: Exercise }) {
    return (
        <Card className="w-full lg:w-1/2">
            <CardHeader>
                <CardTitle>Question</CardTitle>
                <CardDescription>
                    <Latex>{exercise.question}</Latex>
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <CardTitle className="mb-2">
                    Answer
                </CardTitle>
                <AnswerByType exercise={exercise} />
            </CardContent>
        </Card>
    )
}

export function AnswerByType({ exercise }: { exercise: Exercise }) {
    if (exercise.type === ExerciseType.TEXT_INPUT) {
        return <TextAnswer exercise={exercise} />
    }
    return <></>
}

export function TextAnswer({ exercise }: { exercise: Exercise }) {
    const [userInput, setUserInput] = useState<string>("")
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

    const handleCheck = async () => {
        if (status !== "idle") {
            setStatus("idle")
            return;
        }
        if (exercise.answer?.toString().toLowerCase() === userInput.toLowerCase()) {
            setStatus("success")
        } else {
            setStatus("error")
        }
        await setLearned(exercise.id)
    }

    return (
        <div className="max-w-md">
            <ValidationWrapper
                status={status}
                message={status === "idle" ? undefined : `The solution is: ${exercise.answer as string}`}
            >
                <Textarea
                    value={userInput}
                    onChange={(e) => {
                        setUserInput(e.target.value)
                        setStatus("idle")
                    }}
                    placeholder="Deine Antwort..."
                />
            </ValidationWrapper>

            <Button
                onClick={handleCheck}
                className="mt-4"
            >
                Überprüfen
            </Button>
        </div>
    )
}