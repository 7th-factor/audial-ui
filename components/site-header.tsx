"use client"

import Link from "next/link"
import {
  IconBell,
  IconChevronDown,
  IconCreditCard,
  IconLogout,
  IconMessageCircle,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AgentChatSheet } from "@/components/agent-chat"
import { useAuth } from "@/lib/firebase/auth-context"

const user = {
  name: "Emmanuel's Org",
  email: "emmanuel@sixfacto...",
  avatar: "/avatars/shadcn.jpg",
  initials: "EO",
}

interface SiteHeaderProps {
  /** Show user/org name in the header (default: true) */
  showName?: boolean
  /** Show user email in the header (default: true) */
  showEmail?: boolean
}

export function SiteHeader({
  showName = true,
  showEmail = true,
}: SiteHeaderProps) {
  const { logout } = useAuth()
  const showUserInfo = showName || showEmail
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-3">
          <AgentChatSheet
            trigger={
              <Button variant="outline" size="sm">
                <IconMessageCircle className="size-4 mr-1.5" />
                Test Agent
              </Button>
            }
          />

          <Separator orientation="vertical" className="h-6" />

          <Button variant="ghost" size="icon" className="relative">
            <IconBell className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                {showUserInfo && (
                  <div className="hidden md:flex flex-col items-start text-left">
                    {showName && <span className="text-sm font-medium leading-none">{user.name}</span>}
                    {showEmail && <span className="text-xs text-muted-foreground">{user.email}</span>}
                  </div>
                )}
                <IconChevronDown className="hidden md:block size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {showUserInfo && (
                <>
                  <DropdownMenuLabel className="font-normal md:hidden">
                    <div className="flex flex-col space-y-1">
                      {showName && <p className="text-sm font-medium leading-none">{user.name}</p>}
                      {showEmail && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="md:hidden" />
                </>
              )}
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <IconSettings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/account">
                    <IconUserCircle className="mr-2 size-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/billing">
                    <IconCreditCard className="mr-2 size-4" />
                    Billing
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => logout()}
              >
                <IconLogout className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
