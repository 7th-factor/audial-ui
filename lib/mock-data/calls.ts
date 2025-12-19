// Mock data for calls/inbox feature

export interface MockCall {
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
  metrics?: any;
  extractedData?: any;
}

export const mockCalls: MockCall[] = [
  {
    id: 'call-1',
    callId: '#ABC123',
    agent: 'AI Assistant',
    customer: '+1-555-0101',
    duration: '2:53',
    score: '85',
    date: new Date().toISOString(),
    category: 'support',
    source: 'vapi',
    origin: 'real',
    assistantName: 'AI Assistant',
    customerName: 'John Doe',
    scoreStatus: 'auto',
    overallScore: 85,
    sentiment: 'positive',
    hasRecording: true,
    hasTranscript: true,
    resolution: 'resolved',
    direction: 'inbound',
    status: 'completed',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date(Date.now() - 3300000).toISOString(),
    customerPhone: '+1-555-0101',
    recordingUrl: '/mock-audio.mp3',
    transcript: {
      segments: [
        {
          text: 'Hello, thank you for calling. How can I assist you today?',
          startTime: 0,
          endTime: 3,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
        {
          text: 'Hi, I need help with my account. I cannot log in.',
          startTime: 4,
          endTime: 8,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.92,
        },
        {
          text: 'I understand. Let me help you reset your password. Can you provide me with your email address?',
          startTime: 9,
          endTime: 15,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'Sure, it is john.doe@example.com',
          startTime: 16,
          endTime: 19,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.91,
        },
        {
          text: 'Perfect. I have sent a password reset link to your email. You should receive it within a few minutes.',
          startTime: 20,
          endTime: 28,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.96,
        },
        {
          text: 'Thank you so much for your help!',
          startTime: 29,
          endTime: 32,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.93,
        },
        {
          text: 'You are welcome! Is there anything else I can help you with today?',
          startTime: 33,
          endTime: 38,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'Actually, yes. I have been having issues with my billing. Can you check my recent charges?',
          startTime: 39,
          endTime: 46,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.91,
        },
        {
          text: 'Of course. Let me pull up your account information. I can see your recent billing history.',
          startTime: 47,
          endTime: 54,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
        {
          text: 'I see a charge for $99.99 on January 15th. Is that the one you are concerned about?',
          startTime: 55,
          endTime: 62,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.96,
        },
        {
          text: 'Yes, that is the one. I do not remember authorizing that charge. What was it for?',
          startTime: 63,
          endTime: 70,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.92,
        },
        {
          text: 'Let me check the details for you. That charge appears to be for your premium subscription renewal.',
          startTime: 71,
          endTime: 78,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'Oh, I see. But I thought I cancelled that subscription last month.',
          startTime: 79,
          endTime: 84,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.90,
        },
        {
          text: 'I understand your concern. Let me check the cancellation status. It looks like the cancellation was processed, but there was a billing cycle overlap.',
          startTime: 85,
          endTime: 94,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.93,
        },
        {
          text: 'What does that mean exactly?',
          startTime: 95,
          endTime: 98,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.89,
        },
        {
          text: 'It means that when you cancelled, you were still within the billing period you had already paid for. The charge you see is for the next billing cycle that started before the cancellation took effect.',
          startTime: 99,
          endTime: 110,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
        {
          text: 'That does not seem fair. I should not be charged for something I cancelled.',
          startTime: 111,
          endTime: 117,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.91,
        },
        {
          text: 'I completely understand your frustration. Let me see what I can do to help. I can process a refund for that charge since the cancellation was initiated.',
          startTime: 118,
          endTime: 127,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.96,
        },
        {
          text: 'That would be great. How long will the refund take?',
          startTime: 128,
          endTime: 132,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.92,
        },
        {
          text: 'The refund will be processed immediately and should appear in your account within 5 to 7 business days, depending on your bank.',
          startTime: 133,
          endTime: 141,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'Okay, that sounds reasonable. Thank you for helping me with this.',
          startTime: 142,
          endTime: 147,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.93,
        },
        {
          text: 'You are very welcome. I have also made a note in your account to ensure this does not happen again. Is there anything else I can assist you with?',
          startTime: 148,
          endTime: 157,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
        {
          text: 'No, that covers everything. I appreciate your help.',
          startTime: 158,
          endTime: 162,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.94,
        },
        {
          text: 'Perfect. Thank you for calling, and have a wonderful day!',
          startTime: 163,
          endTime: 168,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.96,
        },
        {
          text: 'You too. Goodbye!',
          startTime: 169,
          endTime: 171,
          speaker: { id: 'customer-1', name: 'John Doe' },
          confidence: 0.92,
        },
        {
          text: 'Goodbye!',
          startTime: 172,
          endTime: 173,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
      ],
    },
    summary: {
      callSummary: 'Customer called regarding login issues. Agent successfully helped reset password via email.',
      sentiment: 'positive',
      keywords: ['login', 'password', 'reset', 'email'],
      topics: ['Account Access', 'Password Reset'],
      problem: 'Customer unable to log into account',
      resolution: 'Password reset link sent to customer email',
      speakers: {
        agent: { name: 'AI Assistant' },
        customer: { name: 'John Doe' },
      },
      coaching: {
        opportunities: ['Could have offered additional security tips'],
      },
      actionItems: {
        agentCommitments: ['Send password reset email'],
        followUpRequired: false,
      },
    },
  },
  {
    id: 'call-2',
    callId: '#DEF456',
    agent: 'AI Assistant',
    customer: '+1-555-0102',
    duration: '8:45',
    score: '72',
    date: new Date(Date.now() - 7200000).toISOString(),
    category: 'sales',
    source: 'vapi',
    origin: 'real',
    assistantName: 'AI Assistant',
    customerName: 'Jane Smith',
    scoreStatus: 'auto',
    overallScore: 72,
    sentiment: 'neutral',
    hasRecording: true,
    hasTranscript: true,
    resolution: 'pending',
    direction: 'outbound',
    status: 'completed',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    endTime: new Date(Date.now() - 6675000).toISOString(),
    customerPhone: '+1-555-0102',
    transcript: {
      segments: [
        {
          text: 'Good morning! This is an AI assistant calling about our premium service. Are you interested?',
          startTime: 0,
          endTime: 5,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'I am not sure. What does it include?',
          startTime: 6,
          endTime: 9,
          speaker: { id: 'customer-1', name: 'Jane Smith' },
          confidence: 0.90,
        },
        {
          text: 'Our premium service includes 24/7 support, advanced features, and priority assistance.',
          startTime: 10,
          endTime: 16,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.93,
        },
        {
          text: 'Let me think about it. Can you send me more information?',
          startTime: 17,
          endTime: 22,
          speaker: { id: 'customer-1', name: 'Jane Smith' },
          confidence: 0.91,
        },
        {
          text: 'Absolutely! I will send you a detailed email with all the information.',
          startTime: 23,
          endTime: 28,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
      ],
    },
    summary: {
      callSummary: 'Outbound sales call about premium service. Customer requested more information.',
      sentiment: 'neutral',
      keywords: ['premium', 'service', 'information'],
      topics: ['Sales', 'Product Information'],
      speakers: {
        agent: { name: 'AI Assistant' },
        customer: { name: 'Jane Smith' },
      },
      actionItems: {
        agentCommitments: ['Send detailed information email'],
        followUpRequired: true,
        followUpTimeframe: '2-3 days',
      },
      upsellOpportunity: {
        detected: true,
        context: 'Customer showed interest in premium features',
      },
    },
  },
  {
    id: 'call-3',
    callId: '#GHI789',
    agent: 'AI Assistant',
    customer: '+1-555-0103',
    duration: '12:15',
    score: '90',
    date: new Date(Date.now() - 10800000).toISOString(),
    category: 'technical',
    source: 'bland',
    origin: 'simulation',
    assistantName: 'AI Assistant',
    customerName: 'Bob Johnson',
    scoreStatus: 'auto',
    overallScore: 90,
    sentiment: 'positive',
    hasRecording: true,
    hasTranscript: true,
    resolution: 'resolved',
    direction: 'inbound',
    status: 'completed',
    startTime: new Date(Date.now() - 10800000).toISOString(),
    endTime: new Date(Date.now() - 10125000).toISOString(),
    customerPhone: '+1-555-0103',
    transcript: {
      segments: [
        {
          text: 'Hello, I am experiencing issues with the API integration.',
          startTime: 0,
          endTime: 4,
          speaker: { id: 'customer-1', name: 'Bob Johnson' },
          confidence: 0.93,
        },
        {
          text: 'I can help you with that. Can you describe the specific error you are seeing?',
          startTime: 5,
          endTime: 11,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.95,
        },
        {
          text: 'I am getting a 401 unauthorized error when trying to authenticate.',
          startTime: 12,
          endTime: 17,
          speaker: { id: 'customer-1', name: 'Bob Johnson' },
          confidence: 0.92,
        },
        {
          text: 'That usually means the API key is incorrect or expired. Let me check your account settings.',
          startTime: 18,
          endTime: 25,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.94,
        },
        {
          text: 'I found the issue. Your API key needs to be regenerated. I have done that for you.',
          startTime: 26,
          endTime: 33,
          speaker: { id: 'agent-1', name: 'AI Assistant' },
          confidence: 0.96,
        },
        {
          text: 'Perfect! Thank you so much. That was very helpful.',
          startTime: 34,
          endTime: 38,
          speaker: { id: 'customer-1', name: 'Bob Johnson' },
          confidence: 0.94,
        },
      ],
    },
    summary: {
      callSummary: 'Technical support call resolved API authentication issue by regenerating API key.',
      sentiment: 'positive',
      keywords: ['API', 'authentication', '401', 'error'],
      topics: ['Technical Support', 'API Integration'],
      problem: '401 unauthorized error with API authentication',
      resolution: 'API key regenerated successfully',
      speakers: {
        agent: { name: 'AI Assistant' },
        customer: { name: 'Bob Johnson' },
      },
    },
  },
];

export function getMockCall(id: string): MockCall | undefined {
  return mockCalls.find((call) => call.id === id);
}

export function getMockCalls(): MockCall[] {
  return mockCalls;
}

