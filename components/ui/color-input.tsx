'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ColorInputProps {
  value?: string
  onChange?: (value: string) => void
  onReset?: () => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function ColorInput({
  value = '#000000',
  onChange,
  onReset,
  disabled,
  className,
  placeholder = '#000000',
}: ColorInputProps) {
  const [inputValue, setInputValue] = React.useState(value)
  const colorInputId = React.useId()

  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setInputValue(newColor)
    onChange?.(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className={cn('relative', className)}>
      <input
        type="color"
        value={value}
        onChange={handleColorChange}
        disabled={disabled}
        className="sr-only"
        id={colorInputId}
      />

      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn('pl-12 pr-16', className)}
      />

      <label
        htmlFor={colorInputId}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-border cursor-pointer hover:scale-105 transition-transform"
        style={{ backgroundColor: value }}
      />

      {onReset && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground underline decoration-1 underline-offset-2"
        >
          Reset
        </Button>
      )}
    </div>
  )
}
