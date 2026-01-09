'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  IconPhone,
  IconEye,
  IconPhoneIncoming,
  IconPhoneOutgoing,
  IconMessage,
  IconBrandWhatsapp,
  IconApi,
  IconInbox,
} from '@tabler/icons-react';

import { PageLayout } from '@/components/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/data-table/data-table';
import { useCalls, useChats, type Call, type Chat } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { FacetedFilterConfig } from '@/components/data-table/data-table-toolbar';

// Helper function for score color
function getScoreColor(score?: number): string {
  if (score === undefined || score === null) return 'text-muted-foreground';
  if (score >= 80) return 'text-green-600 font-medium';
  if (score >= 60) return 'text-yellow-600 font-medium';
  return 'text-red-600 font-medium';
}

// Helper function for status badge
function getStatusClass(status?: string): string {
  switch (status) {
    case 'completed':
    case 'ended':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return '';
  }
}

// Filter options
const typeOptions = [
  { label: 'Websocket Call', value: 'websocketCall' },
  { label: 'Outbound Phone Call', value: 'outboundPhoneCall' },
  { label: 'Inbound Phone Call', value: 'inboundPhoneCall' },
];

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' },
];

// Helper to format duration in seconds to mm:ss
function formatDuration(seconds: number | null): string {
  if (!seconds) return '-';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const columns: ColumnDef<Call>[] = [
  // Select column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ID column
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const call = row.original;
      return (
        <span className="font-mono text-xs text-muted-foreground">
          {call.id.slice(0, 8)}...
        </span>
      );
    },
  },
  // From / To column
  {
    accessorKey: 'customer',
    header: 'From / To',
    cell: ({ row }) => {
      const call = row.original;
      const customerName = call.customer?.first_name
        ? `${call.customer.first_name}${call.customer.last_name ? ` ${call.customer.last_name}` : ''}`
        : null;
      const customerPhone = call.customer?.phone_number;
      const isInbound = call.type === 'inboundPhoneCall';

      return (
        <Link
          href={`/inbox/${call.id}`}
          className="flex items-center gap-3 min-w-[220px] hover:bg-muted/50 rounded-md p-1 -m-1 transition-colors"
        >
          {/* Direction icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            {isInbound ? (
              <IconPhoneIncoming className="size-4 text-muted-foreground" />
            ) : (
              <IconPhoneOutgoing className="size-4 text-muted-foreground" />
            )}
          </div>
          {/* From / To info */}
          <div className="flex flex-col space-y-0.5">
            {/* From (Customer) */}
            <div className="flex items-center gap-1">
              <span className="truncate font-medium text-sm">
                {customerName || customerPhone || 'Unknown'}
              </span>
              {customerName && customerPhone && (
                <span className="text-xs text-muted-foreground">
                  ({customerPhone})
                </span>
              )}
            </div>
            {/* Type */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">→</span>
              <span className="truncate text-sm capitalize">
                {call.type.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },
  // Type column
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {type.replace(/([A-Z])/g, ' $1').trim()}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Status column
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="secondary"
          className={cn('text-xs capitalize', getStatusClass(status))}
        >
          {status || 'Unknown'}
        </Badge>
      );
    },
  },
  // Duration column
  {
    accessorKey: 'durationSecs',
    header: 'Duration',
    cell: ({ row }) => {
      const duration = row.original.durationSecs;
      return <span className="text-sm">{formatDuration(duration)}</span>;
    },
  },
  // Date column
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      );
    },
  },
  // Actions column
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const call = row.original;
      return (
        <Button variant="ghost" size="sm" asChild className="h-8">
          <Link href={`/inbox/${call.id}`}>
            <IconEye className="size-4 mr-2" />
            View
          </Link>
        </Button>
      );
    },
  },
];

// Faceted filters configuration for calls
const callFacetedFilters: FacetedFilterConfig[] = [
  {
    columnId: 'type',
    title: 'Type',
    options: typeOptions,
  },
  {
    columnId: 'status',
    title: 'Status',
    options: statusOptions,
  },
];

// Chat filter options
const chatChannelOptions = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'REST API', value: 'rest-api' },
];

const chatStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' },
];

