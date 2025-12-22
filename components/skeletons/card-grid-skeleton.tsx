"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface CardGridSkeletonProps {
  /** Number of cards to display */
  cards?: number
  /** Grid columns configuration */
  columns?: 1 | 2 | 3 | 4
  /** Card height variant */
  variant?: "compact" | "standard" | "detailed"
  /** Additional className for the container */
  className?: string
}

export function CardGridSkeleton({
  cards = 6,
  columns = 3,
  variant = "standard",
  className,
}: CardGridSkeletonProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  const cardContent = {
    compact: (
      <CardContent className="pt-0">
        <Skeleton className="h-8 w-20" />
      </CardContent>
    ),
    standard: (
      <>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24" />
        </CardContent>
      </>
    ),
    detailed: (
      <>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-1 h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardContent>
      </>
    ),
  }

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {Array.from({ length: cards }).map((_, i) => (
        <Card key={i}>
          {cardContent[variant]}
        </Card>
      ))}
    </div>
  )
}
