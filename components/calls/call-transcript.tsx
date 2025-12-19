'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TranscriptHeader } from './transcript-header';
import { TranscriptContent } from './transcript-content';
import { TranscriptSkeleton } from './transcript-skeleton';
import type { TranscriptMessage, TranscriptEvent } from './transcript-types';
import type { MockCall } from '@/lib/mock-data/calls';

interface CallTranscriptViewProps {
  callData?: MockCall | null;
  isLoading?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  /** Current playback time in seconds, used to highlight active segment */
  currentPlaybackTime?: number;
  /** Callback to pause audio playback */
  onPause?: () => void;
}

/**
 * CallTranscriptView - Displays call transcript
 */
export function CallTranscriptView({
  callData,
  isLoading,
  showHeader = true,
  showFooter = false,
  currentPlaybackTime,
  onPause,
}: CallTranscriptViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Extract events from call data
  const events = useMemo(() => {
    const eventList: TranscriptEvent[] = [];

    // Agent start event
    if (callData?.startTime) {
      eventList.push({
        id: 'evt-start',
        timestamp: 0,
        type: 'agent_start',
        agentName: callData.agentName || 'Agent',
        agentType: 'ai',
        agentRole: 'Customer Service',
      });
    }

    return eventList.sort((a, b) => a.timestamp - b.timestamp);
  }, [callData]);

  // Convert segments to messages format
  const messages = useMemo(() => {
    if (!callData?.transcript?.segments) return [];

    const startTime = callData.startTime
      ? new Date(callData.startTime)
      : new Date(Date.now() - (callData?.duration ? parseInt(callData.duration.split(':')[0]) * 60 : 0) * 1000);

    return callData.transcript.segments.map((segment, index) => {
      const isAgent = segment.speaker?.name === callData.agentName || segment.speaker?.id?.includes('agent');
      
      const timestamp =
        segment.startTime !== undefined
          ? new Date(startTime.getTime() + segment.startTime * 1000)
          : new Date(startTime.getTime() + index * 5000);

      return {
        id: `msg-${index}`,
        role: isAgent ? ('assistant' as const) : ('user' as const),
        content: segment.text,
        timestamp,
        startTime: segment.startTime,
        confidence: segment.confidence,
        speakerName: segment.speaker?.name || (isAgent ? callData.agentName : callData.customerName),
        speakerId: segment.speaker?.id || '',
      } as TranscriptMessage;
    });
  }, [callData]);

  // Count matches in messages
  const totalMatches = useMemo(() => {
    if (!searchQuery) return 0;
    return messages.filter((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
      .length;
  }, [messages, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentMatchIndex(0);
  };

  const handlePrevMatch = () => {
    if (currentMatchIndex > 0) {
      setCurrentMatchIndex(currentMatchIndex - 1);
    }
  };

  const handleNextMatch = () => {
    if (currentMatchIndex < totalMatches - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };

  // Format duration
  const formatDuration = (duration?: string): string => {
    if (!duration) return '0s';
    return duration;
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

  const duration = formatDuration(callData?.duration);

  if (isLoading) {
    return <TranscriptSkeleton />;
  }

  if (!callData?.transcript || !callData.transcript.segments || callData.transcript.segments.length === 0) {
    return (
      <Card className="w-full h-full flex flex-col border shadow-sm py-0 gap-0">
        {showHeader && (
          <TranscriptHeader
            searchQuery={searchQuery}
            totalMatches={totalMatches}
            currentMatchIndex={currentMatchIndex}
            onSearchChange={handleSearch}
            onPrevMatch={handlePrevMatch}
            onNextMatch={handleNextMatch}
            messageCount={messages.length}
            eventCount={events.length}
            duration={duration}
            status={callData?.status}
          />
        )}
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3 mb-4">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No Transcript Available</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            This call does not have a transcript available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full max-h-[85vh] flex flex-col border shadow-sm py-0 gap-0 overflow-hidden">
      {showHeader && (
        <TranscriptHeader
          searchQuery={searchQuery}
          totalMatches={totalMatches}
          currentMatchIndex={currentMatchIndex}
          onSearchChange={handleSearch}
          onPrevMatch={handlePrevMatch}
          onNextMatch={handleNextMatch}
          messageCount={messages.length}
          eventCount={events.length}
          duration={duration}
          status={callData?.status}
        />
      )}
      <CardContent className="flex-1 relative flex flex-col min-h-0 overflow-hidden p-0">
        {/* Transcript with custom scrollbar - ensures scrolling works */}
        <div className="flex-1 min-h-0 overflow-y-auto pl-6 py-4 pb-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <TranscriptContent
            messages={messages}
            events={events}
            searchQuery={searchQuery}
            currentMatchIndex={currentMatchIndex}
            showTimestamps={true}
            showEvents={true}
            startTime={
              callData?.startTime
                ? new Date(callData.startTime)
                : new Date(Date.now() - calculatedDuration * 1000)
            }
            currentPlaybackTime={currentPlaybackTime}
            onPause={onPause}
          />
        </div>

        {/* Sticky footer with call end indicator */}
        <div className="flex-none border-t bg-muted/30 px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={cn(
                    'h-4 w-4',
                    callData?.status === 'completed' ? 'text-green-600' : 'text-muted-foreground'
                  )}
                />
                <span className="text-muted-foreground">
                  {callData?.status === 'completed'
                    ? 'Call Ended'
                    : `Status: ${callData?.status || 'Unknown'}`}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{messages.length} messages</span>
              {events.length > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{events.length} events</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{duration}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
