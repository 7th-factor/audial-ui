'use client'

import * as React from 'react'
import { IconKey, IconPlus, IconWorld, IconLock } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'

import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '@/components/data-table/api-keys/columns'
import type { CombinedApiKey } from '@/components/data-table/api-keys/schema'
import { usePrivateKeys, usePublicKeys, type PrivateKey, type PublicKey } from '@/lib/api'
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

type ApiKeyType = 'private' | 'public'

// Transform API keys to combined format
function transformKeys(
  privateKeys: PrivateKey[] | undefined,
  publicKeys: PublicKey[] | undefined
): CombinedApiKey[] {
  const combined: CombinedApiKey[] = []

  if (privateKeys) {
    privateKeys.forEach((key) => {
      combined.push({
        id: key.id,
        name: key.name,
        description: key.description,
        type: 'private',
        active: key.active,
        lastUsedAt: key.lastUsedAt,
        createdAt: key.createdAt,
      })
    })
  }

  if (publicKeys) {
    publicKeys.forEach((key) => {
      combined.push({
        id: key.id,
        name: key.name,
        description: key.description,
        type: 'public',
        active: key.active,
        lastUsedAt: null,
        createdAt: key.createdAt,
        allowedOrigins: key.allowedOrigins,
        allowedAgentIds: key.allowedAgentIds,
        allowCustomAgent: key.allowCustomAgent,
      })
    })
  }

  // Sort by creation date, newest first
  return combined.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

// Filter options
const typeOptions = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

export default function ApiKeysPage() {
  const {
    data: privateKeys,
    isLoading: isLoadingPrivate,
    error: privateError,
  } = usePrivateKeys()
  const {
    data: publicKeys,
    isLoading: isLoadingPublic,
    error: publicError,
  } = usePublicKeys()

  const [selectedRows, setSelectedRows] = React.useState<CombinedApiKey[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState('')
  const [selectedKeyType, setSelectedKeyType] = React.useState<ApiKeyType | null>(null)

  const isLoading = isLoadingPrivate || isLoadingPublic
  const error = privateError || publicError

  const apiKeys = React.useMemo(
    () => transformKeys(privateKeys, publicKeys),
    [privateKeys, publicKeys]
  )

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
    <div className="flex items-center gap-3">
      {selectedRows.length > 0 && (
        <span className="text-sm text-muted-foreground">
          {selectedRows.length} selected
        </span>
      )}
      <Button onClick={() => setShowNewDialog(true)}>
        <IconPlus className="size-4 mr-1" />
        Create Key
      </Button>
    </div>
  )

  const facetedFilters = React.useMemo(
    () => [
      { columnId: 'type', title: 'Type', options: typeOptions },
      { columnId: 'active', title: 'Status', options: statusOptions },
    ],
    []
  )

  if (isLoading) {
    return (
      <PageLayout
        title="API Keys"
        description="Manage your API keys and access tokens."
        icon={IconKey}
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
        title="API Keys"
        description="Manage your API keys and access tokens."
        icon={IconKey}
        actions={headerActions}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load API keys</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </PageLayout>
    )
  }

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
            onSelectionChange={(rows) => setSelectedRows(rows as CombinedApiKey[])}
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
                    'cursor-pointer transition-all hover:border-primary/50',
                    selectedKeyType === 'public' && 'border-primary ring-1 ring-primary'
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
                    'cursor-pointer transition-all hover:border-primary/50',
                    selectedKeyType === 'private' && 'border-primary ring-1 ring-primary'
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
