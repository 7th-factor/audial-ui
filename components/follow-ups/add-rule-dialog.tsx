"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, X } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import {
  createFollowUpRuleSchema,
  type CreateFollowUpRuleInput,
  followUpActions,
  followUpPriorities,
  dueTimeUnits,
} from "./types"

interface AddRuleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (data: CreateFollowUpRuleInput) => void
}

// Suggested condition tags
const conditionTags = [
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
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const form = useForm<CreateFollowUpRuleInput>({
    resolver: zodResolver(createFollowUpRuleSchema),
    defaultValues: {
      condition: "",
      action: "",
      priority: "high",
      dueTime: 1,
      dueTimeUnit: "hours",
    },
  })

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = async (values: CreateFollowUpRuleInput) => {
    try {
      setIsLoading(true)

      // Include selected tags in the condition if any
      const finalValues = {
        ...values,
        condition:
          selectedTags.length > 0
            ? `${values.condition} [Tags: ${selectedTags.join(", ")}]`
            : values.condition,
      }

      // TODO: Call API to create rule
      console.log("Creating rule:", finalValues)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast.success("Rule created successfully")
      form.reset()
      setSelectedTags([])
      onOpenChange(false)
      onSuccess?.(values)
    } catch {
      toast.error("Failed to create rule. Please try again.")
    } finally {
      setIsLoading(false)
    }
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

            {/* Condition Tags */}
            <div className="flex flex-wrap gap-2">
              {conditionTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {selectedTags.includes(tag) && (
                    <X className="mr-1 h-3 w-3" />
                  )}
                  {tag}
                </Badge>
              ))}
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
                Choose when this follow up action is implemented or due.
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
      </DialogContent>
    </Dialog>
  )
}
