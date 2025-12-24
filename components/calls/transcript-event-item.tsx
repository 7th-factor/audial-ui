'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Activity,
  CheckCircle,
  AlertCircle,
  Bot,
  User,
  Wrench,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { TranscriptEvent } from './transcript-types';

interface EventItemProps {
  event: TranscriptEvent;
  startTime?: Date;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function EventItem({ event, startTime, isExpanded = false, onToggle }: EventItemProps) {
  const getEventIcon = () => {
    switch (event.type) {
      case 'agent_start':
        return event.agentType === 'ai' ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        );
      case 'tool_call':
        return <Wrench className="h-4 w-4" />;
      case 'sentiment_change':
        return <Activity className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getEventLabel = () => {
    switch (event.type) {
      case 'agent_start':
        return `${event.agentName || 'Agent'} Started`;
      case 'tool_call':
        return event.toolName || 'Tool Call';
      case 'sentiment_change':
        return 'Sentiment Changed';
      default:
        return 'Event';
    }
  };

  const hasExpandableContent =
    event.toolParams ||
    event.toolResponse ||
    (event.type === 'sentiment_change' && (event.sentimentBefore || event.sentimentAfter));

  return (
    <>
      <div className="relative flex items-center py-2">
        {/* Dotted line on left */}
        <div className="flex-1 border-b border-dotted border-muted-foreground/50" />

        {/* Event badge */}
        <div className="mx-2 flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
          {getEventIcon()}
          <span className="text-foreground font-medium">{getEventLabel()}</span>

          {/* Duration for tool calls */}
          {event.type === 'tool_call' && event.toolDuration && (
            <span className="text-muted-foreground">• {event.toolDuration}ms</span>
          )}

          {/* Status indicator */}
          {event.type === 'tool_call' &&
            event.toolStatus &&
            (event.toolStatus === 'success' ? (
              <CheckCircle className="h-3 w-3 text-primary" />
            ) : event.toolStatus === 'error' ? (
              <AlertCircle className="h-3 w-3 text-destructive" />
            ) : null)}

          {/* Details button if there's expandable content */}
          {hasExpandableContent && onToggle && (
            <Button variant="ghost" size="sm" className="h-5 px-1 ml-1" onClick={onToggle}>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          )}
        </div>

        {/* Dotted line on right */}
        <div className="flex-1 border-b border-dotted border-muted-foreground/50" />
      </div>

      {/* Expanded details section */}
      {isExpanded && (
        <div className="mx-12 -mt-1 mb-2 p-3 rounded-lg bg-muted text-xs">
          {/* Tool call details */}
          {event.type === 'tool_call' && (
            <div className="space-y-2">
              {/* Status */}
              {event.toolStatus && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Status:</span>
                  {event.toolStatus === 'success' ? (
                    <span className="text-xs flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      Success
                    </span>
                  ) : event.toolStatus === 'error' ? (
                    <span className="text-xs flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      Error
                    </span>
                  ) : (
                    <span className="text-xs">{event.toolStatus}</span>
                  )}
                </div>
              )}

              {event.toolFunction && (
                <div className="text-foreground">
                  <span className="text-sm font-semibold">Function:</span>{' '}
                  <span className="text-xs">{event.toolFunction}</span>
                </div>
              )}

              {event.toolParams && (
                <div>
                  <div className="text-sm font-semibold mb-1">Parameters:</div>
                  <pre className="text-xs text-foreground overflow-auto bg-background p-2 rounded">
                    {JSON.stringify(event.toolParams, null, 2)}
                  </pre>
                </div>
              )}

              {/* Response - always show below Parameters */}
              <div>
                <div className="text-sm font-semibold mb-1">Response:</div>
                {event.toolResponse ? (
                  <pre
                    className={cn(
                      'text-xs overflow-auto max-h-32 bg-background p-2 rounded',
                      event.toolStatus === 'error' ? 'text-destructive' : 'text-foreground'
                    )}
                  >
                    {JSON.stringify(event.toolResponse, null, 2)}
                  </pre>
                ) : (
                  <div
                    className={cn(
                      'text-xs p-2 rounded bg-background',
                      event.toolStatus === 'error' ? 'text-destructive' : 'text-muted-foreground'
                    )}
                  >
                    {event.toolStatus === 'error' ? 'No response data available' : 'No response'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sentiment change details */}
          {event.type === 'sentiment_change' && (
            <div className="text-foreground space-y-1">
              <div>
                <span className="text-sm font-semibold">Changed from:</span>{' '}
                <span className="text-xs">{event.sentimentBefore || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Changed to:</span>{' '}
                <span className="text-xs">{event.sentimentAfter || 'Unknown'}</span>
              </div>
              {event.trigger && (
                <div>
                  <span className="text-sm font-semibold">Trigger:</span>{' '}
                  <span className="text-xs">{event.trigger}</span>
                </div>
              )}
            </div>
          )}

          {/* Agent details */}
          {event.type === 'agent_start' && event.agentRole && (
            <div className="text-foreground">
              <span className="text-sm font-semibold">Role:</span>{' '}
              <span className="text-xs">{event.agentRole}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}


