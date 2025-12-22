/**
 * Integration Types for Audial Admin
 *
 * Type definitions for all integration platforms
 * Local-only state management (no API backend yet)
 */

export type IntegrationCategory =
  | 'voice-ai'
  | 'crm-sales'
  | 'communication'
  | 'automation'
  | 'calendar';

export interface IntegrationMetadata {
  id: string;
  platform: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  badge?: string;
  comingSoon?: boolean;
  featured?: boolean;
  websiteUrl?: string;
  docsUrl?: string;
  keywords?: string[];
}

export interface IntegrationState {
  isConnected: boolean;
  isActive: boolean;
  config?: Record<string, string>;
  connectedAt?: Date;
}

export interface IntegrationWithState extends IntegrationMetadata {
  isConnected: boolean;
  isActive: boolean;
  config?: Record<string, string>;
  connectedAt?: Date;
}

export interface CategoryMetadata {
  id: IntegrationCategory;
  title: string;
  description: string;
  order: number;
}

// Credential types for different platforms
export interface VAPICredentials {
  apiKey: string;
}

export interface TwilioCredentials {
  accountSid: string;
  authToken: string;
  phoneNumber?: string;
}

export interface ElevenLabsCredentials {
  apiKey: string;
}

export interface HubSpotCredentials {
  accessToken: string;
}

export interface SalesforceCredentials {
  instanceUrl: string;
  accessToken: string;
}

export interface SlackCredentials {
  webhookUrl: string;
}

export interface ZapierCredentials {
  webhookUrl: string;
}

export interface GoogleCalendarCredentials {
  accessToken: string;
  refreshToken: string;
}

// Union type for all platform credentials
export type PlatformCredentials =
  | VAPICredentials
  | TwilioCredentials
  | ElevenLabsCredentials
  | HubSpotCredentials
  | SalesforceCredentials
  | SlackCredentials
  | ZapierCredentials
  | GoogleCalendarCredentials;

// Platform field metadata for forms
export interface PlatformFieldMetadata {
  name: string;
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  required: boolean;
}

export interface PlatformFormMetadata {
  fields: PlatformFieldMetadata[];
  docsUrl?: string;
}
