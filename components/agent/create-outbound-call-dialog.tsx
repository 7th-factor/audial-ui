"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { IconPhone, IconPhoneCall } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useCreateCallByAgentId, type PhoneNumber } from "@/lib/api"

interface CreateOutboundCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agentId: string
  phoneNumbers: PhoneNumber[]
}

export function CreateOutboundCallDialog({
  open,
  onOpenChange,
  agentId,
  phoneNumbers,
}: CreateOutboundCallDialogProps) {
  const [targetPhoneNumber, setTargetPhoneNumber] = useState("")
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>(
    phoneNumbers.length === 1 ? phoneNumbers[0].id : ""
  )
  const [customerName, setCustomerName] = useState("")

  const createCallMutation = useCreateCallByAgentId()

  const selectedPhone = phoneNumbers.find((p) => p.id === selectedPhoneId)

  const handleSubmit = async () => {
    if (!targetPhoneNumber.trim()) {
      toast.error("Please enter a target phone number")
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
        agentId,
        phoneNumberId: selectedPhone.id,
      })

      toast.success("Call initiated successfully")
      onOpenChange(false)
      // Reset form
      setTargetPhoneNumber("")
      setCustomerName("")
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
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconPhoneCall className="size-5" />
            Make Outbound Call
          </DialogTitle>
          <DialogDescription>
            Initiate an outbound call to a phone number using this agent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

          <div className="space-y-2">
            <Label htmlFor="from-phone">Call From</Label>
            {phoneNumbers.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <IconPhone className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No phone numbers available
                </p>
              </div>
            ) : phoneNumbers.length === 1 ? (
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
                value={selectedPhoneId}
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
              createCallMutation.isPending ||
              !targetPhoneNumber.trim() ||
              !selectedPhone ||
              phoneNumbers.length === 0
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
