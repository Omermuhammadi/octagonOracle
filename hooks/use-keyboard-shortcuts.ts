"use client"

import { useEffect } from "react"

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === event.key.toLowerCase() &&
          !!s.ctrlKey === event.ctrlKey &&
          !!s.metaKey === event.metaKey &&
          !!s.shiftKey === event.shiftKey &&
          !!s.altKey === event.altKey,
      )

      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [shortcuts])
}

// Common shortcuts
export const commonShortcuts = {
  search: { key: "k", ctrlKey: true, description: "Open search" },
  dashboard: { key: "d", ctrlKey: true, description: "Go to dashboard" },
  training: { key: "t", ctrlKey: true, description: "Go to training" },
  help: { key: "?", description: "Show help" },
  escape: { key: "Escape", description: "Close modal/menu" },
}
