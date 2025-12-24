"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import {
  IconPlus,
  IconBrandWhatsapp,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react"
import {
  useWhatsAppSenders,
  useCreateWhatsAppSender,
  useDeleteWhatsAppSender,
  type WhatsAppSender,
  type CreateWhatsAppSenderInput,
} from "@/lib/api"
import { toast } from "sonner"

// WhatsApp Sender Card
function WhatsAppSenderCard({
  sender,
  onDelete,
  isDeleting,
}: {
  sender: WhatsAppSender
  onDelete: (id: string) => void
  isDeleting: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <IconBrandWhatsapp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-base">{sender.name}</CardTitle>
              <p className="text-sm text-muted-foreground font-mono">
                {sender.number}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">
            {sender.provider}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Created {new Date(sender.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(sender.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <IconTrash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WhatsAppSendersPage() {
  const { data: senders, isLoading, error } = useWhatsAppSenders()
  const createMutation = useCreateWhatsAppSender()
  const deleteMutation = useDeleteWhatsAppSender()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<CreateWhatsAppSenderInput>>({
    provider: "twilio",
    number: "",
    name: "",
    twilioAccountSid: "",
    twilioAuthToken: "",
  })

  const handleCreate = async () => {
    if (
      !formData.number ||
      !formData.name ||
      !formData.twilioAccountSid ||
      !formData.twilioAuthToken
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await createMutation.mutateAsync(formData as CreateWhatsAppSenderInput)
      toast.success("WhatsApp sender created successfully")
      setCreateDialogOpen(false)
      setFormData({
        provider: "twilio",
        number: "",
        name: "",
        twilioAccountSid: "",
        twilioAuthToken: "",
      })
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create sender"
      )
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteMutation.mutateAsync(id)
      toast.success("WhatsApp sender deleted")
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete sender"
      )
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">WhatsApp Senders</h2>
            <p className="text-sm text-muted-foreground">
              Manage your WhatsApp sender numbers for messaging.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">WhatsApp Senders</h2>
            <p className="text-sm text-muted-foreground">
              Manage your WhatsApp sender numbers for messaging.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load WhatsApp senders</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">WhatsApp Senders</h2>
          <p className="text-sm text-muted-foreground">
            Manage your WhatsApp sender numbers for messaging.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Sender
        </Button>
      </div>

      {/* Senders Grid */}
      {senders && senders.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {senders.map((sender) => (
            <WhatsAppSenderCard
              key={sender.id}
              sender={sender}
              onDelete={handleDelete}
              isDeleting={deletingId === sender.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
          <IconBrandWhatsapp className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium mb-1">No WhatsApp senders yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add a WhatsApp sender to start sending messages.
          </p>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <IconPlus className="mr-2 h-4 w-4" />
            Add Sender
          </Button>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add WhatsApp Sender</DialogTitle>
            <DialogDescription>
              Configure a new WhatsApp sender number using Twilio.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Sales Team"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Phone Number *</Label>
              <Input
                id="number"
                placeholder="+1234567890"
                value={formData.number}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, number: e.target.value }))
                }
              />
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +1 for US)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="twilioAccountSid">Twilio Account SID *</Label>
              <Input
                id="twilioAccountSid"
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={formData.twilioAccountSid}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    twilioAccountSid: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twilioAuthToken">Twilio Auth Token *</Label>
              <Input
                id="twilioAuthToken"
                type="password"
                placeholder="Your Twilio auth token"
                value={formData.twilioAuthToken}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    twilioAuthToken: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twilioApiKey">Twilio API Key (Optional)</Label>
              <Input
                id="twilioApiKey"
                placeholder="SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={formData.twilioApiKey || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    twilioApiKey: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twilioApiSecret">
                Twilio API Secret (Optional)
              </Label>
              <Input
                id="twilioApiSecret"
                type="password"
                placeholder="Your Twilio API secret"
                value={formData.twilioApiSecret || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    twilioApiSecret: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <IconPlus className="mr-2 h-4 w-4" />
              )}
              Add Sender
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
