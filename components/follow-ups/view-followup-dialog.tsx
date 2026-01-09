"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import type { FollowUpUIModel } from "./types"
import { followUpStatuses, followUpPriorities, followUpActions } from "./types"
import { useUpdateFollowUp } from "@/lib/features/follow-ups"
import { useCustomer } from "@/lib/api/hooks/use-customers"

const updateFollowUpSchema = z.object({
  action: z.string().min(1, "Action is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["open", "done"]),
  note: z.string().optional(),
})

type UpdateFollowUpFormInput = z.infer<typeof updateFollowUpSchema>

interface ViewFollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  followUp: FollowUpUIModel | null
  onSuccess?: () => void
}

export function ViewFollowUpDialog({
  open,
  onOpenChange,
  followUp,
  onSuccess,
}: ViewFollowUpDialogProps) {
  const updateFollowUp = useUpdateFollowUp()
  const { data: customer } = useCustomer(followUp?.customerId)

  // Get customer display info
  const customerName = customer
    ? [customer.firstName, customer.lastName].filter(Boolean).join(" ") || "Unknown"
    : followUp?.customerName || "Loading..."
  const customerInitials = customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?"

  const form = useForm<UpdateFollowUpFormInput>({
    resolver: zodResolver(updateFollowUpSchema),
    values: followUp
      ? {
          action: followUp.action,
          priority: followUp.priority,
          status: followUp.status === "overdue" ? "open" : followUp.status,
          note: followUp.note,
        }
      : undefined,
  })

  const handleSubmit = async (values: UpdateFollowUpFormInput) => {
    if (!followUp) return

    updateFollowUp.mutate(
      {
        id: followUp.id,
        data: {
          action: values.action,
          priority: values.priority,
          status: values.status,
          note: values.note,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          onSuccess?.()
        },
      }
    )
  }

  if (!followUp) return null

  // Get display status info
  const statusInfo = followUpStatuses.find(
    (s) => s.value === followUp.status
  ) || followUpStatuses[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Follow Up</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Customer info */}
            <div className="space-y-2">
              <FormLabel>Customer</FormLabel>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {customerInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{customerName}</p>
                  {customer?.phoneNumber && (
                    <p className="text-xs text-muted-foreground">{customer.phoneNumber}</p>
                  )}
                  {customer?.email && (
                    <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action */}
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {followUpActions.map((action) => (
                        <SelectItem key={action.value} value={action.value}>
                          {action.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes about this follow-up..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due date info */}
            <div className="space-y-1">
              <FormLabel>Due Date</FormLabel>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {format(new Date(followUp.dueAt), "PPP p")}
                </p>
                {followUp.status === "overdue" && (
                  <Badge variant="outline" className={statusInfo.color}>
                    {statusInfo.label}
                  </Badge>
                )}
              </div>
            </div>

            {/* Tags */}
            {followUp.tags && followUp.tags.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-1">
                  {followUp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateFollowUp.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateFollowUp.isPending}>
                {updateFollowUp.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
