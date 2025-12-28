import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

type ValidationStatus = "idle" | "success" | "error"

interface ValidationWrapperProps {
  children: React.ReactElement<any> // Erwartet genau ein React-Element (Input oder Textarea)
  status?: ValidationStatus
  message?: string
  className?: string
}

export function ValidationWrapper({
  children,
  status = "idle",
  message,
  className,
}: ValidationWrapperProps) {
  
  // Wir definieren die Klassen basierend auf dem Status
  const statusClasses = cn(
    // Fehler-Styles
    status === "error" && "border-red-500 focus-visible:ring-red-500",
    // Erfolg-Styles
    status === "success" && "border-green-500 focus-visible:ring-green-500"
  )

  // Hier klonen wir das Kind-Element und fügen die neuen Klassen hinzu.
  // Wir nutzen cn(), um die existierenden Klassen des Kindes (children.props.className)
  // beizubehalten und unsere statusClasses hinzuzufügen.
  const styledChild = React.cloneElement(children, {
    className: cn(children.props.className, statusClasses, "pr-10"), // pr-10 für Platz für das Icon
  })

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="relative">
        {styledChild}

        {/* Icons basierend auf Status */}
        {status === "success" && (
          <CheckCircle2 className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-green-500" />
        )}
        {status === "error" && (
          <XCircle className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-red-500" />
        )}
      </div>

      {/* Die Nachricht unter dem Feld */}
      {message && (
        <div className={cn("flex items-center text-sm font-medium animate-in slide-in-from-top-1 fade-in", 
            status === "error" ? "text-red-500" : "text-green-600"
        )}>
           {/* Optional: Kleines Icon vor dem Text */}
           {status === "error" && <AlertCircle className="h-4 w-4" />}
           {message}
        </div>
      )}
    </div>
  )
}