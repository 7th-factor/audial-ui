'use client'

import { useState } from 'react'
import { Copy, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useDefaultPublicApiKey } from '@/lib/features/api-keys'

const getCodeSnippet = (agentId: string, publicApiKey: string) => {
  return `(function (d, t) {
if (typeof window === 'undefined') {
  return;
}
  var v = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
  v.onload = function () {
    window.audial.loadWidget({
      agentId: '${agentId}',
      apiKey: '${publicApiKey}',
    });
  };
  v.type = "module";
  v.src = "https://app.audial.co/widget/bundle.mjs";
  s.parentNode.insertBefore(v, s);
})(document, 'script');
`
}

interface EmbedCodeSectionProps {
  agentId?: string
}

export function EmbedCodeSection({ agentId }: EmbedCodeSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const { data: defaultPublicApiKey } = useDefaultPublicApiKey()
  const codeSnippet = getCodeSnippet(agentId || '', defaultPublicApiKey?.id || '')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet)
      toast.success('Embed code copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy embed code')
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTrigger asChild className={cn('', isOpen && 'border-b')}>
        <Button
          variant="ghost"
          className="px-4 py-4 h-auto flex w-full justify-between text-[15px] font-semibold text-left hover:bg-transparent rounded-b-none"
        >
          Embed Code
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-5 space-y-4">
        <p className="text-sm text-muted-foreground">
          Paste this code snippet before the closing {'</body>'} tag on all pages you want
          the widget to appear. Remember to publish a production version to see your agent
          appear.
        </p>
        <div className="relative">
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeSnippet}</code>
          </pre>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0 text-slate-400 hover:text-slate-50"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
