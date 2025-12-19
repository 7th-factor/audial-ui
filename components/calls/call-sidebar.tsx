'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SidebarWidget {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

interface CallSidebarProps {
  widgets: SidebarWidget[];
  isLoading?: boolean;
  className?: string;
}

/**
 * CallSidebar - Collapsible right sidebar with widget sections
 *
 * Kustomer-style sidebar with expandable/collapsible sections
 * First widget is always expanded by default
 */
export function CallSidebar({ widgets, isLoading, className }: CallSidebarProps) {
  // Track open state for each widget (first one open by default)
  const [openWidgets, setOpenWidgets] = useState<Record<string, boolean>>(() =>
    widgets.reduce(
      (acc, widget, index) => ({
        ...acc,
        [widget.id]: widget.defaultOpen ?? index === 0, // First widget open by default
      }),
      {}
    )
  );

  const toggleWidget = (id: string) => {
    setOpenWidgets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return <CallSidebarSkeleton />;
  }

  return (
    <aside className={cn('w-full h-full max-h-full bg-background flex flex-col overflow-hidden', className)}>
      <div className="flex-1 min-h-0 max-h-full overflow-y-auto pl-4 space-y-4">
        {widgets.map((widget) => (
          <SidebarWidgetItem
            key={widget.id}
            widget={widget}
            isOpen={openWidgets[widget.id] ?? false}
            onToggle={() => toggleWidget(widget.id)}
          />
        ))}
      </div>
    </aside>
  );
}

interface SidebarWidgetItemProps {
  widget: SidebarWidget;
  isOpen: boolean;
  onToggle: () => void;
}

function SidebarWidgetItem({ widget, isOpen, onToggle }: SidebarWidgetItemProps) {
  return (
    <CollapsibleCard
      title={widget.title}
      icon={widget.icon}
      defaultOpen={isOpen}
      onOpenChange={(open) => {
        if (open !== isOpen) {
          onToggle();
        }
      }}
    >
      {widget.content}
    </CollapsibleCard>
  );
}

