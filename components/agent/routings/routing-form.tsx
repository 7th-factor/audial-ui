"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconRobot, IconUser } from "@tabler/icons-react"
import type { Routing, AIRouting, HumanRouting, Agent } from "@/lib/api/types"

interface RoutingFormProps {
  routing?: Routing
  agents: Agent[]
  currentAgentId: string
  onSubmit: (routing: Routing) => void
  onCancel: () => void
  isLoading?: boolean
}

export function RoutingForm({
  routing,
  agents,
  currentAgentId,
  onSubmit,
  onCancel,
  isLoading,
}: RoutingFormProps) {
  const [routingType, setRoutingType] = useState<"ai" | "human">(routing?.type || "ai")
  const [triggerCondition, setTriggerCondition] = useState(routing?.triggerCondition || "")
  const [agentId, setAgentId] = useState<string>(
    routing?.type === "ai" ? (routing as AIRouting).agentId : ""
  )
  const [phone, setPhone] = useState<string>(
    routing?.type === "human" ? (routing as HumanRouting).phone : ""
  )

  // Filter out the current agent from the dropdown
  const availableAgents = agents.filter((a) => a.id !== currentAgentId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!triggerCondition.trim()) return

    if (routingType === "ai") {
      if (!agentId) return
      const aiRouting: AIRouting = {
        type: "ai",
        triggerCondition: triggerCondition.trim(),
        agentId,
      }
      onSubmit(aiRouting)
    } else {
      if (!phone.trim()) return
      const humanRouting: HumanRouting = {
        type: "human",
        triggerCondition: triggerCondition.trim(),
        destination: "external",
        phone: phone.trim(),
      }
      onSubmit(humanRouting)
    }
  }

  const isValid =
    triggerCondition.trim() &&
    ((routingType === "ai" && agentId) || (routingType === "human" && phone.trim()))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Routing Type Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Transfer Type</Label>
          <RadioGroup
            value={routingType}
            onValueChange={(value) => setRoutingType(value as "ai" | "human")}
            className="grid grid-cols-2 gap-3"
          >
            <Label
              htmlFor="type-ai"
              className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                routingType === "ai"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <RadioGroupItem value="ai" id="type-ai" />
              <div className="flex items-center gap-2">
                <IconRobot className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-sm">AI Agent</div>
                  <div className="text-xs text-muted-foreground">Transfer to another AI</div>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="type-human"
              className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                routingType === "human"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <RadioGroupItem value="human" id="type-human" />
              <div className="flex items-center gap-2">
                <IconUser className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-sm">Human</div>
                  <div className="text-xs text-muted-foreground">Transfer to a person</div>
                </div>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Trigger Condition */}
        <div className="space-y-2">
          <Label htmlFor="trigger-condition" className="text-sm font-medium">
            Trigger Condition *
          </Label>
          <Textarea
            id="trigger-condition"
            value={triggerCondition}
            onChange={(e) => setTriggerCondition(e.target.value)}
            placeholder="Describe when this transfer should happen, e.g., 'Transfer to technical support when customer has a technical issue'"
            rows={3}
            required
          />
          <p className="text-xs text-muted-foreground">
            The AI will use this description to decide when to trigger the transfer.
          </p>
        </div>

        {/* AI Agent Selection */}
        {routingType === "ai" && (
          <div className="space-y-2">
            <Label htmlFor="agent-select" className="text-sm font-medium">
              Target Agent *
            </Label>
            {availableAgents.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No other agents available. Create another agent to enable AI transfers.
                </p>
              </div>
            ) : (
              <Select value={agentId} onValueChange={setAgentId}>
                <SelectTrigger id="agent-select">
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {availableAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        {/* Phone Number Input */}
        {routingType === "human" && (
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter the phone number to transfer the call to, including country code.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "Saving..." : routing ? "Update Routing" : "Add Routing"}
        </Button>
      </div>
    </form>
  )
}
