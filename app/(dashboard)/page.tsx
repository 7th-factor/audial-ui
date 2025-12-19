import { IconRocket } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"

export default function GetStartedPage() {
  return (
    <PageLayout
      title="Get Started"
      description="Welcome to Audial. Let's get you set up."
      icon={IconRocket}
      actions={<Button>Complete Setup</Button>}
    >
      <div className="flex flex-1 items-center justify-center px-4 lg:px-6">
        <p className="text-muted-foreground">Get started content goes here.</p>
      </div>
    </PageLayout>
  )
}
