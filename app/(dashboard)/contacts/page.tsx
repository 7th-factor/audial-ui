"use client"

import * as React from "react"
import { IconUsers } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/contacts/columns"
import { BulkActions, useContactBulkActions } from "@/components/bulk-actions"
import { NewContactDialog } from "@/components/contacts"
import { useCustomers, type Customer } from "@/lib/api"

export default function ContactsPage() {
  const { data: customers, isLoading, error } = useCustomers()
  const [selectedRows, setSelectedRows] = React.useState<Customer[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)

  const handleBulkAction = React.useCallback((action: string, rows: Customer[]) => {
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
      <Button onClick={() => setShowNewDialog(true)}>Add Contact</Button>
    </div>
  )

  if (isLoading) {
    return (
      <PageLayout
        title="Contacts"
        description="Manage your contacts and relationships."
        icon={IconUsers}
        actions={headerActions}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout
        title="Contacts"
        description="Manage your contacts and relationships."
        icon={IconUsers}
        actions={headerActions}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load contacts</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </PageLayout>
    )
  }

  return (
    <>
      <PageLayout
        title="Contacts"
        description="Manage your contacts and relationships."
        icon={IconUsers}
        actions={headerActions}
      >
        <div className="px-4 lg:px-6">
          <DataTable
            columns={columns}
            data={customers || []}
            onSelectionChange={(rows) => setSelectedRows(rows as Customer[])}
            searchColumnId="firstName"
            searchPlaceholder="Filter contacts..."
            emptyState={{
              icon: IconUsers,
              title: "No contacts",
              description: "Add your first contact to start building your network.",
              primaryAction: {
                label: "Add your first contact",
                onClick: () => setShowNewDialog(true),
              },
            }}
          />
        </div>
      </PageLayout>

      <NewContactDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
      />
    </>
  )
}
