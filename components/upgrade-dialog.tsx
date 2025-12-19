"use client"

import * as React from "react"
import { Check, AlertCircle } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    description: "For personal use only with limited features and support",
    billing: null,
    cta: "Continue on Free",
    ctaVariant: "outline" as const,
    trial: false,
    features: [
      "10 Call Minutes",
      "1 Dedicated Phone Number",
      "1 Agent",
      "Basic Support",
      "Limited Customization",
      "Limited Integration",
      "Limited API Access",
    ],
    featuresLabel: "Features",
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "For small businesses with all the features and support",
    billing: "Per user, per month billed annually\n$34 billed monthly",
    cta: "Purchase Now",
    ctaVariant: "default" as const,
    trial: true,
    features: [
      "1,000 Call Minutes",
      "1 Dedicated Phone Number",
      "1 Agent",
      "Priority Support",
      "Full Customization",
      "Full Integration",
      "Full API Access",
    ],
    featuresLabel: "Everything in Free, and:",
  },
  {
    id: "premium",
    name: "Premium",
    price: 119,
    description: "For teams and organizations with advanced features and support",
    billing: "Per user, per month billed annually\n$69 billed monthly",
    cta: "Purchase Now",
    ctaVariant: "outline" as const,
    trial: true,
    features: [
      "10,000 Call Minutes",
      "2 Dedicated Phone Numbers",
      "2 Agents",
      "Dedicated Support",
      "Advanced Customization",
      "Analytics",
      "Reports",
    ],
    featuresLabel: "Everything in Pro, and:",
  },
]

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpgradeDialog({ open, onOpenChange }: UpgradeDialogProps) {
  const [selectedPlan, setSelectedPlan] = React.useState("pro")
  const [step, setStep] = React.useState<"plans" | "payment" | "free">("plans")

  const handlePlanAction = (planId: string) => {
    if (planId === "starter") {
      setStep("free")
    } else {
      setSelectedPlan(planId)
      setStep("payment")
    }
  }

  const handleBack = () => {
    setStep("plans")
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep("plans")
  }

  const currentPlan = plans.find((p) => p.id === selectedPlan)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start Your 14 day Free Trial</DialogTitle>
          <DialogDescription>
            You will not be charged during the trial period. A credit card is required now only for verification.
          </DialogDescription>
        </DialogHeader>

        {step === "plans" && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn("flex flex-col rounded-lg border p-4", plan.id === "pro" && "border-primary bg-muted/30")}
              >
                <div className="text-center mb-4">
                  <h3
                    className={cn(
                      "text-xl font-semibold",
                      plan.id === "pro" ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{plan.description}</p>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-sm text-muted-foreground">$</span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  {plan.billing && (
                    <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{plan.billing}</p>
                  )}
                </div>

                <Button variant={plan.ctaVariant} className="w-full mb-2" onClick={() => handlePlanAction(plan.id)}>
                  {plan.cta}
                </Button>

                {plan.trial && <p className="text-xs text-center text-muted-foreground mb-4">14-day Free Trial</p>}

                <div className="mt-auto pt-4 border-t">
                  <p className="text-sm font-medium mb-2">{plan.featuresLabel}</p>
                  <ul className="space-y-1.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs">
                        <Check className="h-3 w-3 text-muted-foreground" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="text-xs text-muted-foreground mt-2 hover:underline">Learn more</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === "payment" && currentPlan && (
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Payment Method</h3>

              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Complete Purchase</h4>
                  <p className="text-sm text-muted-foreground">Add a new payment method to your account.</p>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-md bg-muted/50">
                  <div>
                    <p className="font-semibold">{currentPlan.name}</p>
                    <p className="text-xs text-muted-foreground">
                      For small businesses with
                      <br />
                      all the features and support
                    </p>
                    <p className="font-semibold mt-2">
                      ${currentPlan.price}.00 <span className="text-muted-foreground font-normal">/ month</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleBack}>
                    Cancel
                  </Button>
                  <Button className="ml-auto">Pay ${currentPlan.price}.00</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="First Last" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card number</Label>
                <Input id="card" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label>Expires</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(2024 + i)}>
                          {2024 + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "free" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Continue with Free Plan</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Please note, you will not be able to make or receive calls on this plan. Upgrade to a paid plan to get an
              Audial phone number.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                Cancel
              </Button>
              <Button onClick={handleClose}>Continue</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
