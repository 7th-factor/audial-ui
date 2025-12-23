"use client"

import { useState, useEffect } from "react"
import { IconArrowLeft, IconArrowRight, IconCheck, IconLoader2 } from "@tabler/icons-react"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { pricingPlans } from "@/lib/validations/onboarding"
import { stripePromise } from "@/lib/stripe"

interface PaymentStepProps {
  selectedPlanId?: string
  selectedPhone?: {
    number: string
    flag: string
  }
  onComplete: () => void
  onCancel: () => void
}

// CardElement styling to match our design
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#09090b",
      fontFamily: "system-ui, -apple-system, sans-serif",
      "::placeholder": {
        color: "#a1a1aa",
      },
      padding: "12px",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
  hidePostalCode: false, // Show zip code field
}

// Inner form component that uses Stripe hooks
function PaymentForm({
  selectedPlan,
  selectedPhone,
  onComplete,
  onCancel,
}: {
  selectedPlan: typeof pricingPlans[0] | undefined
  selectedPhone?: { number: string; flag: string }
  onComplete: () => void
  onCancel: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [cardName, setCardName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }

    setIsProcessing(true)

    try {
      // Confirm the SetupIntent with card details
      // clientSecret is automatically used from Elements provider options
      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: cardName,
            },
          },
        },
        redirect: "if_required",
      })

      if (confirmError) {
        setError(confirmError.message || "Payment failed")
        setIsProcessing(false)
        return
      }

      if (setupIntent?.status === "succeeded") {
        // Card saved successfully, complete onboarding
        onComplete()
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  const isFormValid = cardName.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Free Trial Setup</h2>
        <p className="text-muted-foreground">
          Enter your card to start the trial
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Left sidebar - Plan & Phone summary */}
        <div className="space-y-4">
          {/* Plan card */}
          {selectedPlan && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Selected Plan
              </div>
              <div className="mb-1 text-lg font-semibold">{selectedPlan.name}</div>
              <div className="mb-3">
                <span className="text-2xl font-bold">${selectedPlan.price}</span>
                <span className="text-muted-foreground">/{selectedPlan.period}</span>
              </div>
              <ul className="space-y-1.5">
                {selectedPlan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <IconCheck className="mt-0.5 size-3 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Phone card */}
          {selectedPhone && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone Number
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedPhone.flag}</span>
                <span className="font-medium">{selectedPhone.number}</span>
              </div>
            </div>
          )}

          {/* Trial disclaimer */}
          <p className="text-xs text-muted-foreground">
            You will not be charged during the trial. A credit card is required only for verification. Cancel before the trial ends and you will not be billed.
          </p>
        </div>

        {/* Right side - Card form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="cardName" className="text-sm font-medium">Name on card</Label>
            <Input
              id="cardName"
              placeholder="First Last"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="h-12 text-base"
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Card details</Label>
            <div className="rounded-md border bg-background p-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
          <IconArrowLeft className="mr-2 size-4" />
          Back
        </Button>
        <Button type="submit" disabled={!stripe || !isFormValid || isProcessing}>
          {isProcessing ? (
            <>
              <IconLoader2 className="mr-2 size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Start Free Trial
              <IconArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

// Main component that sets up Elements provider
export function PaymentStep({
  selectedPlanId,
  selectedPhone,
  onComplete,
  onCancel,
}: PaymentStepProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const selectedPlan = pricingPlans.find((p) => p.id === selectedPlanId)

  useEffect(() => {
    // Create SetupIntent on mount
    fetch("/api/stripe/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError("Failed to initialize payment")
        }
        setIsLoading(false)
      })
      .catch(() => {
        setError("Failed to initialize payment")
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <IconLoader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !clientSecret) {
    return (
      <div className="space-y-6">
        <div className="rounded-md bg-destructive/10 p-4 text-center text-destructive">
          {error || "Failed to initialize payment"}
        </div>
        <Button variant="outline" onClick={onCancel}>
          <IconArrowLeft className="mr-2 size-4" />
          Back
        </Button>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#18181b",
            fontFamily: "system-ui, -apple-system, sans-serif",
          },
        },
      }}
    >
      <PaymentForm
        selectedPlan={selectedPlan}
        selectedPhone={selectedPhone}
        onComplete={onComplete}
        onCancel={onCancel}
      />
    </Elements>
  )
}
