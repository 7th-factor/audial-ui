"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IconPlus, IconServer } from "@tabler/icons-react"
import type { Tool } from "@/lib/api/types"
import { ToolCard } from "./tool-card"
import { ToolForm } from "./tool-form"

interface ToolsSectionProps {
  tools: Tool[]
  onToolsChange: (tools: Tool[]) => void
  disabled?: boolean
}

export function ToolsSection({ tools, onToolsChange, disabled }: ToolsSectionProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const handleAddTool = (tool: Tool) => {
    onToolsChange([...tools, tool])
    setShowAddDialog(false)
  }

  const handleEditTool = (tool: Tool) => {
    if (editIndex === null) return
    const updated = [...tools]
    updated[editIndex] = tool
    onToolsChange(updated)
    setEditIndex(null)
  }

  const handleDeleteTool = () => {
    if (deleteIndex === null) return
    const updated = tools.filter((_, i) => i !== deleteIndex)
    onToolsChange(updated)
    setDeleteIndex(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>MCP Tools</CardTitle>
          <CardDescription>
            Connect Model Context Protocol (MCP) servers to extend your agent&apos;s capabilities with external tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tools.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <IconServer className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No MCP tools configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect MCP servers to give your agent access to external tools and data sources.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowAddDialog(true)}
                disabled={disabled}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Add MCP Tool
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {tools.map((tool, index) => (
                  <ToolCard
                    key={index}
                    tool={tool}
                    index={index}
                    onEdit={setEditIndex}
                    onDelete={setDeleteIndex}
                    disabled={disabled}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowAddDialog(true)}
                disabled={disabled}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Add MCP Tool
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add MCP Tool</DialogTitle>
            <DialogDescription>
              Connect an MCP server to extend your agent&apos;s capabilities.
            </DialogDescription>
          </DialogHeader>
          <ToolForm
            onSubmit={handleAddTool}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editIndex !== null} onOpenChange={(open) => !open && setEditIndex(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit MCP Tool</DialogTitle>
            <DialogDescription>
              Update the MCP server configuration.
            </DialogDescription>
          </DialogHeader>
          {editIndex !== null && (
            <ToolForm
              tool={tools[editIndex]}
              onSubmit={handleEditTool}
              onCancel={() => setEditIndex(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteIndex !== null}
        onOpenChange={(open) => !open && setDeleteIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete MCP Tool</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this MCP tool? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTool}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
