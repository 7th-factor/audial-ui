"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type SessionStatus = "loading" | "complete" | "open" | "error"

export default function OnboardingCompletePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<SessionStatus>("loading")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      return
    }

    fetch(`/api/stripe/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "complete") {
          setStatus("complete")
          toast.success("Payment successful! Welcome to Audial.")
        } else if (data.status === "open") {
          setStatus("open")
        } else {
          setStatus("error")
        }
      })
      .catch(() => {
        setStatus("error")
      })
  }, [sessionId])

  const handleContinue = () => {
    router.push("/")
  }

  const handleRetry = () => {
    router.push("/onboarding?step=payment")
  }

  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardContent className="p-8">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <IconLoader2 className="size-12 animate-spin text-muted-foreground" />
              <h2 className="text-xl font-semibold">Processing your payment...</h2>
              <p className="text-muted-foreground">Please wait while we confirm your subscription.</p>
            </div>
          )}

          {status === "complete" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <IconCheck className="size-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Welcome to Audial!</h2>
              <p className="text-muted-foreground">
                Your subscription has been activated. You can now start using all the features.
              </p>
              <Button onClick={handleContinue} className="mt-4">
                Go to Dashboard
              </Button>
            </div>
          )}

          {status === "open" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <IconX className="size-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold">Payment Incomplete</h2>
              <p className="text-muted-foreground">
                Your payment was not completed. Please try again.
              </p>
              <Button onClick={handleRetry} className="mt-4">
                Try Again
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <IconX className="size-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold">Something went wrong</h2>
              <p className="text-muted-foreground">
                We couldn&apos;t verify your payment. Please try again or contact support.
              </p>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => router.push("/onboarding")}>
                  Start Over
                </Button>
                <Button onClick={handleRetry}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
