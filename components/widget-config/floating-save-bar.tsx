'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { WidgetConfigPayload } from '@/lib/features/widget/types'

interface FloatingSaveBarProps {
  className?: string
  onResetCallback?: () => void
}

export function FloatingSaveBar({ className, onResetCallback }: FloatingSaveBarProps) {
  const [smoothSubmitState, setSmoothSubmitState] = useState(false)

  const form = useFormContext<WidgetConfigPayload>()
  const isDirty = form.formState.isDirty
  const isFormSubmitting = form.formState.isSubmitting
  const formIsValid = form.formState.isValid
  const isVisible = isDirty || isFormSubmitting || !formIsValid

  useEffect(() => {
    if (isFormSubmitting) {
      setSmoothSubmitState(true)
      return
    }

    const handler = setTimeout(() => setSmoothSubmitState(false), 200)
    return () => clearTimeout(handler)
  }, [isFormSubmitting])

  const handleReset = () => {
    form.reset()
    if (onResetCallback) {
      onResetCallback()
    }
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out',
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-4 opacity-0 scale-95 pointer-events-none',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden backdrop-blur-sm rounded-full border px-4 py-2 bg-background/80 transition-[width] duration-200 ease-out',
          smoothSubmitState ? 'w-[120px]' : 'w-[320px]'
        )}
      >
        {smoothSubmitState ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Saving...</span>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-1 gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-nowrap">Unsaved Changes</span>
            </div>

            <div className="flex gap-2">
              <Button
                type="reset"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={smoothSubmitState}
                className="rounded-xl h-7 border"
              >
                Reset
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={smoothSubmitState || !formIsValid}
                className="rounded-xl h-7"
              >
                {smoothSubmitState ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
