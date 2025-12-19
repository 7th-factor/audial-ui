import { IconLayoutDashboard } from "@tabler/icons-react"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { PageLayout } from "@/components/page-layout"
import { SectionCards } from "@/components/section-cards"

import data from "../data.json"

export default function AnalyticsPage() {
  return (
    <PageLayout title="Dashboard" description="Overview of your analytics and metrics." icon={IconLayoutDashboard}>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </PageLayout>
  )
}
