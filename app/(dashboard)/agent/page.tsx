"use client"

import * as React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import {
  IconRobot,
  IconSettings,
  IconMicrophone,
  IconRuler,
  IconTool,
  IconPhone,
  IconUpload,
  IconPlus,
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconApps,
} from "@tabler/icons-react"
import { Loader2 } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { SaveStatusIndicator } from "@/components/save-status-indicator"
import { useAutosave } from "@/lib/hooks/use-autosave"
import {
  useAgents,
  useAgent,
  useCreateAgent,
  useUpdateAgent,
  usePhoneNumbers,
  type CreateAgentInput,
  type UpdateAgentInput,
  type Routing,
  type Tool,
  type PhoneNumber,
} from "@/lib/api"
import { CallForwardingCard } from "@/components/agent/call-forwarding-card"
import { ToolsSection } from "@/components/agent/tools/tools-section"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { agentOptions } from "@/lib/validations/onboarding"
import { useGetWidgetConfigByAgent } from "@/lib/features/widget"
import { useDefaultPublicApiKey } from "@/lib/features/api-keys"
import { WebWidgetForm } from "@/components/widget-config/web-widget-form"

// Widget preview container ID
const WIDGET_CONTAINER_ID = "audial-widget-preview-container"

// Agent template configurations for creation
const agentTemplates: Record<string, Omit<CreateAgentInput, 'name'>> = {
  sarah: {
    languageCode: "en",
    prompt: "You are Sarah, a friendly and professional AI receptionist. Your role is to greet callers warmly, understand their needs, and help schedule appointments. Be helpful, patient, and always maintain a positive tone.",
    model: { provider: "openai", model: "gpt-4o", temperature: 0.7 },
    voice: { provider: "elevenlabs", voiceId: "21m00Tcm4TlvDq8ikWAM" },
    maxDurationSeconds: 600,
    allowInterruptions: true,
    interruptionSensitivity: "medium",
  },
  charlie: {
    languageCode: "en",
    prompt: "You are Charlie, an expert at qualifying leads and conducting surveys. Your role is to ask thoughtful questions, gather important information, and help identify qualified prospects. Be conversational but focused on gathering key data points.",
    model: { provider: "openai", model: "gpt-4o", temperature: 0.7 },
    voice: { provider: "elevenlabs", voiceId: "29vD33N1CtxCmqQRPOHJ" },
    maxDurationSeconds: 900,
    allowInterruptions: true,
    interruptionSensitivity: "medium",
  },
  kate: {
    languageCode: "en",
    prompt: "You are Kate, a skilled sales representative and customer support specialist. Your role is to help customers find the right products, answer their questions, and provide excellent service. Be enthusiastic, knowledgeable, and solution-oriented.",
    model: { provider: "openai", model: "gpt-4o", temperature: 0.7 },
    voice: { provider: "elevenlabs", voiceId: "EXAVITQu4vr4xnSDxMaL" },
    maxDurationSeconds: 900,
    allowInterruptions: true,
    interruptionSensitivity: "medium",
  },
  other: {
    languageCode: "en",
    prompt: "You are a helpful AI assistant. Customize this prompt to define your agent's personality, role, and behavior.",
    model: { provider: "openai", model: "gpt-4o", temperature: 0.7 },
    voice: { provider: "elevenlabs", voiceId: "21m00Tcm4TlvDq8ikWAM" },
    maxDurationSeconds: 600,
    allowInterruptions: true,
    interruptionSensitivity: "medium",
  },
}

