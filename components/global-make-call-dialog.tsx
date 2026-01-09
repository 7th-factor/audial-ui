"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { IconPhone, IconPhoneCall, IconRobot } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  useAgents,
  usePhoneNumbers,
  useCreateCallByAgentId,
  type PhoneNumber,
  type Agent,
} from "@/lib/api"

interface GlobalMakeCallDialogProps {
  trigger?: React.ReactNode
}

export function GlobalMakeCallDialog({ trigger }: GlobalMakeCallDialogProps) {
  const [open, setOpen] = useState(false)
  const [targetPhoneNumber, setTargetPhoneNumber] = useState("")
  const [selectedAgentId, setSelectedAgentId] = useState<string>("")
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>("")
  const [customerName, setCustomerName] = useState("")

  const { data: agents = [], isLoading: isLoadingAgents } = useAgents()
  const { data: phoneNumbers = [], isLoading: isLoadingPhoneNumbers } = usePhoneNumbers()
  const createCallMutation = useCreateCallByAgentId()

  // Compute effective selection - auto-select if only one option and user hasn't selected
  const effectiveAgentId = selectedAgentId || (agents.length === 1 ? agents[0].id : "")
  const effectivePhoneId = selectedPhoneId || (phoneNumbers.length === 1 ? phoneNumbers[0].id : "")

  const selectedAgent = agents.find((a) => a.id === effectiveAgentId)
  const selectedPhone = phoneNumbers.find((p) => p.id === effectivePhoneId)

  const handleSubmit = async () => {
    if (!targetPhoneNumber.trim()) {
      toast.error("Please enter a target phone number")
      return
    }

    if (!selectedAgent) {
      toast.error("Please select an agent")
      return
    }

    if (!selectedPhone) {
      toast.error("Please select a phone number to call from")
      return
    }

    try {
      await createCallMutation.mutateAsync({
        customer: {
          firstName: customerName.trim() || "Customer",
          phoneNumber: targetPhoneNumber.trim(),
        },
        agentId: selectedAgent.id,
        phoneNumberId: selectedPhone.id,
      })

      toast.success("Call initiated successfully")
      handleClose(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create call"
      )
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setTargetPhoneNumber("")
      setCustomerName("")
      // Keep agent and phone selections for convenience
    }
    setOpen(open)
  }

  const isLoading = isLoadingAgents || isLoadingPhoneNumbers
  const hasNoAgents = !isLoading && agents.length === 0
  const hasNoPhones = !isLoading && phoneNumbers.length === 0

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <IconPhoneCall className="size-4 mr-1.5" />
            Make Call
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconPhoneCall className="size-5" />
            Make Outbound Call
          </DialogTitle>
          <DialogDescription>
            Initiate an outbound call using your AI agent.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : hasNoAgents ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <IconRobot className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">No agents available</p>
            <p className="text-xs text-muted-foreground">
              Create an agent first to make outbound calls.
            </p>
          </div>
        ) : hasNoPhones ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <IconPhone className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">No phone numbers available</p>
            <p className="text-xs text-muted-foreground">
              Add a phone number first to make outbound calls.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Agent Selection */}
            <div className="space-y-2">
              <Label htmlFor="agent">Agent</Label>
              {agents.length === 1 ? (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <IconRobot className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{agents[0].name}</p>
                    <p className="text-xs text-muted-foreground">AI Agent</p>
                  </div>
                </div>
              ) : (
                <Select
                  value={effectiveAgentId}
                  onValueChange={setSelectedAgentId}
                  disabled={createCallMutation.isPending}
                >
                  <SelectTrigger id="agent" data-testid="agent-select">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <span>{agent.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Target Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="target-phone">Target Phone Number</Label>
              <Input
                id="target-phone"
                placeholder="+1 (555) 123-4567"
                value={targetPhoneNumber}
                onChange={(e) => setTargetPhoneNumber(e.target.value)}
                disabled={createCallMutation.isPending}
                data-testid="target-phone-input"
              />
              <p className="text-xs text-muted-foreground">
                Enter the phone number to call (with country code)
              </p>
            </div>

            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name (optional)</Label>
              <Input
                id="customer-name"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                disabled={createCallMutation.isPending}
                data-testid="customer-name-input"
              />
            </div>

            {/* Call From */}
            <div className="space-y-2">
              <Label htmlFor="from-phone">Call From</Label>
              {phoneNumbers.length === 1 ? (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <IconPhone className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{phoneNumbers[0].number}</p>
                    <p className="text-xs text-muted-foreground">
                      {phoneNumbers[0].name || "Unnamed"} • {phoneNumbers[0].provider}
                    </p>
                  </div>
                </div>
              ) : (
                <Select
                  value={effectivePhoneId}
                  onValueChange={setSelectedPhoneId}
                  disabled={createCallMutation.isPending}
                >
                  <SelectTrigger id="from-phone" data-testid="from-phone-select">
                    <SelectValue placeholder="Select a phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    {phoneNumbers.map((phone) => (
                      <SelectItem key={phone.id} value={phone.id}>
                        <div className="flex items-center gap-2">
                          <span>{phone.number}</span>
                          <span className="text-xs text-muted-foreground">
                            ({phone.name || phone.provider})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={createCallMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              createCallMutation.isPending ||
              !targetPhoneNumber.trim() ||
              !selectedAgent ||
              !selectedPhone ||
              hasNoAgents ||
              hasNoPhones
            }
            data-testid="create-call-button"
          >
            {createCallMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calling...
              </>
            ) : (
              <>
                <IconPhoneCall className="mr-2 size-4" />
                Start Call
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
