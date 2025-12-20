"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, Eye } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { getMockCalls, type MockCall } from "@/lib/mock-data/calls"
import type { ColumnDef } from "@tanstack/react-table"

const calls = getMockCalls()

const columns: ColumnDef<MockCall>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const call = row.original
      return (
        <span className="font-mono text-xs text-muted-foreground">
          {call.callId}
        </span>
      )
    },
  },
  {
    accessorKey: "customer",
    header: "From / To",
    cell: ({ row }) => {
      const call = row.original
      const customerName = call.customerName !== 'Unknown' ? call.customerName : null
      const customerPhone = call.customer && call.customer !== 'Unknown' ? call.customer : null
      const agentName = call.agent || 'Unknown'

      return (
        <Link
          href={`/inbox/${call.id}`}
          className="flex items-center gap-3 min-w-[220px] hover:bg-muted/50 rounded-md p-1 -m-1 transition-colors"
        >
          {/* Phone icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </div>
          {/* From / To info */}
          <div className="flex flex-col space-y-0.5">
            {/* From (Customer) */}
            <div className="flex items-center gap-1">
              <span className="truncate font-medium text-sm">
                {customerName || customerPhone || 'Unknown'}
              </span>
              {customerName && customerPhone && (
                <span className="text-xs text-muted-foreground">({customerPhone})</span>
              )}
            </div>
            {/* To (Agent) */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">→</span>
              <span className="truncate text-sm">{agentName}</span>
            </div>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "source",
    header: "Provider",
    cell: ({ row }) => {
      const source = row.getValue("source") as string
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {source || 'manual'}
        </Badge>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return (
        <Badge variant="outline" className="text-xs capitalize">
          {category}
        </Badge>
      )
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const call = row.original
      const score = call.overallScore
      const hasScore = score !== undefined && score !== null

      const getScoreColor = () => {
        if (!hasScore || !score) return 'text-muted-foreground'
        if (score >= 80) return 'text-green-600 font-medium'
        if (score >= 60) return 'text-yellow-600 font-medium'
        return 'text-red-600 font-medium'
      }

      return (
        <span className={hasScore ? getScoreColor() : 'text-muted-foreground'}>
          {hasScore ? `${score}%` : '-'}
        </span>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("duration")}</span>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const call = row.original
      return (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8"
        >
          <Link href={`/inbox/${call.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      )
    },
  },
]

export default function InboxPage() {
  const router = useRouter()

  return (
    <PageLayout
      title="Inbox"
      description="View and manage all call interactions and messages"
      icon={Phone}
    >
      <div className="px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={calls}
          searchColumnId="customerName"
          searchPlaceholder="Search by customer name or phone..."
        />
      </div>
    </PageLayout>
  )
}
