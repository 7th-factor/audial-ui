'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconUser,
  IconPhone,
  IconPlugConnected,
  IconCreditCard,
  IconUsers,
  IconListCheck,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const settingsNavItems = [
  {
    title: 'Account',
    url: '/settings/account',
    icon: IconUser,
  },
  {
    title: 'Phone numbers',
    url: '/settings/phone-numbers',
    icon: IconPhone,
  },
  {
    title: 'Follow-up Rules',
    url: '/settings/follow-up-rules',
    icon: IconListCheck,
  },
  {
    title: 'Integrations',
    url: '/settings/integrations',
    icon: IconPlugConnected,
  },
  {
    title: 'Billing',
    url: '/settings/billing',
    icon: IconCreditCard,
  },
  {
    title: 'Team',
    url: '/settings/team',
    icon: IconUsers,
  },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {settingsNavItems.map((item) => {
        const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
        const Icon = item.icon;

        return (
          <Link
            key={item.url}
            href={item.url}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
