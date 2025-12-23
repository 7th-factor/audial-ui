import { z } from "zod"

// Step 1: Business Info
export const businessInfoSchema = z.object({
  businessName: z
    .string()
    .min(1, "Business name is required")
    .max(100, "Business name must be less than 100 characters"),
  industry: z.string().min(1, "Please select an industry"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
})

export type BusinessInfoFormValues = z.infer<typeof businessInfoSchema>

// Step 2: Agent Selection
export const agentSelectionSchema = z.object({
  agentId: z.string().min(1, "Please select an agent"),
})

export type AgentSelectionFormValues = z.infer<typeof agentSelectionSchema>

// Step 3: Plan Selection
export const planSelectionSchema = z.object({
  planId: z.string().optional(),
})

export type PlanSelectionFormValues = z.infer<typeof planSelectionSchema>

// Step 4: Phone Number
export const phoneNumberSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  phoneNumber: z.string().optional(),
})

export type PhoneNumberFormValues = z.infer<typeof phoneNumberSchema>

// Combined onboarding data
export interface OnboardingData {
  businessInfo: BusinessInfoFormValues
  agentSelection: AgentSelectionFormValues
  planSelection: PlanSelectionFormValues
  phoneNumber: PhoneNumberFormValues
}

// Industry options
export const industryOptions = [
  { value: "healthcare", label: "Healthcare" },
  { value: "real-estate", label: "Real Estate" },
  { value: "legal", label: "Legal Services" },
  { value: "financial", label: "Financial Services" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "hospitality", label: "Hospitality" },
  { value: "automotive", label: "Automotive" },
  { value: "education", label: "Education" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other" },
]

// Agent options
export const agentOptions = [
  {
    id: "sarah",
    name: "Sarah",
    role: "AI Receptionist, Appointment Scheduler",
    image: "https://audial.co/images/agents/sarah-chen.png",
    hasAudio: true,
  },
  {
    id: "charlie",
    name: "Charlie",
    role: "Lead Qualification, Survey Handling",
    image: "https://audial.co/images/agents/marcus-sterling.png",
    hasAudio: true,
  },
  {
    id: "kate",
    name: "Kate",
    role: "Sales Representative, SDR, E-commerce support",
    image: "https://audial.co/images/agents/yuki-tanaka.png",
    hasAudio: true,
  },
  {
    id: "other",
    name: "Other",
    role: "Have other use cases in mind? Configure your agent in the app.",
    image: null,
    hasAudio: false,
  },
]

// Country options for phone numbers
export const countryOptions = [
  { value: "us", label: "United States (+1)", code: "+1", flag: "🇺🇸", disabled: false },
  { value: "ca", label: "Canada (+1)", code: "+1", flag: "🇨🇦", disabled: true, comingSoon: true },
  { value: "gb", label: "United Kingdom (+44)", code: "+44", flag: "🇬🇧", disabled: true, comingSoon: true },
  { value: "au", label: "Australia (+61)", code: "+61", flag: "🇦🇺", disabled: true, comingSoon: true },
]

// Mock phone numbers for display
export const mockPhoneNumbers = [
  { id: "1", number: "+1 (809) 526 2710", price: "$1.99/mo" },
  { id: "2", number: "+1 (809) 526 2711", price: "$1.99/mo" },
  { id: "3", number: "+1 (809) 526 2712", price: "$1.99/mo" },
  { id: "4", number: "+1 (809) 526 2713", price: "$1.99/mo" },
  { id: "5", number: "+1 (809) 526 2714", price: "$1.99/mo" },
  { id: "6", number: "+1 (809) 526 2715", price: "$1.99/mo" },
]

// Pricing plans (paid plans only - Free is offered via skip button)
export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses",
    price: 49,
    period: "month",
    buttonText: "Start Free Trial",
    popular: false,
    features: [
      "10,000 API calls/month",
      "Standard voice recognition",
      "10 voice agents",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    description: "Most popular for growing businesses",
    price: 99,
    period: "month",
    buttonText: "Start Free Trial",
    popular: true,
    features: [
      "100,000 API calls/month",
      "Premium recognition",
      "Unlimited voice agents",
      "Priority support",
      "Real-time analytics",
      "API integrations",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for scale",
    price: 299,
    period: "month",
    buttonText: "Start Free Trial",
    popular: false,
    features: [
      "Unlimited API calls",
      "Enterprise features",
      "Dedicated support",
      "SLA guarantee",
      "Advanced security",
      "Custom deployment",
    ],
  },
]
