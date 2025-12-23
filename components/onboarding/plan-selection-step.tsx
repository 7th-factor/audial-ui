"use client"

import { useState } from "react"
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { pricingPlans, type PlanSelectionFormValues } from "@/lib/validations/onboarding"

interface PlanSelectionStepProps {
  defaultValues?: Partial<PlanSelectionFormValues>
  onComplete: (data: PlanSelectionFormValues) => void
  onSkip: () => void
  onBack: () => void
  showSkip?: boolean // Flag to show/hide "Start with Free" option
}

export function PlanSelectionStep({
  defaultValues,
  onComplete,
  onSkip,
  onBack,
  showSkip = true,
}: PlanSelectionStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(
    defaultValues?.planId ?? ""
  )

  const handleComplete = () => {
    onComplete({ planId: selectedPlan })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Choose your plan</h2>
        <p className="text-muted-foreground">
          Select a plan that fits your needs. You can change this later.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              "relative flex flex-col rounded-lg border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md",
              selectedPlan === plan.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/40",
              plan.popular && "border-primary/50"
            )}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold">
                ${plan.price}
              </span>
              <span className="text-muted-foreground">/{plan.period}</span>
            </div>

            <ul className="mb-4 flex-1 space-y-2">
              {plan.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "mt-auto rounded-md border py-2 text-center text-sm font-medium transition-colors",
                selectedPlan === plan.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/50"
              )}
            >
              {selectedPlan === plan.id ? "Selected" : plan.buttonText}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <IconArrowLeft className="mr-2 size-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          {showSkip && (
            <Button type="button" variant="ghost" onClick={onSkip}>
              Start with Free
            </Button>
          )}
          <Button type="button" onClick={handleComplete} disabled={!selectedPlan}>
            Continue
            <IconArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
