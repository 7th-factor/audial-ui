"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { toast } from "sonner"

const newFollowUpSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority",
  }),
})

type NewFollowUpFormValues = z.infer<typeof newFollowUpSchema>

interface NewFollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (data: NewFollowUpFormValues) => void
}

export function NewFollowUpDialog({ open, onOpenChange, onSuccess }: NewFollowUpDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<NewFollowUpFormValues>({
    resolver: zodResolver(newFollowUpSchema),
    defaultValues: {
      title: "",
      priority: "medium",
    },
  })

  const handleSubmit = async (values: NewFollowUpFormValues) => {
    try {
      setIsLoading(true)

      // TODO: Call API to create follow-up
      console.log("Creating follow-up:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast.success("Follow-up created successfully")
      form.reset()
      onOpenChange(false)
      onSuccess?.(values)
    } catch (error) {
      toast.error("Failed to create follow-up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Follow Up</DialogTitle>
          <DialogDescription>
            Create a new follow-up task. You can add more details later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter follow-up title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
