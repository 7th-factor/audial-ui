import { PublicRouteGuard } from "@/lib/auth/auth-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicRouteGuard>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
      </div>
    </PublicRouteGuard>
  );
}
export const dynamic = "force-dynamic";

