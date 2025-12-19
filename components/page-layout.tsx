import type React from "react"
import type { LucideIcon } from "lucide-react"
import type { Icon } from "@tabler/icons-react"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: LucideIcon | Icon
  actions?: React.ReactNode
}

export function PageLayout({ children, title, description, icon: Icon, actions }: PageLayoutProps) {
  const hasHeader = title || description || Icon || actions

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      {hasHeader && (
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            )}
            <div>
              {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 md:gap-6">{children}</div>
    </div>
  )
}
