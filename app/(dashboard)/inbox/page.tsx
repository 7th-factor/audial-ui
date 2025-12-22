'use client';

import * as React from 'react';
import Link from 'next/link';
import { Phone, Eye, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { IconPhone } from '@tabler/icons-react';

import { PageLayout } from '@/components/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/data-table/data-table';
import { getMockCalls, type MockCall } from '@/lib/mock-data/calls';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { FacetedFilterConfig } from '@/components/data-table/data-table-toolbar';

const calls = getMockCalls();

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
const sourceOptions = [
  { label: 'Upload', value: 'upload' },
  { label: 'VAPI', value: 'vapi' },
  { label: 'Bland AI', value: 'bland' },
  { label: 'Twilio', value: 'twilio' },
  { label: 'Manual', value: 'manual' },
];

const categoryOptions = [
  { label: 'Support', value: 'support' },
  { label: 'Sales', value: 'sales' },
  { label: 'Billing', value: 'billing' },
  { label: 'Technical', value: 'technical' },
];

const columns: ColumnDef<MockCall>[] = [
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
        <span className="font-mono text-xs text-muted-foreground">{call.callId}</span>
      );
    },
  },
  // From / To column
  {
    accessorKey: 'customer',
    header: 'From / To',
    cell: ({ row }) => {
      const call = row.original;
      const customerName =
        call.customerName !== 'Unknown' ? call.customerName : null;
      const customerPhone =
        call.customer && call.customer !== 'Unknown' ? call.customer : null;
      const agentName = call.assistantName || call.agentName || 'Unknown';
      const isInbound = call.direction === 'inbound';

      return (
        <Link
          href={`/inbox/${call.id}`}
          className="flex items-center gap-3 min-w-[220px] hover:bg-muted/50 rounded-md p-1 -m-1 transition-colors"
        >
          {/* Direction icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            {isInbound ? (
              <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
            ) : (
              <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
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
            {/* To (Agent) */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">→</span>
              <span className="truncate text-sm">{agentName}</span>
            </div>
          </div>
        </Link>
      );
    },
  },
  // Provider column
  {
    accessorKey: 'source',
    header: 'Provider',
    cell: ({ row }) => {
      const source = row.getValue('source') as string;
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {source || 'manual'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Category column
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {category}
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
  // Score column
  {
    accessorKey: 'overallScore',
    header: 'Score',
    cell: ({ row }) => {
      const call = row.original;
      const score = call.overallScore;
      const hasScore = score !== undefined && score !== null;

      return (
        <span className={hasScore ? getScoreColor(score) : 'text-muted-foreground'}>
          {hasScore ? `${score}%` : '-'}
        </span>
      );
    },
  },
  // Duration column
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue('duration')}</span>;
    },
  },
  // Date column
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
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
            <Eye className="h-4 w-4 mr-2" />
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
    columnId: 'source',
    title: 'Provider',
    options: sourceOptions,
  },
  {
    columnId: 'category',
    title: 'Category',
    options: categoryOptions,
  },
];

export default function InboxPage() {
  return (
    <PageLayout
      title="Inbox"
      description="View and manage all call interactions"
      icon={Phone}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={calls}
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
