"use client"

import { useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconRobot, IconUser, IconPhoneCall } from "@tabler/icons-react"
import type { Routing, AIRouting, HumanRouting, Agent } from "@/lib/api/types"

/**
 * Normalize phone number to E.164 format
 * Strips all non-digit characters except leading +
 */
function normalizePhoneToE164(phone: string): string {
  const hasPlus = phone.startsWith('+')
  const digits = phone.replace(/\D/g, '')
  return hasPlus ? `+${digits}` : digits
}

interface CallForwardingCardProps {
  enabled: boolean
  routing: Routing | null
  agents: Agent[]
  currentAgentId: string
  onEnabledChange: (enabled: boolean) => void
  onRoutingChange: (routing: Routing | null) => void
  disabled?: boolean
}

export function CallForwardingCard({
  enabled,
  routing,
  agents,
  currentAgentId,
  onEnabledChange,
  onRoutingChange,
  disabled,
}: CallForwardingCardProps) {
  // Derive current values from routing prop
  const routingType = routing?.type || "human"
  const triggerCondition = routing?.triggerCondition || ""
  const agentId = routing?.type === "ai" ? (routing as AIRouting).agentId : ""
  const phone = routing?.type === "human" ? (routing as HumanRouting).phone : ""

  // Filter out the current agent from the dropdown
  const availableAgents = agents.filter((a) => a.id !== currentAgentId)

  const handleEnabledChange = useCallback((checked: boolean) => {
    onEnabledChange(checked)
    if (!checked) {
      onRoutingChange(null)
    } else if (!routing) {
      // Initialize with empty human routing when enabled
      onRoutingChange({
        type: "human",
        triggerCondition: "",
        destination: "external",
        phone: "",
      })
    }
  }, [onEnabledChange, onRoutingChange, routing])

  const handleRoutingTypeChange = useCallback((value: "ai" | "human") => {
    if (value === "ai") {
      onRoutingChange({
        type: "ai",
        triggerCondition: triggerCondition,
        agentId: "",
      })
    } else {
      onRoutingChange({
        type: "human",
        triggerCondition: triggerCondition,
        destination: "external",
        phone: "",
      })
    }
  }, [triggerCondition, onRoutingChange])

  const handleTriggerConditionChange = useCallback((value: string) => {
    if (!routing) return
    if (routing.type === "ai") {
      onRoutingChange({
        ...routing,
        triggerCondition: value,
      })
    } else {
      onRoutingChange({
        ...routing,
        triggerCondition: value,
      })
    }
  }, [routing, onRoutingChange])

  const handleAgentIdChange = useCallback((value: string) => {
    if (!routing || routing.type !== "ai") return
    onRoutingChange({
      ...routing,
      agentId: value,
    })
  }, [routing, onRoutingChange])

  const handlePhoneChange = useCallback((value: string) => {
    if (!routing || routing.type !== "human") return
    // Store the raw value, normalize on display/submit
    const normalizedPhone = normalizePhoneToE164(value)
    onRoutingChange({
      ...routing,
      phone: normalizedPhone,
    })
  }, [routing, onRoutingChange])

  const normalizedPhone = normalizePhoneToE164(phone)
  const isValidPhone = normalizedPhone.length >= 10 || normalizedPhone.length === 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <IconPhoneCall className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle>Call Forwarding</CardTitle>
              <CardDescription>Forward calls to another agent or human</CardDescription>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleEnabledChange}
            disabled={disabled}
          />
        </div>
      </CardHeader>
      <CardContent>
        {!enabled ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <IconPhoneCall className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Call forwarding is disabled. Enable to configure transfer rules.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Transfer Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Transfer Type</Label>
              <RadioGroup
                value={routingType}
                onValueChange={(value) => handleRoutingTypeChange(value as "ai" | "human")}
                className="grid grid-cols-2 gap-3"
                disabled={disabled}
              >
                <Label
                  htmlFor="cf-type-ai"
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                    routingType === "ai"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <RadioGroupItem value="ai" id="cf-type-ai" />
                  <div className="flex items-center gap-2">
                    <IconRobot className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">AI Agent</div>
                      <div className="text-xs text-muted-foreground">Transfer to another AI</div>
                    </div>
                  </div>
                </Label>
                <Label
                  htmlFor="cf-type-human"
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                    routingType === "human"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <RadioGroupItem value="human" id="cf-type-human" />
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
              <Label htmlFor="cf-trigger-condition" className="text-sm font-medium">
                Trigger Condition
              </Label>
              <Textarea
                id="cf-trigger-condition"
                value={triggerCondition}
                onChange={(e) => handleTriggerConditionChange(e.target.value)}
                placeholder="Describe when this transfer should happen, e.g., 'Transfer when customer requests to speak to a human'"
                rows={3}
                disabled={disabled}
              />
              <p className="text-xs text-muted-foreground">
                The AI will use this description to decide when to trigger the transfer.
              </p>
            </div>

            {/* AI Agent Selection */}
            {routingType === "ai" && (
              <div className="space-y-2">
                <Label htmlFor="cf-agent-select" className="text-sm font-medium">
                  Target Agent
                </Label>
                {availableAgents.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      No other agents available. Create another agent to enable AI transfers.
                    </p>
                  </div>
                ) : (
                  <Select value={agentId} onValueChange={handleAgentIdChange} disabled={disabled}>
                    <SelectTrigger id="cf-agent-select">
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
                <Label htmlFor="cf-phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="cf-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+1 555 123 4567"
                  disabled={disabled}
                  className={phone && !isValidPhone ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the phone number including country code (e.g., +1 555 123 4567).
                </p>
                {phone && !isValidPhone && (
                  <p className="text-xs text-destructive">
                    Please enter a valid phone number with at least 10 digits.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
