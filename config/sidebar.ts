import {
  IconDashboard,
  IconInbox,
  IconListDetails,
  IconUsers,
  IconCalendar,
  IconKey,
  IconRobot,
  IconSparkles,
} from "@tabler/icons-react"

export const sidebarConfig = {
  brand: {
    name: "Audial",
    icon: "coral-dot" as const,
  },
  topNav: [
    {
      title: "Get Started",
      url: "/",
      icon: IconSparkles,
    },
  ],
  primaryNav: {
    label: "Primary",
    items: [
      {
        title: "Dashboard",
        url: "/analytics",
        icon: IconDashboard,
      },
      {
        title: "Inbox",
        url: "/inbox",
        icon: IconInbox,
      },
      {
        title: "Follow Ups",
        url: "/follow-ups",
        icon: IconListDetails,
      },
      {
        title: "Contacts",
        url: "/contacts",
        icon: IconUsers,
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: IconCalendar,
      },
    ],
  },
  developerNav: {
    label: "Developer",
    items: [
      {
        title: "API Keys",
        url: "/api-keys",
        icon: IconKey,
      },
      {
        title: "Agent",
        url: "/agent",
        icon: IconRobot,
      },
    ],
  },
  upgradeCard: {
    title: "Upgrade to Pro",
    description: "Unlock more exclusive features and get more credit.",
    buttonText: "Upgrade",
  },
  user: {
    name: "Emmanuel's Org",
    email: "emmanuel@sixfacto...",
    avatar: "ES",
  },
}

export type SidebarConfig = typeof sidebarConfig
