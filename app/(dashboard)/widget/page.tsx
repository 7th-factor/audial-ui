'use client'

import { IconApps } from '@tabler/icons-react'
import { PageLayout } from '@/components/page-layout'
import { WebWidgetForm } from '@/components/widget-config'
import { useGetWidgetConfigByAgent } from '@/lib/features/widget'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'

export default function WidgetPage() {
  const searchParams = useSearchParams()
  // For now, use query param or a default agent ID
  // TODO: Get default agent from account context
  const agentId = searchParams.get('agentId') || ''

  const {
    data: widgetConfig,
    isLoading,
    isError,
    refetch,
  } = useGetWidgetConfigByAgent(agentId)

  // Handle form changes for live preview
  const handleFormChange = (data: unknown) => {
    // TODO: Update live preview
    console.log('Form changed:', data)
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
      <div className="px-4 lg:px-6">
        <WebWidgetForm
          widgetConfig={widgetConfig}
          agentId={agentId}
          onFormChange={handleFormChange}
          hideHeader
        />
      </div>
    </PageLayout>
  )
}
