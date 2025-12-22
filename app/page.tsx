'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconSparkles,
  IconChevronLeft,
  IconChevronRight,
  IconTrendingUp,
  IconShield,
  IconSearch,
  IconBook,
  IconPlayerPlay,
  IconClock,
  IconPhone,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthGuard } from "@/lib/auth/auth-guard";
import { cn } from "@/lib/utils";
import {
  getCategoriesInOrder,
  getActionsByCategory,
  type ActionMetadata,
  type CategoryMetadata,
} from "@/lib/data/getting-started-actions";

/**
 * Root page that handles authentication-based routing:
 * - Authenticated users: See dashboard home with sidebar layout
 * - Unauthenticated users: Redirected to /login
 */
export default function HomePage() {
  const { user, loading, customToken } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run redirect logic after mount to avoid hydration mismatch
    if (!mounted) return;

    // Wait for auth state to be determined
    if (loading || (user && !customToken)) {
      return;
    }

    if (!user) {
      // User is not authenticated - redirect to login
      router.push('/login');
    }
  }, [mounted, user, loading, customToken, router]);

  // During SSR and initial render, show consistent loading state
  // This prevents hydration mismatch
  if (!mounted || loading || (user && !customToken)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show nothing (redirect is happening)
  if (!user) {
    return null;
  }

  // If authenticated, render the dashboard home page with layout
  return (
    <AuthGuard>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 56)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="@container/main flex-1 overflow-y-auto">
              <GetStartedContent />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

interface CarouselSlide {
  icon: TablerIcon;
  title: string;
  description: string;
  highlight: string;
  gradient: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    icon: IconSparkles,
    title: "Getting Started",
    description:
      "Set up your AI agent in minutes. Configure phone numbers, customize your agent, and start handling conversations immediately",
    highlight: "Quick 5-minute setup",
    gradient: "from-indigo-500/10 via-violet-500/10 to-purple-500/10",
  },
  {
    icon: IconPhone,
    title: "Connect & Communicate",
    description:
      "Assign phone numbers to your agent and enable direct communication with your customers through voice calls",
    highlight: "Phone integration ready",
    gradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
  },
  {
    icon: IconTrendingUp,
    title: "Train & Optimize",
    description:
      "Train your agent with custom instructions, upload knowledge bases, and configure tools to enhance performance",
    highlight: "Smart agent training",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
  },
  {
    icon: IconShield,
    title: "Integrate & Extend",
    description:
      "Connect calendars, APIs, and third-party services. Extend your agent's capabilities with custom integrations",
    highlight: "Powerful integrations",
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
  },
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length,
    );
    setIsAutoPlaying(false);
  };

  const slide = CAROUSEL_SLIDES[currentSlide];

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-none bg-gradient-to-br transition-all duration-700",
        slide.gradient,
      )}
    >
      <div className="relative px-8 py-8 md:px-12 md:py-10">
        <div className="flex items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <slide.icon className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {slide.highlight}
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {slide.description}
            </p>
          </div>

          {/* Right Video Thumbnail */}
          <div className="hidden lg:block w-80">
            <div className="relative group cursor-pointer rounded-lg overflow-hidden border bg-muted/50 hover:bg-muted transition-all shadow-md">
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <IconPlayerPlay className="size-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/90 text-white shadow-lg">
                  <IconPlayerPlay className="size-7 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/70 px-2.5 py-1 rounded">
                2:30
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Quick Start Guide
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center gap-4">
          {/* Dots */}
          <div className="flex gap-2">
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  currentSlide === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <IconChevronRight className="size-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
              <IconClock className="size-3 animate-pulse" />
              <span>Auto-playing</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function GetStartedContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleActionClick = (action: ActionMetadata) => {
    if (action.external) {
      window.open(action.href, "_blank");
    } else {
      router.push(action.href);
    }
  };

  // Get categories and actions from metadata
  const categories = getCategoriesInOrder();

  // Filter actions based on active tab and search query
  const filteredCategories = categories
    .map((category) => {
      // Get actions for this category
      let actions = getActionsByCategory(category.id);

      // Filter by tab (if not "all")
      if (activeTab !== "all" && activeTab !== category.id) {
        return null;
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        actions = actions.filter(
          (action) =>
            action.title.toLowerCase().includes(query) ||
            action.description.toLowerCase().includes(query) ||
            action.badge?.toLowerCase().includes(query) ||
            action.keywords?.some((kw) => kw.toLowerCase().includes(query)),
        );
      }

      // Return category with filtered actions
      return {
        ...category,
        actions,
      };
    })
    .filter(
      (cat): cat is CategoryMetadata & { actions: ActionMetadata[] } =>
        cat !== null && cat.actions.length > 0,
    );

  return (
    <PageLayout
      icon={IconSparkles}
      title="Get Started"
      description="Set up your agent, configure phone numbers, and start handling conversations"
      actions={
        <Button
          variant="outline"
          onClick={() => window.open("https://docs.audial.ai", "_blank")}
        >
          <IconBook className="size-4 mr-2" />
          View Documentation
        </Button>
      }
    >
      <div className="flex flex-col h-full px-4 lg:px-6">
        <div className="flex-1 overflow-y-auto">
          {/* Hero Carousel */}
          <div className="mb-8">
            <HeroCarousel />
          </div>

          {/* Category Filter Tabs & Search */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="inline-flex overflow-x-auto">
                <TabsTrigger value="all">All Features</TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id}>
                    {cat.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-64">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Action Categories */}
          <div className="space-y-10 pb-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                {/* Category Header */}
                <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-2">
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-1">
                  {category.actions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <div
                        key={action.id}
                        className="relative flex items-start gap-4 rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md cursor-pointer"
                        onClick={() => handleActionClick(action)}
                      >
                        {/* Floating Badge */}
                        {action.badge && (
                          <Badge
                            variant="secondary"
                            className="absolute -top-2 -right-2 text-xs shadow-sm"
                          >
                            {action.badge}
                          </Badge>
                        )}

                        {/* Icon with Gradient */}
                        <span
                          className={cn(
                            "inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg p-3 bg-gradient-to-br",
                            action.gradient,
                          )}
                        >
                          <ActionIcon className="h-6 w-6 text-foreground" />
                        </span>

                        {/* Title & Description */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium leading-normal mb-1">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-snug">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export const dynamic = 'force-dynamic';
