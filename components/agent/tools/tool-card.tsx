"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconPencil, IconTrash, IconServer, IconCopy, IconCheck } from "@tabler/icons-react"
import type { Tool } from "@/lib/api/types"

interface ToolCardProps {
  tool: Tool
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  disabled?: boolean
}

export function ToolCard({ tool, index, onEdit, onDelete, disabled }: ToolCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(tool.serverUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url
    return `${url.slice(0, maxLength)}...`
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <IconServer className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm truncate">{tool.name}</span>
                <Badge
                  variant="outline"
                  className="text-xs border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  MCP
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {tool.description}
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded truncate flex-1">
                  {truncateUrl(tool.serverUrl)}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={handleCopyUrl}
                >
                  {copied ? (
                    <IconCheck className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <IconCopy className="h-3.5 w-3.5" />
                  )}
                </Button>
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
