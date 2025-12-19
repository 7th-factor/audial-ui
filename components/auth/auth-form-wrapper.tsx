import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  className?: string;
  showImage?: boolean;
}

export function AuthFormWrapper({
  children,
  className,
  showImage = true,
}: AuthFormWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">{children}</div>
          {showImage && (
            <div className="relative hidden md:block bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">Audial</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Welcome to Audial</h2>
                  <p className="text-sm text-gray-200 opacity-90">
                    Your intelligent voice assistant platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-2">
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

