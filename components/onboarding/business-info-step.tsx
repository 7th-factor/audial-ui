"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconArrowRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  businessInfoSchema,
  type BusinessInfoFormValues,
  industryOptions,
} from "@/lib/validations/onboarding"

interface BusinessInfoStepProps {
  defaultValues?: Partial<BusinessInfoFormValues>
  onNext: (data: BusinessInfoFormValues) => void
}

export function BusinessInfoStep({ defaultValues, onNext }: BusinessInfoStepProps) {
  const form = useForm<BusinessInfoFormValues>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: defaultValues?.businessName ?? "",
      industry: defaultValues?.industry ?? "",
      description: defaultValues?.description ?? "",
    },
  })

  const onSubmit = (data: BusinessInfoFormValues) => {
    onNext(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Tell us about your business</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            placeholder="eg. John Co."
            {...form.register("businessName")}
            aria-invalid={!!form.formState.errors.businessName}
          />
          {form.formState.errors.businessName && (
            <p className="text-sm text-destructive">
              {form.formState.errors.businessName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select
            value={form.watch("industry")}
            onValueChange={(value) => form.setValue("industry", value, { shouldValidate: true })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.industry && (
            <p className="text-sm text-destructive">
              {form.formState.errors.industry.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what you do"
            rows={4}
            {...form.register("description")}
            aria-invalid={!!form.formState.errors.description}
          />
          <p className="text-sm text-muted-foreground">
            Enter a description or a link to your official website
          </p>
          {form.formState.errors.description && (
            <p className="text-sm text-destructive">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continue
        <IconArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  )
}
