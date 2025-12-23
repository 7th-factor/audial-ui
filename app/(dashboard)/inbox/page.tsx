'use client';

import * as React from 'react';
import Link from 'next/link';
import { IconPhone, IconEye, IconPhoneIncoming, IconPhoneOutgoing } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';

import { PageLayout } from '@/components/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/data-table/data-table';
import { useCalls, type Call } from '@/lib/api';
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

// Faceted filters configuration
const facetedFilters: FacetedFilterConfig[] = [
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

export default function InboxPage() {
  const { data: calls, isLoading, error } = useCalls();

  if (isLoading) {
    return (
      <PageLayout
        title="Inbox"
        description="View and manage all call interactions"
        icon={IconPhone}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title="Inbox"
        description="View and manage all call interactions"
        icon={IconPhone}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load calls</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Inbox"
      description="View and manage all call interactions"
      icon={IconPhone}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={calls || []}
          searchColumnId="customer"
          searchPlaceholder="Search by customer name or phone..."
          facetedFilters={facetedFilters}
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
      </div>
    </PageLayout>
  );
}
