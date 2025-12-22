/**
 * Integrations Metadata for Audial Admin
 *
 * Centralized integration definitions for voice AI agent platform
 * Tailored for non-technical business users
 */

import type {
  IntegrationMetadata,
  IntegrationCategory,
  CategoryMetadata,
  PlatformFormMetadata,
} from '@/lib/integrations/types';

export const CATEGORIES: Record<IntegrationCategory, CategoryMetadata> = {
  'voice-ai': {
    id: 'voice-ai',
    title: 'Voice AI & Telephony',
    description: 'Connect your voice AI platforms and phone systems',
    order: 1,
  },
  'crm-sales': {
    id: 'crm-sales',
    title: 'CRM & Sales',
    description: 'Sync contacts and call data with your CRM',
    order: 2,
  },
  communication: {
    id: 'communication',
    title: 'Communication',
    description: 'Get notifications and updates in your team tools',
    order: 3,
  },
  automation: {
    id: 'automation',
    title: 'Automation',
    description: 'Trigger workflows based on call outcomes',
    order: 4,
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    description: 'Schedule calls and manage appointments',
    order: 5,
  },
};

export const INTEGRATIONS: IntegrationMetadata[] = [
  // Voice AI & Telephony
  {
    id: 'vapi',
    platform: 'vapi',
    name: 'VAPI',
    description: 'Build and deploy voice AI agents with real-time conversation handling',
    category: 'voice-ai',
    badge: 'Popular',
    featured: true,
    websiteUrl: 'https://vapi.ai',
    docsUrl: 'https://docs.vapi.ai',
    keywords: ['voice', 'ai', 'agent', 'vapi'],
  },
  {
    id: 'twilio',
    platform: 'twilio',
    name: 'Twilio',
    description: 'Connect phone numbers and manage call routing for your voice agents',
    category: 'voice-ai',
    featured: true,
    websiteUrl: 'https://twilio.com',
    docsUrl: 'https://www.twilio.com/docs',
    keywords: ['telephony', 'phone', 'sms', 'voice'],
  },
  {
    id: 'elevenlabs',
    platform: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Add natural-sounding AI voices to your agents',
    category: 'voice-ai',
    badge: 'Popular',
    websiteUrl: 'https://elevenlabs.io',
    docsUrl: 'https://elevenlabs.io/docs',
    keywords: ['tts', 'voice', 'synthesis', 'audio'],
  },
  {
    id: 'bland-ai',
    platform: 'bland',
    name: 'Bland AI',
    description: 'Enterprise voice agents for outbound calling campaigns',
    category: 'voice-ai',
    comingSoon: true,
    websiteUrl: 'https://bland.ai',
    keywords: ['voice', 'agent', 'outbound', 'enterprise'],
  },
  {
    id: 'retell-ai',
    platform: 'retell',
    name: 'Retell AI',
    description: 'Low-latency conversational AI for phone and web calls',
    category: 'voice-ai',
    badge: 'Popular',
    comingSoon: true,
    websiteUrl: 'https://retellai.com',
    keywords: ['voice', 'agent', 'conversational', 'realtime'],
  },

  // CRM & Sales
  {
    id: 'hubspot',
    platform: 'hubspot',
    name: 'HubSpot',
    description: 'Sync call logs, contacts, and outcomes to HubSpot CRM',
    category: 'crm-sales',
    badge: 'Popular',
    comingSoon: true,
    featured: true,
    websiteUrl: 'https://hubspot.com',
    keywords: ['crm', 'sales', 'marketing', 'contacts'],
  },
  {
    id: 'salesforce',
    platform: 'salesforce',
    name: 'Salesforce',
    description: 'Connect your Salesforce CRM for automatic data sync',
    category: 'crm-sales',
    badge: 'Enterprise',
    comingSoon: true,
    websiteUrl: 'https://salesforce.com',
    keywords: ['crm', 'enterprise', 'sales', 'leads'],
  },

  // Communication
  {
    id: 'slack',
    platform: 'slack',
    name: 'Slack',
    description: 'Get call notifications and summaries in Slack channels',
    category: 'communication',
    badge: 'Popular',
    comingSoon: true,
    featured: true,
    websiteUrl: 'https://slack.com',
    keywords: ['messaging', 'notifications', 'team', 'alerts'],
  },
  {
    id: 'email',
    platform: 'email',
    name: 'Email Notifications',
    description: 'Receive call summaries and alerts via email',
    category: 'communication',
    comingSoon: true,
    keywords: ['email', 'notifications', 'reports'],
  },

  // Automation
  {
    id: 'zapier',
    platform: 'zapier',
    name: 'Zapier',
    description: 'Connect Audial with 5,000+ apps through automated workflows',
    category: 'automation',
    badge: 'Popular',
    comingSoon: true,
    featured: true,
    websiteUrl: 'https://zapier.com',
    keywords: ['automation', 'workflows', 'integration', 'nocode'],
  },
  {
    id: 'make',
    platform: 'make',
    name: 'Make',
    description: 'Build powerful automation scenarios with visual workflows',
    category: 'automation',
    comingSoon: true,
    websiteUrl: 'https://make.com',
    keywords: ['automation', 'workflows', 'integration'],
  },

  // Calendar
  {
    id: 'google-calendar',
    platform: 'google-calendar',
    name: 'Google Calendar',
    description: 'Schedule and manage follow-up calls automatically',
    category: 'calendar',
    badge: 'Popular',
    comingSoon: true,
    featured: true,
    websiteUrl: 'https://calendar.google.com',
    keywords: ['calendar', 'scheduling', 'appointments', 'google'],
  },
];

