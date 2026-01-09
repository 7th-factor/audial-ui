"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send, Paperclip, Image as ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

import type { FollowUp, FollowUpAction } from "./types"
import {
  followUpStatuses,
  followUpPriorities,
  dueTimeUnits,
} from "./types"
import { mockContacts, mockFollowUpActions } from "./data"

const updateFollowUpSchema = z.object({
  action: z.string().min(1, "Action is required"),
  contactId: z.string().min(1, "Contact is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["open", "done", "closed", "overdue"]),
  dueTime: z.coerce.number().min(1),
  dueTimeUnit: z.enum(["hours", "days", "weeks"]),
})

type UpdateFollowUpInput = z.infer<typeof updateFollowUpSchema>

interface ViewFollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  followUp: FollowUp | null
  onSuccess?: () => void
}

export function ViewFollowUpDialog({
  open,
  onOpenChange,
  followUp,
  onSuccess,
}: ViewFollowUpDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [noteInput, setNoteInput] = useState("")

  const form = useForm<UpdateFollowUpInput>({
    resolver: zodResolver(updateFollowUpSchema),
    values: followUp
      ? {
          action: followUp.action,
          contactId: followUp.contactId,
          priority: followUp.priority,
          status: followUp.status,
          dueTime: followUp.dueTime || 1,
          dueTimeUnit: followUp.dueTimeUnit || "hours",
        }
      : undefined,
  })

  const actions = followUp ? mockFollowUpActions[followUp.id] || [] : []

  const handleSubmit = async (values: UpdateFollowUpInput) => {
    try {
      setIsLoading(true)

      // TODO: Call API to update follow-up
      console.log("Updating follow-up:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast.success("Follow-up updated successfully")
      onOpenChange(false)
      onSuccess?.()
    } catch {
      toast.error("Failed to update follow-up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNote = () => {
    if (!noteInput.trim()) return

    // TODO: Call API to add note
    console.log("Adding note:", noteInput)
    toast.success("Note added")
    setNoteInput("")
  }

  if (!followUp) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Follow Up</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left side - Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Action */}
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Call Back" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Contact */}
              <FormField
                control={form.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Contact</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Search..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockContacts.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {followUpPriorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {followUpStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Time */}
              <div className="space-y-2">
                <FormLabel>Due Time</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="dueTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 1)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueTimeUnit"
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dueTimeUnits.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Choose when this follow up action is due.
                </p>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>

          {/* Right side - Actions timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Actions</h4>

            {/* Timeline */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {actions.map((action) => (
                <ActionItem key={action.id} action={action} />
              ))}
            </div>

            {/* Add note input */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter Note"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleAddNote}
                    disabled={!noteInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ActionItem({ action }: { action: FollowUpAction }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
        <div className="flex-1 w-px bg-border" />
      </div>
      <div className="flex-1 pb-4">
        {action.user ? (
          <div className="flex items-start gap-2 mb-1">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {action.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{action.user.name}</span>
          </div>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {action.type === "status_changed" && "• "}
          {action.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{action.timestamp}</p>
      </div>
    </div>
  )
}
