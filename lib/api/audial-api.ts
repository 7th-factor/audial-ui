/**
 * Audial API Wrapper
 *
 * High-level API wrapper that provides workspace-initialized, domain-specific
 * methods built on top of the existing apiClient infrastructure.
 * Pattern from chanl-api.
 *
 * Architecture:
 * - Wraps existing apiClient rather than duplicating HTTP logic
 * - Reuses proven token management, error handling
 * - Provides clean workspace-aware APIs
 * - Single HTTP client across entire application
 *
 * Usage:
 * ```typescript
 * // Clean API calls everywhere
 * const agents = await audialApi.agents.list()
 * const calls = await audialApi.calls.list()
 * const agent = await audialApi.agents.get('123')
 * ```
 */

import { apiClient } from './client';
import type {
  Agent,
  CreateAgentInput,
  UpdateAgentInput,
  Call,
  CallDetail,
  CreateCallInput,
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
  Chat,
  CreateChatInput,
  PhoneNumber,
  CreatePhoneNumberInput,
  UpdatePhoneNumberInput,
  AvailablePhoneNumber,
  PurchasePhoneNumberInput,
  PurchasedPhoneNumber,
  Credential,
  CredentialType,
  CreateCredentialInput,
  UpdateCredentialInput,
  DeleteCredentialInput,
  PrivateKey,
  PublicKey,
  CreateKeyInput,
  CreateKeyResponse,
  DeleteKeyInput,
  DeleteKeyResponse,
  DeleteResponse,
  WebSocketRoom,
  CreateWebSocketRoomInput,
} from './types';
import type { Workspace, CreateWorkspaceInput } from './types/workspace';
import type {
  DeepgramSTTModel,
  OpenAIModel,
  ElevenLabsVoice,
} from './services/integrations';

// ============================================================================
// AUDIAL API WRAPPER
// ============================================================================

/**
 * Domain-organized API wrapper
 *
 * Provides clean, workspace-aware methods for all API operations.
 * Delegates to the existing apiClient for HTTP operations.
 */
