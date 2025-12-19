"use client"

import type * as React from "react"
import {
  IconCalendar,
  IconInbox,
  IconKey,
  IconLayoutDashboard,
  IconRocket,
  IconRobot,
  IconUsers,
  IconUserCheck,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarConfig = {
  user: {
    name: "Emmanuel's Org",
    email: "emmanuel@sixfacto...",
    avatar: "/avatars/shadcn.jpg",
  },
  topNav: [
    {
      title: "Get Started",
      url: "/",
      icon: IconRocket,
    },
  ],
  primaryNav: {
    label: "Primary",
    items: [
      {
        title: "Dashboard",
        url: "/analytics",
        icon: IconLayoutDashboard,
      },
      {
        title: "Inbox",
        url: "/inbox",
        icon: IconInbox,
      },
      {
        title: "Follow Ups",
        url: "/follow-ups",
        icon: IconUserCheck,
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <span className="flex size-5 items-center justify-center rounded-full bg-red-500" />
                <span className="text-base font-semibold">Audial</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          topItems={sidebarConfig.topNav}
          primaryNav={sidebarConfig.primaryNav}
          developerNav={sidebarConfig.developerNav}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarConfig.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
