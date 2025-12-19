'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Phone, Pause } from 'lucide-react';
import type { TranscriptMessage, TranscriptEvent } from './transcript-types';
import { EventItem } from './transcript-event-item';

interface TranscriptContentProps {
  messages: TranscriptMessage[];
  events?: TranscriptEvent[];
  searchQuery?: string;
  currentMatchIndex?: number;
  showTimestamps?: boolean;
  showEvents?: boolean;
  startTime?: Date;
  /** Current playback time in seconds, used to highlight active segment */
  currentPlaybackTime?: number;
  /** Callback to pause audio playback */
  onPause?: () => void;
}

export function TranscriptContent({
  messages,
  events = [],
  searchQuery = '',
  currentMatchIndex = 0,
  showTimestamps = true,
  showEvents = true,
  startTime,
  currentPlaybackTime,
  onPause,
}: TranscriptContentProps) {
  // Refs for auto-scrolling to active message
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastScrolledMessageId = useRef<string | null>(null);
  // Find matching message indices
  const matchingIndices = useMemo(() => {
    if (!searchQuery) return [];
    return messages
      .map((m, i) => (m.content.toLowerCase().includes(searchQuery.toLowerCase()) ? i : -1))
      .filter((i) => i !== -1);
  }, [messages, searchQuery]);

  const formatTimeFromSeconds = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Merge messages and events, sorted by timestamp
  const mergedItems = useMemo(() => {
    const items: Array<{
      type: 'message' | 'event';
      data: TranscriptMessage | TranscriptEvent;
      sortTime: number;
    }> = [];

    // Add messages
    messages.forEach((msg) => {
      items.push({
        type: 'message',
        data: msg,
        sortTime: msg.startTime || 0,
      });
    });

    // Add events
    if (showEvents) {
      events.forEach((evt) => {
        items.push({
          type: 'event',
          data: evt,
          sortTime: evt.timestamp,
        });
      });
    }

    return items.sort((a, b) => a.sortTime - b.sortTime);
  }, [messages, events, showEvents]);

  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const toggleEventExpanded = (eventId: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  // Find the currently active message based on playback time
  const activeMessageId = useMemo(() => {
    if (currentPlaybackTime === undefined) return null;

    // Find message where currentPlaybackTime falls within its time range
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const msgStartTime = msg.startTime ?? 0;
      // Check if current time is past this message's start time
      if (currentPlaybackTime >= msgStartTime) {
        return msg.id;
      }
    }
    return null;
  }, [messages, currentPlaybackTime]);

  // Auto-scroll to active message only when it's outside the visible zone
  // Uses scrollTop on container to avoid scrolling the entire page
  useEffect(() => {
    if (!activeMessageId || activeMessageId === lastScrolledMessageId.current) {
      return;
    }

    const element = messageRefs.current.get(activeMessageId);
    if (!element) return;

    // Find the scrollable container (parent with overflow-y-auto)
    const scrollContainer = element.closest('[class*="overflow-y-auto"]') as HTMLElement | null;
    if (!scrollContainer) {
      lastScrolledMessageId.current = activeMessageId;
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Calculate element position relative to the scroll container
    const elementTopInContainer = elementRect.top - containerRect.top;
    const elementBottomInContainer = elementRect.bottom - containerRect.top;

    // Define a "safe zone" - top 20% and bottom 30% are trigger zones
    const topThreshold = containerRect.height * 0.2;
    const bottomThreshold = containerRect.height * 0.7;

    const isAboveViewport = elementTopInContainer < topThreshold;
    const isBelowViewport = elementBottomInContainer > bottomThreshold;

    if (isAboveViewport || isBelowViewport) {
      // Calculate target scroll position to put element at ~30% from top
      const targetPosition =
        scrollContainer.scrollTop + elementTopInContainer - containerRect.height * 0.3;

      scrollContainer.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    }

    lastScrolledMessageId.current = activeMessageId;
  }, [activeMessageId]);

  // Ref callback for storing message element refs
  const setMessageRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      messageRefs.current.set(id, element);
    } else {
      messageRefs.current.delete(id);
    }
  };

  return (
    <div className="space-y-4 pr-6">
      {/* Call Started Badge */}
      <div className="flex gap-3 pt-4">
        {showTimestamps && (
          <div className="flex-shrink-0 w-16 pt-1">
            <div className="text-xs text-muted-foreground font-mono">0:00</div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="relative flex items-center py-2">
            {/* Dotted line on left */}
            <div className="flex-1 border-b border-dotted border-muted-foreground/50" />

            {/* Event badge */}
            <div className="mx-2 flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
              <Phone className="h-4 w-4" />
              <span className="text-foreground font-medium">Call Started</span>
            </div>

            {/* Dotted line on right */}
            <div className="flex-1 border-b border-dotted border-muted-foreground/50" />
          </div>
        </div>
      </div>

      {mergedItems.map((item, index) => {
        if (item.type === 'event') {
          return (
            <div key={item.data.id} className="flex gap-3">
              {showTimestamps && (
                <div className="text-xs text-muted-foreground font-mono w-16 flex-shrink-0 pt-1">
                  {formatTimeFromSeconds(item.sortTime)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <EventItem
                  event={item.data as TranscriptEvent}
                  startTime={startTime}
                  isExpanded={expandedEvents.has(item.data.id)}
                  onToggle={() => toggleEventExpanded(item.data.id)}
                />
              </div>
            </div>
          );
        }

        const message = item.data as TranscriptMessage;
        const isAgent = message.role === 'assistant' || message.role === 'system';
        const isUser = message.role === 'user';

        // Check if this message is the current match
        const isCurrentMatch =
          searchQuery &&
          matchingIndices[currentMatchIndex] === index &&
          message.content.toLowerCase().includes(searchQuery.toLowerCase());

        // Check if this is the currently playing message
        const isActivePlayback = activeMessageId === message.id;

        return (
          <div
            key={message.id}
            ref={(el) => setMessageRef(message.id, el)}
            className={cn(
              'flex gap-3 transition-all duration-300',
              isCurrentMatch && 'ring-2 ring-primary rounded-lg p-2 -m-2'
            )}
          >
            {/* Left side: Timestamp */}
            <div className="flex-shrink-0 w-16 pt-1">
              {showTimestamps && (
                <div className="text-xs text-muted-foreground font-mono">
                  {formatTimeFromSeconds(message.startTime || 0)}
                </div>
              )}
            </div>

            {/* Right side: Message - alternating alignment */}
            <div className={cn('flex-1 flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
              {!isUser && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {message.speakerName?.charAt(0).toUpperCase() || (isAgent ? 'A' : 'S')}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  'flex flex-col gap-1',
                  isUser ? 'items-end' : 'items-start',
                  'max-w-[80%]'
                )}
              >
                <div
                  className={cn(
                    'relative group rounded-lg px-4 py-2.5 shadow-sm transition-colors duration-300',
                    isActivePlayback
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-700'
                      : isAgent
                        ? 'bg-muted border text-foreground'
                        : isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 border text-muted-foreground'
                  )}
                >
                  {/* Pause button - shows on hover when playing */}
                  {isActivePlayback && onPause && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={onPause}
                      className={cn(
                        'absolute -top-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md',
                        isUser ? '-left-2' : '-right-2'
                      )}
                      aria-label="Pause playback"
                    >
                      <Pause className="h-3 w-3" />
                    </Button>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {highlightText(message.content, searchQuery)}
                  </p>
                </div>

                {(message.confidence !== undefined || message.startTime !== undefined) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-60">
                    {message.confidence !== undefined && message.confidence > 0 && (
                      <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                    )}
                    {message.startTime !== undefined && message.startTime > 0 && (
                      <>
                        {message.confidence !== undefined && message.confidence > 0 && (
                          <span>•</span>
                        )}
                        <span>Time: {formatTimeFromSeconds(message.startTime)}</span>
                      </>
                    )}
                    {message.content && (
                      <>
                        {(message.confidence !== undefined || message.startTime !== undefined) && (
                          <span>•</span>
                        )}
                        <span>{message.content.split(/\s+/).length} words</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {isUser && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {message.speakerName?.charAt(0).toUpperCase() || 'C'}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
