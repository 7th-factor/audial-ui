'use client'

import { useEffect, useState } from 'react'
import { IconApps } from '@tabler/icons-react'
import { PageLayout } from '@/components/page-layout'
import { WebWidgetForm } from '@/components/widget-config'
import { useGetWidgetConfigByAgent } from '@/lib/features/widget'
import type { WidgetConfig, WidgetConfigPayload } from '@/lib/features/widget'
import { useDefaultPublicApiKey } from '@/lib/features/api-keys'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'

const CONTAINER_ID = 'audial-widget-container'
const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

const generateSnippet = (agentId: string, publicApiKey: string, containerId: string) => `
  (function(d, t) {
    var v = d.createElement(t);
    var s = d.getElementsByTagName(t)[0];
    v.onload = function () {
      window.audial.loadWidget({
        agentId: '${agentId}',
        apiKey: '${publicApiKey}',
        baseUrl: '${BASE_BACKEND_URL}',
        options: {
          containerId: '${containerId}',
          previewMode: true,
          defaultOpen: true,
          debug: true
        }
      });
    };
    v.type = "module";
    v.src = window.location.origin + "/widget/bundle.mjs";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
`

export default function WidgetPage() {
  const searchParams = useSearchParams()
  // For now, use query param or a default agent ID
  // TODO: Get default agent from account context
  const agentId = searchParams.get('agentId') || ''

  const [isContainerLoaded, setIsContainerLoaded] = useState(false)

  const {
    data: widgetConfig,
    isLoading,
    isError,
    refetch,
  } = useGetWidgetConfigByAgent(agentId)

  const { data: defaultPublicApiKey } = useDefaultPublicApiKey()

  const handleContainerRef = (node: HTMLDivElement | null) => {
    if (node) {
      setIsContainerLoaded(true)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!defaultPublicApiKey?.id) return
    if (!isContainerLoaded) return
    if (!agentId) return

    const container = document.getElementById(CONTAINER_ID)
    if (!container) return

    const code = generateSnippet(agentId, defaultPublicApiKey.id, CONTAINER_ID)
    eval(code)
  }, [isContainerLoaded, defaultPublicApiKey?.id, agentId])

  const handleDispatchAction = (action: 'update-config', payload: Partial<WidgetConfig>) => {
    const audial = (window as { audial?: { dispatchAction: (action: string, payload: unknown) => void } }).audial
    if (!audial) return
    audial.dispatchAction(action, payload)
  }

  useEffect(() => {
    if (!widgetConfig) return
    handleDispatchAction('update-config', widgetConfig)
  }, [widgetConfig])

  const handleFormChange = (data: WidgetConfigPayload) => {
    handleDispatchAction('update-config', data)
  }

  if (!agentId) {
    return (
      <PageLayout
        title="Web Widget"
        description="Configure your web widget appearance and embed code."
        icon={IconApps}
      >
        <div className="px-4 lg:px-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Agent Selected</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Please select an agent to configure the web widget. You can specify an agent
                by adding ?agentId=your-agent-id to the URL.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/agent'}>
                Go to Agent Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }

  if (isLoading) {
    return (
      <PageLayout
        title="Web Widget"
        description="Configure your web widget appearance and embed code."
        icon={IconApps}
      >
        <div className="px-4 lg:px-6 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }

  if (isError || !widgetConfig) {
    return (
      <PageLayout
        title="Web Widget"
        description="Configure your web widget appearance and embed code."
        icon={IconApps}
      >
        <div className="px-4 lg:px-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to Load Widget Config</h3>
              <p className="text-muted-foreground mb-4">
                There was an error loading the widget configuration. Please try again.
              </p>
              <Button onClick={() => refetch()}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Web Widget"
      description="Configure your web widget appearance and embed code."
      icon={IconApps}
    >
      <div className="px-4 lg:px-6 flex flex-col xl:flex-row gap-10 lg:gap-16">
        <div className="flex-1">
          <WebWidgetForm
            widgetConfig={widgetConfig}
            agentId={agentId}
            onFormChange={handleFormChange}
            hideHeader
          />
        </div>
        <div className="min-w-[380px]">
          <div className="border rounded-lg xl:sticky xl:top-6">
            <div className="px-4 py-4 border-b">
              <h3 className="text-[15px] font-semibold">Widget Preview</h3>
              <p className="text-sm text-muted-foreground">
                Test your widget configuration in real-time
              </p>
            </div>
            <div className="flex items-center justify-center min-h-[500px]">
              <div
                id={CONTAINER_ID}
                className="min-w-[380px]"
                ref={handleContainerRef}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
