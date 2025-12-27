'use client'
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ExercisesSwitch(){
    return <div className="flex w-full h-64 justify-center gap-2">
      <Button variant="outline" onClick={() => {}}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
      </Button>
      <Button onClick={() => {}}>
        Nächste Frage <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
}