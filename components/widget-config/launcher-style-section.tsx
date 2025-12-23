'use client'

import { useState } from 'react'
import { ChevronDown, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { WidgetConfigPayload } from '@/lib/features/widget/types'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { ColorInput } from '@/components/ui/color-input'
import { AvatarSelect } from '@/components/avatar-select'

const DEFAULT_PRIMARY_COLOR = '#FFFFFF'

const AVATAR_OPTIONS = [
  {
    value: 'https://www.audial.co/images/agents/sarah-chen.png',
    label: 'Sara Chen',
    image: 'https://www.audial.co/images/agents/sarah-chen.png',
  },
  {
    value: 'https://www.audial.co/images/agents/marcus-sterling.png',
    label: 'Marcus Sterling',
    image: 'https://www.audial.co/images/agents/marcus-sterling.png',
  },
  {
    value: 'https://www.audial.co/images/agents/aisha-johnson.png',
    label: 'Aisha Johnson',
    image: 'https://www.audial.co/images/agents/aisha-johnson.png',
  },
  {
    value: 'https://www.audial.co/images/agents/yuki-tanaka.png',
    label: 'Yuki Tanaka',
    image: 'https://www.audial.co/images/agents/yuki-tanaka.png',
  },
  {
    value: 'https://www.audial.co/images/agents/emma-rodriguez.png',
    label: 'Emma Rodriguez',
    image: 'https://www.audial.co/images/agents/emma-rodriguez.png',
  },
  {
    value: 'https://www.audial.co/images/agents/alex-morgan.png',
    label: 'Alex Morgan',
    image: 'https://www.audial.co/images/agents/alex-morgan.png',
  },
  {
    value: 'https://www.audial.co/images/agents/jordan-lee.png',
    label: 'Jordan Lee',
    image: 'https://www.audial.co/images/agents/jordan-lee.png',
  },
  {
    value: 'https://www.audial.co/images/agents/taylor-brooks.png',
    label: 'Taylor Brooks',
    image: 'https://www.audial.co/images/agents/taylor-brooks.png',
  },
  {
    value: 'https://www.audial.co/images/agents/julia-rogers.png',
    label: 'Julia Rogers',
    image: 'https://www.audial.co/images/agents/julia-rogers.png',
  },
  {
    value: 'https://www.audial.co/images/agents/casey-kim.png',
    label: 'Casey Kim',
    image: 'https://www.audial.co/images/agents/casey-kim.png',
  },
  {
    value: 'https://www.audial.co/images/agents/riley-singh.png',
    label: 'Riley Singh',
    image: 'https://www.audial.co/images/agents/riley-singh.png',
  },
]

export function LauncherStyleSection() {
  const [isOpen, setIsOpen] = useState(true)
  const form = useFormContext<WidgetConfigPayload>()

  const resetColor = () => {
    form.setValue('style.primaryColor', DEFAULT_PRIMARY_COLOR, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTrigger asChild className={cn('', isOpen && 'border-b')}>
        <Button
          variant="ghost"
          className="px-4 py-4 h-auto flex w-full justify-between text-[15px] font-semibold text-left hover:bg-transparent rounded-b-none"
        >
          Launcher & Style
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-5 space-y-6">
        {/* Widget Type */}
        <FormField
          control={form.control}
          name="launcher.modality"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Widget Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chat" id="chat" />
                    <Label htmlFor="chat">Chat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voice" id="voice" />
                    <Label htmlFor="voice">Voice Call</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Position, Side Spacing, Bottom Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <FormField
            control={form.control}
            name="launcher.position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="launcher.sideSpacing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Side Spacing</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      className="pr-8"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value === '' ? null : Number(value))
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      px
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="launcher.bottomSpacing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bottom Spacing</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      className="pr-8"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      px
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Primary Color and Agent Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="style.primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <ColorInput
                    value={field.value}
                    onChange={field.onChange}
                    onReset={resetColor}
                    placeholder="#23EF10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner.header"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Sarah" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="banner.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ''}
                  placeholder="We can help you ease system onboarding and setup, ask me for help on any feature."
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Agent Avatar and Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AvatarSelect
            form={form}
            fieldName="style.agentAvatar"
            avatarOptions={AVATAR_OPTIONS}
          />

          <FormField
            control={form.control}
            name="style.logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo (Floating button)</FormLabel>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    Upload file
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <FormDescription>Uses the selected agent avatar as default</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
