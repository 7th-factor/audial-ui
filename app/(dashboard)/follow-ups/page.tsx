"use client"

import * as React from "react"
import Link from "next/link"
import { IconUserCheck, IconSettings } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { BulkActions, useTaskBulkActions } from "@/components/bulk-actions"
import {
  NewFollowUpDialog,
  ViewFollowUpDialog,
  getFollowUpColumns,
  mockFollowUps,
  followUpStatuses,
  followUpPriorities,
  type FollowUp,
} from "@/components/follow-ups"
import { toast } from "sonner"

export default function FollowUpsPage() {
  const [selectedRows, setSelectedRows] = React.useState<FollowUp[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)
  const [showViewDialog, setShowViewDialog] = React.useState(false)
  const [selectedFollowUp, setSelectedFollowUp] = React.useState<FollowUp | null>(
    null
  )
  const [followUps, setFollowUps] = React.useState(mockFollowUps)

  const handleView = React.useCallback((followUp: FollowUp) => {
    setSelectedFollowUp(followUp)
    setShowViewDialog(true)
  }, [])

  const handleClose = React.useCallback((followUp: FollowUp) => {
    setFollowUps((prev) =>
      prev.map((fu) =>
        fu.id === followUp.id ? { ...fu, status: "closed" as const } : fu
      )
    )
    toast.success("Follow-up closed")
  }, [])

  const handleReopen = React.useCallback((followUp: FollowUp) => {
    setFollowUps((prev) =>
      prev.map((fu) =>
        fu.id === followUp.id ? { ...fu, status: "open" as const } : fu
      )
    )
    toast.success("Follow-up reopened")
  }, [])

  const handleDelete = React.useCallback((followUp: FollowUp) => {
    setFollowUps((prev) => prev.filter((fu) => fu.id !== followUp.id))
    toast.success("Follow-up deleted")
  }, [])

  const handleBulkAction = React.useCallback(
    (action: string, rows: FollowUp[]) => {
      console.log(`Bulk action: ${action}`, rows)
      if (action === "delete") {
        const ids = rows.map((r) => r.id)
        setFollowUps((prev) => prev.filter((fu) => !ids.includes(fu.id)))
        toast.success(`${rows.length} follow-ups deleted`)
      }
      setSelectedRows([])
    },
    []
  )

  const bulkActions = useTaskBulkActions(
    selectedRows as unknown[],
    handleBulkAction as (action: string, rows: unknown[]) => void
  )

  const columns = React.useMemo(
    () =>
      getFollowUpColumns({
        onView: handleView,
        onClose: handleClose,
        onReopen: handleReopen,
        onDelete: handleDelete,
      }),
    [handleView, handleClose, handleReopen, handleDelete]
  )

  const headerActions = (
    <div className="flex items-center gap-3">
      <BulkActions
        selectedCount={selectedRows.length}
        actions={bulkActions}
        onClearSelection={() => setSelectedRows([])}
      />
      <Button variant="outline" asChild>
        <Link href="/settings/follow-up-rules">
          <IconSettings className="mr-2 h-4 w-4" />
          Rules
        </Link>
      </Button>
      <Button onClick={() => setShowNewDialog(true)}>+ Create Follow up</Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      {
        columnId: "status",
        title: "Status",
        options: followUpStatuses.map((s) => ({ value: s.value, label: s.label })),
      },
      {
        columnId: "priority",
        title: "Priority",
        options: followUpPriorities.map((p) => ({
          value: p.value,
          label: p.label,
        })),
      },
    ],
    []
  )

  return (
    <>
      <PageLayout
        title="Follow Ups"
        description="Manage Follow ups and Escalations"
        icon={IconUserCheck}
        actions={headerActions}
      >
        <div className="px-4 lg:px-6">
          <DataTable
            columns={columns}
            data={followUps}
            onSelectionChange={(rows) => setSelectedRows(rows as FollowUp[])}
            searchColumnId="contactName"
            searchPlaceholder="Filter tasks..."
            facetedFilters={facetedFilters}
            emptyState={{
              icon: IconUserCheck,
              title: "All caught up!",
              description:
                "You have no pending follow-ups. Create one to stay on top of your tasks.",
              primaryAction: {
                label: "Create follow-up",
                onClick: () => setShowNewDialog(true),
              },
            }}
          />
        </div>
      </PageLayout>

      <NewFollowUpDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSuccess={() => {
          // Refresh data when API is connected
        }}
      />

      <ViewFollowUpDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        followUp={selectedFollowUp}
        onSuccess={() => {
          // Refresh data when API is connected
        }}
      />
    </>
  )
}