export default function AgentPage() {
  // API hooks
  const { data: agentsResponse, isLoading: isLoadingAgents, error: agentsError } = useAgents()
  // Normalize agents to always be an array (handles both array and paginated responses)
  const agents = (() => {
    if (!agentsResponse) return []
    if (Array.isArray(agentsResponse)) return agentsResponse
    // Handle paginated response { data: [...] }
    const maybeData = (agentsResponse as unknown as { data?: unknown })?.data
    if (Array.isArray(maybeData)) return maybeData as typeof agentsResponse
    return []
  })()
  const createAgentMutation = useCreateAgent()
  const updateAgentMutation = useUpdateAgent()

  // Phone numbers
  const { data: phoneNumbersResponse } = usePhoneNumbers()

  // Normalize phone numbers to always be an array
  const allPhoneNumbers = (() => {
    if (!phoneNumbersResponse) return []
    if (Array.isArray(phoneNumbersResponse)) return phoneNumbersResponse
    const maybeData = (phoneNumbersResponse as unknown as { data?: PhoneNumber[] })?.data
    if (Array.isArray(maybeData)) return maybeData
    return []
  })()

  // Selected agent ID
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)

  // Create Agent Dialog State
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [newAgentName, setNewAgentName] = useState("")

  // Fetch the selected agent
  const { data: agent, isLoading: isLoadingAgent } = useAgent(selectedAgentId ?? undefined)

  // Fetch widget config for the selected agent
  const { data: widgetConfig, isLoading: isLoadingWidget } = useGetWidgetConfigByAgent(selectedAgentId ?? "")

  // Widget preview state - always enabled when on widget tab
  const { data: defaultApiKey } = useDefaultPublicApiKey()
  const [activeTab, setActiveTab] = useState("general")
  const widgetScriptRef = React.useRef<HTMLScriptElement | null>(null)

  // Load/unload widget preview when on widget tab
  const widgetPreviewEnabled = activeTab === "widget"

  // Helper to clean up widget DOM elements
  const cleanupWidget = useCallback(() => {
    // Call destroy if available
    if (window.audial?.destroy) {
      window.audial.destroy()
    }
    // Remove the main widget container
    const widgetRoot = document.getElementById("audial-widget")
    if (widgetRoot) {
      widgetRoot.remove()
    }
    // Remove any widget DOM elements that might persist
    const widgetElements = document.querySelectorAll('[id^="audial"], [class*="audial"]')
    widgetElements.forEach((el) => el.remove())
    // Also check for common widget container patterns
    const shadowHosts = document.querySelectorAll('[data-audial-widget]')
    shadowHosts.forEach((el) => el.remove())
    // Remove script
    if (widgetScriptRef.current) {
      widgetScriptRef.current.remove()
      widgetScriptRef.current = null
    }
    // Reset window.audial to force re-initialization
    if (window.audial) {
      delete (window as Window & { audial?: unknown }).audial
    }
  }, [])

  // Dispatch config updates to the widget preview in real-time
  const handleDispatchAction = useCallback((payload: Record<string, unknown>) => {
    if (typeof window.audial === "undefined") return;
    window.audial.dispatchAction("update-config", payload);
  }, []);

  useEffect(() => {
    if (!widgetPreviewEnabled || !selectedAgentId || !defaultApiKey?.id) {
      cleanupWidget()
      return
    }

    // Load the widget script
    const script = document.createElement("script")
    script.type = "module"
    script.src = "/widget/bundle.mjs" // Local development bundle
    script.onload = () => {
      if (window.audial) {
        window.audial.loadWidget({
          agentId: selectedAgentId,
          apiKey: defaultApiKey.id,
          baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
          options: {
            containerId: WIDGET_CONTAINER_ID,
            previewMode: true,
            defaultOpen: true,
            debug: false,
          },
        })
      }
    }
    script.onerror = () => {
      // Try production URL if local fails
      const prodScript = document.createElement("script")
      prodScript.type = "module"
      prodScript.src = "https://app.audial.co/widget/bundle.mjs"
      prodScript.onload = () => {
        if (window.audial) {
          window.audial.loadWidget({
            agentId: selectedAgentId,
            apiKey: defaultApiKey.id,
            baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
            options: {
              containerId: WIDGET_CONTAINER_ID,
              previewMode: true,
              defaultOpen: true,
              debug: false,
            },
          })
        }
      }
      prodScript.onerror = () => {
        toast.error("Failed to load widget preview")
      }
      widgetScriptRef.current = prodScript
      document.body.appendChild(prodScript)
    }

    widgetScriptRef.current = script
    document.body.appendChild(script)

    return () => cleanupWidget()
  }, [widgetPreviewEnabled, selectedAgentId, defaultApiKey?.id, cleanupWidget])

  // Auto-select first agent when agents load
  useEffect(() => {
    if (agents && agents.length > 0 && !selectedAgentId) {
      setSelectedAgentId(agents[0].id)
    }
  }, [agents, selectedAgentId])

  // Core config state (synced from API)
  const [agentName, setAgentName] = useState("")
  const [agentPrompt, setAgentPrompt] = useState("")
  const [temperature, setTemperature] = useState([0.7])
  const [speed, setSpeed] = useState([1.0])
  const [stability, setStability] = useState([0.5])
  const [maxDurationSeconds, setMaxDurationSeconds] = useState(1800)
  const [silenceTimeout, setSilenceTimeout] = useState(10)
  const [allowInterruptions, setAllowInterruptions] = useState(true)
  const [modelProvider, setModelProvider] = useState("openai")
  const [modelName, setModelName] = useState("gpt-4")
  const [voiceProvider, setVoiceProvider] = useState("elevenlabs")
  const [voiceId, setVoiceId] = useState("")

  // Required API fields
  const [languageCode, setLanguageCode] = useState("en")

  // V3 API fields
  const [routings, setRoutings] = useState<Routing[]>([])
  const [tools, setTools] = useState<Tool[]>([])

  // Additional API fields
  const [similarityBoost, setSimilarityBoost] = useState([0.75])
  const [interruptionSensitivity, setInterruptionSensitivity] = useState<"low" | "medium" | "high">("medium")
  const [transcriberProvider, setTranscriberProvider] = useState("deepgram")
  const [transcriberModel, setTranscriberModel] = useState("nova-2")
  const [checkHumanPresence, setCheckHumanPresence] = useState(true)
  const [checkHumanPresenceCount, setCheckHumanPresenceCount] = useState(2)
  const [enableCutoffResponses, setEnableCutoffResponses] = useState(false)
  const [cutoffResponses, setCutoffResponses] = useState<string[]>([])

  // UI-only state (not tracked by autosave)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [newCutoffResponse, setNewCutoffResponse] = useState("")

  // Sync form state when agent data loads
  useEffect(() => {
    if (agent) {
      setAgentName(agent.name || "")
      setAgentPrompt(agent.prompt || "")
      setTemperature([agent.model?.temperature ?? 0.7])
      setSpeed([agent.voice?.speed ?? 1.0])
      setStability([agent.voice?.stability ?? 0.5])
      setSimilarityBoost([agent.voice?.similarityBoost ?? 0.75])
      setMaxDurationSeconds(agent.maxDurationSeconds ?? 1800)
      setSilenceTimeout(agent.allowedIdleTime ?? 10)
      setAllowInterruptions(agent.allowInterruptions ?? true)
      setInterruptionSensitivity(agent.interruptionSensitivity || "medium")
      setModelProvider(agent.model?.provider || "openai")
      setModelName(agent.model?.model || "gpt-4")
      setVoiceProvider(agent.voice?.provider || "elevenlabs")
      setVoiceId(agent.voice?.voiceId || "")
      setLanguageCode(agent.languageCode || "en")
      setTranscriberProvider(agent.transcriber?.provider || "deepgram")
      setTranscriberModel(agent.transcriber?.model || "nova-2")
      setCheckHumanPresence(agent.checkHumanPresence ?? true)
      setCheckHumanPresenceCount(agent.checkHumanPresenceCount ?? 2)
      setEnableCutoffResponses(agent.enableCutoffResponses ?? false)
      setCutoffResponses(agent.cutoffResponses || [])
      setRoutings(agent.routings || [])
      setTools(agent.tools || [])
    }
  }, [agent])

  // Build update payload from form state
  const buildUpdatePayload = useCallback((): UpdateAgentInput => {
    return {
      name: agentName,
      languageCode,
      prompt: agentPrompt,
      model: {
        provider: modelProvider,
        model: modelName,
        temperature: temperature[0],
      },
      voice: {
        provider: voiceProvider,
        voiceId: voiceId,
        speed: speed[0],
        stability: stability[0],
        similarityBoost: similarityBoost[0],
      },
      transcriber: {
        provider: transcriberProvider,
        model: transcriberModel,
      },
      maxDurationSeconds,
      allowedIdleTime: silenceTimeout,
      allowInterruptions,
      interruptionSensitivity,
      checkHumanPresence,
      checkHumanPresenceCount,
      enableCutoffResponses,
      cutoffResponses,
      routings,
      tools,
    }
  }, [
    agentName,
    languageCode,
    agentPrompt,
    modelProvider,
    modelName,
    temperature,
    voiceProvider,
    voiceId,
    speed,
    stability,
    similarityBoost,
    transcriberProvider,
    transcriberModel,
    maxDurationSeconds,
    silenceTimeout,
    allowInterruptions,
    interruptionSensitivity,
    checkHumanPresence,
    checkHumanPresenceCount,
    enableCutoffResponses,
    cutoffResponses,
    routings,
    tools,
  ])

  // Save function using the API
  const handleSave = useCallback(async () => {
    if (!selectedAgentId) return

    const payload = buildUpdatePayload()
    await updateAgentMutation.mutateAsync({ id: selectedAgentId, data: payload })
  }, [selectedAgentId, buildUpdatePayload, updateAgentMutation])

  // Autosave hook - using the API payload
  const agentConfig = useMemo(() => buildUpdatePayload(), [buildUpdatePayload])

  const { status, lastSaved } = useAutosave({
    data: agentConfig,
    onSave: handleSave,
    debounceMs: 1500,
    enabled: !!selectedAgentId && !!agent,
  })

  const isSaving = status === "saving"

  // Create Agent Handler
  const handleCreateAgent = async () => {
    if (!selectedTemplateId || !newAgentName.trim()) return

    const template = agentTemplates[selectedTemplateId]
    if (!template) return

    try {
      const newAgent = await createAgentMutation.mutateAsync({
        name: newAgentName.trim(),
        ...template,
      })

      // Close dialog and select the new agent
      setShowCreateDialog(false)
      setSelectedTemplateId(null)
      setNewAgentName("")
      setSelectedAgentId(newAgent.id)

      toast.success(`Agent "${newAgentName.trim()}" created successfully`)
    } catch {
      // Error is handled by mutation
    }
  }

  const handleCreateDialogClose = (open: boolean) => {
    setShowCreateDialog(open)
    if (!open) {
      setSelectedTemplateId(null)
      setNewAgentName("")
    }
  }

  // Loading state
  if (isLoadingAgents) {
    return (
      <PageLayout
        title="Agent"
        description="Configure and manage your AI agent settings."
        icon={IconRobot}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageLayout>
    )
  }

  // Error state
  if (agentsError) {
    return (
      <PageLayout
        title="Agent"
        description="Configure and manage your AI agent settings."
        icon={IconRobot}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load agents</p>
          <p className="text-sm text-muted-foreground">
            {agentsError instanceof Error ? agentsError.message : "An error occurred"}
          </p>
        </div>
      </PageLayout>
    )
  }

  // Create Agent Dialog Component (reusable)
  const createAgentDialog = (
    <Dialog open={showCreateDialog} onOpenChange={handleCreateDialogClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Choose a template to start with. You can customize your agent after creation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Template Selection */}
          <div className="space-y-3">
            <Label>Choose a Template</Label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {agentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedTemplateId(option.id)
                    // Auto-fill name for templates (except "other")
                    if (option.id !== "other" && !newAgentName) {
                      setNewAgentName(option.name)
                    }
                  }}
                  className={`group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left shadow-sm transition-all hover:shadow-md ${
                    selectedTemplateId === option.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.name}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <IconRobot className="size-10 text-muted-foreground/40" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <span className="font-medium text-sm">{option.name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {option.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Agent Name Input */}
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              placeholder="Enter agent name"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleCreateDialogClose(false)}
            disabled={createAgentMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateAgent}
            disabled={!selectedTemplateId || !newAgentName.trim() || createAgentMutation.isPending}
          >
            {createAgentMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Agent"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // No agents state
  if (!agents || agents.length === 0) {
    return (
      <>
        <PageLayout
          title="Agent"
          description="Configure and manage your AI agent settings."
          icon={IconRobot}
        >
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <IconRobot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">No agents yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first AI agent to get started.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <IconPlus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </div>
        </PageLayout>
        {createAgentDialog}
      </>
    )
  }

  return (
    <>
    <PageLayout
      title="Agent"
      description="Configure and manage your AI agent settings."
      icon={IconRobot}
      actions={<SaveStatusIndicator status={status} lastSaved={lastSaved} />}
    >
      {isLoadingAgent ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
      <div className="px-4 lg:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full p-2 bg-muted">
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
            <TabsTrigger value="tools">
              <IconTool className="size-4" />
              Tools
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
                  <Input
                    id="agent-name"
                    placeholder="My AI Assistant"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe what your agent does..."
                    defaultValue="An AI-powered customer support agent that helps users with inquiries."
                    rows={3}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-role">Role</Label>
                  <Select defaultValue="support" disabled={isSaving}>
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
                <CardDescription>Your purchased phone numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allPhoneNumbers.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <IconPhone className="mx-auto size-8 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">No phone numbers</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Purchase a phone number to get started
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => window.location.href = "/settings/phone-numbers"}
                    >
                      Manage Phone Numbers
                    </Button>
                  </div>
                ) : (
                  allPhoneNumbers.map((phone) => (
                    <div key={phone.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconPhone className="size-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{phone.number}</p>
                            <p className="text-xs text-muted-foreground">
                              {phone.name || "Unnamed"} • {phone.provider}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.location.href = "/settings/phone-numbers"}
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <CallForwardingCard
              enabled={routings.length > 0}
              routing={routings[0] || null}
              agents={agents || []}
              currentAgentId={selectedAgentId || ""}
              onEnabledChange={(enabled) => {
                if (!enabled) setRoutings([])
              }}
              onRoutingChange={(routing) => {
                setRoutings(routing ? [routing] : [])
              }}
              disabled={isSaving}
            />

            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Adjust the AI model settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model-provider">Provider</Label>
                  <Select value={modelProvider} onValueChange={setModelProvider} disabled={isSaving}>
                    <SelectTrigger id="model-provider" className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select value={modelName} onValueChange={setModelName} disabled={isSaving}>
                    <SelectTrigger id="model" className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
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
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">Controls randomness in responses</p>
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
                  <Select value={voiceProvider} onValueChange={setVoiceProvider} disabled={isSaving}>
                    <SelectTrigger id="voice-provider" className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      <SelectItem value="cartesia">Cartesia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice">Voice ID</Label>
                  <Input
                    id="voice"
                    placeholder="Enter voice ID"
                    value={voiceId}
                    onChange={(e) => setVoiceId(e.target.value)}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    The voice ID from your provider (e.g., ElevenLabs voice ID)
                  </p>
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
                  <Slider id="voice-speed" value={speed} onValueChange={setSpeed} min={0.5} max={2.0} step={0.1} disabled={isSaving} />
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
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">Voice consistency level</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-similarity">Similarity Boost</Label>
                    <span className="text-sm text-muted-foreground">{similarityBoost[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    id="voice-similarity"
                    value={similarityBoost}
                    onValueChange={setSimilarityBoost}
                    min={0}
                    max={1}
                    step={0.01}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">How closely the voice matches the original</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speech Recognition</CardTitle>
                <CardDescription>Configure how the agent understands spoken input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transcriber-provider">Transcriber Provider</Label>
                  <Select value={transcriberProvider} onValueChange={setTranscriberProvider} disabled={isSaving}>
                    <SelectTrigger id="transcriber-provider" className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepgram">Deepgram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transcriber-model">Transcriber Model</Label>
                  <Select value={transcriberModel} onValueChange={setTranscriberModel} disabled={isSaving}>
                    <SelectTrigger id="transcriber-model" className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nova-2">Nova 2 (Recommended)</SelectItem>
                      <SelectItem value="nova">Nova</SelectItem>
                      <SelectItem value="enhanced">Enhanced</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Nova 2 offers the best accuracy for real-time transcription
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6 space-y-4">
            {/* System Prompt Card */}
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
                      placeholder="Enter your agent's system prompt..."
                      rows={12}
                      className="font-mono text-xs"
                      value={agentPrompt}
                      onChange={(e) => setAgentPrompt(e.target.value)}
                      disabled={isSaving}
                    />
                    <p className="text-xs text-muted-foreground">
                      This is the main instruction that guides your agent's behavior
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Conversation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Conversation Settings</CardTitle>
                <CardDescription>Control conversation behavior and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Interruptions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label>Allow Interruptions</Label>
                      <p className="text-xs text-muted-foreground">User can interrupt agent while speaking</p>
                    </div>
                    <Switch
                      checked={allowInterruptions}
                      onCheckedChange={setAllowInterruptions}
                      disabled={isSaving}
                    />
                  </div>

                  {allowInterruptions && (
                    <div className="ml-4 space-y-2">
                      <Label htmlFor="interruption-sensitivity">Interruption Sensitivity</Label>
                      <Select value={interruptionSensitivity} onValueChange={(value: "low" | "medium" | "high") => setInterruptionSensitivity(value)} disabled={isSaving}>
                        <SelectTrigger id="interruption-sensitivity" className="w-full">
                          <SelectValue placeholder="Select sensitivity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Higher sensitivity means the agent responds to shorter interruptions
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Human Presence Detection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label>Check Human Presence</Label>
                      <p className="text-xs text-muted-foreground">Verify a human is on the call before proceeding</p>
                    </div>
                    <Switch
                      checked={checkHumanPresence}
                      onCheckedChange={setCheckHumanPresence}
                      disabled={isSaving}
                    />
                  </div>

                  {checkHumanPresence && (
                    <div className="ml-4 space-y-2">
                      <Label htmlFor="human-presence-count">Verification Attempts</Label>
                      <Input
                        id="human-presence-count"
                        type="number"
                        min={1}
                        max={5}
                        value={checkHumanPresenceCount}
                        onChange={(e) => setCheckHumanPresenceCount(Number(e.target.value))}
                        className="w-24"
                        disabled={isSaving}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of attempts before giving up
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Call Limits */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-duration">Max Call Duration (sec)</Label>
                    <Input
                      id="max-duration"
                      type="number"
                      value={maxDurationSeconds}
                      onChange={(e) => setMaxDurationSeconds(Number(e.target.value))}
                      className={maxDurationSeconds > 3600 ? "border-destructive" : ""}
                      disabled={isSaving}
                    />
                    {maxDurationSeconds > 3600 ? (
                      <p className="text-xs text-destructive">
                        Maximum allowed duration is 3600 seconds (60 minutes)
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(maxDurationSeconds / 60)} minutes
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silence-timeout">Silence Timeout (sec)</Label>
                    <Input
                      id="silence-timeout"
                      type="number"
                      value={silenceTimeout}
                      onChange={(e) => setSilenceTimeout(Number(e.target.value))}
                      disabled={isSaving}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cutoff Responses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cutoff Responses</CardTitle>
                    <CardDescription>Phrases that will immediately end the call</CardDescription>
                  </div>
                  <Switch
                    checked={enableCutoffResponses}
                    onCheckedChange={setEnableCutoffResponses}
                    disabled={isSaving}
                  />
                </div>
              </CardHeader>
              {enableCutoffResponses && (
                <CardContent className="space-y-4">
                  {cutoffResponses.length > 0 && (
                    <div className="space-y-2">
                      {cutoffResponses.map((response, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2 pl-3">
                          <div className="flex-1 text-sm">{response}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => setCutoffResponses(cutoffResponses.filter((_, i) => i !== index))}
                            disabled={isSaving}
                          >
                            <IconX className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a cutoff phrase, e.g., 'Goodbye'"
                      value={newCutoffResponse}
                      onChange={(e) => setNewCutoffResponse(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newCutoffResponse.trim()) {
                          setCutoffResponses([...cutoffResponses, newCutoffResponse.trim()])
                          setNewCutoffResponse("")
                        }
                      }}
                      disabled={isSaving}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newCutoffResponse.trim()) {
                          setCutoffResponses([...cutoffResponses, newCutoffResponse.trim()])
                          setNewCutoffResponse("")
                        }
                      }}
                      disabled={isSaving}
                    >
                      <IconPlus className="size-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When the agent says any of these phrases, the call will end immediately.
                  </p>
                </CardContent>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-6 space-y-4">
            <ToolsSection
              tools={tools}
              onToolsChange={setTools}
              disabled={isSaving}
            />
          </TabsContent>

          <TabsContent value="widget" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left column - Settings & Embed Code */}
              <div className="flex-1 space-y-6">
                {isLoadingWidget ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : widgetConfig ? (
                  <WebWidgetForm
                    widgetConfig={widgetConfig}
                    agentId={selectedAgentId ?? undefined}
                    hideHeader
                    onFormChange={handleDispatchAction}
                  />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <IconApps className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">No widget configured</h3>
                      <p className="text-sm text-muted-foreground">
                        Widget configuration will be available once you save your agent settings.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right column - Live Preview */}
              <div className="w-full lg:w-[440px] shrink-0">
                <Card className="h-full min-h-[500px] border-0 shadow-none bg-transparent">
                  <CardHeader className="pt-0">
                    <CardTitle className="text-base">Live Preview</CardTitle>
                    <CardDescription>
                      Interact with your widget in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative h-[calc(100%-5rem)]">
                    {!defaultApiKey?.id ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <IconApps className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">API Key Required</h3>
                        <p className="text-sm text-muted-foreground">
                          Create a public API key in Settings &gt; API Keys to preview the widget.
                        </p>
                      </div>
                    ) : (
                      <div
                        id={WIDGET_CONTAINER_ID}
                        className="h-full w-full min-h-[400px] flex justify-center"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>
      )}
    </PageLayout>
    {createAgentDialog}
    </>
  )
}
