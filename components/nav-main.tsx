"use client"

import * as React from "react"
import type { Icon } from "@tabler/icons-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UpgradeDialog } from "@/components/upgrade-dialog"

type NavItem = {
  title: string
  url: string
  icon?: Icon
}

type NavSection = {
  label: string
  items: NavItem[]
}

export function NavMain({
  topItems,
  primaryNav,
  developerNav,
}: {
  topItems: NavItem[]
  primaryNav: NavSection
  developerNav: NavSection
}) {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = React.useState(false)

  return (
    <>
      {/* Top navigation items (Get Started) */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {topItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Primary section */}
      <SidebarGroup>
        <SidebarGroupLabel>{primaryNav.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {primaryNav.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Developer section */}
      <SidebarGroup>
        <SidebarGroupLabel>{developerNav.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {developerNav.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
        <SidebarGroupContent>
          <Card className="p-4 gap-0">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
              <CardDescription className="text-xs">Unlock more exclusive features and get more credit.</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-1">
              <Button className="w-full" size="sm" onClick={() => setUpgradeDialogOpen(true)}>
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </SidebarGroupContent>
      </SidebarGroup>

      <UpgradeDialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen} />
    </>
  )
}
