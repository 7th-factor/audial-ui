'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CallsListSidebar } from '@/components/calls/calls-list-sidebar';

/**
 * Call Details Layout
 *
 * Overrides the default dashboard content wrapper to enable full-height
 * independent scrolling panels (Intercom-like experience).
 *
 * The sidebar is placed here (layout level) so it persists across call
 * navigation without re-fetching data.
 */
export default function CallDetailsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Extract call ID from pathname (/inbox/{id})
  const callId = pathname.split('/').pop() || '';

  return (
    <div className="-mb-4 md:-mb-6 h-[calc(100vh-var(--header-height)-1.5rem)] overflow-hidden">
      <div className="flex h-full w-full overflow-hidden gap-4 p-4 px-6">
        {/* Left Panel: Calls List Sidebar - persists across navigations */}
        <CallsListSidebar
          currentCallId={callId}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Main Content Area */}
        {children}
      </div>
    </div>
  );
}
