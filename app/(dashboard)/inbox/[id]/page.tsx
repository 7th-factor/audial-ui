'use client';

import React, { Suspense, useState, useMemo, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Phone,
  User,
  FileText,
  BarChart3,
  Activity,
  GraduationCap,
  ListTodo,
  TrendingUp,
  Clock,
  PhoneIncoming,
  PhoneOutgoing,
  RefreshCw,
} from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { getMockCall, type MockCall } from '@/lib/mock-data/calls';
import { CallTranscriptView } from '@/components/calls/call-transcript';
import { CallSidebar, CallMetadataWidget, CustomerInfoWidget, AISummaryWidget, CoachingWidget, ActionItemsWidget, UpsellWidget } from '@/components/calls/call-sidebar';
import { CallsListSidebar, hasActiveFilters } from '@/components/calls/calls-list-sidebar';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Inner component that uses useSearchParams
function CallDetailsContent({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const searchParams = useSearchParams();
  // Handle both Promise and direct params for Next.js 16 compatibility
  // Wrap in Promise if needed, then use React's use hook
  const paramsPromise = 'then' in params && typeof params.then === 'function' 
    ? params 
    : Promise.resolve(params);
  const resolvedParams = use(paramsPromise);
  const callId = resolvedParams.id;

  // Playback state for syncing transcript highlight with audio player
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioControlRef = React.useRef<{ pause: () => void } | null>(null);

  // Determine if sidebar should be open based on URL filter context
  const hasFilterContext = useMemo(() => {
    return hasActiveFilters(searchParams);
  }, [searchParams]);

  const [callsListSidebarOpen, setCallsListSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setCallsListSidebarOpen((prev) => !prev);
  };

  // Get mock call data
  const callData = getMockCall(callId);
  const isLoading = false;

  // Format duration for display
  const formatDuration = (seconds?: number): string => {
    if (seconds === undefined || seconds === null) return '';
    if (seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate duration from transcript segments if not in call data
  const calculatedDuration = useMemo(() => {
    if (callData?.duration) {
      const [mins, secs] = callData.duration.split(':').map(Number);
      return mins * 60 + secs;
    }
    if (callData?.transcript?.segments?.length) {
      return Math.max(...callData.transcript.segments.map((s) => s.endTime || s.startTime || 0));
    }
    return 0;
  }, [callData]);

  // Build page title and description
  const pageTitle = callData?.agentName || 'Call Details';
  const customerDisplayName =
    callData?.customerName ||
    callData?.customerPhone ||
    'Unknown';
  const pageDescription = callData
    ? `${customerDisplayName} • ${callData.duration} • ${callData.status || 'Unknown status'}`
    : 'Loading call details...';

  // Get status badge color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
      case 'ended':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  // Determine if we should show loading state for the main content
  const isCallLoading = isLoading || !callData;

  // Build sidebar widgets
  const sidebarWidgets = useMemo(
    () => [
      {
        id: 'summary',
        title: 'AI Summary',
        icon: <FileText className="h-4 w-4" />,
        content: (
          <AISummaryWidget
            summary={callData?.summary?.callSummary}
            sentiment={callData?.summary?.sentiment}
            keywords={callData?.summary?.keywords}
            topics={callData?.summary?.topics}
            problem={callData?.summary?.problem}
            resolution={callData?.summary?.resolution}
            isLoading={isLoading}
          />
        ),
        defaultOpen: true,
      },
      {
        id: 'metadata',
        title: 'Call Details',
        icon: <Phone className="h-4 w-4" />,
        content: (
          <CallMetadataWidget
            callId={callData?.id}
            duration={calculatedDuration}
            startTime={callData?.startTime}
            provider={callData?.source}
            direction={callData?.direction}
            status={callData?.status}
            isLoading={isLoading}
          />
        ),
      },
      {
        id: 'customer',
        title: 'Customer Info',
        icon: <User className="h-4 w-4" />,
        content: (
          <CustomerInfoWidget
            name={callData?.customerName}
            phone={callData?.customerPhone}
            extractedData={callData?.extractedData}
            isLoading={isLoading}
          />
        ),
      },
      {
        id: 'coaching',
        title: 'Coaching',
        icon: <GraduationCap className="h-4 w-4" />,
        content: (
          <CoachingWidget
            opportunities={callData?.summary?.coaching?.opportunities}
            knowledgeGaps={callData?.summary?.coaching?.knowledgeGaps}
          />
        ),
      },
      {
        id: 'action-items',
        title: 'Action Items',
        icon: <ListTodo className="h-4 w-4" />,
        content: (
          <ActionItemsWidget
            agentCommitments={callData?.summary?.actionItems?.agentCommitments}
            customerActions={callData?.summary?.actionItems?.customerActions}
            followUpRequired={callData?.summary?.actionItems?.followUpRequired}
            followUpTimeframe={callData?.summary?.actionItems?.followUpTimeframe}
          />
        ),
      },
      {
        id: 'upsell',
        title: 'Upsell Opportunity',
        icon: <TrendingUp className="h-4 w-4" />,
        content: (
          <UpsellWidget
            detected={callData?.summary?.upsellOpportunity?.detected ?? false}
            context={callData?.summary?.upsellOpportunity?.context}
          />
        ),
      },
    ],
    [callData, isLoading, calculatedDuration]
  );

  if (!callData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Call Not Found</h3>
          <p className="text-sm text-muted-foreground">The call you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden gap-4 p-4">
      {/* Left Column: Calls List Sidebar */}
      <div className="flex-none h-full overflow-hidden">
        <CallsListSidebar
          currentCallId={callId}
          isOpen={callsListSidebarOpen}
          onToggle={handleSidebarToggle}
          hasFilterContext={hasFilterContext}
        />
      </div>

      {/* Right Column: Header + Main Content */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
        {/* Compact Header */}
        {isCallLoading ? (
          <div className="flex-none pb-6 border-b mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        ) : (
          <div className="flex-none pb-6 border-b mb-6 space-y-4" data-testid="page-header">
            {/* Top row: Call info and actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Call info */}
                <div className="flex items-center gap-4">
                  {/* Direction icon */}
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                    {callData?.direction === 'inbound' ? (
                      <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* Title and metadata */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg font-semibold" data-testid="page-title">
                        {customerDisplayName}
                      </h1>
                      <span className="text-muted-foreground mx-1">→</span>
                      <span className="text-lg text-muted-foreground">{pageTitle}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{callData.duration}</span>
                      </div>
                      {callData?.startTime && (
                        <>
                          <span>•</span>
                          <span>
                            {new Date(callData.startTime).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </>
                      )}
                      {callData?.source && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{callData.source}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn('text-xs', getStatusColor(callData?.status))}
                >
                  {callData?.status || 'Unknown'}
                </Badge>
                <Button
                  disabled={isLoading}
                  size="sm"
                  data-testid="run-analysis-button"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main content with transcript and sidebar - fixed height to enable internal scrolling */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0 overflow-hidden">
          {/* Transcript area - takes remaining space */}
          <ResizablePanel
            defaultSize={70}
            minSize={50}
            className="flex flex-col min-w-0 min-h-0 overflow-hidden pr-2"
          >
            {isCallLoading ? (
              <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading transcript...</span>
              </div>
            ) : (
              <div className="flex-1 min-h-0 max-h-[85vh] overflow-hidden">
                <CallTranscriptView
                  callData={callData}
                  isLoading={isLoading}
                  currentPlaybackTime={isPlaying ? currentPlaybackTime : undefined}
                  onPause={() => audioControlRef.current?.pause()}
                />
              </div>
            )}
          </ResizablePanel>

          {/* Right sidebar with collapsible widgets */}
          <ResizablePanel
            defaultSize={30}
            minSize={25}
            maxSize={50}
            className="min-w-0 min-h-0 overflow-hidden pl-2"
          >
            <CallSidebar widgets={sidebarWidgets} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function CallDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <CallDetailsContent params={params} />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';

