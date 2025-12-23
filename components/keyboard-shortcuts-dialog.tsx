"use client"

import * as React from "react"
import { IconCommand, IconKeyboard } from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ShortcutItem {
  keys: string[]
  description: string
}

interface ShortcutSection {
  title: string
  shortcuts: ShortcutItem[]
}

const shortcutSections: ShortcutSection[] = [
  {
    title: "Global",
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open command palette" },
      { keys: ["?"], description: "Show keyboard shortcuts" },
      { keys: ["/"], description: "Focus search" },
      { keys: ["Esc"], description: "Close dialogs / Blur input" },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["G", "H"], description: "Go to Home" },
      { keys: ["G", "I"], description: "Go to Inbox" },
      { keys: ["G", "C"], description: "Go to Contacts" },
      { keys: ["G", "F"], description: "Go to Follow Ups" },
      { keys: ["G", "A"], description: "Go to Analytics" },
      { keys: ["G", "K"], description: "Go to API Keys" },
      { keys: ["G", "S"], description: "Go to Settings" },
    ],
  },
  {
    title: "Table Actions",
    shortcuts: [
      { keys: ["J"], description: "Move down" },
      { keys: ["K"], description: "Move up" },
      { keys: ["X"], description: "Select row" },
      { keys: ["Enter"], description: "Open item" },
      { keys: ["Delete"], description: "Delete selected" },
    ],
  },
]

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center justify-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  )
}

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconKeyboard className="size-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Navigate faster using these keyboard shortcuts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {shortcutSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {sectionIndex > 0 && <Separator className="mb-4" />}
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.description}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <KeyboardKey>{key}</KeyboardKey>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">
                              {key === "G" ? "then" : "+"}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <IconCommand className="size-3" />
          <span>Press</span>
          <KeyboardKey>?</KeyboardKey>
          <span>to toggle this dialog</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
