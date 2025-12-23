"use client"

import * as React from "react"

export type SaveStatus = "idle" | "saving" | "saved" | "error"

export interface UseAutosaveOptions<T> {
  /** Data to watch for changes */
  data: T
  /** Save function to call */
  onSave: (data: T) => Promise<void>
  /** Debounce delay in ms (default: 500) */
  debounceMs?: number
  /** Enable autosave (default: true) */
  enabled?: boolean
}

export interface UseAutosaveReturn {
  /** Current save status */
  status: SaveStatus
  /** Whether there are unsaved changes */
  isDirty: boolean
  /** Manually trigger save */
  save: () => Promise<void>
  /** Reset dirty state (e.g., after manual save) */
  reset: () => void
  /** Last saved timestamp */
  lastSaved: Date | null
}

export function useAutosave<T>({
  data,
  onSave,
  debounceMs = 500,
  enabled = true,
}: UseAutosaveOptions<T>): UseAutosaveReturn {
  const [status, setStatus] = React.useState<SaveStatus>("idle")
  const [isDirty, setIsDirty] = React.useState(false)
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null)

  // Keep track of initial data to detect changes
  const initialDataRef = React.useRef<string>(JSON.stringify(data))
  const currentDataRef = React.useRef<T>(data)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const onSaveRef = React.useRef(onSave)
  onSaveRef.current = onSave

  // Check if data has changed from initial
  React.useEffect(() => {
    const currentJson = JSON.stringify(data)
    currentDataRef.current = data

    if (currentJson !== initialDataRef.current) {
      setIsDirty(true)
    }
  }, [data])

  // Debounced autosave
  React.useEffect(() => {
    if (!enabled || !isDirty) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving")
        await onSaveRef.current(currentDataRef.current)
        setStatus("saved")
        setIsDirty(false)
        setLastSaved(new Date())
        // Update initial data reference after successful save
        initialDataRef.current = JSON.stringify(currentDataRef.current)

        // Reset to idle after a delay
        setTimeout(() => {
          setStatus("idle")
        }, 2000)
      } catch (error) {
        console.error("Autosave failed:", error)
        setStatus("error")
      }
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, enabled, isDirty, debounceMs])

  // Manual save function
  const save = React.useCallback(async () => {
    try {
      setStatus("saving")
      await onSaveRef.current(currentDataRef.current)
      setStatus("saved")
      setIsDirty(false)
      setLastSaved(new Date())
      initialDataRef.current = JSON.stringify(currentDataRef.current)

      setTimeout(() => {
        setStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Save failed:", error)
      setStatus("error")
      throw error
    }
  }, [])

  // Reset function
  const reset = React.useCallback(() => {
    setIsDirty(false)
    setStatus("idle")
    initialDataRef.current = JSON.stringify(currentDataRef.current)
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    status,
    isDirty,
    save,
    reset,
    lastSaved,
  }
}
