'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Calendar,
  Zap,
  PanelLeft,
  Download,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import type { MockCall } from '@/lib/mock-data/calls';
import { cn } from '@/lib/utils';

interface CallHeaderProps {
  call: MockCall | null | undefined;
  isLoading?: boolean;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onRunAnalysis?: () => void;
}

/**
 * CallHeader - Displays call metadata at the top of call details page
 *
 * Shows: Direction icon, avatars, customer/agent info, duration, date, status, actions
 */
export function CallHeader({
  call,
  isLoading,
  onToggleSidebar,
  isSidebarOpen,
  onRunAnalysis,
}: CallHeaderProps) {
  if (isLoading) {
    return <CallHeaderSkeleton />;
  }

  if (!call) {
    return null;
  }

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge styling
  const getStatusClass = (status?: string) => {
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

  const customerDisplayName = call.customerName || call.customerPhone || 'Unknown';
  const agentDisplayName = call.assistantName || call.agentName || 'Agent';

  return (
    <div
      className="p-4 mb-4 space-y-4 bg-muted/50 rounded-lg border shadow-sm"
      data-testid="call-header"
    >
      {/* Top row: Call info and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle (desktop only) */}
          {onToggleSidebar && !isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="hidden lg:flex h-8 w-8 flex-shrink-0"
              title="Show calls list"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Vertical separator */}
          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          {/* Call info */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Avatar group - customer and agent overlapping */}
            <AvatarGroup
              items={[
                {
                  name: customerDisplayName,
                  color: 'oklch(0.645 0.246 16.439)', // rose
                },
                {
                  name: agentDisplayName,
                  color: 'oklch(0.609 0.126 221.723)', // cyan
                },
              ]}
              size="md"
              className="hidden sm:flex flex-shrink-0"
            />

            {/* Title and metadata */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base md:text-lg font-semibold truncate" data-testid="page-title">
                  {customerDisplayName}
                </h1>
                <span className="text-muted-foreground hidden sm:inline">→</span>
                <span className="text-base md:text-lg text-muted-foreground truncate hidden sm:inline">
                  {agentDisplayName}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 md:h-3.5 w-3 md:w-3.5" />
                  {call.duration}
                </span>
                {(call.startTime || call.date) && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">
                      {formatDate(call.startTime || call.date)}
                    </span>
                  </>
                )}
                {call.source && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span className="capitalize hidden md:inline">{call.source}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          <Badge variant="secondary" className={cn('text-xs', getStatusClass(call.status))}>
            {call.status || 'Unknown'}
          </Badge>

          {/* Download recording - only if available */}
          {call.recordingUrl && (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              onClick={() => {
                if (call.recordingUrl) {
                  window.open(call.recordingUrl, '_blank');
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}

          {onRunAnalysis && (
            <Button onClick={onRunAnalysis} size="sm" data-testid="run-analysis-button">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Run Analysis</span>
              <span className="sm:hidden">Analyze</span>
            </Button>
          )}

          {/* More actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(window.location.href, '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in new tab
              </DropdownMenuItem>
              {call.recordingUrl && (
                <DropdownMenuItem
                  className="sm:hidden"
                  onClick={() => {
                    if (call.recordingUrl) window.open(call.recordingUrl, '_blank');
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download recording
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  console.log('Delete functionality coming soon');
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete call
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function CallHeaderSkeleton() {
  return (
    <div className="p-4 mb-4 space-y-4 bg-muted/50 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full -ml-2.5" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
