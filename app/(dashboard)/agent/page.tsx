"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import {
  IconRobot,
  IconSettings,
  IconMicrophone,
  IconRuler,
  IconBook,
  IconTool,
  IconChartBar,
  IconPhone,
  IconUpload,
  IconPlus,
  IconX,
  IconTarget,
  IconChevronDown,
  IconChevronUp,
  IconApps,
  IconCopy,
} from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { SaveStatusIndicator } from "@/components/save-status-indicator"
import { useAutosave } from "@/lib/hooks/use-autosave"

interface AgentConfig {
  temperature: number
  maxTokens: number
  speed: number
  stability: number
  selectedSkills: string[]
  conversationStages: {
    greeting: string
    informationGathering: string
    problemSolving: string
    closing: string
  }
  selectedTemplate: string
  controlMode: "simple" | "flow"
  shouldDo: string[]
  shouldNotDo: string[]
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { NamedAvatar } from "@/components/named-avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorInput } from "@/components/ui/color-input"
import { toast } from "sonner"

export default function AgentPage() {
  // Core config state (tracked by autosave)
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
  const [speed, setSpeed] = useState([1.0])
  const [stability, setStability] = useState([0.5])
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["handle-support", "qualify-leads"])
  const [conversationStages, setConversationStages] = useState({
    greeting: "Hi! I'm here to help you today. What can I assist you with?",
    informationGathering: "Could you tell me more about what you're looking for?",
    problemSolving: "Let me help you with that.",
    closing: "Is there anything else I can help you with today?",
  })
  const [selectedTemplate, setSelectedTemplate] = useState("support")
  const [controlMode, setControlMode] = useState<"simple" | "flow">("simple")
  const [shouldDo, setShouldDo] = useState([
    "Greet customers warmly",
    "Ask clarifying questions",
    "Provide accurate information",
  ])
  const [shouldNotDo, setShouldNotDo] = useState([
    "Make promises about refunds",
    "Share personal information",
    "Use offensive language",
  ])

  // UI-only state (not tracked by autosave)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [newShouldDo, setNewShouldDo] = useState("")
  const [newShouldNotDo, setNewShouldNotDo] = useState("")

  // Consolidate config for autosave
  const agentConfig = useMemo<AgentConfig>(
    () => ({
      temperature: temperature[0],
      maxTokens: maxTokens[0],
      speed: speed[0],
      stability: stability[0],
      selectedSkills,
      conversationStages,
      selectedTemplate,
      controlMode,
      shouldDo,
      shouldNotDo,
    }),
    [temperature, maxTokens, speed, stability, selectedSkills, conversationStages, selectedTemplate, controlMode, shouldDo, shouldNotDo]
  )

  // Save function (would connect to API in production)
  const handleSave = useCallback(async (config: AgentConfig) => {
    // TODO: Replace with actual API call
    // await api.updateAgentConfig(config)
    console.log("Saving agent config:", config)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  }, [])

  // Autosave hook
  const { status, lastSaved } = useAutosave({
    data: agentConfig,
    onSave: handleSave,
    debounceMs: 1000,
    enabled: true,
  })

