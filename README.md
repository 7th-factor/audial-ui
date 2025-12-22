# Audial Admin Dashboard

**Tech Stack**: Next.js 16 + React 19 + Firebase Auth + shadcn/ui + Tailwind CSS
**Port**: 3000
**Status**: Development

---

## What is Audial?

Audial is a **no-code voice AI agent platform** that automates business phone communications. The AI agent answers calls, books appointments, qualifies leads, handles support, and sends summaries—no technical skills needed.

**Target Industries**: Healthcare, Education, Retail, Restaurants, Law Firms, Real Estate

**Core Value Proposition**: "Audial AI answers the phone, books appointments, sends you the summary."

### Multi-Channel Vision

Initially focused on **voice calls**, Audial will evolve into a multi-channel solution:
- Phase 1: Voice calls (current focus)
- Phase 2: SMS/Text messaging
- Phase 3: Web chat widget
- Phase 4: Email automation

---

## Dashboard Pages

### Primary Navigation

| Route | Page | Purpose | Status |
|-------|------|---------|--------|
| `/` | Get Started | Onboarding wizard for new users | Placeholder |
| `/analytics` | Dashboard | Call metrics, agent performance, trends | Mock data |
| `/inbox` | Inbox | Call recordings, transcripts, summaries | Needs redesign |
| `/follow-ups` | Follow Ups | Callbacks + action items from calls | Placeholder |
| `/contacts` | Contacts | Callers auto-created + CRM sync | Mock data |
| `/calendar` | Calendar | Appointments booked by AI agent | Placeholder |

### Developer Navigation

| Route | Page | Purpose | Status |
|-------|------|---------|--------|
| `/api-keys` | API Keys | Manage API credentials | Functional |
| `/agent` | Agent | Voice AI agent configuration | Well-built |

---

## Page Specifications

### Inbox (`/inbox`)

**Purpose**: Call-centric communication hub

**Features**:
- Call list with: caller info, duration, timestamp, outcome status
- Call playback with audio player
- AI-generated call summary
- Full transcript view (collapsible)
- Outcome tags: resolved, needs-follow-up, transferred, voicemail
- Quick actions: add to contacts, create follow-up, flag for review

```typescript
interface Call {
  id: string
  callerId: string
  callerPhone: string
  callerName?: string
  duration: number // seconds
  timestamp: Date
  status: 'completed' | 'missed' | 'voicemail' | 'transferred'
  outcome: 'resolved' | 'needs-follow-up' | 'escalated'
  summary: string // AI-generated
  transcript: TranscriptEntry[]
  recordingUrl?: string
  agentId: string
}
```

### Follow Ups (`/follow-ups`)

**Purpose**: Track callbacks and action items from calls

**Features**:
- Task list with: task type, related call, due date, assignee, status
- Two categories:
  - **Callbacks**: Scheduled return calls promised by AI
  - **Action Items**: Tasks extracted from calls (send email, book appointment, etc.)
- Filter by: type, status, due date, assignee
- Quick actions: mark complete, reschedule, assign to team member

```typescript
interface FollowUp {
  id: string
  type: 'callback' | 'action'
  title: string
  description: string
  callId: string
  contactId: string
  dueDate: Date
  assignee?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
}
```

### Contacts (`/contacts`)

**Purpose**: Unified contact management with call history

**Features**:
- Contact list with: name, phone, company, total calls, last contact
- Contact detail view with call history, notes, tags
- **Auto-creation**: New contacts created when unknown callers call in
- **CRM Sync**: Integrate with HubSpot, Salesforce for bidirectional sync
- Merge duplicate contacts

```typescript
interface Contact {
  id: string
  phone: string
  name?: string
  email?: string
  company?: string
  source: 'call' | 'crm' | 'manual'
  crmId?: string
  tags: string[]
  totalCalls: number
  lastCallDate?: Date
  createdAt: Date
}
```

### Dashboard/Analytics (`/analytics`)

**Purpose**: High-level performance metrics

**Metrics**:
- Total calls (today, week, month)
- Average call duration
- Resolution rate (% resolved by AI)
- Escalation rate (% transferred to human)
- Top call reasons/intents
- Call volume by hour/day
- Agent performance score

### Calendar (`/calendar`)

**Purpose**: View appointments booked by AI agent

**Features**:
- Calendar view (day, week, month)
- Appointment list with: contact, date/time, type, status
- Sync with Google Calendar, Outlook
- Edit/cancel appointments

### Get Started (`/`)

**Purpose**: Onboarding wizard for new users

**Steps**:
1. Welcome & product overview
2. Configure AI agent (basic settings)
3. Purchase/connect phone number
4. Test call
5. Go live

---

## Development Roadmap

**Strategy**: UI completeness first, then API integration

### Phase 1: Complete UI with Mock Data
- [ ] Redesign Inbox for call recordings
- [ ] Build Follow Ups page
- [ ] Update Contacts for call history
- [ ] Build Calendar page
- [ ] Complete Get Started onboarding

### Phase 2: API Integration
- [ ] Define API contracts with backend team
- [ ] Implement React Query hooks for each entity
- [ ] Connect forms to mutations
- [ ] Add real-time updates (calls coming in)

### Phase 3: Integrations
- [ ] CRM sync (HubSpot, Salesforce)
- [ ] Calendar sync (Google, Outlook)
- [ ] Webhook management

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Auth**: Firebase Authentication
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Tables**: TanStack Table

---

## Directory Structure

```
app/                    # Next.js 16 App Router
├── (auth)/            # Auth pages (login, signup)
├── (dashboard)/       # Protected dashboard pages
│   ├── analytics/     # Routes to /analytics
│   ├── contacts/      # Routes to /contacts
│   └── ...
└── layout.tsx         # Root layout with providers

components/
├── ui/                # shadcn/ui base components (don't modify)
├── auth/              # Auth form components
├── providers/         # React providers (Query, Theme)
└── ...

lib/
├── api/               # API client utilities
├── firebase/          # Firebase config + auth context
├── auth/              # Auth utilities (token manager, guards)
├── observability/     # Analytics and monitoring
└── utils/             # Utility functions
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (uses staging API)
make dev

# Or with local API + Firebase emulator
make dev-local
```

See [CLAUDE.md](./CLAUDE.md) for detailed development workflow and commands.

---

**Last Updated**: 2025-12-19
