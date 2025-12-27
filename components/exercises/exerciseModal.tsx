import { ExercisesSwitch } from "./exercisesSwitch";

export function ExerciseModal() {
    return <div className="w-2/3">
        <QuizCard/>
        <ExercisesSwitch />
    </div>
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function QuizCard() {
  return (
    <Card className="w-full max-w-lg mx-auto">
      {/* 1. DIE FRAGE */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Welches Framework nutzt du am liebsten?
        </CardTitle>
      </CardHeader>

      {/* 2. DIE ANTWORTEN */}
      <CardContent>
        <RadioGroup defaultValue="react" className="grid gap-4">
          
          {/* Antwort Option A */}
          <div>
            <RadioGroupItem value="react" id="react" className="peer sr-only" />
            <Label
              htmlFor="react"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
            >
              <span className="w-full text-base font-medium">React / Next.js</span>
            </Label>
          </div>

          {/* Antwort Option B */}
          <div>
            <RadioGroupItem value="vue" id="vue" className="peer sr-only" />
            <Label
              htmlFor="vue"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
            >
              <span className="w-full text-base font-medium">Vue / Nuxt</span>
            </Label>
          </div>

        </RadioGroup>
      </CardContent>
    </Card>
  )
}