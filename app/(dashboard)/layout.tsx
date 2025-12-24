import type React from "react"
import { AuthGuard } from "@/lib/auth/auth-guard"
import { DashboardShell } from "@/components/dashboard-shell"
import { AgentProvider } from "@/lib/contexts/agent-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <AgentProvider>
        <DashboardShell>{children}</DashboardShell>
      </AgentProvider>
    </AuthGuard>
  )
}
