'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IntegrationWithState } from '@/lib/integrations/types';

interface IntegrationCardProps {
  integration: IntegrationWithState;
  onSetup: (integration: IntegrationWithState) => void;
  onToggle: (integration: IntegrationWithState, checked: boolean) => void;
}

// Helper function to get logo path
function getLogoPath(id: string): string {
  // Map IDs to filenames when they differ
  const idToFilename: Record<string, string> = {
    'google-calendar': 'google-calendar.svg',
    'bland-ai': 'bland.png',
    'retell-ai': 'retell-ai.png',
  };

  if (idToFilename[id]) {
    return `/logos/${idToFilename[id]}`;
  }

  // Default to PNG, fallback handled by image error
  return `/logos/${id}.png`;
}

export function IntegrationCard({ integration, onSetup, onToggle }: IntegrationCardProps) {
  return (
    <div className="relative flex min-h-[170px] flex-col justify-between rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md">
      {/* Floating Badge */}
      {integration.badge && (
        <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs shadow-sm">
          {integration.badge}
        </Badge>
      )}

      {/* Coming Soon Overlay */}
      {integration.comingSoon && (
        <Badge
          variant="outline"
          className="absolute top-2 left-2 text-xs bg-muted text-muted-foreground"
        >
          Coming Soon
        </Badge>
      )}

      {/* Icon & Content */}
      <div className="mb-4 flex items-center gap-4">
        <div className="relative">
          <div
            className={cn(
              'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border bg-cover bg-center bg-no-repeat',
              integration.comingSoon && 'opacity-50'
            )}
            style={{
              backgroundImage: `url(${getLogoPath(integration.id)})`,
              backgroundColor: 'transparent',
            }}
            role="img"
            aria-label={integration.name}
          />
          {integration.isConnected && (
            <Badge
              variant="default"
              className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full p-0 bg-green-600 hover:bg-green-700 border-2 border-background flex items-center justify-center"
              title="Connected"
            >
              <CheckCircle2 className="h-3 w-3 text-white" />
            </Badge>
          )}
        </div>
        <div className={cn('flex-1 min-w-0', integration.comingSoon && 'opacity-70')}>
          <div className="text-base leading-normal font-medium">{integration.name}</div>
          <div className="text-xs leading-snug text-muted-foreground line-clamp-2">
            {integration.description}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSetup(integration)}
          disabled={integration.comingSoon}
        >
          <Settings className="h-3 w-3 mr-1" />
          {integration.comingSoon ? 'Soon' : integration.isConnected ? 'Settings' : 'Setup'}
        </Button>

        <Switch
          checked={integration.isActive}
          onCheckedChange={(checked) => onToggle(integration, checked)}
          disabled={!integration.isConnected || integration.comingSoon}
          className={cn(
            integration.isConnected && integration.isActive
              ? 'data-[state=checked]:bg-green-600 hover:data-[state=checked]:bg-green-700'
              : ''
          )}
        />
      </div>
    </div>
  );
}
