import { PageLayout } from '@/components/page-layout';
import { SettingsNav } from '@/components/settings/settings-nav';
import { IconSettings } from '@tabler/icons-react';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout
      title="Settings"
      description="Manage your account settings and integrations."
      icon={IconSettings}
    >
      <div className="flex flex-col gap-8 px-4 lg:px-6 md:flex-row">
        {/* Settings Navigation */}
        <aside className="w-full md:w-52 shrink-0">
          <SettingsNav />
        </aside>

        {/* Settings Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </PageLayout>
  );
}
