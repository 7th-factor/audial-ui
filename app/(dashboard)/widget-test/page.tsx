"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { IconBrandChrome, IconCopy, IconCheck, IconRefresh } from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

// Extend window for audial widget
declare global {
  interface Window {
    audial?: {
      loadWidget: (config: WidgetConfig) => void
      updateConfig?: (config: Partial<WidgetConfig>) => void
    }
  }
}

interface WidgetConfig {
  agentId: string
  apiKey: string
  baseUrl: string
  options: {
    containerId: string
    previewMode?: boolean
    defaultOpen?: boolean
    debug?: boolean
  }
}

const widgetConfigSchema = z.object({
  agentId: z.string().min(1, "Agent ID is required"),
  apiKey: z.string().min(1, "API Key is required"),
  defaultOpen: z.boolean().default(true),
  debug: z.boolean().default(true),
})

type WidgetConfigFormValues = z.infer<typeof widgetConfigSchema>

const WIDGET_CONTAINER_ID = "audial-widget-container"

export default function WidgetTestPage() {
  const [isWidgetLoaded, setIsWidgetLoaded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const widgetScriptRef = React.useRef<HTMLScriptElement | null>(null)

  const form = useForm<WidgetConfigFormValues>({
    resolver: zodResolver(widgetConfigSchema),
    defaultValues: {
      agentId: "",
      apiKey: "",
      defaultOpen: true,
      debug: true,
    },
  })

  const loadWidget = React.useCallback((values: WidgetConfigFormValues) => {
    // Remove existing script if any
    if (widgetScriptRef.current) {
      widgetScriptRef.current.remove()
      widgetScriptRef.current = null
    }

    // Clear the container
    const container = document.getElementById(WIDGET_CONTAINER_ID)
    if (container) {
      container.innerHTML = ""
    }

    const config: WidgetConfig = {
      agentId: values.agentId,
      apiKey: values.apiKey,
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
      options: {
        containerId: WIDGET_CONTAINER_ID,
        previewMode: true,
        defaultOpen: values.defaultOpen,
        debug: values.debug,
      },
    }

    // Create and load script
    const script = document.createElement("script")
    script.type = "module"
    script.src = "/widget/bundle.mjs"
    script.onload = () => {
      if (window.audial) {
        window.audial.loadWidget(config)
        setIsWidgetLoaded(true)
        toast.success("Widget loaded successfully")
      } else {
        toast.error("Widget bundle not found. Make sure bundle.mjs is in /public/widget/")
      }
    }
    script.onerror = () => {
      toast.error("Failed to load widget bundle. Check that /public/widget/bundle.mjs exists.")
    }

    widgetScriptRef.current = script
    document.body.appendChild(script)
  }, [])

  const handleSubmit = (values: WidgetConfigFormValues) => {
    loadWidget(values)
  }

  const handleRefresh = () => {
    const values = form.getValues()
    if (values.agentId && values.apiKey) {
      loadWidget(values)
    }
  }

  const generateSnippet = React.useCallback(() => {
    const values = form.getValues()
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.audial.io"

    return `<script>
(function(d, t) {
  var v = d.createElement(t);
  var s = d.getElementsByTagName(t)[0];
  v.onload = function () {
    window.audial.loadWidget({
      agentId: '${values.agentId || "YOUR_AGENT_ID"}',
      apiKey: '${values.apiKey || "YOUR_API_KEY"}',
      baseUrl: '${baseUrl}',
      options: {
        containerId: 'audial-widget',
        defaultOpen: ${values.defaultOpen}
      }
    });
  };
  v.type = "module";
  v.src = "https://cdn.audial.io/widget/bundle.mjs";
  s.parentNode.insertBefore(v, s);
})(document, 'script');
</script>
<div id="audial-widget"></div>`
  }, [form])

  const handleCopySnippet = async () => {
    const snippet = generateSnippet()
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    toast.success("Snippet copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageLayout
      title="Widget Test"
      description="Test and preview the Audial widget before deployment."
      icon={IconBrandChrome}
    >
      <div className="px-4 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Configuration</CardTitle>
              <CardDescription>
                Configure the widget settings and load it in the preview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="agentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent ID</FormLabel>
                        <FormControl>
                          <Input placeholder="agent_xxxxx" {...field} />
                        </FormControl>
                        <FormDescription>
                          The unique identifier for your agent.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="ak_xxxxx" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your public API key for the widget.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="defaultOpen"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Default Open</FormLabel>
                          <FormDescription>
                            Open the widget automatically on load.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="debug"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Debug Mode</FormLabel>
                          <FormDescription>
                            Enable console logging for debugging.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Load Widget
                    </Button>
                    {isWidgetLoaded && (
                      <Button type="button" variant="outline" onClick={handleRefresh}>
                        <IconRefresh className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Preview</CardTitle>
              <CardDescription>
                Live preview of the widget with your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id={WIDGET_CONTAINER_ID}
                className="min-h-[400px] rounded-lg border bg-muted/30 flex items-center justify-center"
              >
                {!isWidgetLoaded && (
                  <p className="text-muted-foreground text-sm">
                    Configure and load the widget to see the preview.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Embed Code</CardTitle>
                  <CardDescription>
                    Copy this snippet to embed the widget on your website.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopySnippet}>
                  {copied ? (
                    <IconCheck className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <IconCopy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                <code className="text-sm font-mono">{generateSnippet()}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
