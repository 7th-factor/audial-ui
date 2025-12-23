import type React from "react"
import { AuthGuard } from "@/lib/auth/auth-guard"
import { DashboardShell } from "@/components/dashboard-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  )
}
