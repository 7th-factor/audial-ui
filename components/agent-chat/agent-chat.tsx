"use client"

import * as React from "react"
import { useRef, useEffect, useCallback, useState } from "react"
import { IconSend, IconMicrophone, IconPlayerStop, IconSparkles } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChatMessage, type Message } from "./chat-message"
import { cn } from "@/lib/utils"

interface AgentChatProps {
  agentName?: string
  initialMessage?: string
  className?: string
}

export function AgentChat({
  agentName = "AI Assistant",
  initialMessage = "Hi! I'm your AI assistant. How can I help you today?",
  className,
}: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: initialMessage,
      createdAt: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()
      if (!input.trim() || isLoading) return

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: input.trim(),
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const responses = [
          "I understand your question. Let me help you with that.",
          "That's a great question! Here's what I can tell you...",
          "I'd be happy to assist you with that request.",
          "Based on your inquiry, I recommend the following...",
          "Thank you for reaching out. Here's some information that might help.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: randomResponse,
          createdAt: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1000 + Math.random() * 1000)
    },
    [input, isLoading]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3 flex-shrink-0">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <IconSparkles className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm leading-none">{agentName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isLoading ? "Typing..." : "Online"}
          </p>
        </div>
      </div>

      {/* Messages Area - flex-1 with min-h-0 for proper scroll */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "",
              }}
              isLoading
            />
          )}
        </div>
      </ScrollArea>

      {/* Input Area - ChatGPT style */}
      <div className="p-4 flex-shrink-0">
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="flex-1 min-h-[40px] max-h-[120px] resize-none border-0 bg-transparent p-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
              rows={1}
            />
            <div className="flex items-center gap-1 pb-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                disabled={isLoading}
              >
                <IconMicrophone className="size-4" />
                <span className="sr-only">Voice input</span>
              </Button>
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <IconPlayerStop className="size-4" />
                ) : (
                  <IconSend className="size-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Test environment · Messages are not saved
          </p>
        </form>
      </div>
    </div>
  )
}