  return (
    <PageLayout
      title="Agent"
      description="Configure and manage your AI agent settings."
      icon={IconRobot}
      actions={<SaveStatusIndicator status={status} lastSaved={lastSaved} />}
    >
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="general" className="w-full p-2 bg-muted">
          <TabsList>
            <TabsTrigger value="general">
              <IconSettings className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="voice">
              <IconMicrophone className="size-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="rules">
              <IconRuler className="size-4" />
              Rules
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              <IconBook className="size-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="tools">
              <IconTool className="size-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="scorecard">
              <IconChartBar className="size-4" />
              Scorecard
            </TabsTrigger>
            <TabsTrigger value="widget">
              <IconApps className="size-4" />
              Web Widget
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Avatar</CardTitle>
                <CardDescription>Upload an image to represent your agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <NamedAvatar name="Customer Support Agent" size="lg" />
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <IconUpload className="mr-2 size-4" />
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended: 256x256px, PNG or JPG</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure your agent's identity and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input id="agent-name" placeholder="My AI Assistant" defaultValue="Customer Support Agent" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe what your agent does..."
                    defaultValue="An AI-powered customer support agent that helps users with inquiries."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-role">Role</Label>
                  <Select defaultValue="support">
                    <SelectTrigger id="agent-role" className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales Assistant</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phone Numbers</CardTitle>
                <CardDescription>Manage phone numbers for your agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconPhone className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">+1 (555) 123-4567</p>
                        <p className="text-xs text-muted-foreground">Primary • United States</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-dashed p-6 text-center">
                  <IconPhone className="mx-auto size-8 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No additional numbers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Purchase a phone number to get started</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Purchase Number
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Adjust the AI model settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger id="model" className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Temperature</Label>
                    <span className="text-sm text-muted-foreground">{temperature[0]}</span>
                  </div>
                  <Slider
                    id="temperature"
                    value={temperature}
                    onValueChange={setTemperature}
                    min={0}
                    max={2}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">Controls randomness in responses</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <span className="text-sm text-muted-foreground">{maxTokens[0]}</span>
                  </div>
                  <Slider
                    id="max-tokens"
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    min={100}
                    max={4000}
                    step={100}
                  />
                  <p className="text-xs text-muted-foreground">Maximum length of responses</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voice Selection</CardTitle>
                <CardDescription>Choose and configure the agent's voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voice-provider">Voice Provider</Label>
                  <Select defaultValue="elevenlabs">
                    <SelectTrigger id="voice-provider" className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      <SelectItem value="openai">OpenAI TTS</SelectItem>
                      <SelectItem value="google">Google Cloud TTS</SelectItem>
                      <SelectItem value="azure">Azure Speech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice">Voice</Label>
                  <Select defaultValue="rachel">
                    <SelectTrigger id="voice" className="w-full">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rachel">Rachel (Female, US)</SelectItem>
                      <SelectItem value="adam">Adam (Male, US)</SelectItem>
                      <SelectItem value="bella">Bella (Female, UK)</SelectItem>
                      <SelectItem value="josh">Josh (Male, US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Voice Preview</Label>
                    <p className="text-xs text-muted-foreground">Test the selected voice</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Play Sample
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Parameters</CardTitle>
                <CardDescription>Fine-tune voice characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-speed">Speed</Label>
                    <span className="text-sm text-muted-foreground">{speed[0].toFixed(1)}x</span>
                  </div>
                  <Slider id="voice-speed" value={speed} onValueChange={setSpeed} min={0.5} max={2.0} step={0.1} />
                  <p className="text-xs text-muted-foreground">Speaking speed multiplier</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-stability">Stability</Label>
                    <span className="text-sm text-muted-foreground">{stability[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    id="voice-stability"
                    value={stability}
                    onValueChange={setStability}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">Voice consistency level</p>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Background Noise Cancellation</Label>
                    <p className="text-xs text-muted-foreground">Reduce background noise in calls</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Skills</CardTitle>
                <CardDescription>Select capabilities your agent should have</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-support"
                      checked={selectedSkills.includes("handle-support")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "handle-support"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "handle-support"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-support" className="cursor-pointer font-medium">
                        Handle Support Tickets
                      </Label>
                      <p className="text-xs text-muted-foreground">Resolve customer issues and questions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-leads"
                      checked={selectedSkills.includes("qualify-leads")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "qualify-leads"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "qualify-leads"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-leads" className="cursor-pointer font-medium">
                        Qualify Leads
                      </Label>
                      <p className="text-xs text-muted-foreground">Ask questions to assess fit and interest</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-schedule"
                      checked={selectedSkills.includes("schedule-appointments")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "schedule-appointments"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "schedule-appointments"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-schedule" className="cursor-pointer font-medium">
                        Schedule Appointments
                      </Label>
                      <p className="text-xs text-muted-foreground">Book, reschedule, and confirm meetings</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-collect"
                      checked={selectedSkills.includes("collect-information")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "collect-information"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "collect-information"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-collect" className="cursor-pointer font-medium">
                        Collect Information
                      </Label>
                      <p className="text-xs text-muted-foreground">Gather customer data and feedback</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-answer"
                      checked={selectedSkills.includes("answer-questions")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "answer-questions"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "answer-questions"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-answer" className="cursor-pointer font-medium">
                        Answer FAQs
                      </Label>
                      <p className="text-xs text-muted-foreground">Respond to common questions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                      id="skill-transfer"
                      checked={selectedSkills.includes("transfer-calls")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, "transfer-calls"])
                        } else {
                          setSelectedSkills(selectedSkills.filter((s) => s !== "transfer-calls"))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="skill-transfer" className="cursor-pointer font-medium">
                        Transfer Calls
                      </Label>
                      <p className="text-xs text-muted-foreground">Escalate to human agents when needed</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <IconPlus className="mr-2 size-4" />
                  Add Custom Skill
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversation Stages</CardTitle>
                <CardDescription>Define how the agent behaves at each stage of the conversation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stage-greeting">Opening / Greeting</Label>
                  <Textarea
                    id="stage-greeting"
                    placeholder="How should the agent greet callers?"
                    rows={2}
                    value={conversationStages.greeting}
                    onChange={(e) => setConversationStages({ ...conversationStages, greeting: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">First thing the agent says when answering</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage-gathering">Information Gathering</Label>
                  <Textarea
                    id="stage-gathering"
                    placeholder="What questions should the agent ask to understand the caller's needs?"
                    rows={3}
                    value={conversationStages.informationGathering}
                    onChange={(e) =>
                      setConversationStages({ ...conversationStages, informationGathering: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">Discovery phase - collecting context and requirements</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage-solving">Problem Solving / Action</Label>
                  <Textarea
                    id="stage-solving"
                    placeholder="How should the agent provide help or take action?"
                    rows={3}
                    value={conversationStages.problemSolving}
                    onChange={(e) => setConversationStages({ ...conversationStages, problemSolving: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Main interaction - resolving issues or achieving goals
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage-closing">Closing / Confirmation</Label>
                  <Textarea
                    id="stage-closing"
                    placeholder="How should the agent wrap up the conversation?"
                    rows={2}
                    value={conversationStages.closing}
                    onChange={(e) => setConversationStages({ ...conversationStages, closing: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Final check before ending the call</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Template</CardTitle>
                <CardDescription>Choose a starting point that matches your use case</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Button
                    variant={selectedTemplate === "support" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 p-4"
                    onClick={() => setSelectedTemplate("support")}
                  >
                    <IconSettings className="size-5" />
                    <div className="text-sm font-medium">Customer Support</div>
                  </Button>
                  <Button
                    variant={selectedTemplate === "sales" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 p-4"
                    onClick={() => setSelectedTemplate("sales")}
                  >
                    <IconTarget className="size-5" />
                    <div className="text-sm font-medium">Sales & Leads</div>
                  </Button>
                  <Button
                    variant={selectedTemplate === "scheduling" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 p-4"
                    onClick={() => setSelectedTemplate("scheduling")}
                  >
                    <IconBook className="size-5" />
                    <div className="text-sm font-medium">Scheduling</div>
                  </Button>
                  <Button
                    variant={selectedTemplate === "collection" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 p-4"
                    onClick={() => setSelectedTemplate("collection")}
                  >
                    <IconChartBar className="size-5" />
                    <div className="text-sm font-medium">Info Collection</div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Control Mode</CardTitle>
                <CardDescription>Choose how you want to define conversation behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    variant={controlMode === "simple" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setControlMode("simple")}
                  >
                    Simple Goals
                  </Button>
                  <Button
                    variant={controlMode === "flow" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setControlMode("flow")}
                  >
                    Flow Builder
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Goals</CardTitle>
                <CardDescription>What should the agent accomplish during conversations?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-goal">Primary Goal</Label>
                  <Input
                    id="primary-goal"
                    placeholder="e.g., Resolve customer issues and provide support"
                    defaultValue="Resolve customer issues and provide support"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-goals">Secondary Goals (optional)</Label>
                  <Textarea
                    id="secondary-goals"
                    placeholder="e.g., Collect customer feedback, Upsell premium features"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="success-criteria">Success Criteria</Label>
                  <Input
                    id="success-criteria"
                    placeholder="e.g., Customer issue is resolved or escalated"
                    defaultValue="Customer issue is resolved or escalated"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behavioral Rules</CardTitle>
                <CardDescription>Define what the agent should and shouldn't do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Should Do</Label>
                  <div className="space-y-2">
                    {shouldDo.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2 pl-3">
                        <div className="flex-1 text-sm">{item}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setShouldDo(shouldDo.filter((_, i) => i !== index))}
                        >
                          <IconX className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a behavior the agent should follow"
                      value={newShouldDo}
                      onChange={(e) => setNewShouldDo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newShouldDo.trim()) {
                          setShouldDo([...shouldDo, newShouldDo.trim()])
                          setNewShouldDo("")
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newShouldDo.trim()) {
                          setShouldDo([...shouldDo, newShouldDo.trim()])
                          setNewShouldDo("")
                        }
                      }}
                    >
                      <IconPlus className="size-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base">Should Not Do</Label>
                  <div className="space-y-2">
                    {shouldNotDo.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border bg-destructive/5 p-2 pl-3">
                        <div className="flex-1 text-sm">{item}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setShouldNotDo(shouldNotDo.filter((_, i) => i !== index))}
                        >
                          <IconX className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a behavior the agent should avoid"
                      value={newShouldNotDo}
                      onChange={(e) => setNewShouldNotDo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newShouldNotDo.trim()) {
                          setShouldNotDo([...shouldNotDo, newShouldNotDo.trim()])
                          setNewShouldNotDo("")
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newShouldNotDo.trim()) {
                          setShouldNotDo([...shouldNotDo, newShouldNotDo.trim()])
                          setNewShouldNotDo("")
                        }
                      }}
                    >
                      <IconPlus className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {controlMode === "flow" && (
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Flow</CardTitle>
                  <CardDescription>Define how the agent structures conversations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="greeting">Greeting Message</Label>
                    <Textarea
                      id="greeting"
                      placeholder="e.g., Hi! I'm here to help with your questions today."
                      rows={2}
                      defaultValue="Hi! I'm here to help with your questions today."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topics">Topics to Discuss</Label>
                    <Textarea
                      id="topics"
                      placeholder="List the topics the agent should be prepared to discuss (one per line)"
                      rows={4}
                      defaultValue="Account issues&#10;Billing questions&#10;Technical support&#10;Product information"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="escalation">Escalation Criteria</Label>
                    <Textarea
                      id="escalation"
                      placeholder="When should the agent transfer to a human?"
                      rows={3}
                      defaultValue="Customer explicitly requests human agent&#10;Issue requires account access or refunds&#10;Customer is frustrated or angry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="closing">Closing Message</Label>
                    <Textarea
                      id="closing"
                      placeholder="e.g., Is there anything else I can help you with today?"
                      rows={2}
                      defaultValue="Is there anything else I can help you with today?"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Advanced Mode</CardTitle>
                    <CardDescription>View and edit the raw system prompt generated from your rules</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setAdvancedMode(!advancedMode)}>
                    {advancedMode ? (
                      <>
                        <IconChevronUp className="mr-1 size-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <IconChevronDown className="mr-1 size-4" />
                        Show
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              {advancedMode && (
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Raw system prompt..."
                      rows={12}
                      className="font-mono text-xs"
                      defaultValue={`You are a professional customer support agent for [Company Name].

PRIMARY GOAL: ${shouldDo[0] || "Resolve customer issues and provide support"}

BEHAVIORAL RULES:
Should Do:
${shouldDo.map((item) => `- ${item}`).join("\n")}

Should Not Do:
${shouldNotDo.map((item) => `- ${item}`).join("\n")}

Always be friendly, helpful, and professional. Ask clarifying questions when needed.`}
                    />
                    <p className="text-xs text-muted-foreground">
                      Changes here will override the structured rules above
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversation Settings</CardTitle>
                <CardDescription>Control conversation behavior and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Allow Interruptions</Label>
                    <p className="text-xs text-muted-foreground">User can interrupt agent while speaking</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>End Call on Silence</Label>
                    <p className="text-xs text-muted-foreground">Automatically end call after period of silence</p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-duration">Max Call Duration (min)</Label>
                    <Input id="max-duration" type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silence-timeout">Silence Timeout (sec)</Label>
                    <Input id="silence-timeout" type="number" defaultValue="10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Sources</CardTitle>
                <CardDescription>Upload and manage documents for the agent to reference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <IconBook className="mx-auto size-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No documents uploaded</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Upload PDFs, text files, or connect data sources</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button variant="outline">Upload Files</Button>
                    <Button variant="outline">Connect URL</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ Management</CardTitle>
                <CardDescription>Add frequently asked questions and answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faq-question">Question</Label>
                  <Input id="faq-question" placeholder="What are your business hours?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea
                    id="faq-answer"
                    placeholder="We're open Monday through Friday, 9 AM to 5 PM EST."
                    rows={3}
                  />
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Add FAQ
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retrieval Settings</CardTitle>
                <CardDescription>Configure how the agent uses knowledge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Enable RAG</Label>
                    <p className="text-xs text-muted-foreground">Use retrieval-augmented generation</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chunk-size">Chunk Size</Label>
                  <Select defaultValue="512">
                    <SelectTrigger id="chunk-size" className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="256">256 tokens</SelectItem>
                      <SelectItem value="512">512 tokens</SelectItem>
                      <SelectItem value="1024">1024 tokens</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Function Calling</CardTitle>
                <CardDescription>Enable tools and functions the agent can use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Calendar Integration</Label>
                    <p className="text-xs text-muted-foreground">Book and manage appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>CRM Integration</Label>
                    <p className="text-xs text-muted-foreground">Access and update customer records</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Email Actions</Label>
                    <p className="text-xs text-muted-foreground">Send follow-up emails</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Web Search</Label>
                    <p className="text-xs text-muted-foreground">Search the web for information</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Functions</CardTitle>
                <CardDescription>Add custom API endpoints for the agent to call</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="function-name">Function Name</Label>
                  <Input id="function-name" placeholder="get_order_status" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="function-description">Description</Label>
                  <Textarea id="function-description" placeholder="Describe what this function does..." rows={2} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="function-endpoint">API Endpoint</Label>
                  <Input id="function-endpoint" placeholder="https://api.example.com/orders" />
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Add Function
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Receive notifications about agent events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://yourapp.com/webhook" />
                </div>

                <div className="space-y-2">
                  <Label>Events to Subscribe</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="call-started" defaultChecked />
                      <Label htmlFor="call-started" className="font-normal">
                        Call Started
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="call-ended" defaultChecked />
                      <Label htmlFor="call-ended" className="font-normal">
                        Call Ended
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="function-called" />
                      <Label htmlFor="function-called" className="font-normal">
                        Function Called
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scorecard" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Quality Metrics</CardTitle>
                <CardDescription>Configure metrics to evaluate agent performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Response Time</Label>
                    <p className="text-xs text-muted-foreground">Measure how quickly agent responds</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Conversation Flow</Label>
                    <p className="text-xs text-muted-foreground">Evaluate natural conversation progression</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Goal Achievement</Label>
                    <p className="text-xs text-muted-foreground">Track if agent achieves call objectives</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Customer Satisfaction</Label>
                    <p className="text-xs text-muted-foreground">Measure caller satisfaction</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Criteria</CardTitle>
                <CardDescription>Add custom scoring criteria for your specific use case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="criteria-name">Criteria Name</Label>
                  <Input id="criteria-name" placeholder="e.g., Politeness, Accuracy" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="criteria-description">Description</Label>
                  <Textarea id="criteria-description" placeholder="Describe what this criterion measures..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="criteria-weight">Weight (1-10)</Label>
                  <Input id="criteria-weight" type="number" min="1" max="10" placeholder="5" />
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Add Criterion
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scoring Settings</CardTitle>
                <CardDescription>Configure how calls are scored</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="score-threshold">Minimum Passing Score</Label>
                  <Input id="score-threshold" type="number" min="0" max="100" placeholder="70" defaultValue="70" />
                  <p className="text-xs text-muted-foreground">Calls below this score will be flagged for review</p>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Auto-Review Low Scores</Label>
                    <p className="text-xs text-muted-foreground">Automatically flag calls below threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Generate Reports</Label>
                    <p className="text-xs text-muted-foreground">Create weekly performance reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="widget" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Widget Type</CardTitle>
                <CardDescription>Choose how users can interact with your agent</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="both" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chat" id="chat" />
                    <Label htmlFor="chat">Chat Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voice" id="voice" />
                    <Label htmlFor="voice">Voice Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the widget looks on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select defaultValue="right">
                      <SelectTrigger id="position">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Bottom Left</SelectItem>
                        <SelectItem value="right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="side-spacing">Side Spacing</Label>
                    <div className="relative">
                      <Input id="side-spacing" type="number" defaultValue="20" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">px</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bottom-spacing">Bottom Spacing</Label>
                    <div className="relative">
                      <Input id="bottom-spacing" type="number" defaultValue="20" className="pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">px</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <ColorInput
                      value="#6366f1"
                      onChange={() => {}}
                      onReset={() => {}}
                      placeholder="#6366f1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-display-name">Display Name</Label>
                    <Input id="agent-display-name" placeholder="Sarah" defaultValue="Sarah" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widget-description">Widget Description</Label>
                  <Textarea
                    id="widget-description"
                    placeholder="How can I help you today?"
                    defaultValue="Hi! I'm here to help you with any questions about our product."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embed Code</CardTitle>
                <CardDescription>
                  Add this code to your website before the closing &lt;/body&gt; tag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`(function (d, t) {
  if (typeof window === 'undefined') return;
  var v = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
  v.onload = function () {
    window.audial.loadWidget({
      agentId: 'agent_abc123xyz',
      apiKey: 'pk_live_xyz789ghi012',
    });
  };
  v.type = "module";
  v.src = "https://app.audial.co/widget/bundle.mjs";
  s.parentNode.insertBefore(v, s);
})(document, 'script');`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-slate-400 hover:text-slate-50"
                    onClick={() => toast.success("Embed code copied to clipboard")}
                  >
                    <IconCopy className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
