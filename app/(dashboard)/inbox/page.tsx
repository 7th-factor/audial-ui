"use client"

import * as React from "react"
import { IconInbox } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/inbox/columns"
import { statuses, labels } from "@/components/data-table/inbox/data"
import { BulkActions, useInboxBulkActions } from "@/components/bulk-actions"
import type { Message } from "@/components/data-table/inbox/schema"

const messages: Message[] = [
  {
    id: "MSG-001",
    sender: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    subject: "Q4 Marketing Campaign Review",
    preview: "Hi, I wanted to follow up on our discussion about the Q4 marketing campaign...",
    status: "unread",
    label: "work",
    date: "2024-01-15",
  },
  {
    id: "MSG-002",
    sender: "Michael Chen",
    email: "m.chen@techcorp.io",
    subject: "Partnership Proposal",
    preview: "Thank you for your interest in partnering with TechCorp. We would like to...",
    status: "starred",
    label: "important",
    date: "2024-01-14",
  },
  {
    id: "MSG-003",
    sender: "Emily Davis",
    email: "emily.d@startup.co",
    subject: "Meeting Reschedule Request",
    preview: "I hope this email finds you well. Unfortunately, I need to reschedule our...",
    status: "read",
    label: "work",
    date: "2024-01-13",
  },
  {
    id: "MSG-004",
    sender: "John Smith",
    email: "john.smith@gmail.com",
    subject: "Weekend Plans",
    preview: "Hey! Are you free this weekend? I was thinking we could grab dinner at...",
    status: "read",
    label: "personal",
    date: "2024-01-12",
  },
  {
    id: "MSG-005",
    sender: "Billing Department",
    email: "billing@cloudservices.com",
    subject: "Invoice #INV-2024-0156",
    preview: "Please find attached your invoice for services rendered in December 2023...",
    status: "unread",
    label: "work",
    date: "2024-01-11",
  },
]

export default function InboxPage() {
  const [selectedRows, setSelectedRows] = React.useState<Message[]>([])

  const handleBulkAction = React.useCallback((action: string, rows: Message[]) => {
    console.log(`Bulk action: ${action}`, rows)
    setSelectedRows([])
  }, [])

  const bulkActions = useInboxBulkActions(selectedRows, handleBulkAction)

  const headerActions = (
    <div className="flex items-center gap-3">
      <BulkActions
        selectedCount={selectedRows.length}
        actions={bulkActions}
        onClearSelection={() => setSelectedRows([])}
      />
      <Button>Compose</Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: "status", title: "Status", options: statuses },
      { columnId: "label", title: "Label", options: labels },
    ],
    [],
  )

  return (
    <PageLayout
      title="Inbox"
      description="Manage your messages and notifications."
      icon={IconInbox}
      actions={headerActions}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={messages}
          onSelectionChange={(rows) => setSelectedRows(rows as Message[])}
          searchColumnId="subject"
          searchPlaceholder="Filter messages..."
          facetedFilters={facetedFilters}
        />
      </div>
    </PageLayout>
  )
}
