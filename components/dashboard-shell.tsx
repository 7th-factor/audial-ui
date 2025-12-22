"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CommandPalette } from "@/components/command-palette"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = React.useState(false)

  useKeyboardShortcuts({
    enabled: true,
    onCommandPalette: () => setCommandPaletteOpen(true),
    onShowShortcuts: () => setShortcutsDialogOpen(true),
  })

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 56)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="@container/main flex-1 overflow-y-auto">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />

      <KeyboardShortcutsDialog
        open={shortcutsDialogOpen}
        onOpenChange={setShortcutsDialogOpen}
      />
    </>
  )
}
