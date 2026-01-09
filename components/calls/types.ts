/**
 * Call Display Types
 *
 * Types used by call UI components for display purposes.
 * These are transformed from API types for UI consumption.
 */

export interface CallDisplayData {
  id: string;
  callId: string;
  agent: string;
  customer: string;
  duration: string;
  score: string;
  date: string;
  category: 'support' | 'sales' | 'billing' | 'technical';
  source?: 'upload' | 'vapi' | 'bland' | 'twilio' | 'manual' | 'Unknown';
  origin?: 'simulation' | 'real';
  assistantName: string;
  agentName?: string;
  customerName: string;
  scoreStatus?: 'auto' | 'manual' | 'pending' | 'none';
  overallScore?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  hasRecording?: boolean;
  hasTranscript?: boolean;
  resolution?: 'resolved' | 'escalated' | 'pending' | 'transferred';
  waitTime?: number;
  tags?: string[];
  direction?: 'inbound' | 'outbound';
  status?: string;
  startTime?: string;
  endTime?: string;
  customerPhone?: string;
  agentPhone?: string;
  recordingUrl?: string;
  transcript?: {
    segments: Array<{
      text: string;
      startTime?: number;
      endTime?: number;
      speaker?: {
        id: string;
        name?: string;
      };
      confidence?: number;
    }>;
  };
  summary?: {
    callSummary?: string;
    sentiment?: string;
    keywords?: string[];
    topics?: string[];
    problem?: string;
    resolution?: string;
    speakers?: {
      agent?: { name?: string };
      customer?: { name?: string };
    };
    coaching?: {
      opportunities?: string[];
      knowledgeGaps?: string[];
    };
    actionItems?: {
      agentCommitments?: string[];
      customerActions?: string[];
      followUpRequired?: boolean;
      followUpTimeframe?: string;
    };
    upsellOpportunity?: {
      detected?: boolean;
      context?: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metrics?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractedData?: any;
  scorecard?: {
    totalScore: number;
    maxScore: number;
    categories: Array<{
      name: string;
      score: number;
      maxScore: number;
      status: 'pass' | 'fail';
      criteria?: Array<{
        name: string;
        passed: boolean;
        explanation?: string;
      }>;
    }>;
  };
}
