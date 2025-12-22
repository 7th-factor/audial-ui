'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import {
  type WidgetConfigPayload,
  type WidgetConfig,
  widgetConfigPayloadSchema,
} from '@/lib/features/widget/types'
import { useUpdateWidgetConfig } from '@/lib/features/widget'
import { LauncherStyleSection } from './launcher-style-section'
import { EmbedCodeSection } from './embed-code-section'
import { FloatingSaveBar } from './floating-save-bar'

interface WebWidgetFormProps {
  widgetConfig: WidgetConfig
  agentId?: string
  onFormChange?: (data: WidgetConfigPayload) => void
  hideHeader?: boolean
  hideEmbedCode?: boolean
}

export function WebWidgetForm({
  widgetConfig,
  agentId,
  onFormChange,
  hideHeader = false,
  hideEmbedCode = false,
}: WebWidgetFormProps) {
  const { mutateAsync: updateWidgetConfig } = useUpdateWidgetConfig({
    widgetConfigId: widgetConfig.id,
    agentId,
  })

  const form = useForm<WidgetConfigPayload>({
    resolver: zodResolver(widgetConfigPayloadSchema),
    defaultValues: widgetConfig,
    mode: 'onChange',
  })

  useEffect(() => {
    if (!onFormChange) return

    const subscription = form.watch((values, { type, name }) => {
      // if type is `change` or `valueChange` or name is defined, then trigger the onFormChange (only if the form is valid)
      if ((type === 'change' || name) && form.formState.isValid) {
        onFormChange(values as WidgetConfigPayload)
      }
    })

    return () => subscription.unsubscribe()
  }, [form, onFormChange])

  const onSubmit = async (data: WidgetConfigPayload) => {
    try {
      const updatedWidgetConfig = await updateWidgetConfig(data)
      toast.success('Widget configuration saved')
      form.reset(updatedWidgetConfig)
    } catch (error) {
      toast.error('Failed to save configuration. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {!hideHeader && (
          <header className="mb-6 space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Web Widget</h2>
            <p className="text-muted-foreground">
              Manage your web widget settings like embed code, launcher interface, etc.
            </p>
          </header>
        )}
        <div className="space-y-6">
          {!hideEmbedCode && <EmbedCodeSection agentId={agentId} />}
          <LauncherStyleSection />
        </div>

        <FloatingSaveBar
          onResetCallback={() => {
            // trigger onFormChange on reset, because .reset() doesn't trigger onChange
            onFormChange?.({
              ...widgetConfig,
            })
          }}
        />
      </form>
    </Form>
  )
}
