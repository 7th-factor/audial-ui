"use client"

import * as React from "react"
import { IconUsers } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/contacts/columns"
import { BulkActions, useContactBulkActions } from "@/components/bulk-actions"
import { NewContactDialog } from "@/components/contacts"
import { useCustomers, type Customer } from "@/lib/api"

// Skeleton row for contacts table
function ContactTableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1.5 min-w-[150px]">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-8 ml-auto" />
    </div>
  )
}

// Full contacts page skeleton
function ContactsSkeleton() {
  return (
    <PageLayout
      title="Contacts"
      description="Manage your contacts and relationships."
      icon={IconUsers}
      actions={
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-28" />
        </div>
      }
    >
      <div className="px-4 lg:px-6 space-y-4">
        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-9 w-64" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-lg border">
          <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/50">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <ContactTableRowSkeleton key={i} />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default function ContactsPage() {
  const { data: customers = [], isLoading, error } = useCustomers()
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
    return <ContactsSkeleton />
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
            data={customers}
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
