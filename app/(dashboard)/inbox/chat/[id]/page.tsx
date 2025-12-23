"use client"

import { use } from "react"
import Link from "next/link"
import {
  IconArrowLeft,
  IconBrandWhatsapp,
  IconApi,
  IconUser,
  IconRobot,
} from "@tabler/icons-react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat, type ChatMessage } from "@/lib/api"
import { cn } from "@/lib/utils"

function getStatusClass(status?: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return ""
  }
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isUser ? "ml-auto flex-row-reverse" : ""
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-muted"
        )}
      >
        {isUser ? (
          <IconUser className="h-4 w-4 text-primary-foreground" />
        ) : (
          <IconRobot className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div
        className={cn(
          "rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="text-sm">{message.message}</p>
        <p
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data: chat, isLoading, error } = useChat(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !chat) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/inbox">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Chat Not Found</h1>
        </div>
        <p className="text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "The chat you're looking for doesn't exist."}
        </p>
      </div>
    )
  }

  const customer = chat.customer
  const customerName = customer
    ? [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
      "Unknown"
    : "Unknown"

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/inbox">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Chat with {customerName}</h1>
              <Badge
                variant="secondary"
                className={cn("capitalize", getStatusClass(chat.status))}
              >
                {chat.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(chat.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {chat.channel === "whatsapp" ? (
            <Badge variant="outline" className="gap-1">
              <IconBrandWhatsapp className="h-3 w-3" />
              WhatsApp
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <IconApi className="h-3 w-3" />
              REST API
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {chat.messages && chat.messages.length > 0 ? (
                  chat.messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No messages yet
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customer ? (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{customerName}</p>
                  </div>
                  {customer.email && (
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  )}
                  {customer.phoneNumber && (
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium font-mono">
                        {customer.phoneNumber}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No customer info</p>
              )}
            </CardContent>
          </Card>

          {/* Chat Info */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Chat ID</p>
                <p className="font-mono text-xs">{chat.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agent ID</p>
                <p className="font-mono text-xs">{chat.agentId}</p>
              </div>
              {chat.sessionId && (
                <div>
                  <p className="text-sm text-muted-foreground">Session ID</p>
                  <p className="font-mono text-xs">{chat.sessionId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Updated</p>
                <p className="text-sm">
                  {new Date(chat.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
