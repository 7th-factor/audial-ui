'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCategoriesInOrder } from '@/lib/data/integrations-metadata';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TABS = [
  { label: 'All', value: 'all' },
  ...getCategoriesInOrder().map((cat) => ({
    label: cat.title.replace(' & ', ' / '),
    value: cat.id,
  })),
];

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="inline-flex overflow-x-auto">
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
