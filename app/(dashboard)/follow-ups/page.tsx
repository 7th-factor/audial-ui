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
  followUpStatuses,
  followUpPriorities,
  type FollowUpUIModel,
  getDisplayStatus,
} from "@/components/follow-ups"
import {
  useFollowUps,
  useUpdateFollowUp,
  useDeleteFollowUp,
} from "@/lib/features/follow-ups"
import { useCustomers } from "@/lib/api/hooks/use-customers"
import type { FollowUp } from "@/lib/api/types/follow-up"
import { Skeleton } from "@/components/ui/skeleton"

export default function FollowUpsPage() {
  const [selectedRows, setSelectedRows] = React.useState<FollowUpUIModel[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)
  const [showViewDialog, setShowViewDialog] = React.useState(false)
  const [selectedFollowUp, setSelectedFollowUp] =
    React.useState<FollowUpUIModel | null>(null)

  // Fetch data from API
  const { data: followUpsResponse, isLoading: followUpsLoading } = useFollowUps()
  const { data: customers } = useCustomers()
  const updateFollowUp = useUpdateFollowUp()
  const deleteFollowUp = useDeleteFollowUp()

  // Create a map of customer IDs to names for quick lookup
  const customerMap = React.useMemo(() => {
    if (!customers) return new Map<string, string>()
    return new Map(
      customers.map((c) => [
        c.id,
        [c.firstName, c.lastName].filter(Boolean).join(" ") ||
          c.phoneNumber ||
          "Unknown",
      ])
    )
  }, [customers])

  // Transform API data to UI model with computed status and customer names
  const followUps: FollowUpUIModel[] = React.useMemo(() => {
    if (!followUpsResponse?.data) return []
    return followUpsResponse.data.map((fu: FollowUp) => ({
      ...fu,
      status: getDisplayStatus(fu.status, fu.dueAt),
      customerName: customerMap.get(fu.customerId),
    }))
  }, [followUpsResponse, customerMap])

  const handleView = React.useCallback((followUp: FollowUpUIModel) => {
    setSelectedFollowUp(followUp)
    setShowViewDialog(true)
  }, [])

  const handleMarkDone = React.useCallback(
    (followUp: FollowUpUIModel) => {
      updateFollowUp.mutate({
        id: followUp.id,
        data: { status: "done" },
      })
    },
    [updateFollowUp]
  )

  const handleReopen = React.useCallback(
    (followUp: FollowUpUIModel) => {
      updateFollowUp.mutate({
        id: followUp.id,
        data: { status: "open" },
      })
    },
    [updateFollowUp]
  )

  const handleDelete = React.useCallback(
    (followUp: FollowUpUIModel) => {
      deleteFollowUp.mutate(followUp.id)
    },
    [deleteFollowUp]
  )

  const handleBulkAction = React.useCallback(
    (action: string, rows: FollowUpUIModel[]) => {
      if (action === "delete") {
        rows.forEach((row) => deleteFollowUp.mutate(row.id))
      }
      setSelectedRows([])
    },
    [deleteFollowUp]
  )

  const bulkActions = useTaskBulkActions(
    selectedRows as unknown[],
    handleBulkAction as (action: string, rows: unknown[]) => void
  )

  const columns = React.useMemo(
    () =>
      getFollowUpColumns({
        onView: handleView,
        onMarkDone: handleMarkDone,
        onReopen: handleReopen,
        onDelete: handleDelete,
      }),
    [handleView, handleMarkDone, handleReopen, handleDelete]
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

  if (followUpsLoading) {
    return (
      <PageLayout
        title="Follow Ups"
        description="Manage Follow ups and Escalations"
        icon={IconUserCheck}
        actions={headerActions}
      >
        <div className="px-4 lg:px-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageLayout>
    )
  }

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
            onSelectionChange={(rows) => setSelectedRows(rows as FollowUpUIModel[])}
            searchColumnId="customerName"
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
      />

      <ViewFollowUpDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        followUp={selectedFollowUp}
      />
    </>
  )
}
