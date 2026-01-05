'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  PhoneIncoming,
  PhoneOutgoing,
  PanelLeftClose,
  PanelLeft,
  Clock,
  BarChart2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCalls } from '@/lib/api/hooks/use-calls';
import type { Call } from '@/lib/api/types';

// Minimal call data needed for sidebar display
export interface SidebarCallItem {
  id: string;
  customerName: string;
  agentName: string;
  direction: 'inbound' | 'outbound';
  duration: string;
  score?: number;
  startTime: string;
}

interface CallsListSidebarProps {
  currentCallId: string;
  isOpen: boolean;
  onToggle: () => void;
  /** If true, sidebar has filter context from URL and should auto-fetch */
  hasFilterContext: boolean;
}

/**
 * Check if there are any active filters in URL
 */
export function hasActiveFilters(searchParams: URLSearchParams): boolean {
  const filterKeys = [
    'direction',
    'origin',
    'provider',
    'category',
    'scenarioId',
    'scenarioExecutionId',
    'search',
  ];
  return filterKeys.some((key) => searchParams.has(key));
}

/**
 * Format duration in seconds to mm:ss string
 */
function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get direction from call type
 */
function getDirection(type: Call['type']): 'inbound' | 'outbound' {
  return type === 'inboundPhoneCall' ? 'inbound' : 'outbound';
}

/**
 * Get customer display name from call
 */
function getCustomerName(call: Call): string {
  if (!call.customer) return 'Unknown';
  const { first_name, last_name, phone_number } = call.customer;
  if (first_name || last_name) {
    return [first_name, last_name].filter(Boolean).join(' ');
  }
  return phone_number || 'Unknown';
}

/**
 * Transform API call data to sidebar display format
 */
function transformCallToSidebarItem(call: Call): SidebarCallItem {
  return {
    id: call.id,
    customerName: getCustomerName(call),
    agentName: 'Agent', // Agent name not available in list view
    direction: getDirection(call.type),
    duration: formatDuration(call.durationSecs),
    score: undefined, // Score not available in list view
    startTime: call.startedAt || call.createdAt,
  };
}

/**
 * CallsListSidebar - Shows a collapsible list of calls for easy navigation
 */
export function CallsListSidebar({
  currentCallId,
  isOpen,
  onToggle,
  hasFilterContext,
}: CallsListSidebarProps) {
  const searchParams = useSearchParams();

  // Fetch calls from API
  const { data: callsData, isLoading } = useCalls();

  // Transform calls to sidebar format
  const calls: SidebarCallItem[] = (callsData ?? []).map(transformCallToSidebarItem);

  // Build the "View All" link
  const viewAllHref = '/inbox';

  // Format date for display (e.g., "Dec 15")
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format score as integer (no decimals)
  const formatScore = (score?: number): string => {
    if (score === undefined || score === null) return '';
    return Math.round(score).toString();
  };

  // Get score styling for badge
  const getScoreClass = (score?: number): string => {
    if (score === undefined || score === null) return '';
    if (score >= 90)
      return 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 70)
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  // Build link href
  const buildCallLink = (callId: string): string => {
    return `/inbox/${callId}`;
  };

  if (!isOpen) {
    return (
      <div className="flex-none p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
          title="Show calls list"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-none w-72 h-full pr-4">
      <div className="h-full bg-background border rounded-lg shadow-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Calls</span>
            {!isLoading && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                {calls.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
              <Link href={viewAllHref}>View All</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
              title="Hide calls list"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calls List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {calls.map((call) => {
                  const isActive = call.id === currentCallId;
                  return (
                    <Link
                      key={call.id}
                      href={buildCallLink(call.id)}
                      className={cn(
                        'block rounded-lg p-3 border',
                        'transition-all duration-200 ease-in-out',
                        'hover:bg-accent/50 hover:shadow-sm',
                        isActive
                          ? 'bg-accent/50 border-primary/30 shadow-sm ring-1 ring-primary/20'
                          : 'border-border/50 hover:border-border'
                      )}
                    >
                      {/* Customer with direction icon */}
                      <div className="flex items-start gap-2.5">
                        <div
                          className={cn(
                            'flex items-center justify-center h-7 w-7 rounded-full flex-shrink-0 transition-colors duration-200',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          {call.direction === 'inbound' ? (
                            <PhoneIncoming className="h-3.5 w-3.5" />
                          ) : (
                            <PhoneOutgoing className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate leading-normal">
                            {call.customerName || 'Unknown'}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {call.agentName || 'Agent'}
                          </div>
                        </div>
                      </div>

                      {/* Stats row - full width */}
                      <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1 text-xs text-foreground/70">
                          <Clock className="h-3 w-3" />
                          <span>{call.duration}</span>
                        </div>
                        {call.score !== undefined && call.score !== null && (
                          <div className="flex items-center gap-1 text-xs text-foreground/70">
                            <BarChart2 className="h-3 w-3" />
                            <span
                              className={cn(
                                'font-medium',
                                getScoreClass(call.score)
                                  .split(' ')
                                  .find((c) => c.startsWith('text-'))
                              )}
                            >
                              {formatScore(call.score)}%
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-foreground/70 ml-auto">
                          {formatDate(call.startTime)}
                        </span>
                      </div>
                    </Link>
                  );
                })}

                {calls.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No calls to display
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}


