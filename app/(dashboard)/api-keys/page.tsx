"use client"

import * as React from "react"
import { IconKey } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/api-keys/columns"
import { statuses, permissions } from "@/components/data-table/api-keys/data"
import { BulkActions, useApiKeyBulkActions } from "@/components/bulk-actions"
import { NewApiKeyDialog } from "@/components/api-keys"
import type { ApiKey } from "@/components/data-table/api-keys/schema"

const apiKeys: ApiKey[] = [
  {
    id: "KEY-001",
    name: "Production API Key",
    key: "sk_live_EXAMPLE_KEY_REPLACE_WITH_REAL",
    status: "active",
    permissions: ["read", "write"],
    createdAt: "2024-01-01",
    lastUsed: "2024-01-15",
    expiresAt: "2025-01-01",
  },
  {
    id: "KEY-002",
    name: "Development Key",
    key: "sk_test_EXAMPLE_KEY_REPLACE_WITH_REAL",
    status: "active",
    permissions: ["read", "write", "delete"],
    createdAt: "2024-01-05",
    lastUsed: "2024-01-14",
    expiresAt: null,
  },
  {
    id: "KEY-003",
    name: "CI/CD Pipeline",
    key: "sk_live_EXAMPLE_KEY_REPLACE_WITH_REAL",
    status: "active",
    permissions: ["read"],
    createdAt: "2023-11-15",
    lastUsed: "2024-01-13",
    expiresAt: "2024-06-15",
  },
  {
    id: "KEY-004",
    name: "Old Integration Key",
    key: "sk_live_EXAMPLE_KEY_REPLACE_WITH_REAL",
    status: "revoked",
    permissions: ["read", "write", "admin"],
    createdAt: "2023-06-01",
    lastUsed: "2023-12-01",
    expiresAt: null,
  },
  {
    id: "KEY-005",
    name: "Expired Test Key",
    key: "sk_test_EXAMPLE_KEY_REPLACE_WITH_REAL",
    status: "expired",
    permissions: ["read"],
    createdAt: "2023-01-01",
    lastUsed: "2023-06-15",
    expiresAt: "2023-12-31",
  },
]

export default function ApiKeysPage() {
  const [selectedRows, setSelectedRows] = React.useState<ApiKey[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)

  const handleBulkAction = React.useCallback((action: string, rows: ApiKey[]) => {
    console.log(`Bulk action: ${action}`, rows)
    setSelectedRows([])
  }, [])

  const bulkActions = useApiKeyBulkActions(selectedRows, handleBulkAction)

  const headerActions = (
    <div className="flex items-center gap-3">
      <BulkActions
        selectedCount={selectedRows.length}
        actions={bulkActions}
        onClearSelection={() => setSelectedRows([])}
      />
      <Button onClick={() => setShowNewDialog(true)}>Generate Key</Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: "status", title: "Status", options: statuses },
      { columnId: "permissions", title: "Permissions", options: permissions },
    ],
    [],
  )

  return (
    <>
      <PageLayout
        title="API Keys"
        description="Manage your API keys and access tokens."
        icon={IconKey}
        actions={headerActions}
      >
        <div className="px-4 lg:px-6">
          <DataTable
            columns={columns}
            data={apiKeys}
            onSelectionChange={(rows) => setSelectedRows(rows as ApiKey[])}
            searchColumnId="name"
            searchPlaceholder="Filter API keys..."
            facetedFilters={facetedFilters}
            emptyState={{
              icon: IconKey,
              title: "No API keys",
              description: "Generate your first API key to start integrating with our platform.",
              primaryAction: {
                label: "Generate your first key",
                onClick: () => setShowNewDialog(true),
              },
            }}
          />
        </div>
      </PageLayout>

      <NewApiKeyDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
      />
    </>
  )
}
