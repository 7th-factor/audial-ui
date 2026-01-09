import {
  Sparkles,
  Phone,
  Settings2,
  FileText,
  Calendar,
  MessageSquare,
  Zap,
  Users,
  Key,
  Plug,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

/**
 * Action metadata for getting-started page
 *
 * This centralized data structure makes it easy to:
 * - Add/remove/reorder features
 * - Search and filter actions
 * - Link actions to routes
 * - Track feature relationships
 */

export interface ActionMetadata {
  id: string; // Unique identifier for linking/tracking
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  badge?: string;
  external?: boolean;
  gradient: string;
  keywords?: string[]; // For enhanced search
  category: string; // Category reference
  disabled?: boolean; // Prevents navigation
  comingSoon?: boolean; // Shows "Coming Soon" badge
}

export interface CategoryMetadata {
  id: string;
  title: string;
  description: string;
  gradient: string; // Category-level gradient
  order: number; // Display order
}

export const CATEGORIES: Record<string, CategoryMetadata> = {
  "getting-started": {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Set up your agent, configure phone numbers, and start handling conversations",
    gradient: "from-indigo-500/20 via-violet-500/20 to-purple-500/20",
    order: 1,
  },
  "configure-agent": {
    id: "configure-agent",
    title: "Configure Agent",
    description:
      "Train your agent with instructions, upload knowledge base, and customize behavior",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    order: 2,
  },
  "integrations": {
    id: "integrations",
    title: "Integrations & Tools",
    description:
      "Connect calendars, APIs, and third-party services to extend your agent's capabilities",
    gradient: "from-blue-500/20 via-purple-500/20 to-pink-500/20",
    order: 3,
  },
};

export const ACTIONS: ActionMetadata[] = [
  // Getting Started
  {
    id: "get-phone-number",
    icon: Phone,
    title: "Get a Phone Number for Assistant",
    description: "Assign phone numbers for your agent to enable direct communication.",
    href: "/settings/phone-numbers",
    badge: "Start Here",
    gradient: CATEGORIES["getting-started"].gradient,
    category: "getting-started",
    keywords: ["phone", "number", "assign", "communication"],
  },
  {
    id: "customize-agent",
    icon: Settings2,
    title: "Customize Agent",
    description: "Set up your agent's basic configuration and preferences.",
    href: "/agent",
    gradient: CATEGORIES["getting-started"].gradient,
    category: "getting-started",
    keywords: ["agent", "customize", "setup", "configuration"],
  },
  {
    id: "test-agent",
    icon: MessageSquare,
    title: "Test Your Agent",
    description: "Try out your agent in the web widget to see how it handles conversations.",
    href: "/agent?tab=widget",
    gradient: CATEGORIES["getting-started"].gradient,
    category: "getting-started",
    keywords: ["test", "widget", "conversation", "try"],
  },

  // Configure Agent
  {
    id: "train-agent",
    icon: Settings2,
    title: "Train Agent with Instructions",
    description: "Define when the assistant should handle conversations or escalations.",
    href: "/agent?tab=rules",
    gradient: CATEGORIES["configure-agent"].gradient,
    category: "configure-agent",
    keywords: ["train", "instructions", "behavior", "escalation"],
  },
  {
    id: "upload-knowledge",
    icon: FileText,
    title: "Upload Knowledge-base",
    description: "Add documents and files to enhance your agent's knowledge and responses.",
    href: "#",
    gradient: CATEGORIES["configure-agent"].gradient,
    category: "configure-agent",
    keywords: ["knowledge", "upload", "files", "documents"],
    disabled: true,
    comingSoon: true,
  },

  // Integrations & Tools
  {
    id: "connect-calendar",
    icon: Calendar,
    title: "Connect Your Calendar",
    description: "Manage appointments via your connected calendar and let clients book you.",
    href: "/calendar",
    gradient: CATEGORIES["integrations"].gradient,
    category: "integrations",
    keywords: ["calendar", "appointments", "booking", "schedule"],
  },
  {
    id: "configure-tools",
    icon: Zap,
    title: "Configure Tools & Integrations",
    description: "Set up function calling, integrations, and tools your agents can use.",
    href: "#",
    gradient: CATEGORIES["integrations"].gradient,
    category: "integrations",
    keywords: ["tools", "integrations", "functions", "api"],
    disabled: true,
    comingSoon: true,
  },
  {
    id: "generate-api-keys",
    icon: Key,
    title: "Generate API Keys",
    description: "Create and manage API keys for secure programmatic access.",
    href: "/api-keys",
    gradient: CATEGORIES["integrations"].gradient,
    category: "integrations",
    keywords: ["api", "keys", "authentication", "security"],
  },
  {
    id: "invite-team",
    icon: Users,
    title: "Invite Team Members",
    description: "Collaborate with your team by adding members and setting permissions.",
    href: "/settings/team",
    gradient: CATEGORIES["integrations"].gradient,
    category: "integrations",
    keywords: ["team", "invite", "collaboration", "members"],
  },
];

/**
 * Helper functions for working with action metadata
 */

export function getActionById(id: string): ActionMetadata | undefined {
  return ACTIONS.find((action) => action.id === id);
}

export function getActionsByCategory(categoryId: string): ActionMetadata[] {
  return ACTIONS.filter((action) => action.category === categoryId);
}

export function searchActions(query: string): ActionMetadata[] {
  const lowerQuery = query.toLowerCase();
  return ACTIONS.filter(
    (action) =>
      action.title.toLowerCase().includes(lowerQuery) ||
      action.description.toLowerCase().includes(lowerQuery) ||
      action.badge?.toLowerCase().includes(lowerQuery) ||
      action.keywords?.some((keyword) => keyword.includes(lowerQuery)),
  );
}

export function getCategoriesInOrder(): CategoryMetadata[] {
  return Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
}

