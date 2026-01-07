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
import { IconPlus, IconSwitchHorizontal } from "@tabler/icons-react"
import type { Routing, Agent } from "@/lib/api/types"
import { RoutingCard } from "./routing-card"
import { RoutingForm } from "./routing-form"

interface RoutingsSectionProps {
  routings: Routing[]
  agents: Agent[]
  currentAgentId: string
  onRoutingsChange: (routings: Routing[]) => void
  disabled?: boolean
}

export function RoutingsSection({
  routings,
  agents,
  currentAgentId,
  onRoutingsChange,
  disabled,
}: RoutingsSectionProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const handleAddRouting = (routing: Routing) => {
    onRoutingsChange([...routings, routing])
    setShowAddDialog(false)
  }

  const handleEditRouting = (routing: Routing) => {
    if (editIndex === null) return
    const updated = [...routings]
    updated[editIndex] = routing
    onRoutingsChange(updated)
    setEditIndex(null)
  }

  const handleDeleteRouting = () => {
    if (deleteIndex === null) return
    const updated = routings.filter((_, i) => i !== deleteIndex)
    onRoutingsChange(updated)
    setDeleteIndex(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Call Routing</CardTitle>
          <CardDescription>
            Configure when and how calls should be transferred to other agents or humans.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {routings.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <IconSwitchHorizontal className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No routings configured</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add routing rules to transfer calls to other AI agents or human operators.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowAddDialog(true)}
                disabled={disabled}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Add Routing
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {routings.map((routing, index) => (
                  <RoutingCard
                    key={index}
                    routing={routing}
                    index={index}
                    agents={agents}
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
                Add Routing
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Routing</DialogTitle>
            <DialogDescription>
              Configure a new call transfer rule for this agent.
            </DialogDescription>
          </DialogHeader>
          <RoutingForm
            agents={agents}
            currentAgentId={currentAgentId}
            onSubmit={handleAddRouting}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editIndex !== null} onOpenChange={(open) => !open && setEditIndex(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Routing</DialogTitle>
            <DialogDescription>
              Update the call transfer configuration.
            </DialogDescription>
          </DialogHeader>
          {editIndex !== null && (
            <RoutingForm
              routing={routings[editIndex]}
              agents={agents}
              currentAgentId={currentAgentId}
              onSubmit={handleEditRouting}
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
            <AlertDialogTitle>Delete Routing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this routing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRouting}
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
