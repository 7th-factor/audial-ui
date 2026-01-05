"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Copy, Check, Loader2 } from "lucide-react"

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useCreateApiKey } from "@/lib/api/hooks/use-api-keys"

const newApiKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["private", "public"]),
  description: z.string().optional(),
})

type NewApiKeyFormValues = z.infer<typeof newApiKeySchema>

interface NewApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (data: { name: string; key: string; type: string }) => void
}

export function NewApiKeyDialog({ open, onOpenChange, onSuccess }: NewApiKeyDialogProps) {
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const createApiKey = useCreateApiKey()

  const form = useForm<NewApiKeyFormValues>({
    resolver: zodResolver(newApiKeySchema),
    defaultValues: {
      name: "",
      type: "private",
      description: "",
    },
  })

  const handleSubmit = async (values: NewApiKeyFormValues) => {
    createApiKey.mutate(
      {
        type: values.type,
        name: values.name,
        description: values.description || undefined,
      },
      {
        onSuccess: (response) => {
          setGeneratedKey(response.key)
          toast.success("API key created successfully")
          onSuccess?.({ name: values.name, key: response.key, type: values.type })
        },
        onError: () => {
          toast.error("Failed to create API key. Please try again.")
        },
      }
    )
  }

  const handleCopy = async () => {
    if (generatedKey) {
      await navigator.clipboard.writeText(generatedKey)
      setCopied(true)
      toast.success("API key copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    form.reset()
    setGeneratedKey(null)
    setCopied(false)
    onOpenChange(false)
  }

  // Show generated key screen
  if (generatedKey) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Copy your API key now. You won&apos;t be able to see it again.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <code className="text-sm font-mono break-all">{generatedKey}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Store this key securely. For security reasons, we cannot show it again.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={handleClose}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Generate a new API key for your application.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My API Key" {...field} />
                  </FormControl>
                  <FormDescription>
                    A friendly name to identify this key.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select key type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">
                        Private - For backend server use
                      </SelectItem>
                      <SelectItem value="public">
                        Public - For frontend/client use
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Private keys have full access. Public keys are restricted to specific origins.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What will this key be used for?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={createApiKey.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createApiKey.isPending}>
                {createApiKey.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Key
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
