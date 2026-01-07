"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Tool, MCPTool } from "@/lib/api/types"

interface ToolFormProps {
  tool?: Tool
  onSubmit: (tool: Tool) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ToolForm({ tool, onSubmit, onCancel, isLoading }: ToolFormProps) {
  const [name, setName] = useState(tool?.name || "")
  const [description, setDescription] = useState(tool?.description || "")
  const [serverUrl, setServerUrl] = useState(tool?.serverUrl || "")
  const [urlError, setUrlError] = useState<string | null>(null)

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setUrlError(null)
      return false
    }
    try {
      new URL(url)
      setUrlError(null)
      return true
    } catch {
      setUrlError("Please enter a valid URL")
      return false
    }
  }

  const handleUrlChange = (value: string) => {
    setServerUrl(value)
    if (value.trim()) {
      validateUrl(value)
    } else {
      setUrlError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !description.trim() || !serverUrl.trim()) return
    if (!validateUrl(serverUrl)) return

    const mcpTool: MCPTool = {
      type: "mcp",
      name: name.trim(),
      description: description.trim(),
      serverUrl: serverUrl.trim(),
    }

    onSubmit(mcpTool)
  }

  const isValid = name.trim() && description.trim() && serverUrl.trim() && !urlError

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Tool Name */}
        <div className="space-y-2">
          <Label htmlFor="tool-name" className="text-sm font-medium">
            Name *
          </Label>
          <Input
            id="tool-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My MCP Server"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="tool-description" className="text-sm font-medium">
            Description *
          </Label>
          <Textarea
            id="tool-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this MCP server provides..."
            rows={3}
            required
          />
          <p className="text-xs text-muted-foreground">
            This description helps the AI understand when to use this tool.
          </p>
        </div>

        {/* Server URL */}
        <div className="space-y-2">
          <Label htmlFor="tool-url" className="text-sm font-medium">
            Server URL *
          </Label>
          <Input
            id="tool-url"
            type="url"
            value={serverUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://your-mcp-server.com/sse"
            required
            className={urlError ? "border-destructive" : ""}
          />
          {urlError ? (
            <p className="text-xs text-destructive">{urlError}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              The URL endpoint for your MCP server (typically ends with /sse for SSE transport).
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "Saving..." : tool ? "Update Tool" : "Add Tool"}
        </Button>
      </div>
    </form>
  )
}
