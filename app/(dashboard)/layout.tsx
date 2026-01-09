import type React from "react"
import { Suspense } from "react"
import { AuthGuard } from "@/lib/auth/auth-guard"
import { WorkspaceGuard } from "@/lib/auth/workspace-guard"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardLoading } from "./loading"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <WorkspaceGuard>
        <DashboardShell>
          <Suspense fallback={<DashboardLoading />}>
            {children}
          </Suspense>
        </DashboardShell>
      </WorkspaceGuard>
    </AuthGuard>
  )
}
