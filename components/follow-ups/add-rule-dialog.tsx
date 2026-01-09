"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

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
  FormDescription,
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { useCreateFollowUpRule } from "@/lib/features/follow-ups"
import type { CreateFollowUpRuleInput } from "@/lib/api/types/follow-up"
import {
  createFollowUpRuleSchema,
  type CreateFollowUpRuleFormInput,
  followUpActions,
  followUpPriorities,
} from "./types"

interface AddRuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

// Suggested conditions to help users get started
const conditionSuggestions = [
  "It's Urgent",
  "I need more product",
  "Requests callback",
  "High value customer",
]

export function AddRuleDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddRuleDialogProps) {
  const createRule = useCreateFollowUpRule()

  const form = useForm<CreateFollowUpRuleFormInput>({
    resolver: zodResolver(createFollowUpRuleSchema),
    defaultValues: {
      condition: "",
      action: "",
      priority: "high",
      active: true,
      dueTimeBusiness: true,
      dueTimeHours: 0,
      dueTimeDays: 1,
    },
  })

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("condition", suggestion)
  }

  const handleSubmit = async (values: CreateFollowUpRuleFormInput) => {
    // Transform form values to API input
    const apiInput: CreateFollowUpRuleInput = {
      condition: values.condition,
      action: values.action,
      priority: values.priority,
      active: values.active,
      dueTime: {
        business: values.dueTimeBusiness,
        hours: values.dueTimeHours,
        days: values.dueTimeDays,
      },
    }

    createRule.mutate(apiInput, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
        onSuccess?.()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Follow-up rule</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Define when follow ups are created */}
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Define when follow ups are created</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. When caller says they wants a refund"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Condition Suggestions */}
            <div className="space-y-2">
              <FormLabel>Suggestions</FormLabel>
              <div className="flex flex-wrap gap-2">
                {conditionSuggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Click a suggestion to use it as the condition
              </p>
            </div>

            {/* What should we remind you to do? */}
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What should we remind you to do?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
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

            {/* Due Time */}
            <div className="space-y-4">
              <FormLabel>Due Time</FormLabel>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="dueTimeDays"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Days</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueTimeHours"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Hours</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={23}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dueTimeBusiness"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Business hours only</FormLabel>
                      <FormDescription>
                        Only count hours during business hours
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Active */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable rule immediately</FormLabel>
                    <FormDescription>
                      Start creating follow-ups based on this rule
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createRule.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createRule.isPending}>
                {createRule.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
