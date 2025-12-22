'use client';

/**
 * Call Details Layout
 *
 * Overrides the default dashboard content wrapper to enable full-height
 * independent scrolling panels (Intercom-like experience).
 *
 * The parent dashboard layout applies:
 * - py-4 md:py-6 (vertical padding)
 * - px-4 lg:px-6 (horizontal padding)
 *
 * This layout:
 * - Counteracts only bottom padding to extend content area
 * - Keeps top padding from parent for proper spacing below header
 * - Constrains height to viewport minus header and top padding
 * - Enables children to manage their own scroll
 */
export default function CallDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mb-4 md:-mb-6 h-[calc(100vh-var(--header-height)-1.5rem)] overflow-hidden">
      {children}
    </div>
  );
}
