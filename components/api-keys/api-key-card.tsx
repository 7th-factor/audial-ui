'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Copy,
  MoreHorizontal,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Activity,
  Globe,
  Bot,
  Shield,
  KeyRound,
  Info,
  ListChecks,
  Slash,
} from 'lucide-react'
import {
  type ApiKey,
  type PrivateApiKey,
  type PublicApiKey,
  KeyType,
} from '@/lib/features/api-keys/types'

interface ApiKeyCardProps {
  apiKey: ApiKey
  onCopy: (textToCopy: string, copiedItemId: string, itemType: 'secret' | 'id') => void
  onDelete: (key: ApiKey) => void
  copiedItemId: string | null
}

export function ApiKeyCard({ apiKey, onCopy, onDelete, copiedItemId }: ApiKeyCardProps) {
  const [isSecretVisible, setIsSecretVisible] = useState(false)

  const formatDate = (date: string | null) => {
    if (!date) return 'Never'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const maskKey = (key: string) => {
    if (!key) return ''
    if (key.length <= 8) return '••••••••'
    const maskedPartLength = Math.min(24, Math.max(16, key.length - 8))
    return `${key.slice(0, 4)}${'•'.repeat(maskedPartLength)}${key.slice(-4)}`
  }

  const isPrivateKey = (key: ApiKey): key is PrivateApiKey => key.type === KeyType.PRIVATE
  const isPublicKey = (key: ApiKey): key is PublicApiKey => key.type === KeyType.PUBLIC

  const KeyIcon = isPrivateKey(apiKey) ? Shield : Globe
  const iconColor = isPrivateKey(apiKey)
    ? 'text-purple-500 dark:text-purple-400'
    : 'text-blue-500 dark:text-blue-400'
  const keyTypeName = isPrivateKey(apiKey) ? 'Private' : 'Public'

  return (
    <Card className="transition-all duration-200 hover:shadow-md border flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center ${iconColor}`}
            >
              <KeyIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold leading-tight">
                {apiKey.name}
              </CardTitle>
              <CardDescription className="text-xs leading-tight">
                {apiKey.description || 'No description'}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <Badge
              variant="outline"
              className={`text-xs px-1.5 py-0.5 ${
                isPrivateKey(apiKey)
                  ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                  : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              }`}
            >
              {keyTypeName}
            </Badge>
            <Badge
              variant={apiKey.active ? 'default' : 'secondary'}
              className={`text-xs px-1.5 py-0.5 ${
                apiKey.active
                  ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300 border border-green-200 dark:border-green-700'
                  : 'bg-muted text-muted-foreground border'
              }`}
            >
              {apiKey.active ? 'Active' : 'Inactive'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isPublicKey(apiKey) && (
                  <DropdownMenuItem onClick={() => onCopy(apiKey.id, apiKey.id, 'secret')}>
                    <KeyRound className="h-3.5 w-3.5 mr-2" />
                    {copiedItemId === apiKey.id ? 'Secret Copied!' : 'Copy Secret Key'}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onCopy(apiKey.id, `${apiKey.id}-id`, 'id')}>
                  <Info className="h-3.5 w-3.5 mr-2" />
                  {copiedItemId === `${apiKey.id}-id` ? 'ID Copied!' : 'Copy Key ID'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(apiKey)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  Delete Key
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm flex-grow">
        {/* Public Key Secret Display */}
        {isPublicKey(apiKey) && (
          <div className="space-y-1.5 p-2.5 rounded-md border bg-background">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Secret Key (Public Key ID)</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSecretVisible(!isSecretVisible)}
                className="h-6 px-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {isSecretVisible ? (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" /> Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 mr-1" /> Show
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 rounded border text-xs font-mono truncate bg-muted">
                {isSecretVisible ? apiKey.id : maskKey(apiKey.id)}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onCopy(apiKey.id, apiKey.id, 'secret')}
                className="h-8 w-8 shrink-0"
                aria-label="Copy Secret Key"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Private Key Information Display */}
        {isPrivateKey(apiKey) && (
          <div className="space-y-1.5 p-2.5 rounded-md border bg-background">
            <Label className="text-xs font-medium text-muted-foreground">
              Key Identifier (Private Key ID)
            </Label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 rounded border text-xs font-mono truncate bg-muted">
                {apiKey.id}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onCopy(apiKey.id, `${apiKey.id}-id`, 'id')}
                className="h-8 w-8 shrink-0"
                aria-label="Copy Key ID"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-xs text-sky-600 dark:text-sky-400 pt-1">
              The actual secret for this private key was shown once upon creation.
            </p>
          </div>
        )}

        {/* Public Key Configuration Details */}
        {isPublicKey(apiKey) && (
          <div className="pt-2.5 space-y-2">
            {(apiKey.allowedOrigins && apiKey.allowedOrigins.length > 0) ||
            apiKey.allowCustomAgent !== null ? (
              <>
                <h4 className="text-xs font-semibold text-foreground flex items-center">
                  <ListChecks className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  Restrictions
                </h4>
                {apiKey.allowedOrigins && apiKey.allowedOrigins.length > 0 && (
                  <div className="pl-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                      <Globe className="h-3 w-3" /> Allowed Origins:
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.allowedOrigins.map((origin, index) => (
                        <Badge
                          key={`${origin}-${index}`}
                          variant="outline"
                          className="text-xs font-normal px-1.5 py-0.5"
                        >
                          {origin}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pl-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                    <Bot className="h-3 w-3" /> Custom Agents:
                  </Label>
                  <Badge
                    variant="outline"
                    className={`text-xs font-normal px-1.5 py-0.5 ${
                      apiKey.allowCustomAgent
                        ? 'text-green-700 dark:text-green-400 border-green-300 dark:border-green-600'
                        : 'text-red-700 dark:text-red-400 border-red-300 dark:border-red-600'
                    }`}
                  >
                    {apiKey.allowCustomAgent ? 'Allowed' : 'Not Allowed'}
                  </Badge>
                </div>
              </>
            ) : (
              <div className="flex items-center text-xs text-muted-foreground italic pl-1">
                <Slash className="h-3.5 w-3.5 mr-1.5" /> No specific restrictions configured.
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Common Metadata Footer */}
      <div className="px-6 py-3 border-t mt-auto">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          <div className="flex items-center space-x-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate" title={formatDate(apiKey.createdAt)}>
              Created: {formatDate(apiKey.createdAt)}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-muted-foreground">
            <Activity className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate" title={formatDate(apiKey.lastUsedAt)}>
              Last Used: {formatDate(apiKey.lastUsedAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
