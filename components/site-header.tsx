"use client"

import Link from "next/link"
import {
  IconChevronDown,
  IconCreditCard,
  IconLogout,
  IconPhoneCall,
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
import { GlobalMakeCallDialog } from "@/components/global-make-call-dialog"
import { useAuth } from "@/lib/firebase/auth-context"

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    const parts = name.split(" ").filter(Boolean)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  if (email) {
    return email.slice(0, 2).toUpperCase()
  }
  return "U"
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
  const { user, logout } = useAuth()
  const showUserInfo = showName || showEmail

  const displayName = user?.displayName || null
  const email = user?.email || null
  const photoURL = user?.photoURL || null
  const initials = getInitials(displayName, email)
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-3">
          <GlobalMakeCallDialog
            trigger={
              <Button variant="outline" size="sm">
                <IconPhoneCall className="size-4 mr-1.5" />
                Make Call
              </Button>
            }
          />

          <Separator orientation="vertical" className="h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={photoURL || undefined} alt={displayName || "User"} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {showUserInfo && (
                  <div className="hidden md:flex flex-col items-start text-left">
                    {showName && displayName && <span className="text-sm font-medium leading-none">{displayName}</span>}
                    {showEmail && email && <span className="text-xs text-muted-foreground">{email}</span>}
                  </div>
                )}
                <IconChevronDown className="hidden md:block size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {showUserInfo && (displayName || email) && (
                <>
                  <DropdownMenuLabel className="font-normal md:hidden">
                    <div className="flex flex-col space-y-1">
                      {showName && displayName && <p className="text-sm font-medium leading-none">{displayName}</p>}
                      {showEmail && email && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {email}
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
