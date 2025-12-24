export interface TranscriptMessage {
  id: string;
  role: 'system' | 'assistant' | 'user';
  content: string;
  timestamp: Date;
  startTime?: number;
  confidence?: number;
  speakerName?: string;
  speakerId?: string;
}

export interface TranscriptEvent {
  id: string;
  timestamp: number;
  type: 'agent_start' | 'tool_call' | 'sentiment_change' | 'call_end';
  toolName?: string;
  toolFunction?: string;
  toolParams?: Record<string, any>;
  toolResponse?: any;
  toolStatus?: 'success' | 'error';
  toolDuration?: number;
  sentimentBefore?: string;
  sentimentAfter?: string;
  trigger?: string;
  agentName?: string;
  agentType?: string;
  agentRole?: string;
}


