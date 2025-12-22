'use client'

import * as React from 'react'
import { IconKey, IconPlus, IconWorld, IconLock } from '@tabler/icons-react'

import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '@/components/data-table/api-keys/columns'
import { statuses, permissions, keyTypes } from '@/components/data-table/api-keys/data'
import type { ApiKey, ApiKeyType } from '@/components/data-table/api-keys/schema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// Mock data for demonstration
const apiKeys: ApiKey[] = [
  {
    id: 'KEY-001',
    name: 'Production API Key',
    key: 'audial_live_abc123def456ghi789jkl012',
    type: 'private',
    status: 'active',
    permissions: ['read', 'write', 'delete'],
    createdAt: '2024-12-01',
    lastUsed: '2024-12-22',
    expiresAt: '2025-12-01',
  },
  {
    id: 'KEY-002',
    name: 'Development Key',
    key: 'audial_test_xyz789ghi012jkl345mno678',
    type: 'private',
    status: 'active',
    permissions: ['read', 'write'],
    createdAt: '2024-12-05',
    lastUsed: '2024-12-21',
    expiresAt: null,
  },
  {
    id: 'KEY-003',
    name: 'Web Widget Key',
    key: 'audial_pub_widget123abc456def789',
    type: 'public',
    status: 'active',
    permissions: ['read'],
    createdAt: '2024-12-10',
    lastUsed: '2024-12-22',
    expiresAt: null,
  },
  {
    id: 'KEY-004',
    name: 'Legacy Integration',
    key: 'audial_live_legacy789xyz012abc345',
    type: 'private',
    status: 'revoked',
    permissions: ['read', 'write'],
    createdAt: '2024-06-01',
    lastUsed: '2024-11-30',
    expiresAt: null,
  },
  {
    id: 'KEY-005',
    name: 'CI/CD Pipeline',
    key: 'audial_test_cicd456pipeline789key',
    type: 'private',
    status: 'active',
    permissions: ['read', 'write', 'delete'],
    createdAt: '2024-09-01',
    lastUsed: '2024-12-20',
    expiresAt: '2025-09-01',
  },
  {
    id: 'KEY-006',
    name: 'Mobile App Widget',
    key: 'audial_pub_mobile789app456widget',
    type: 'public',
    status: 'active',
    permissions: ['read'],
    createdAt: '2024-11-15',
    lastUsed: '2024-12-22',
    expiresAt: null,
  },
]

export default function ApiKeysPage() {
  const [selectedRows, setSelectedRows] = React.useState<ApiKey[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState('')
  const [selectedKeyType, setSelectedKeyType] = React.useState<ApiKeyType | null>(null)

  const handleCreateKey = () => {
    if (!selectedKeyType) return
    toast.success(`${selectedKeyType === 'private' ? 'Private' : 'Public'} API key "${newKeyName}" created`)
    setNewKeyName('')
    setSelectedKeyType(null)
    setShowNewDialog(false)
  }

  const handleDialogClose = (open: boolean) => {
    setShowNewDialog(open)
    if (!open) {
      setNewKeyName('')
      setSelectedKeyType(null)
    }
  }

  const headerActions = (
    <Button onClick={() => setShowNewDialog(true)}>
      <IconPlus className="size-4 mr-1" />
      Create Key
    </Button>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: 'type', title: 'Type', options: keyTypes },
      { columnId: 'status', title: 'Status', options: statuses },
      { columnId: 'permissions', title: 'Permissions', options: permissions },
    ],
    []
  )

  return (
    <>
      <PageLayout
        title="API Keys"
        description="Manage your API keys for server and client-side integrations."
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
              title: 'No API keys',
              description: 'Create your first API key to integrate with your applications.',
              primaryAction: {
                label: 'Create your first API key',
                onClick: () => setShowNewDialog(true),
              },
            }}
          />
        </div>
      </PageLayout>

      <Dialog open={showNewDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Choose the type of API key you want to create. The secret will only be shown once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Key Type Selection */}
            <div className="space-y-3">
              <Label>Key Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    selectedKeyType === 'public' && "border-primary ring-1 ring-primary"
                  )}
                  onClick={() => setSelectedKeyType('public')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-secondary p-2">
                        <IconWorld className="size-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Public Key</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          For client-side use in web widgets and browser apps
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    selectedKeyType === 'private' && "border-primary ring-1 ring-primary"
                  )}
                  onClick={() => setSelectedKeyType('private')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-secondary p-2">
                        <IconLock className="size-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Private Key</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          For server-side use with full API access
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Name Input */}
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder={selectedKeyType === 'public' ? 'e.g., Web Widget' : 'e.g., Production Server'}
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKeyName.trim() || !selectedKeyType}>
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
