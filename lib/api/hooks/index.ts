/**
 * API Hooks Index
 *
 * Re-exports all API hooks for convenient importing.
 */

// Agents
export { useAgents, useAgent, useCreateAgent, useUpdateAgent } from "./use-agents";

// Calls
export {
  useCalls,
  useCall,
  useCreateCall,
  useCreateCallByAgentId,
  useWebSocketRoom,
  useCreateWebSocketRoom,
} from "./use-calls";

// Customers
export {
  useCustomers,
  useCustomer,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "./use-customers";

// API Keys
export {
  usePrivateKeys,
  usePublicKeys,
  useCreateApiKey,
  useDeleteApiKey,
} from "./use-api-keys";

// Phone Numbers
export {
  usePhoneNumbers,
  usePhoneNumber,
  useCreatePhoneNumber,
  useUpdatePhoneNumber,
  useDeletePhoneNumber,
  useAvailablePhoneNumbers,
  usePurchasedPhoneNumbers,
  usePurchasePhoneNumber,
} from "./use-phone-numbers";

// Credentials
export {
  useCredentials,
  useCredential,
  useCreateCredential,
  useUpdateCredential,
  useDeleteCredential,
} from "./use-credentials";

// Integrations (Models & Voices)
export {
  useDeepgramModels,
  useOpenAIModels,
  useElevenLabsVoices,
} from "./use-integrations";

// Chats
export { useChats, useChat, useCreateChat } from "./use-chats";

// WhatsApp Senders
export {
  useWhatsAppSenders,
  useWhatsAppSender,
  useCreateWhatsAppSender,
  useUpdateWhatsAppSender,
  useDeleteWhatsAppSender,
} from "./use-whatsapp-senders";
