'use client';

import { CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MessageSquare,
  Activity,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranscriptHeaderProps {
  searchQuery: string;
  totalMatches: number;
  currentMatchIndex: number;
  onSearchChange: (query: string) => void;
  onPrevMatch: () => void;
  onNextMatch: () => void;
  messageCount?: number;
  eventCount?: number;
  duration?: string;
  status?: string;
}

export function TranscriptHeader({
  searchQuery,
  totalMatches,
  currentMatchIndex,
  onSearchChange,
  onPrevMatch,
  onNextMatch,
  messageCount,
  eventCount,
  duration,
  status,
}: TranscriptHeaderProps) {
  return (
    <CardHeader className="bg-muted/50 rounded-t-xl px-6 py-2 flex-shrink-0 border-b gap-0 pb-2!">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {duration && (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{duration}</span>
            </div>
          )}
          {messageCount !== undefined && (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="text-muted-foreground">Messages:</span>
              <span className="font-medium">{messageCount}</span>
            </div>
          )}
          {eventCount !== undefined && eventCount > 0 && (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Activity className="h-4 w-4 shrink-0" />
              <span className="text-muted-foreground">Events:</span>
              <span className="font-medium">{eventCount}</span>
            </div>
          )}
          {status && (
            <div className="flex items-center gap-1.5 whitespace-nowrap ml-2">
              <CheckCircle
                className={cn(
                  'h-4 w-4 shrink-0',
                  status === 'completed' ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  status === 'completed' ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {status === 'completed' ? 'Completed' : status}
              </span>
            </div>
          )}
        </div>

        {/* Right side - Search */}
        <div className="flex items-center justify-end gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64 h-9 text-sm bg-background"
            />
          </div>
          {searchQuery && totalMatches > 0 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevMatch}
                disabled={currentMatchIndex === 0}
                className="h-9 px-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                {currentMatchIndex + 1}/{totalMatches}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onNextMatch}
                disabled={currentMatchIndex >= totalMatches - 1}
                className="h-9 px-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
}