// Chat columns
const chatColumns: ColumnDef<Chat>[] = [
  // Select column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ID column
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const chat = row.original;
      return (
        <span className="font-mono text-xs text-muted-foreground">
          {chat.id.slice(0, 8)}...
        </span>
      );
    },
  },
  // Customer column
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) => {
      const chat = row.original;
      const customer = chat.customer;
      const customerName = customer
        ? [customer.firstName, customer.lastName].filter(Boolean).join(' ') || 'Unknown'
        : 'Unknown';
      const isWhatsApp = chat.channel === 'whatsapp';

      return (
        <Link
          href={`/inbox/chat/${chat.id}`}
          className="flex items-center gap-3 min-w-[220px] hover:bg-muted/50 rounded-md p-1 -m-1 transition-colors"
        >
          {/* Channel icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            {isWhatsApp ? (
              <IconBrandWhatsapp className="size-4 text-green-600" />
            ) : (
              <IconApi className="size-4 text-blue-600" />
            )}
          </div>
          {/* Customer info */}
          <div className="flex flex-col space-y-0.5">
            <span className="truncate font-medium text-sm">{customerName}</span>
            {customer?.email && (
              <span className="text-xs text-muted-foreground truncate">
                {customer.email}
              </span>
            )}
          </div>
        </Link>
      );
    },
  },
  // Channel column
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => {
      const chat = row.original;
      const isWhatsApp = chat.channel === 'whatsapp';
      return (
        <Badge variant="outline" className="text-xs capitalize gap-1">
          {isWhatsApp ? (
            <IconBrandWhatsapp className="h-3 w-3" />
          ) : (
            <IconApi className="h-3 w-3" />
          )}
          {chat.channel === 'rest-api' ? 'REST API' : 'WhatsApp'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Messages column
  {
    accessorKey: 'messages',
    header: 'Messages',
    cell: ({ row }) => {
      const chat = row.original;
      return <span className="font-medium">{chat.messages?.length || 0}</span>;
    },
  },
  // Status column
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="secondary"
          className={cn('text-xs capitalize', getStatusClass(status))}
        >
          {status || 'Unknown'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Date column
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      );
    },
  },
  // Actions column
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const chat = row.original;
      return (
        <Button variant="ghost" size="sm" asChild className="h-8">
          <Link href={`/inbox/chat/${chat.id}`}>
            <IconEye className="size-4 mr-2" />
            View
          </Link>
        </Button>
      );
    },
  },
];

// Faceted filters for chats
const chatFacetedFilters: FacetedFilterConfig[] = [
  {
    columnId: 'channel',
    title: 'Channel',
    options: chatChannelOptions,
  },
  {
    columnId: 'status',
    title: 'Status',
    options: chatStatusOptions,
  },
];

// Skeleton row component for table loading state
function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b">
      {/* Checkbox */}
      <Skeleton className="h-4 w-4 rounded" />
      {/* ID */}
      <Skeleton className="h-4 w-16" />
      {/* Customer with avatar */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      {/* Type badge */}
      <Skeleton className="h-6 w-24 rounded-full" />
      {/* Status badge */}
      <Skeleton className="h-6 w-20 rounded-full" />
      {/* Duration */}
      <Skeleton className="h-4 w-12" />
      {/* Date */}
      <Skeleton className="h-4 w-24" />
      {/* Actions */}
      <Skeleton className="h-8 w-16 ml-auto" />
    </div>
  );
}

// Full inbox skeleton component
function InboxSkeleton() {
  return (
    <PageLayout
      title="Inbox"
      description="View and manage all customer interactions"
      icon={IconInbox}
    >
      <div className="px-4 lg:px-6 space-y-6">
        {/* Tabs skeleton */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        {/* Toolbar skeleton (search + filters) */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-lg border">
          {/* Table header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/50">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          {/* Table rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function InboxPage() {
  const { data: calls, isLoading: isLoadingCalls, error: callsError } = useCalls();
  const { data: chats, isLoading: isLoadingChats, error: chatsError } = useChats();

  const isLoading = isLoadingCalls || isLoadingChats;
  const callCount = calls?.length || 0;
  const chatCount = chats?.length || 0;

  if (isLoading) {
    return <InboxSkeleton />;
  }

  return (
    <PageLayout
      title="Inbox"
      description="View and manage all customer interactions"
      icon={IconInbox}
    >
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="calls" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calls" className="gap-2">
              <IconPhone className="h-4 w-4" />
              Calls ({callCount})
            </TabsTrigger>
            <TabsTrigger value="chats" className="gap-2">
              <IconMessage className="h-4 w-4" />
              Chats ({chatCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calls">
            {callsError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-destructive mb-2">Failed to load calls</p>
                <p className="text-sm text-muted-foreground">
                  {callsError instanceof Error ? callsError.message : 'An error occurred'}
                </p>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={calls || []}
                searchColumnId="customer"
                searchPlaceholder="Search by customer name or phone..."
                facetedFilters={callFacetedFilters}
                emptyState={{
                  icon: IconPhone,
                  title: "No calls yet",
                  description: "Connect a phone number to start receiving and making calls.",
                  primaryAction: {
                    label: "Connect phone number",
                    onClick: () => console.log("Connect phone"),
                  },
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="chats">
            {chatsError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-destructive mb-2">Failed to load chats</p>
                <p className="text-sm text-muted-foreground">
                  {chatsError instanceof Error ? chatsError.message : 'An error occurred'}
                </p>
              </div>
            ) : (
              <DataTable
                columns={chatColumns}
                data={chats || []}
                searchColumnId="customer"
                searchPlaceholder="Search by customer..."
                facetedFilters={chatFacetedFilters}
                emptyState={{
                  icon: IconMessage,
                  title: "No chats yet",
                  description: "Start a conversation via WhatsApp or REST API.",
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