function CallSidebarSkeleton() {
  return (
    <aside className="w-80 bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pl-4 mb-2 mr-2 space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </div>
            </CardHeader>
            {i === 1 && (
              <CardContent className="pt-0 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </aside>
  );
}

// ============================================================================
// PRE-BUILT WIDGET CONTENT COMPONENTS
// ============================================================================

interface CallMetadataWidgetProps {
  callId?: string;
  duration?: number;
  startTime?: string;
  provider?: string;
  direction?: string;
  status?: string;
  isLoading?: boolean;
}

/**
 * Skeleton for call metadata widget
 */
function CallMetadataWidgetSkeleton() {
  return (
    <div className="space-y-3 text-sm">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

/**
 * Pre-built widget content for call metadata
 */
export function CallMetadataWidget({
  callId,
  duration,
  startTime,
  provider,
  direction,
  status,
  isLoading,
}: CallMetadataWidgetProps) {
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <CallMetadataWidgetSkeleton />;
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Call ID</span>
        <span className="font-mono text-xs">{callId ? `#${callId.slice(-8)}` : 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Duration</span>
        <span>{formatDuration(duration)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Date</span>
        <span>{formatDate(startTime)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Provider</span>
        <span className="capitalize">{provider || 'Unknown'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Direction</span>
        <span className="capitalize">{direction || 'Unknown'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Status</span>
        <span className="capitalize">{status || 'Unknown'}</span>
      </div>
    </div>
  );
}

interface ExtractedDataField {
  value: string | number | boolean;
  confidence: number;
  source?: string;
}

interface ExtractedData {
  customerId?: string;
  customerEmail?: string;
  customerPhone?: string;
  orderNumber?: string;
  accountNumber?: string;
  custom?: Record<string, ExtractedDataField>;
  extractedAt?: string;
}

interface CustomerInfoWidgetProps {
  name?: string;
  phone?: string;
  email?: string;
  extractedData?: ExtractedData;
  isLoading?: boolean;
}

/**
 * Skeleton for customer info widget
 */
function CustomerInfoWidgetSkeleton() {
  return (
    <div className="space-y-3 text-sm">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

/**
 * Pre-built widget content for customer information
 * Shows basic info + any extracted data fields from call analysis
 */
export function CustomerInfoWidget({
  name,
  phone,
  email,
  extractedData,
  isLoading,
}: CustomerInfoWidgetProps) {
  if (isLoading) {
    return <CustomerInfoWidgetSkeleton />;
  }
  // Helper to format confidence as percentage badge color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-100 text-green-700';
    if (confidence >= 0.7) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  // Use extracted data values if available, fallback to direct props
  // Priority: extractedData.custom.customerName > name prop
  const extractedName = extractedData?.custom?.customerName?.value;
  const displayName = extractedName ? String(extractedName) : name;
  const displayPhone = extractedData?.customerPhone || phone;
  const displayEmail = extractedData?.customerEmail || email;
  const displayId = extractedData?.customerId;
  const orderNumber = extractedData?.orderNumber;
  const accountNumber = extractedData?.accountNumber;

  // Get custom fields if any, excluding customerName since we show it in Basic Info
  const customFields = extractedData?.custom
    ? Object.entries(extractedData.custom).filter(([key]) => key !== 'customerName')
    : [];

  return (
    <div className="space-y-3 text-sm">
      {/* Basic Info */}
      <div className="flex justify-between">
        <span className="text-muted-foreground">Name</span>
        <span>{displayName || 'Unknown'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Phone</span>
        <span>{displayPhone || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Email</span>
        <span className="truncate max-w-[180px]">{displayEmail || 'N/A'}</span>
      </div>

      {/* Extracted Standard Fields */}
      {displayId && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Customer ID</span>
          <span className="font-mono text-xs">{displayId}</span>
        </div>
      )}
      {orderNumber && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order #</span>
          <span className="font-mono text-xs">{orderNumber}</span>
        </div>
      )}
      {accountNumber && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Account #</span>
          <span className="font-mono text-xs">{accountNumber}</span>
        </div>
      )}

      {/* Custom Extracted Fields */}
      {customFields.length > 0 && (
        <>
          <div className="border-t pt-3 mt-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Extracted Data
            </span>
          </div>
          {customFields.map(([key, field]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[120px]">{String(field.value)}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded',
                    getConfidenceColor(field.confidence)
                  )}
                >
                  {Math.round(field.confidence * 100)}%
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

interface QualityMetrics {
  resolutionConfidence?: number;
  customerEffortScore?: number;
  empathyScore?: number;
  escalationRisk?: string;
  complianceScore?: number;
  agentConfidence?: number;
  issueComplexity?: string;
}

interface Predictions {
  firstCallResolution?: boolean;
  callbackProbability?: number;
  customerSatisfactionPrediction?: number;
}

interface AISummaryWidgetProps {
  summary?: string;
  sentiment?: string | { beginning?: string; ending?: string; average?: number; trend?: string };
  keywords?: string[];
  painPoints?: string[];
  topics?: string[];
  confidence?: number;
  // New backend fields
  problem?: string;
  resolution?: string;
  qualityMetrics?: QualityMetrics;
  predictions?: Predictions;
  isLoading?: boolean;
}

/**
 * Skeleton for AI summary widget
 */
function AISummaryWidgetSkeleton() {
  return (
    <div className="space-y-4 text-sm">
      {/* Sentiment skeleton */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      {/* Summary skeleton */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      {/* Topics skeleton */}
      <div>
        <Skeleton className="h-4 w-12 mb-2" />
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Pre-built widget content for AI analysis summary
 */
export function AISummaryWidget({
  summary,
  sentiment,
  keywords,
  painPoints,
  topics,
  confidence,
  problem,
  resolution,
  qualityMetrics,
  predictions,
  isLoading,
}: AISummaryWidgetProps) {
  if (isLoading) {
    return <AISummaryWidgetSkeleton />;
  }

  const getSentimentBadgeVariant = (sent: string) => {
    const lower = sent.toLowerCase();
    if (lower.includes('positive')) return 'default';
    if (lower.includes('negative')) return 'destructive';
    return 'secondary';
  };

  const getSentimentLabel = (sent: string) => {
    const lower = sent.toLowerCase();
    if (lower.includes('positive')) return 'Positive';
    if (lower.includes('negative')) return 'Negative';
    return 'Neutral';
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    const lower = risk.toLowerCase();
    if (lower === 'low') return 'bg-green-100 text-green-700';
    if (lower === 'medium' || lower === 'moderate') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Sentiment Row */}
      {sentiment && (
        <div>
          <div className="text-sm font-medium mb-2">Sentiment</div>
          {typeof sentiment === 'string' ? (
            <Badge
              variant={
                getSentimentBadgeVariant(sentiment) as 'default' | 'secondary' | 'destructive'
              }
              className="text-xs"
            >
              {getSentimentLabel(sentiment)}
            </Badge>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  Start: {sentiment.beginning || 'neutral'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  End: {sentiment.ending || 'neutral'}
                </Badge>
              </div>
              {sentiment.trend && (
                <div className="text-xs text-muted-foreground">
                  Trend: <span className="capitalize">{sentiment.trend}</span>
                  {sentiment.average !== undefined && ` (${Math.round(sentiment.average * 100)}%)`}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div>
          <div className="text-sm font-medium mb-2">Summary</div>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      )}

      {/* Problem & Resolution */}
      {(problem || resolution) && (
        <div className="space-y-2">
          {problem && (
            <div>
              <div className="text-sm font-medium mb-1">Problem</div>
              <p className="text-sm text-muted-foreground">{problem}</p>
            </div>
          )}
          {resolution && (
            <div>
              <div className="text-sm font-medium mb-1">Resolution</div>
              <p className="text-sm text-muted-foreground">{resolution}</p>
            </div>
          )}
        </div>
      )}

      {/* Quality Metrics */}
      {qualityMetrics && (
        <div>
          <div className="text-sm font-medium mb-2">Quality Metrics</div>
          <div className="rounded-md border text-sm">
            {qualityMetrics.resolutionConfidence !== undefined && (
              <div className="flex justify-between items-center px-3 py-2 border-b last:border-b-0">
                <span className="text-muted-foreground">Resolution Confidence</span>
                <span className={getScoreColor(qualityMetrics.resolutionConfidence)}>
                  {Math.round(qualityMetrics.resolutionConfidence * 100)}%
                </span>
              </div>
            )}
            {qualityMetrics.empathyScore !== undefined && (
              <div className="flex justify-between items-center px-3 py-2 border-b last:border-b-0">
                <span className="text-muted-foreground">Empathy Score</span>
                <span className={getScoreColor(qualityMetrics.empathyScore)}>
                  {Math.round(qualityMetrics.empathyScore * 100)}%
                </span>
              </div>
            )}
            {qualityMetrics.customerEffortScore !== undefined && (
              <div className="flex justify-between items-center px-3 py-2 border-b last:border-b-0">
                <span className="text-muted-foreground">Customer Effort Score</span>
                <span>{qualityMetrics.customerEffortScore}/5</span>
              </div>
            )}
            {qualityMetrics.escalationRisk && (
              <div className="flex justify-between items-center px-3 py-2 border-b last:border-b-0">
                <span className="text-muted-foreground">Escalation Risk</span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded capitalize',
                    getRiskColor(qualityMetrics.escalationRisk)
                  )}
                >
                  {qualityMetrics.escalationRisk}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Predictions */}
      {predictions && (
        <div>
          <div className="text-sm font-medium mb-2">Predictions</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {predictions.firstCallResolution !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">FCR</span>
                <span
                  className={predictions.firstCallResolution ? 'text-green-600' : 'text-red-600'}
                >
                  {predictions.firstCallResolution ? 'Yes' : 'No'}
                </span>
              </div>
            )}
            {predictions.customerSatisfactionPrediction !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">CSAT</span>
                <span>{predictions.customerSatisfactionPrediction.toFixed(1)}/5</span>
              </div>
            )}
            {predictions.callbackProbability !== undefined && (
              <div className="flex justify-between col-span-2">
                <span className="text-muted-foreground">Callback Probability</span>
                <span>{Math.round(predictions.callbackProbability * 100)}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Topics */}
      {topics && topics.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Topics</div>
          <div className="flex flex-wrap gap-1">
            {topics.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Keywords</div>
          <div className="flex flex-wrap gap-1">
            {keywords.map((keyword, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Pain Points */}
      {painPoints && painPoints.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Pain Points</div>
          <ul className="list-disc list-inside space-y-1">
            {painPoints.map((point, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!summary &&
        !sentiment &&
        !problem &&
        !resolution &&
        (!keywords || keywords.length === 0) &&
        (!topics || topics.length === 0) && (
          <div className="text-muted-foreground text-center py-2">No AI analysis available</div>
        )}
    </div>
  );
}

// ============================================================================
// COACHING & ACTION ITEMS WIDGETS
// ============================================================================

interface CoachingWidgetProps {
  opportunities?: string[];
  knowledgeGaps?: string[];
}

/**
 * Widget for displaying coaching insights from AI analysis
 */
export function CoachingWidget({ opportunities, knowledgeGaps }: CoachingWidgetProps) {
  const hasContent =
    (opportunities && opportunities.length > 0) || (knowledgeGaps && knowledgeGaps.length > 0);

  if (!hasContent) {
    return (
      <div className="text-muted-foreground text-center py-2 text-sm">
        No coaching insights available
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      {opportunities && opportunities.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Improvement Opportunities</div>
          <ul className="list-disc list-inside space-y-1">
            {opportunities.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {knowledgeGaps && knowledgeGaps.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Knowledge Gaps</div>
          <ul className="list-disc list-inside space-y-1">
            {knowledgeGaps.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface ActionItemsWidgetProps {
  agentCommitments?: string[];
  customerActions?: string[];
  followUpRequired?: boolean;
  followUpTimeframe?: string;
}

/**
 * Widget for displaying action items from the call
 */
export function ActionItemsWidget({
  agentCommitments,
  customerActions,
  followUpRequired,
  followUpTimeframe,
}: ActionItemsWidgetProps) {
  const hasContent =
    (agentCommitments && agentCommitments.length > 0) ||
    (customerActions && customerActions.length > 0) ||
    followUpRequired;

  if (!hasContent) {
    return (
      <div className="text-muted-foreground text-center py-2 text-sm">No action items recorded</div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      {agentCommitments && agentCommitments.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Agent Commitments</div>
          <ul className="list-disc list-inside space-y-1">
            {agentCommitments.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {customerActions && customerActions.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Customer Actions</div>
          <ul className="list-disc list-inside space-y-1">
            {customerActions.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {followUpRequired && (
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-muted-foreground">Follow-up Required</span>
          <Badge variant="outline" className="text-xs">
            {followUpTimeframe || 'Yes'}
          </Badge>
        </div>
      )}
    </div>
  );
}

interface UpsellWidgetProps {
  detected: boolean;
  context?: string;
}

/**
 * Widget for displaying upsell opportunity detection
 */
export function UpsellWidget({ detected, context }: UpsellWidgetProps) {
  if (!detected) {
    return (
      <div className="text-muted-foreground text-center py-2 text-sm">
        No upsell opportunity detected
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Badge className="bg-green-100 text-green-700 text-xs">Opportunity Detected</Badge>
      </div>
      {context && <p className="text-sm text-muted-foreground">{context}</p>}
    </div>
  );
}
