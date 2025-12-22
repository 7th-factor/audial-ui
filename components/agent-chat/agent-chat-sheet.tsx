"use client"

import * as React from "react"
import { IconMessageCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AgentChat } from "./agent-chat"

interface AgentChatSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function AgentChatSheet({ open, onOpenChange, trigger }: AgentChatSheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button size="sm">
            <IconMessageCircle className="size-4 mr-1.5" />
            Test Agent
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[440px] sm:max-w-[440px] p-0 flex flex-col"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Test Your Agent</SheetTitle>
          <SheetDescription>
            Have a conversation with your agent to test its behavior and responses.
          </SheetDescription>
        </SheetHeader>
        <AgentChat
          agentName="Customer Support Agent"
          initialMessage="Hi! I'm your Customer Support Agent. How can I help you today?"
          className="h-full"
        />
      </SheetContent>
    </Sheet>
  )
}