export const audialApi = {
  // =========================================================================
  // AGENTS
  // =========================================================================
  agents: {
    /** List all agents */
    list: () => apiClient.get<Agent[]>('/api/v1/agents'),

    /** Get agent by ID */
    get: (id: string) => apiClient.get<Agent>(`/api/v1/agents/${id}`),

    /** Create a new agent */
    create: (data: CreateAgentInput) =>
      apiClient.post<Agent>('/api/v1/agents', data),

    /** Update an agent */
    update: (id: string, data: UpdateAgentInput) =>
      apiClient.put<Agent>(`/api/v1/agents/${id}`, data),

    /** Delete an agent */
    delete: (id: string) => apiClient.delete(`/api/v1/agents/${id}`),
  },

  // =========================================================================
  // CALLS
  // =========================================================================
  calls: {
    /** List all calls */
    list: () => apiClient.get<Call[]>('/api/v1/call'),

    /** Get call by ID (includes full details like messages) */
    get: (id: string) => apiClient.get<CallDetail>(`/api/v1/call/${id}`),

    /** Create a new outbound call with agent settings */
    create: (data: CreateCallInput) =>
      apiClient.post<CallDetail>('/api/v1/call/create', data),

    /** Create a new outbound call with agent ID */
    createByAgentId: (data: {
      customer: CreateCallInput['customer'];
      agentId: string;
      phoneNumber: CreateCallInput['phoneNumber'];
    }) => apiClient.post<CallDetail>('/api/v1/call/create', data),

    /** Get WebSocket room by ID (requires public key) */
    getWebSocketRoom: (roomId: string, publicKey: string) =>
      apiClient.get<WebSocketRoom>(
        `/api/v1/call/websocket/room/${roomId}?public_key=${publicKey}`
      ),

    /** Create a WebSocket room (requires public key) */
    createWebSocketRoom: (data: CreateWebSocketRoomInput, publicKey: string) =>
      apiClient.post<WebSocketRoom>(
        `/api/v1/call/websocket/create?public_key=${publicKey}`,
        data
      ),
  },

  // =========================================================================
  // CUSTOMERS
  // =========================================================================
  customers: {
    /** List all customers */
    list: () => apiClient.get<Customer[]>('/api/v1/customers'),

    /** Get customer by ID */
    get: (id: string) => apiClient.get<Customer>(`/api/v1/customers/${id}`),

    /** Create a new customer */
    create: (data: CreateCustomerInput) =>
      apiClient.post<Customer>('/api/v1/customers', data),

    /** Update a customer */
    update: (id: string, data: UpdateCustomerInput) =>
      apiClient.put<Customer>(`/api/v1/customers/${id}`, data),

    /** Delete a customer */
    delete: (id: string) =>
      apiClient.delete<DeleteResponse>(`/api/v1/customers/${id}`),
  },

  // =========================================================================
  // CHATS
  // =========================================================================
  chats: {
    /** List all chats */
    list: () => apiClient.get<Chat[]>('/api/v1/chat'),

    /** Get chat by ID */
    get: (id: string) => apiClient.get<Chat>(`/api/v1/chat/${id}`),

    /** Create a new chat (WhatsApp or REST API) */
    create: (data: CreateChatInput) =>
      apiClient.post<Chat>('/api/v1/chat/create', data),
  },

  // =========================================================================
  // PHONE NUMBERS
  // =========================================================================
  phoneNumbers: {
    /** List all phone numbers */
    list: () => apiClient.get<PhoneNumber[]>('/api/v1/phone-numbers'),

    /** Get phone number by ID */
    get: (id: string) =>
      apiClient.get<PhoneNumber>(`/api/v1/phone-numbers/${id}`),

    /** Create a new phone number (Twilio or Vonage) */
    create: (data: CreatePhoneNumberInput) =>
      apiClient.post<PhoneNumber>('/api/v1/phone-numbers', data),

    /** Update a phone number */
    update: (id: string, data: UpdatePhoneNumberInput) =>
      apiClient.put<PhoneNumber>(`/api/v1/phone-numbers/${id}`, data),

    /** Delete a phone number */
    delete: (id: string) => apiClient.delete(`/api/v1/phone-numbers/${id}`),

    /** List available phone numbers for purchase */
    listAvailable: () =>
      apiClient.get<AvailablePhoneNumber[]>('/api/v1/phone-numbers/available'),

    /** List purchased (Audial-managed) phone numbers */
    listPurchased: () =>
      apiClient.get<PurchasedPhoneNumber[]>(
        '/api/v1/phone-numbers?provider=audial'
      ),

    /** Purchase a phone number (Audial-managed) */
    purchase: (data: PurchasePhoneNumberInput) =>
      apiClient.post<PurchasedPhoneNumber>(
        '/api/v1/phone-numbers/purchase',
        data
      ),
  },

  // =========================================================================
  // WORKSPACES
  // =========================================================================
  workspaces: {
    /** List all workspaces for the current user */
    list: () => apiClient.get<Workspace[]>('/api/auth/list-workspaces'),

    /** Create a new workspace */
    create: (data: CreateWorkspaceInput) =>
      apiClient.post<Workspace>('/api/auth/create-workspace', data),
  },

  // =========================================================================
  // CREDENTIALS
  // =========================================================================
  credentials: {
    /** List all credentials */
    list: () => apiClient.get<Credential[]>('/api/credentials'),

    /** Get credential by type and ID */
    get: (type: CredentialType, id: string) =>
      apiClient.get<Credential>(`/api/credentials/${type}/${id}`),

    /** Create a new credential */
    create: (data: CreateCredentialInput) =>
      apiClient.post<Credential>('/api/credentials', data),

    /** Update a credential */
    update: (data: UpdateCredentialInput) =>
      apiClient.put<Credential>('/api/credentials', data),

    /** Delete a credential */
    delete: (data: DeleteCredentialInput) =>
      apiClient.deleteWithBody('/api/credentials', data),
  },

  // =========================================================================
  // API KEYS
  // =========================================================================
  apiKeys: {
    /** List all private keys */
    listPrivateKeys: () =>
      apiClient.get<PrivateKey[]>('/api/auth/list-private-keys'),

    /** List all public keys */
    listPublicKeys: () =>
      apiClient.get<PublicKey[]>('/api/auth/list-public-keys'),

    /** Create a new API key (private or public) */
    create: (data: CreateKeyInput) =>
      apiClient.post<CreateKeyResponse>('/api/auth/create-key', data),

    /** Delete an API key (JWT auth only) */
    delete: (data: DeleteKeyInput) =>
      apiClient.deleteWithBody<DeleteKeyResponse>('/api/auth/delete-key', data),
  },

  // =========================================================================
  // INTEGRATIONS
  // =========================================================================
  integrations: {
    /** List available Deepgram STT models */
    listDeepgramModels: () =>
      apiClient.get<DeepgramSTTModel[]>(
        '/api/integrations/deepgram/list-stt-models'
      ),

    /** List available OpenAI models */
    listOpenAIModels: () =>
      apiClient.get<OpenAIModel[]>('/api/integrations/openai/list-models'),

    /** List available ElevenLabs voices */
    listElevenLabsVoices: () =>
      apiClient.get<ElevenLabsVoice[]>(
        '/api/integrations/elevenlabs/list-voices'
      ),
  },

  // =========================================================================
  // HEALTH
  // =========================================================================
  health: {
    /** Check API health */
    check: () => apiClient.get<{ status: string }>('/health'),
  },
};

// Re-export for convenience
export type { Agent, Call, CallDetail, Customer, Chat, PhoneNumber, Credential };
