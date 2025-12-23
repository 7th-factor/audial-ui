"use client"

import { useState } from "react"
import { IconArrowLeft, IconArrowRight, IconVolume, IconUserCircle } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { agentOptions, type AgentSelectionFormValues } from "@/lib/validations/onboarding"

interface AgentSelectionStepProps {
  defaultValues?: Partial<AgentSelectionFormValues>
  onNext: (data: AgentSelectionFormValues) => void
  onBack: () => void
}

export function AgentSelectionStep({
  defaultValues,
  onNext,
  onBack,
}: AgentSelectionStepProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>(
    defaultValues?.agentId ?? ""
  )
  const [error, setError] = useState<string>("")

  const handleNext = () => {
    if (!selectedAgent) {
      setError("Please select an agent")
      return
    }
    setError("")
    onNext({ agentId: selectedAgent })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Select an Agent</h2>
        <p className="text-muted-foreground">
          Choose from the agent template or continue with a blank
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {agentOptions.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => {
              setSelectedAgent(agent.id)
              setError("")
            }}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left shadow-sm transition-all hover:shadow-md",
              selectedAgent === agent.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/40"
            )}
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              {agent.image ? (
                <>
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="h-full w-full object-cover object-top"
                  />
                  {agent.hasAudio && (
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
                        Listen <IconVolume className="size-3" />
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <IconUserCircle className="size-20 text-muted-foreground/40" strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="font-semibold">{agent.name}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {agent.role}
              </span>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-sm text-muted-foreground">
        Choose a preferred agent from the options, this can be changed later.
      </p>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <IconArrowLeft className="mr-2 size-4" />
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
          <IconArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}
