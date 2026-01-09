'use client'

import * as React from 'react'
import { IconKey, IconPlus, IconWorld, IconLock, IconCopy, IconCheck } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'

import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/data-table'
import { createColumns } from '@/components/data-table/api-keys/columns'
import type { CombinedApiKey } from '@/components/data-table/api-keys/schema'
import {
  usePrivateKeys,
  usePublicKeys,
  useCreateApiKey,
  useDeleteApiKey,
  type PrivateKey,
  type PublicKey,
} from '@/lib/api'
import { KeyType } from '@/lib/features/api-keys'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
    data: privateKeysResponse,
    isLoading: isLoadingPrivate,
    error: privateError,
  } = usePrivateKeys()
  const {
    data: publicKeysResponse,
    isLoading: isLoadingPublic,
    error: publicError,
  } = usePublicKeys()

  // Extract data arrays from paginated responses
  const privateKeys = privateKeysResponse?.data
  const publicKeys = publicKeysResponse?.data

  // Mutations
  const createApiKey = useCreateApiKey()
  const deleteApiKey = useDeleteApiKey()

  // UI State
  const [selectedRows, setSelectedRows] = React.useState<CombinedApiKey[]>([])
  const [showNewDialog, setShowNewDialog] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState('')
  const [selectedKeyType, setSelectedKeyType] = React.useState<ApiKeyType | null>(null)

  // Key Created Dialog State
  const [showKeyCreatedDialog, setShowKeyCreatedDialog] = React.useState(false)
  const [createdKeySecret, setCreatedKeySecret] = React.useState<string | null>(null)
  const [createdKeyName, setCreatedKeyName] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  // Delete Confirmation State
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [keyToDelete, setKeyToDelete] = React.useState<CombinedApiKey | null>(null)

  const isLoading = isLoadingPrivate || isLoadingPublic
  const error = privateError || publicError

  const apiKeys = React.useMemo(
    () => transformKeys(privateKeys, publicKeys),
    [privateKeys, publicKeys]
  )

  const handleCreateKey = async () => {
    if (!selectedKeyType || !newKeyName.trim()) return

    try {
      const result = await createApiKey.mutateAsync({
        name: newKeyName.trim(),
        type: selectedKeyType,
      })

      // Close create dialog and show secret
      setShowNewDialog(false)
      setCreatedKeyName(newKeyName.trim())
      setCreatedKeySecret(result.key)
      setShowKeyCreatedDialog(true)

      // Reset form
      setNewKeyName('')
      setSelectedKeyType(null)

      toast.success(`${selectedKeyType === 'private' ? 'Private' : 'Public'} API key created`)
    } catch {
      // Error handling is done by makeMutation
    }
  }

  const handleDialogClose = (open: boolean) => {
    setShowNewDialog(open)
    if (!open) {
      setNewKeyName('')
      setSelectedKeyType(null)
    }
  }

  const handleKeyCreatedDialogClose = () => {
    setShowKeyCreatedDialog(false)
    setCreatedKeySecret(null)
    setCreatedKeyName(null)
    setCopied(false)
  }

  const handleCopyKey = async () => {
    if (!createdKeySecret) return
    await navigator.clipboard.writeText(createdKeySecret)
    setCopied(true)
    toast.success('API key copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeleteClick = React.useCallback((key: CombinedApiKey) => {
    setKeyToDelete(key)
    setShowDeleteDialog(true)
  }, [])

  // Create columns with delete handler
  const tableColumns = React.useMemo(
    () => createColumns({ onDelete: handleDeleteClick }),
    [handleDeleteClick]
  )

  const handleDeleteConfirm = async () => {
    if (!keyToDelete) return

    try {
      await deleteApiKey.mutateAsync({
        type: keyToDelete.type === 'private' ? KeyType.PRIVATE : KeyType.PUBLIC,
        keyId: keyToDelete.id,
      })

      toast.success(`API key "${keyToDelete.name}" deleted`)
      setShowDeleteDialog(false)
      setKeyToDelete(null)
    } catch {
      // Error handling is done by makeMutation
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
            columns={tableColumns}
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
            <Button variant="outline" onClick={() => handleDialogClose(false)} disabled={createApiKey.isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateKey}
              disabled={!newKeyName.trim() || !selectedKeyType || createApiKey.isPending}
            >
              {createApiKey.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Key'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Key Created Dialog - Shows the secret only once */}
      <Dialog open={showKeyCreatedDialog} onOpenChange={(open) => !open && handleKeyCreatedDialogClose()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Your API key has been created. Copy this key now — you won&apos;t be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Key Name</Label>
              <p className="text-sm font-medium">{createdKeyName}</p>
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm break-all">
                  {createdKeySecret}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyKey}
                  className="shrink-0"
                >
                  {copied ? (
                    <IconCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <IconCopy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Store this key securely. For security reasons, it cannot be displayed again.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleKeyCreatedDialogClose}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the API key &quot;{keyToDelete?.name}&quot;? This action cannot be undone
              and any applications using this key will lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteApiKey.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteApiKey.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteApiKey.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
