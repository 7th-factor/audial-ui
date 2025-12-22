"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  IconHome,
  IconInbox,
  IconUsers,
  IconUserCheck,
  IconChartBar,
  IconKey,
  IconSettings,
  IconCalendar,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconPlus,
  IconSearch,
  IconLogout,
} from "@tabler/icons-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CommandItem {
  id: string
  label: string
  icon: React.ReactNode
  shortcut?: string
  onSelect: () => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const navigate = React.useCallback(
    (path: string) => {
      onOpenChange(false)
      router.push(path)
    },
    [router, onOpenChange]
  )

  const navigationItems: CommandItem[] = React.useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        icon: <IconHome className="size-4" />,
        shortcut: "G H",
        onSelect: () => navigate("/"),
      },
      {
        id: "inbox",
        label: "Inbox",
        icon: <IconInbox className="size-4" />,
        shortcut: "G I",
        onSelect: () => navigate("/inbox"),
      },
      {
        id: "contacts",
        label: "Contacts",
        icon: <IconUsers className="size-4" />,
        shortcut: "G C",
        onSelect: () => navigate("/contacts"),
      },
      {
        id: "follow-ups",
        label: "Follow Ups",
        icon: <IconUserCheck className="size-4" />,
        shortcut: "G F",
        onSelect: () => navigate("/follow-ups"),
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: <IconCalendar className="size-4" />,
        onSelect: () => navigate("/calendar"),
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <IconChartBar className="size-4" />,
        shortcut: "G A",
        onSelect: () => navigate("/analytics"),
      },
      {
        id: "api-keys",
        label: "API Keys",
        icon: <IconKey className="size-4" />,
        shortcut: "G K",
        onSelect: () => navigate("/api-keys"),
      },
      {
        id: "settings",
        label: "Settings",
        icon: <IconSettings className="size-4" />,
        shortcut: "G S",
        onSelect: () => navigate("/settings"),
      },
    ],
    [navigate]
  )

  const actionItems: CommandItem[] = React.useMemo(
    () => [
      {
        id: "new-contact",
        label: "New Contact",
        icon: <IconPlus className="size-4" />,
        onSelect: () => {
          onOpenChange(false)
          // Navigate to contacts with new dialog trigger
          router.push("/contacts?new=true")
        },
      },
      {
        id: "new-follow-up",
        label: "New Follow Up",
        icon: <IconPlus className="size-4" />,
        onSelect: () => {
          onOpenChange(false)
          router.push("/follow-ups?new=true")
        },
      },
      {
        id: "search",
        label: "Search",
        icon: <IconSearch className="size-4" />,
        shortcut: "/",
        onSelect: () => {
          onOpenChange(false)
          const searchInput = document.querySelector<HTMLInputElement>(
            '[data-search-input], input[placeholder*="Search"], input[placeholder*="Filter"]'
          )
          searchInput?.focus()
        },
      },
    ],
    [router, onOpenChange]
  )

  const themeItems: CommandItem[] = React.useMemo(
    () => [
      {
        id: "theme-light",
        label: "Light Mode",
        icon: <IconSun className="size-4" />,
        onSelect: () => {
          setTheme("light")
          onOpenChange(false)
        },
      },
      {
        id: "theme-dark",
        label: "Dark Mode",
        icon: <IconMoon className="size-4" />,
        onSelect: () => {
          setTheme("dark")
          onOpenChange(false)
        },
      },
      {
        id: "theme-system",
        label: "System Theme",
        icon: <IconDeviceDesktop className="size-4" />,
        onSelect: () => {
          setTheme("system")
          onOpenChange(false)
        },
      },
    ],
    [setTheme, onOpenChange]
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} showCloseButton={false}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.onSelect}>
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actionItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.onSelect}>
              {item.icon}
              <span>{item.label}</span>
              {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          {themeItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.onSelect}>
              {item.icon}
              <span>{item.label}</span>
              {theme === item.id.replace("theme-", "") && (
                <CommandShortcut>Active</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
