'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Globe, Bot } from 'lucide-react'
import { KeyType, type CreateApiKeyRequest } from '@/lib/features/api-keys/types'

interface ApiKeyFormProps {
  keyType: KeyType
  onSubmit: (payload: CreateApiKeyRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ApiKeyForm({ keyType, onSubmit, onCancel, isLoading }: ApiKeyFormProps) {
  const [formData, setFormData] = useState<CreateApiKeyRequest>({
    type: keyType,
    name: '',
    description: '',
    allowedOrigins: [],
    allowedAgentIds: [],
    allowCustomAgent: false,
  })

  const [newOrigin, setNewOrigin] = useState('')
  const [newAgentId, setNewAgentId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name?.trim()) return

    const payload: CreateApiKeyRequest = {
      type: formData.type,
      name: formData.name,
      description: formData.description || null,
    }

    if (keyType === KeyType.PUBLIC) {
      payload.allowedOrigins = formData.allowedOrigins?.length ? formData.allowedOrigins : null
      payload.allowedAgentIds = formData.allowedAgentIds?.length ? formData.allowedAgentIds : null
      payload.allowCustomAgent = formData.allowCustomAgent
    }

    onSubmit(payload)
  }

  const addOrigin = () => {
    if (newOrigin.trim() && !formData.allowedOrigins?.includes(newOrigin.trim())) {
      setFormData((prev) => ({
        ...prev,
        allowedOrigins: [...(prev.allowedOrigins || []), newOrigin.trim()],
      }))
      setNewOrigin('')
    }
  }

  const removeOrigin = (origin: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedOrigins: prev.allowedOrigins?.filter((o) => o !== origin),
    }))
  }

  const addAgentId = () => {
    if (newAgentId.trim() && !formData.allowedAgentIds?.includes(newAgentId.trim())) {
      setFormData((prev) => ({
        ...prev,
        allowedAgentIds: [...(prev.allowedAgentIds || []), newAgentId.trim()],
      }))
      setNewAgentId('')
    }
  }

  const removeAgentId = (agentId: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedAgentIds: prev.allowedAgentIds?.filter((id) => id !== agentId),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Key Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter a descriptive name for your API key"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Optional description for this API key"
            className="mt-1"
            rows={3}
          />
        </div>

        {keyType === KeyType.PUBLIC && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Allowed Origins
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  placeholder="https://example.com"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addOrigin())}
                />
                <Button type="button" onClick={addOrigin} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.allowedOrigins && formData.allowedOrigins.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.allowedOrigins.map((origin) => (
                    <Badge key={origin} variant="secondary" className="flex items-center gap-1">
                      {origin}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeOrigin(origin)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Allowed Agent IDs (Optional)
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newAgentId}
                  onChange={(e) => setNewAgentId(e.target.value)}
                  placeholder="agent-uuid-here"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAgentId())}
                />
                <Button type="button" onClick={addAgentId} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.allowedAgentIds && formData.allowedAgentIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.allowedAgentIds.map((agentId) => (
                    <Badge key={agentId} variant="secondary" className="flex items-center gap-1">
                      {agentId}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeAgentId(agentId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="allowCustomAgent" className="text-sm font-medium">
                  Allow Custom Agents
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable this key to work with custom agents not in the allowed list.
                </p>
              </div>
              <Switch
                id="allowCustomAgent"
                checked={formData.allowCustomAgent || false}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, allowCustomAgent: checked }))
                }
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formData.name?.trim() || isLoading}>
          {isLoading ? 'Creating...' : 'Create API Key'}
        </Button>
      </div>
    </form>
  )
}
