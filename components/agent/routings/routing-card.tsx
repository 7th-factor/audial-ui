"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconPencil, IconTrash, IconRobot, IconUser, IconPhone } from "@tabler/icons-react"
import type { Routing, Agent } from "@/lib/api/types"
import { isAIRouting, isHumanRouting } from "@/lib/api/types"

interface RoutingCardProps {
  routing: Routing
  index: number
  agents: Agent[]
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  disabled?: boolean
}

export function RoutingCard({ routing, index, agents, onEdit, onDelete, disabled }: RoutingCardProps) {
  const getTargetAgentName = (agentId: string): string => {
    const agent = agents.find((a) => a.id === agentId)
    return agent?.name || "Unknown Agent"
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isAIRouting(routing)
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {isAIRouting(routing) ? (
                <IconRobot className="h-5 w-5" />
              ) : (
                <IconUser className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    isAIRouting(routing)
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
                  }`}
                >
                  {isAIRouting(routing) ? "AI Transfer" : "Human Transfer"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {routing.triggerCondition}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {isAIRouting(routing) ? (
                  <>
                    <IconRobot className="h-3.5 w-3.5" />
                    <span className="truncate">{getTargetAgentName(routing.agentId)}</span>
                  </>
                ) : isHumanRouting(routing) ? (
                  <>
                    <IconPhone className="h-3.5 w-3.5" />
                    <span>{routing.phone}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" disabled={disabled}>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(index)}>
                <IconPencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(index)}
                className="text-destructive focus:text-destructive"
              >
                <IconTrash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
