"use client"

import Link from "next/link"
import {
  IconBell,
  IconChevronDown,
  IconCreditCard,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/firebase/auth-context"
import { AuthGuard } from "@/lib/auth/auth-guard"

const user = {
  name: "Emmanuel's Org",
  email: "emmanuel@sixfacto...",
  avatar: "/avatars/shadcn.jpg",
  initials: "EO",
}

function OnboardingHeader() {
  const { logout } = useAuth()

  return (
    <header className="flex h-14 shrink-0 items-center border-b bg-background px-4 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Audial"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-base font-semibold">Audial</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <IconBell className="size-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <IconChevronDown className="hidden size-4 text-muted-foreground md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
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

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-svh flex-col bg-muted/40">
        <OnboardingHeader />
        <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
