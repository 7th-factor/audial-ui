'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Globe, Shield, KeyRound, Copy, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { type ApiKey, KeyType, type CreateApiKeyRequest } from '@/lib/features/api-keys/types'
import { ApiKeyCard } from './api-key-card'
import { ApiKeyForm } from './api-key-form'

interface ApiKeysSectionProps {
  title: string
  description: string
  keyType: KeyType
  keys: ApiKey[]
  onCreateKey: (
    payload: CreateApiKeyRequest,
    callbacks: { onSuccess: (newlyCreatedKeySecret: string | null) => void; onError: () => void }
  ) => void
  onDeleteKey: (key: ApiKey) => void
  onCopyKey: (textToCopy: string, copiedItemId: string, itemType: 'secret' | 'id') => void
  copiedItemId: string | null
  isCreating?: boolean
}

export function ApiKeysSection({
  title,
  description,
  keyType,
  keys,
  onCreateKey,
  onDeleteKey,
  onCopyKey,
  copiedItemId,
  isCreating,
}: ApiKeysSectionProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newlyCreatedPrivateSecret, setNewlyCreatedPrivateSecret] = useState<string | null>(null)
  const [isSecretInDialogVisible, setIsSecretInDialogVisible] = useState(false)

  const handleCreateKeySubmit = (payload: CreateApiKeyRequest) => {
    onCreateKey(payload, {
      onSuccess: (newlyCreatedKeySecret: string | null) => {
        if (keyType === KeyType.PRIVATE && newlyCreatedKeySecret) {
          setNewlyCreatedPrivateSecret(newlyCreatedKeySecret)
        } else {
          closeCreateDialog()
        }
      },
      onError: () => {
        console.error('Error creating key in section')
      },
    })
  }

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false)
    setNewlyCreatedPrivateSecret(null)
    setIsSecretInDialogVisible(false)
  }

  const SectionIcon = keyType === KeyType.PUBLIC ? Globe : Shield
  const iconColor =
    keyType === KeyType.PUBLIC
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-purple-600 dark:text-purple-400'

  const emptyStateMessages = {
    [KeyType.PRIVATE]: {
      title: 'No Private Keys Yet',
      description:
        'Private keys are used for server-to-server communication. Their secret value is shown only once upon creation.',
      buttonText: 'Create Private Key',
    },
    [KeyType.PUBLIC]: {
      title: 'No Public Keys Yet',
      description:
        'Public keys are used in client-side applications. Their ID is the secret key, which can be revealed.',
      buttonText: 'Create Public Key',
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SectionIcon className={`h-7 w-7 ${iconColor}`} />
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            if (!open) closeCreateDialog()
            else setIsCreateDialogOpen(open)
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setNewlyCreatedPrivateSecret(null)
                setIsSecretInDialogVisible(false)
                setIsCreateDialogOpen(true)
              }}
              className="self-start sm:self-center min-w-[180px]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create {keyType === KeyType.PUBLIC ? 'Public' : 'Private'} Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            {!newlyCreatedPrivateSecret ? (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <SectionIcon className={`h-5 w-5 ${iconColor}`} />
                    Create {keyType === KeyType.PUBLIC ? 'Public' : 'Private'} API Key
                  </DialogTitle>
                  <DialogDescription>
                    {keyType === KeyType.PUBLIC
                      ? 'Configure your public API key. The key ID itself will be the secret.'
                      : 'Configure your private API key. The secret will be shown once after creation.'}
                  </DialogDescription>
                </DialogHeader>
                <ApiKeyForm
                  keyType={keyType}
                  onSubmit={handleCreateKeySubmit}
                  onCancel={closeCreateDialog}
                  isLoading={isCreating}
                />
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Private API Key Created!
                  </DialogTitle>
                  <DialogDescription>
                    Your new Private API Key secret is shown below. This is the{' '}
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      only time
                    </span>{' '}
                    you will see this secret.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-5">
                  <div className="p-1 rounded-lg border">
                    <div className="flex items-center justify-between gap-2 p-2">
                      <code className="flex-1 text-sm font-mono break-all">
                        {isSecretInDialogVisible
                          ? newlyCreatedPrivateSecret
                          : '•'.repeat(
                              newlyCreatedPrivateSecret.length > 32
                                ? 32
                                : newlyCreatedPrivateSecret.length
                            )}
                      </code>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsSecretInDialogVisible(!isSecretInDialogVisible)}
                          aria-label={isSecretInDialogVisible ? 'Hide secret' : 'Show secret'}
                        >
                          {isSecretInDialogVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            onCopyKey(newlyCreatedPrivateSecret, 'new-private-secret', 'secret')
                          }
                          aria-label="Copy Private Key Secret"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-md border border-amber-500/50 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                    <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-amber-500" />
                    <p className="text-sm">
                      Store this secret in a safe place. You will not be able to retrieve it again
                      after closing this dialog.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={closeCreateDialog} className="w-full">
                    I&apos;ve saved my secret key
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {keys.length === 0 ? (
        <Card className="border-2 border-dashed bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div
              className={`w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-5 ${iconColor}`}
            >
              <KeyRound className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{emptyStateMessages[keyType].title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {emptyStateMessages[keyType].description}
            </p>
            <Button
              onClick={() => {
                setNewlyCreatedPrivateSecret(null)
                setIsSecretInDialogVisible(false)
                setIsCreateDialogOpen(true)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {emptyStateMessages[keyType].buttonText}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
          {keys.map((apiKey) => (
            <ApiKeyCard
              key={apiKey.id}
              apiKey={apiKey}
              onCopy={onCopyKey}
              onDelete={onDeleteKey}
              copiedItemId={copiedItemId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
