'use client'

import { Exercise } from "@/lib/types"
import { useState } from "react"
import { ExerciseLearnCard } from "./ExerciseLearnCard"
import { Button } from "../ui/button"

export function ExerciseCardHolder({ exercises }: { exercises: Exercise[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextCard = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        } else {
            alert("Übung abgeschlossen!")
        }
    }

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }

    return (
        <div className="flex flex-col w-full items-center">
            <ExerciseLearnCard key={exercises[currentIndex].id} exercise={exercises[currentIndex]} />
            <CardNavigation
                currentIndex={currentIndex}
                totalCount={exercises.length}
                onPrevious={prevCard}
                onNext={nextCard}
            />
        </div>
    )
}
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CardNavigationProps {
    onPrevious: () => void
    onNext: () => void
    currentIndex: number      // Aktueller Index (0-basiert)
    totalCount: number        // Gesamtanzahl der Karten
    className?: string
}

function CardNavigation({
    onPrevious,
    onNext,
    currentIndex,
    totalCount,
    className,
}: CardNavigationProps) {

    const isFirst = currentIndex === 0
    const isLast = currentIndex === totalCount - 1

    return (
        <div className={cn("flex items-center justify-between w-[300px] mt-6", className)}>
            <Button
                variant="ghost"
                onClick={onPrevious}
                disabled={isFirst}
                className={cn("gap-2 pl-2")}
            >
                <ChevronLeft className="h-4 w-4" />
                Zurück
            </Button>

            <span className="text-sm text-muted-foreground font-medium">
                {currentIndex + 1} / {totalCount}
            </span>

            <Button
                onClick={onNext}
                className="gap-2 pr-3"
            >
                {isLast ? (
                    <>
                        <Link className="flex items-center gap-x-0.5" href={"/"}>Abschließen <Check className="h-4 w-4" /></Link>
                    </>
                ) : (
                    <>
                        Weiter <ChevronRight className="h-4 w-4" />
                    </>
                )}
            </Button>
        </div>
    )
}