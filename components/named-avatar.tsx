"use client"

import { cn } from "@/lib/utils"

// Generate a consistent color based on initials
function getColorFromInitials(initials: string): { bg: string; text: string } {
  const colors = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-lime-100", text: "text-lime-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-emerald-100", text: "text-emerald-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-cyan-100", text: "text-cyan-700" },
    { bg: "bg-sky-100", text: "text-sky-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-violet-100", text: "text-violet-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
  ]

  // Generate hash from initials
  let hash = 0
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

interface NamedAvatarProps {
  name: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "size-6 text-xs",
  md: "size-8 text-sm",
  lg: "size-10 text-base",
}

export function NamedAvatar({ name, size = "md", className }: NamedAvatarProps) {
  const initials = getInitials(name)
  const colors = getColorFromInitials(initials)

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md font-medium",
        sizeClasses[size],
        colors.bg,
        colors.text,
        className,
      )}
    >
      {initials}
    </div>
  )
}

// Grouped avatar display with overlap
interface NamedAvatarGroupProps {
  names: string[]
  size?: "sm" | "md" | "lg"
  max?: number
  className?: string
}

export function NamedAvatarGroup({ names, size = "md", max = 4, className }: NamedAvatarGroupProps) {
  const visible = names.slice(0, max)
  const overflow = names.length - max

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((name, index) => (
        <NamedAvatar key={index} name={name} size={size} className="border-2 border-background" />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md border-2 border-background bg-muted font-medium text-muted-foreground",
            sizeClasses[size],
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