// Platform form configurations for setup dialogs
export const PLATFORM_FORMS: Record<string, PlatformFormMetadata> = {
  vapi: {
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: 'Enter your VAPI API key',
        required: true,
      },
    ],
    docsUrl: 'https://docs.vapi.ai/api-reference/authentication',
  },
  twilio: {
    fields: [
      {
        name: 'accountSid',
        label: 'Account SID',
        type: 'text',
        placeholder: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        required: true,
      },
      {
        name: 'authToken',
        label: 'Auth Token',
        type: 'password',
        placeholder: 'Enter your Twilio Auth Token',
        required: true,
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'text',
        placeholder: '+1234567890 (optional)',
        required: false,
      },
    ],
    docsUrl: 'https://www.twilio.com/docs/usage/api',
  },
  elevenlabs: {
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: 'Enter your ElevenLabs API key',
        required: true,
      },
    ],
    docsUrl: 'https://elevenlabs.io/docs/api-reference/authentication',
  },
};

// Helper Functions

export function getIntegrationById(id: string): IntegrationMetadata | undefined {
  return INTEGRATIONS.find((integration) => integration.id === id);
}

export function getIntegrationsByCategory(categoryId: IntegrationCategory): IntegrationMetadata[] {
  return INTEGRATIONS.filter((integration) => integration.category === categoryId);
}

export function searchIntegrations(query: string): IntegrationMetadata[] {
  const lowerQuery = query.toLowerCase();
  return INTEGRATIONS.filter(
    (integration) =>
      integration.name.toLowerCase().includes(lowerQuery) ||
      integration.description.toLowerCase().includes(lowerQuery) ||
      integration.badge?.toLowerCase().includes(lowerQuery) ||
      integration.keywords?.some((keyword) => keyword.includes(lowerQuery))
  );
}

export function getFeaturedIntegrations(): IntegrationMetadata[] {
  return INTEGRATIONS.filter((integration) => integration.featured);
}

export function getComingSoonIntegrations(): IntegrationMetadata[] {
  return INTEGRATIONS.filter((integration) => integration.comingSoon);
}

export function getCategoriesInOrder(): CategoryMetadata[] {
  return Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
}

export function getIntegrationCount(): number {
  return INTEGRATIONS.length;
}

export function getIntegrationCountByCategory(categoryId: IntegrationCategory): number {
  return getIntegrationsByCategory(categoryId).length;
}

export function getPlatformForm(platform: string): PlatformFormMetadata | undefined {
  return PLATFORM_FORMS[platform];
}
