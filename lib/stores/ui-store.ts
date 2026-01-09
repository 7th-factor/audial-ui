/**
 * UI State Store (Zustand)
 *
 * Centralized UI state management for selections, filters, and edit modes.
 * Persists filters to localStorage for faster UX on page revisits.
 * Pattern from chanl.
 *
 * Usage:
 * ```tsx
 * import { useUIStore, selectAgentFilters } from '@/lib/stores/ui-store';
 *
 * function AgentsPage() {
 *   // Use selector for optimized re-renders
 *   const filters = useUIStore(selectAgentFilters);
 *   const setFilters = useUIStore((s) => s.setFilters);
 *
 *   return <SearchInput onChange={(v) => setFilters('agents', { search: v })} />;
 * }
 * ```
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type EntityType =
  | "agents"
  | "calls"
  | "chats"
  | "customers"
  | "phoneNumbers"
  | "integrations"
  | "apiKeys"
  | "credentials"
  | "whatsappSenders";

export interface EntitySelection {
  selectedIds: string[];
  selectAll: boolean;
}

export interface EntityFilters {
  search: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

export interface EditModeState {
  entityType: EntityType | null;
  entityId: string | null;
  isEditing: boolean;
  hasUnsavedChanges: boolean;
}

export interface UIState {
  // ========== Entity Selections (for bulk operations) ==========
  selections: Record<EntityType, EntitySelection>;

  // ========== Entity Filters (persisted to localStorage) ==========
  filters: Record<EntityType, EntityFilters>;

  // ========== Edit Mode State ==========
  editMode: EditModeState;

  // ========== Actions ==========
  setSelection: (
    entity: EntityType,
    selection: Partial<EntitySelection>,
  ) => void;
  clearSelection: (entity: EntityType) => void;
  toggleSelection: (entity: EntityType, id: string) => void;
  selectAll: (entity: EntityType, ids: string[]) => void;
  deselectAll: (entity: EntityType) => void;

  setFilters: (entity: EntityType, filters: Partial<EntityFilters>) => void;
  resetFilters: (entity: EntityType) => void;
  resetAllFilters: () => void;

  setEditMode: (editMode: Partial<EditModeState>) => void;
  enterEditMode: (entityType: EntityType, entityId: string) => void;
  exitEditMode: () => void;
  setUnsavedChanges: (hasChanges: boolean) => void;
}

// ============================================================================
// DEFAULTS
// ============================================================================

const defaultSelection: EntitySelection = {
  selectedIds: [],
  selectAll: false,
};

const defaultFilters: EntityFilters = {
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

const defaultEditMode: EditModeState = {
  entityType: null,
  entityId: null,
  isEditing: false,
  hasUnsavedChanges: false,
};

const createDefaultSelections = (): Record<EntityType, EntitySelection> => ({
  agents: { ...defaultSelection },
  calls: { ...defaultSelection },
  chats: { ...defaultSelection },
  customers: { ...defaultSelection },
  phoneNumbers: { ...defaultSelection },
  integrations: { ...defaultSelection },
  apiKeys: { ...defaultSelection },
  credentials: { ...defaultSelection },
  whatsappSenders: { ...defaultSelection },
});

const createDefaultFilters = (): Record<EntityType, EntityFilters> => ({
  agents: { ...defaultFilters },
  calls: { ...defaultFilters },
  chats: { ...defaultFilters },
  customers: { ...defaultFilters },
  phoneNumbers: { ...defaultFilters },
  integrations: { ...defaultFilters },
  apiKeys: { ...defaultFilters },
  credentials: { ...defaultFilters },
  whatsappSenders: { ...defaultFilters },
});

// ============================================================================
// STORE
// ============================================================================

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        selections: createDefaultSelections(),
        filters: createDefaultFilters(),
        editMode: { ...defaultEditMode },

        // ========== Selection Actions ==========
        setSelection: (entity, selection) =>
          set(
            (state) => ({
              selections: {
                ...state.selections,
                [entity]: { ...state.selections[entity], ...selection },
              },
            }),
            false,
            `setSelection/${entity}`,
          ),

        clearSelection: (entity) =>
          set(
            (state) => ({
              selections: {
                ...state.selections,
                [entity]: { ...defaultSelection },
              },
            }),
            false,
            `clearSelection/${entity}`,
          ),

        toggleSelection: (entity, id) =>
          set(
            (state) => {
              const current = state.selections[entity];
              const isSelected = current.selectedIds.includes(id);
              const newSelectedIds = isSelected
                ? current.selectedIds.filter((i) => i !== id)
                : [...current.selectedIds, id];

              return {
                selections: {
                  ...state.selections,
                  [entity]: {
                    ...current,
                    selectedIds: newSelectedIds,
                    selectAll: false, // Deselect "all" when individual item is toggled
                  },
                },
              };
            },
            false,
            `toggleSelection/${entity}`,
          ),

        selectAll: (entity, ids) =>
          set(
            (state) => ({
              selections: {
                ...state.selections,
                [entity]: {
                  selectedIds: ids,
                  selectAll: true,
                },
              },
            }),
            false,
            `selectAll/${entity}`,
          ),

        deselectAll: (entity) =>
          set(
            (state) => ({
              selections: {
                ...state.selections,
                [entity]: { ...defaultSelection },
              },
            }),
            false,
            `deselectAll/${entity}`,
          ),

        // ========== Filter Actions ==========
        setFilters: (entity, filters) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                [entity]: { ...state.filters[entity], ...filters },
              },
            }),
            false,
            `setFilters/${entity}`,
          ),

        resetFilters: (entity) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                [entity]: { ...defaultFilters },
              },
            }),
            false,
            `resetFilters/${entity}`,
          ),

        resetAllFilters: () =>
          set(
            { filters: createDefaultFilters() },
            false,
            "resetAllFilters",
          ),

        // ========== Edit Mode Actions ==========
        setEditMode: (editMode) =>
          set(
            (state) => ({
              editMode: { ...state.editMode, ...editMode },
            }),
            false,
            "setEditMode",
          ),

        enterEditMode: (entityType, entityId) =>
          set(
            {
              editMode: {
                entityType,
                entityId,
                isEditing: true,
                hasUnsavedChanges: false,
              },
            },
            false,
            "enterEditMode",
          ),

        exitEditMode: () =>
          set({ editMode: { ...defaultEditMode } }, false, "exitEditMode"),

        setUnsavedChanges: (hasChanges) =>
          set(
            (state) => ({
              editMode: { ...state.editMode, hasUnsavedChanges: hasChanges },
            }),
            false,
            "setUnsavedChanges",
          ),
      }),
      {
        name: "audial-ui-store",
        // Only persist filters (not selections or edit mode)
        partialize: (state) => ({
          filters: state.filters,
        }),
      },
    ),
    {
      name: "UIStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

// ============================================================================
// SELECTORS (for optimized re-renders)
// ============================================================================

// Filter selectors
export const selectAgentFilters = (state: UIState) => state.filters.agents;
export const selectCallFilters = (state: UIState) => state.filters.calls;
export const selectChatFilters = (state: UIState) => state.filters.chats;
export const selectCustomerFilters = (state: UIState) => state.filters.customers;
export const selectPhoneNumberFilters = (state: UIState) => state.filters.phoneNumbers;
export const selectIntegrationFilters = (state: UIState) => state.filters.integrations;
export const selectApiKeyFilters = (state: UIState) => state.filters.apiKeys;
export const selectCredentialFilters = (state: UIState) => state.filters.credentials;
export const selectWhatsappSenderFilters = (state: UIState) => state.filters.whatsappSenders;

// Selection selectors
export const selectAgentSelection = (state: UIState) => state.selections.agents;
export const selectCallSelection = (state: UIState) => state.selections.calls;
export const selectChatSelection = (state: UIState) => state.selections.chats;
export const selectCustomerSelection = (state: UIState) => state.selections.customers;
export const selectPhoneNumberSelection = (state: UIState) => state.selections.phoneNumbers;
export const selectIntegrationSelection = (state: UIState) => state.selections.integrations;
export const selectApiKeySelection = (state: UIState) => state.selections.apiKeys;
export const selectCredentialSelection = (state: UIState) => state.selections.credentials;
export const selectWhatsappSenderSelection = (state: UIState) => state.selections.whatsappSenders;

// Edit mode selectors
export const selectEditMode = (state: UIState) => state.editMode;
export const selectIsEditing = (state: UIState) => state.editMode.isEditing;
export const selectHasUnsavedChanges = (state: UIState) => state.editMode.hasUnsavedChanges;

// Action selectors (stable references)
export const selectSetFilters = (state: UIState) => state.setFilters;
export const selectResetFilters = (state: UIState) => state.resetFilters;
export const selectToggleSelection = (state: UIState) => state.toggleSelection;
export const selectClearSelection = (state: UIState) => state.clearSelection;
