"use client"

import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/team/columns"
import { roles, statuses } from "@/components/data-table/team/data"
import { InviteMemberDialog } from "@/components/settings/invite-member-dialog"
import type { TeamMember } from "@/components/data-table/team/schema"

// Mock data - replace with API call
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Emmanuel Smith",
    email: "emmanuel@sixfactors.ai",
    role: "owner",
    status: "active",
    joinedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@sixfactors.ai",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@company.com",
    role: "member",
    status: "active",
    joinedAt: "2024-02-15",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@startup.co",
    role: "viewer",
    status: "pending",
    joinedAt: null,
  },
]

export default function TeamPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Team</h2>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Invite member
        </Button>
      </div>

      {/* Team Members Table */}
      <DataTable
        columns={columns}
        data={teamMembers}
        searchColumnId="name"
        searchPlaceholder="Search members..."
        facetedFilters={[
          {
            columnId: "role",
            title: "Role",
            options: roles.map((r) => ({
              label: r.label,
              value: r.value,
              icon: r.icon,
            })),
          },
          {
            columnId: "status",
            title: "Status",
            options: statuses.map((s) => ({
              label: s.label,
              value: s.value,
              icon: s.icon,
            })),
          },
        ]}
      />

      {/* Invite Member Dialog */}
      <InviteMemberDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
      />
    </div>
  )
}
