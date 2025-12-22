"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export interface KeyboardShortcut {
  /** Key combination (e.g., "meta+k", "shift+?", "g h") */
  key: string
  /** Description for help dialog */
  description: string
  /** Handler function */
  handler: () => void
  /** Category for grouping in help dialog */
  category?: "navigation" | "actions" | "global"
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean
}

interface UseKeyboardShortcutsOptions {
  /** Enable or disable all shortcuts */
  enabled?: boolean
  /** Additional shortcuts to register */
  shortcuts?: KeyboardShortcut[]
  /** Callback when command palette should open */
  onCommandPalette?: () => void
  /** Callback when shortcuts dialog should open */
  onShowShortcuts?: () => void
}

// Track sequence for multi-key shortcuts like "g h"
let keySequence: string[] = []
let sequenceTimeout: NodeJS.Timeout | null = null

function normalizeKey(e: KeyboardEvent): string {
  const parts: string[] = []
  if (e.metaKey) parts.push("meta")
  if (e.ctrlKey) parts.push("ctrl")
  if (e.altKey) parts.push("alt")
  if (e.shiftKey) parts.push("shift")
  parts.push(e.key.toLowerCase())
  return parts.join("+")
}

function isInputElement(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false
  const tagName = target.tagName.toLowerCase()
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  )
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const { enabled = true, shortcuts = [], onCommandPalette, onShowShortcuts } = options
  const router = useRouter()

  // Default shortcuts
  const defaultShortcuts: KeyboardShortcut[] = React.useMemo(
    () => [
      // Global shortcuts
      {
        key: "meta+k",
        description: "Open command palette",
        handler: () => onCommandPalette?.(),
        category: "global",
        preventDefault: true,
      },
      {
        key: "ctrl+k",
        description: "Open command palette",
        handler: () => onCommandPalette?.(),
        category: "global",
        preventDefault: true,
      },
      {
        key: "shift+?",
        description: "Show keyboard shortcuts",
        handler: () => onShowShortcuts?.(),
        category: "global",
        preventDefault: true,
      },
      {
        key: "/",
        description: "Focus search",
        handler: () => {
          const searchInput = document.querySelector<HTMLInputElement>(
            '[data-search-input], input[placeholder*="Search"], input[placeholder*="Filter"]'
          )
          searchInput?.focus()
        },
        category: "global",
        preventDefault: true,
      },
      // Navigation shortcuts (g + key sequence)
      {
        key: "g h",
        description: "Go to Home",
        handler: () => router.push("/"),
        category: "navigation",
      },
      {
        key: "g i",
        description: "Go to Inbox",
        handler: () => router.push("/inbox"),
        category: "navigation",
      },
      {
        key: "g c",
        description: "Go to Contacts",
        handler: () => router.push("/contacts"),
        category: "navigation",
      },
      {
        key: "g f",
        description: "Go to Follow Ups",
        handler: () => router.push("/follow-ups"),
        category: "navigation",
      },
      {
        key: "g a",
        description: "Go to Analytics",
        handler: () => router.push("/analytics"),
        category: "navigation",
      },
      {
        key: "g k",
        description: "Go to API Keys",
        handler: () => router.push("/api-keys"),
        category: "navigation",
      },
      {
        key: "g s",
        description: "Go to Settings",
        handler: () => router.push("/settings"),
        category: "navigation",
      },
    ],
    [router, onCommandPalette, onShowShortcuts]
  )

  const allShortcuts = React.useMemo(
    () => [...defaultShortcuts, ...shortcuts],
    [defaultShortcuts, shortcuts]
  )

  React.useEffect(() => {
    if (!enabled) return

    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger shortcuts when typing in input fields
      if (isInputElement(e.target)) {
        // Allow Escape to blur inputs
        if (e.key === "Escape") {
          ;(e.target as HTMLElement).blur()
        }
        return
      }

      const normalizedKey = normalizeKey(e)

      // Handle single-key shortcuts
      const singleKeyShortcut = allShortcuts.find(
        (s) => s.key === normalizedKey && !s.key.includes(" ")
      )

      if (singleKeyShortcut) {
        if (singleKeyShortcut.preventDefault) {
          e.preventDefault()
        }
        singleKeyShortcut.handler()
        return
      }

      // Handle sequence shortcuts (like "g h")
      // Only track lowercase letters for sequences
      if (/^[a-z]$/.test(e.key.toLowerCase()) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Clear timeout and reset sequence
        if (sequenceTimeout) {
          clearTimeout(sequenceTimeout)
        }

        keySequence.push(e.key.toLowerCase())
        const currentSequence = keySequence.join(" ")

        // Check if current sequence matches any shortcut
        const sequenceShortcut = allShortcuts.find((s) => s.key === currentSequence)

        if (sequenceShortcut) {
          e.preventDefault()
          sequenceShortcut.handler()
          keySequence = []
          return
        }

        // Check if current sequence is a prefix of any shortcut
        const isPrefix = allShortcuts.some((s) => s.key.startsWith(currentSequence + " "))

        if (!isPrefix) {
          // Not a valid prefix, reset sequence
          keySequence = []
        } else {
          // Wait for next key in sequence
          sequenceTimeout = setTimeout(() => {
            keySequence = []
          }, 1000)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (sequenceTimeout) {
        clearTimeout(sequenceTimeout)
      }
    }
  }, [enabled, allShortcuts])

  return {
    shortcuts: allShortcuts,
  }
}

// Export shortcut categories for the help dialog
export function getShortcutsByCategory(shortcuts: KeyboardShortcut[]) {
  return {
    global: shortcuts.filter((s) => s.category === "global"),
    navigation: shortcuts.filter((s) => s.category === "navigation"),
    actions: shortcuts.filter((s) => s.category === "actions"),
  }
}

// Format key for display
export function formatKeyForDisplay(key: string): string {
  return key
    .replace("meta+", "⌘")
    .replace("ctrl+", "⌃")
    .replace("alt+", "⌥")
    .replace("shift+", "⇧")
    .replace(" ", " then ")
    .toUpperCase()
}
