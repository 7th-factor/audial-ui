"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { workspaceManager } from "@/lib/auth/workspace-manager"
import { Card, CardContent } from "@/components/ui/card"
import {
  OnboardingStepper,
  BusinessInfoStep,
  AgentSelectionStep,
  PlanSelectionStep,
  PhoneNumberStep,
  PaymentStep,
  type Step,
} from "@/components/onboarding"
import type {
  BusinessInfoFormValues,
  AgentSelectionFormValues,
  PlanSelectionFormValues,
  PhoneNumberFormValues,
  OnboardingData,
} from "@/lib/validations/onboarding"
import { mockPhoneNumbers, countryOptions } from "@/lib/validations/onboarding"

const steps: Step[] = [
  { id: 1, label: "Business Info" },
  { id: 2, label: "Agent Setup" },
  { id: 3, label: "Phone Number" },
]

// Dev mode: Map step names to step numbers
const stepMap: Record<string, number> = {
  "business": 1,
  "agent": 2,
  "phone": 3,
  "plan": 4,
  "payment": 5,
}

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<OnboardingData>>({})

  // Dev mode: Allow jumping to a step via URL param (e.g., ?step=payment)
  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam && stepMap[stepParam]) {
      setCurrentStep(stepMap[stepParam])
      // Pre-fill mock data for dev testing
      if (stepMap[stepParam] >= 2) {
        setData((prev) => ({ ...prev, businessInfo: { businessName: "Test Corp", industry: "technology" } }))
      }
      if (stepMap[stepParam] >= 3) {
        setData((prev) => ({ ...prev, agentSelection: { agentId: "sarah" } }))
      }
      if (stepMap[stepParam] >= 4) {
        setData((prev) => ({ ...prev, phoneNumber: { country: "us", phoneNumber: "1" } }))
      }
      if (stepMap[stepParam] >= 5) {
        setData((prev) => ({ ...prev, planSelection: { planId: "standard" } }))
      }
    }
  }, [searchParams])

  const handleBusinessInfoNext = (businessInfo: BusinessInfoFormValues) => {
    setData((prev) => ({ ...prev, businessInfo }))
    setCurrentStep(2)
  }

  const handleAgentSelectionNext = (agentSelection: AgentSelectionFormValues) => {
    setData((prev) => ({ ...prev, agentSelection }))
    setCurrentStep(3)
  }

  const handlePhoneNumberNext = (phoneNumber: PhoneNumberFormValues) => {
    setData((prev) => ({ ...prev, phoneNumber }))
    setCurrentStep(4) // Go to plan selection (not in stepper)
  }

  const handleSkipPhoneNumber = () => {
    setData((prev) => ({ ...prev, phoneNumber: { country: "", phoneNumber: "" } }))
    setCurrentStep(4) // Go to plan selection (not in stepper)
  }

  const handlePlanSelectionComplete = (planSelection: PlanSelectionFormValues) => {
    setData((prev) => ({ ...prev, planSelection }))
    setCurrentStep(5) // Go to payment step
  }

  const handleSkipPlan = () => {
    // Start with Free - skip payment and complete onboarding
    const finalData = {
      ...data,
      phoneNumber: data.phoneNumber ?? { country: "", phoneNumber: "" },
      planSelection: { planId: "free" },
    } as OnboardingData
    handleOnboardingComplete(finalData)
  }

  const handlePaymentComplete = () => {
    // Stripe handles payment via redirect to /onboarding/complete
    // This is called if user navigates back without completing
    const finalData = {
      ...data,
      phoneNumber: data.phoneNumber ?? { country: "", phoneNumber: "" },
      planSelection: data.planSelection ?? { planId: "free" },
    } as OnboardingData
    handleOnboardingComplete(finalData)
  }

  const handlePaymentCancel = () => {
    setCurrentStep(4) // Go back to plan selection
  }

  const handleOnboardingComplete = async (finalData: OnboardingData) => {
    try {
      // Create workspace with business name
      console.log("Creating workspace:", finalData.businessInfo.businessName)
      await workspaceManager.createWorkspace({
        name: finalData.businessInfo.businessName,
        description: finalData.businessInfo.description,
      })

      console.log("Onboarding complete:", finalData)
      toast.success("Onboarding complete! Welcome to Audial.")
      router.push("/")
    } catch (error) {
      console.error("Failed to create workspace:", error)
      toast.error("Failed to create workspace. Please try again.")
    }
  }

  // Get selected phone info for payment step
  const getSelectedPhoneInfo = () => {
    const phoneId = data.phoneNumber?.phoneNumber
    const phone = mockPhoneNumbers.find((p) => p.id === phoneId)
    const country = countryOptions.find((c) => c.value === data.phoneNumber?.country)
    if (phone) {
      return {
        number: phone.number,
        flag: country?.flag ?? "🇺🇸",
      }
    }
    return undefined
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Get Started with Audial</h1>
      </div>

      {/* Hide stepper on plan selection (step 4) and payment (step 5) */}
      {currentStep <= 3 && (
        <OnboardingStepper steps={steps} currentStep={currentStep} />
      )}

      <Card>
        <CardContent className="p-6 md:p-8">
          {currentStep === 1 && (
            <BusinessInfoStep
              defaultValues={data.businessInfo}
              onNext={handleBusinessInfoNext}
            />
          )}
          {currentStep === 2 && (
            <AgentSelectionStep
              defaultValues={data.agentSelection}
              onNext={handleAgentSelectionNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <PhoneNumberStep
              defaultValues={data.phoneNumber}
              onNext={handlePhoneNumberNext}
              onSkip={handleSkipPhoneNumber}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <PlanSelectionStep
              defaultValues={data.planSelection}
              onComplete={handlePlanSelectionComplete}
              onSkip={handleSkipPlan}
              onBack={handleBack}
              showSkip={true} // Set to false to hide "Start with Free" option
            />
          )}
          {currentStep === 5 && (
            <PaymentStep
              selectedPlanId={data.planSelection?.planId}
              selectedPhone={getSelectedPhoneInfo()}
              onComplete={handlePaymentComplete}
              onCancel={handlePaymentCancel}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
