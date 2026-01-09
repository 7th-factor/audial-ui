'use client';

import React, { Suspense, useState, useMemo, use } from 'react';
import {
  FileText,
  Phone,
  User,
  GraduationCap,
  ListTodo,
  TrendingUp,
  RefreshCw,
  BarChart3,
} from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useCall, type CallDetail } from '@/lib/api';
import type { CallDisplayData } from '@/components/calls/types';
import { CallTranscriptView } from '@/components/calls/call-transcript';
import {
  CallSidebar,
  CallMetadataWidget,
  CustomerInfoWidget,
  AISummaryWidget,
  CoachingWidget,
  ActionItemsWidget,
  UpsellWidget,
} from '@/components/calls/call-sidebar';
import { CallHeader } from '@/components/calls/call-header';
import { ScoreCardWidget } from '@/components/calls/scorecard-widget';

// Transform API CallDetail to CallDisplayData format for UI components
function transformCallDetailToDisplayData(call: CallDetail): CallDisplayData {
  const customerName = call.customer
    ? [call.customer.first_name, call.customer.last_name].filter(Boolean).join(' ') || 'Unknown'
    : 'Unknown';

  const durationMins = call.durationSecs ? Math.floor(call.durationSecs / 60) : 0;
  const durationSecs = call.durationSecs ? call.durationSecs % 60 : 0;
  const duration = `${durationMins}:${durationSecs.toString().padStart(2, '0')}`;

  return {
    id: call.id,
    callId: `#${call.id.slice(0, 8).toUpperCase()}`,
    agent: call.agentSettings?.name || 'AI Assistant',
    customer: call.customerPhone || call.customer?.phone_number || 'Unknown',
    duration,
    score: '0',
    date: call.createdAt,
    category: 'support',
    source: call.agentPhone?.provider as CallDisplayData['source'] || 'Unknown',
    origin: 'real',
    assistantName: call.agentSettings?.name || 'AI Assistant',
    agentName: call.agentSettings?.name || 'AI Assistant',
    customerName,
    customerPhone: call.customerPhone || call.customer?.phone_number || undefined,
    direction: call.type === 'inboundPhoneCall' ? 'inbound' : 'outbound',
    status: call.status,
    startTime: call.startedAt || call.createdAt,
    recordingUrl: call.audioUrl || undefined,
    transcript: call.messages?.length ? {
      segments: call.messages.map((msg, idx) => ({
        text: msg.content,
        startTime: msg.start_time,
        endTime: msg.end_time,
        speaker: {
          id: msg.sender === 'assistant' ? 'agent' : 'user',
          name: msg.sender === 'assistant' ? (call.agentSettings?.name || 'AI Assistant') : customerName,
        },
      })),
    } : undefined,
    summary: call.analysis ? {
      callSummary: call.analysis.summary,
      keywords: call.analysis.keywords,
    } : undefined,
  };
}

// Inner component that handles call details
function CallDetailsContent({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and direct params for Next.js 16 compatibility
  const paramsPromise =
    'then' in params && typeof params.then === 'function'
      ? params
      : Promise.resolve(params);
  const resolvedParams = use(paramsPromise);
  const callId = resolvedParams.id;

  // Playback state for syncing transcript highlight with audio player
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioControlRef = React.useRef<{ pause: () => void } | null>(null);

  // Fetch call data from API
  const { data: apiCallData, isLoading, error } = useCall(callId);

  // Transform API data to CallDisplayData format for UI components
  const callData = useMemo(() => {
    if (!apiCallData) return null;
    return transformCallDetailToDisplayData(apiCallData);
  }, [apiCallData]);

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

  // Build sidebar widgets
  const sidebarWidgets = useMemo(
    () => [
      {
        id: 'scorecard',
        title: 'Scorecard',
        icon: <BarChart3 className="h-4 w-4" />,
        content: (
          <ScoreCardWidget
            scorecard={callData?.scorecard}
            onRunAgain={() => {
              console.log('Run analysis for call:', callId);
            }}
          />
        ),
        defaultOpen: true,
      },
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Error or not found state
  if (error || !callData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Call Not Found</h3>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "The call you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
      {/* Header */}
      <CallHeader
        call={callData}
        isLoading={isLoading}
        onRunAnalysis={() => {
          // TODO: Implement run analysis
          console.log('Run analysis for call:', callId);
        }}
      />

      {/* Resizable Panels: Transcript + Right Sidebar */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0 overflow-hidden">
        {/* Transcript Panel */}
        <ResizablePanel
          defaultSize={70}
          minSize={50}
          className="flex flex-col min-w-0 min-h-0 overflow-hidden pr-2"
        >
          <div className="flex-1 min-h-0 max-h-full overflow-hidden">
            <CallTranscriptView
              callData={callData}
              isLoading={isLoading}
              currentPlaybackTime={isPlaying ? currentPlaybackTime : undefined}
              onPause={() => audioControlRef.current?.pause()}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="mx-2" />

        {/* Right Sidebar with Widgets */}
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
