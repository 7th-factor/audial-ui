"use client"

import * as React from "react"
import { IconUsers } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/contacts/columns"
import { statuses, tags } from "@/components/data-table/contacts/data"
import { BulkActions, useContactBulkActions } from "@/components/bulk-actions"
import type { Contact } from "@/components/data-table/contacts/schema"

const contacts: Contact[] = [
  {
    id: "CON-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    company: "Acme Corp",
    role: "Marketing Director",
    status: "active",
    tags: ["customer", "enterprise"],
    lastContact: "2024-01-15",
  },
  {
    id: "CON-002",
    name: "Michael Chen",
    email: "m.chen@techcorp.io",
    company: "TechCorp",
    role: "CTO",
    status: "vip",
    tags: ["partner", "enterprise"],
    lastContact: "2024-01-14",
  },
  {
    id: "CON-003",
    name: "Emily Davis",
    email: "emily.d@startup.co",
    company: "StartupCo",
    role: "Founder",
    status: "active",
    tags: ["lead"],
    lastContact: "2024-01-13",
  },
  {
    id: "CON-004",
    name: "John Smith",
    email: "john.smith@bigco.com",
    company: "BigCo Inc",
    role: "Sales Manager",
    status: "inactive",
    tags: ["customer"],
    lastContact: "2023-12-20",
  },
  {
    id: "CON-005",
    name: "Lisa Wong",
    email: "lisa.wong@ventures.vc",
    company: "Ventures VC",
    role: "Partner",
    status: "active",
    tags: ["partner"],
    lastContact: "2024-01-10",
  },
]

export default function ContactsPage() {
  const [selectedRows, setSelectedRows] = React.useState<Contact[]>([])

  const handleBulkAction = React.useCallback((action: string, rows: Contact[]) => {
    console.log(`Bulk action: ${action}`, rows)
    setSelectedRows([])
  }, [])

  const bulkActions = useContactBulkActions(selectedRows, handleBulkAction)

  const headerActions = (
    <div className="flex items-center gap-3">
      <BulkActions
        selectedCount={selectedRows.length}
        actions={bulkActions}
        onClearSelection={() => setSelectedRows([])}
      />
      <Button>Add Contact</Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: "status", title: "Status", options: statuses },
      { columnId: "tags", title: "Tags", options: tags },
    ],
    [],
  )

  return (
    <PageLayout
      title="Contacts"
      description="Manage your contacts and relationships."
      icon={IconUsers}
      actions={headerActions}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={contacts}
          onSelectionChange={(rows) => setSelectedRows(rows as Contact[])}
          searchColumnId="name"
          searchPlaceholder="Filter contacts..."
          facetedFilters={facetedFilters}
        />
      </div>
    </PageLayout>
  )
}
