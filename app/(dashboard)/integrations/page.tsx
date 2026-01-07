'use client';

import { useState, useMemo } from 'react';
import { IconPlugConnected } from '@tabler/icons-react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { IntegrationCard } from '@/components/integrations/integration-card';
import { IntegrationSetupDialog } from '@/components/integrations/integration-setup-dialog';
import { CategoryTabs } from '@/components/integrations/category-tabs';
import { IntegrationSearch } from '@/components/integrations/integration-search';

import { getCategoriesInOrder, getIntegrationCount } from '@/lib/data/integrations-metadata';
import { useIntegrationStore } from '@/lib/stores/integration-store';
import { useCredentials } from '@/lib/api';
import type { IntegrationWithState, IntegrationCategory } from '@/lib/integrations/types';

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConnectedOnly, setShowConnectedOnly] = useState(false);
  const [setupDialog, setSetupDialog] = useState<{
    open: boolean;
    integration: IntegrationWithState | null;
  }>({ open: false, integration: null });

  // Zustand store for local state
  const { getIntegrationsWithState, toggleIntegration: toggleInStore } = useIntegrationStore();
  const localIntegrations = getIntegrationsWithState();

  // Fetch real credentials from API
  const { data: credentials } = useCredentials();

  // Map credential providers to integration IDs
  const credentialProviderToIntegrationId: Record<string, string> = {
    openai: 'openai',
    deepgram: 'deepgram',
    elevenlabs: 'elevenlabs',
    langfuse: 'langfuse',
  };

  // Merge local state with real credential status
  const integrations = useMemo(() => {
    // Handle different API response formats
    const credentialsList = Array.isArray(credentials)
      ? credentials
      : (credentials as unknown as { data?: typeof credentials })?.data ?? [];

    return localIntegrations.map((integration) => {
      // Check if this integration has a real credential
      const hasCredential = credentialsList.some((cred) => {
        const mappedId = credentialProviderToIntegrationId[cred.provider];
        return mappedId === integration.id;
      });

      // If there's a real credential, mark as connected
      if (hasCredential) {
        return {
          ...integration,
          isConnected: true,
          isActive: integration.isActive ?? true,
        };
      }

      return integration;
    });
  }, [localIntegrations, credentials]);

  // Categories for display
  const categories = getCategoriesInOrder();
  const integrationCount = getIntegrationCount();

  // Filter integrations based on tab and search
  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) => {
        if (activeTab !== 'all') {
          return category.id === activeTab;
        }
        return true;
      })
      .map((category) => {
        let categoryIntegrations = integrations.filter((i) => i.category === category.id);

        // Filter by connected switch
        if (showConnectedOnly) {
          categoryIntegrations = categoryIntegrations.filter((i) => i.isConnected);
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          categoryIntegrations = categoryIntegrations.filter(
            (integration) =>
              integration.name.toLowerCase().includes(query) ||
              integration.description.toLowerCase().includes(query) ||
              integration.badge?.toLowerCase().includes(query) ||
              integration.keywords?.some((kw) => kw.toLowerCase().includes(query))
          );
        }

        return {
          category,
          integrations: categoryIntegrations,
        };
      })
      .filter((group) => group.integrations.length > 0);
  }, [categories, integrations, activeTab, searchQuery, showConnectedOnly]);

  const handleSetupIntegration = (integration: IntegrationWithState) => {
    if (integration.comingSoon) {
      toast.info(`${integration.name} integration coming soon!`);
      return;
    }

    setSetupDialog({
      open: true,
      integration,
    });
  };

  const handleToggleIntegration = (integration: IntegrationWithState, checked: boolean) => {
    // If not connected, open setup dialog
    if (!integration.isConnected && checked) {
      handleSetupIntegration(integration);
      return;
    }

    // Toggle active state
    if (integration.isConnected) {
      toggleInStore(integration.id);
      toast.success(`${integration.name} ${checked ? 'enabled' : 'disabled'}`);
    }
  };

  return (
    <>
      <PageLayout
        title="Integrations"
        description={`Connect Audial with ${integrationCount}+ tools and platforms`}
        icon={IconPlugConnected}
        actions={
          <Button variant="outline" asChild>
            <a
              href="https://docs.audial.co/integrations"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              API Docs
            </a>
          </Button>
        }
      >
        <div className="flex flex-col h-full px-4 lg:px-6">
          {/* Tabs & Search */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <IntegrationSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showConnectedOnly={showConnectedOnly}
              onConnectedOnlyChange={setShowConnectedOnly}
            />
          </div>

          {/* Integration Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-10 pb-8">
              {filteredCategories.map((group) => (
                <div key={group.category.id} className="space-y-4">
                  {/* Category Header */}
                  <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-2">
                    <h2 className="text-lg font-semibold">{group.category.title}</h2>
                    <p className="text-sm text-muted-foreground">{group.category.description}</p>
                  </div>

                  {/* Integration Cards Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-1">
                    {group.integrations.map((integration) => (
                      <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onSetup={handleSetupIntegration}
                        onToggle={handleToggleIntegration}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No integrations found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLayout>

      <IntegrationSetupDialog
        open={setupDialog.open}
        onOpenChange={(open) => setSetupDialog({ ...setupDialog, open })}
        integration={setupDialog.integration}
      />
    </>
  );
}
