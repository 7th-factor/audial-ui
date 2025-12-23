"use client"

import { cn } from "@/lib/utils"

export interface Step {
  id: number
  label: string
}

interface OnboardingStepperProps {
  steps: Step[]
  currentStep: number
}

export function OnboardingStepper({ steps, currentStep }: OnboardingStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = step.id < currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isActive || isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-4 h-px w-12 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
