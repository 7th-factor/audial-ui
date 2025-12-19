"use client"

import * as React from "react"
import { IconUserCheck } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/columns"
import { statuses, priorities } from "@/components/data-table/data/data"
import { BulkActions, useTaskBulkActions } from "@/components/bulk-actions"
import type { Task } from "@/components/data-table/data/schema"

const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source sensor",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic system",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7262",
    title: "The UTF8 application is down, parse the neural bandwidth",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1138",
    title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
]

export default function FollowUpsPage() {
  const [selectedRows, setSelectedRows] = React.useState<Task[]>([])

  const handleBulkAction = React.useCallback((action: string, rows: Task[]) => {
    console.log(`Bulk action: ${action}`, rows)
    setSelectedRows([])
  }, [])

  const bulkActions = useTaskBulkActions(selectedRows, handleBulkAction)

  const headerActions = (
    <div className="flex items-center gap-3">
      <BulkActions
        selectedCount={selectedRows.length}
        actions={bulkActions}
        onClearSelection={() => setSelectedRows([])}
      />
      <Button>Add Follow Up</Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: "status", title: "Status", options: statuses },
      { columnId: "priority", title: "Priority", options: priorities },
    ],
    [],
  )

  return (
    <PageLayout
      title="Follow Ups"
      description="Track and manage your follow-up tasks."
      icon={IconUserCheck}
      actions={headerActions}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={tasks}
          onSelectionChange={(rows) => setSelectedRows(rows as Task[])}
          searchColumnId="title"
          searchPlaceholder="Filter follow ups..."
          facetedFilters={facetedFilters}
        />
      </div>
    </PageLayout>
  )
}
