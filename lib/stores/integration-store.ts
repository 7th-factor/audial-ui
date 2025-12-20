/**
 * Integration Store - Zustand with localStorage persistence
 *
 * Manages integration connection state locally
 * No API backend - all data stored in localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IntegrationState, IntegrationWithState } from '@/lib/integrations/types';
import { INTEGRATIONS } from '@/lib/data/integrations-metadata';

interface IntegrationStore {
  // State: Map of integration ID to connection state
  integrationStates: Record<string, IntegrationState>;

  // Actions
  connectIntegration: (id: string, config: Record<string, string>) => void;
  disconnectIntegration: (id: string) => void;
  toggleIntegration: (id: string) => void;
  updateConfig: (id: string, config: Record<string, string>) => void;

  // Selectors
  getIntegrationState: (id: string) => IntegrationState | undefined;
  getIntegrationsWithState: () => IntegrationWithState[];
  getConnectedIntegrations: () => IntegrationWithState[];
  isConnected: (id: string) => boolean;
  isActive: (id: string) => boolean;
}

const defaultState: IntegrationState = {
  isConnected: false,
  isActive: false,
};

export const useIntegrationStore = create<IntegrationStore>()(
  persist(
    (set, get) => ({
      integrationStates: {},

      connectIntegration: (id: string, config: Record<string, string>) => {
        set((state) => ({
          integrationStates: {
            ...state.integrationStates,
            [id]: {
              isConnected: true,
              isActive: true,
              config,
              connectedAt: new Date(),
            },
          },
        }));
      },

      disconnectIntegration: (id: string) => {
        set((state) => {
          const { [id]: removed, ...rest } = state.integrationStates;
          return { integrationStates: rest };
        });
      },

      toggleIntegration: (id: string) => {
        set((state) => {
          const current = state.integrationStates[id];
          if (!current) return state;

          return {
            integrationStates: {
              ...state.integrationStates,
              [id]: {
                ...current,
                isActive: !current.isActive,
              },
            },
          };
        });
      },

      updateConfig: (id: string, config: Record<string, string>) => {
        set((state) => {
          const current = state.integrationStates[id];
          if (!current) return state;

          return {
            integrationStates: {
              ...state.integrationStates,
              [id]: {
                ...current,
                config,
              },
            },
          };
        });
      },

      getIntegrationState: (id: string) => {
        return get().integrationStates[id];
      },

      getIntegrationsWithState: () => {
        const states = get().integrationStates;
        return INTEGRATIONS.map((integration) => ({
          ...integration,
          isConnected: states[integration.id]?.isConnected ?? false,
          isActive: states[integration.id]?.isActive ?? false,
          config: states[integration.id]?.config,
          connectedAt: states[integration.id]?.connectedAt,
        }));
      },

      getConnectedIntegrations: () => {
        return get()
          .getIntegrationsWithState()
          .filter((i) => i.isConnected);
      },

      isConnected: (id: string) => {
        return get().integrationStates[id]?.isConnected ?? false;
      },

      isActive: (id: string) => {
        return get().integrationStates[id]?.isActive ?? false;
      },
    }),
    {
      name: 'audial-integrations',
      // Only persist the integrationStates, not the actions
      partialize: (state) => ({ integrationStates: state.integrationStates }),
    }
  )
);

// Hook for getting integration with state by ID
export function useIntegrationWithState(id: string): IntegrationWithState | undefined {
  const integration = INTEGRATIONS.find((i) => i.id === id);
  const state = useIntegrationStore((s) => s.integrationStates[id]);

  if (!integration) return undefined;

  return {
    ...integration,
    isConnected: state?.isConnected ?? false,
    isActive: state?.isActive ?? false,
    config: state?.config,
    connectedAt: state?.connectedAt,
  };
}
