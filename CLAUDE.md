# audial-admin - Frontend Dashboard

**Tech Stack**: Next.js 16 + React 19 + Firebase Auth + shadcn/ui + Tailwind CSS
**Port**: 3000
**Status**: Development

---

## Quick Commands

### Development

| Command              | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `make dev`           | Start with **staging** API (default)                                  |
| `make dev-prod`      | Start with **production** API (use with caution)                      |
| `make dev-local`     | Start **emulators + Next.js** with local API (foreground)            |
| `make dev-local-bg` | Start **emulators + Next.js** with local API (background)            |
| `make dev-local-logs`| Start everything + tail combined logs                                |
| `make emulator-start`| Start Firebase emulators only                                        |
| `make emulator-stop` | Stop Firebase emulators                                              |
| `make emulator-logs` | Tail emulator logs                                                   |
| `make emulator-status`| Check emulator status                                                |
| `npm run build`      | Production build                                                     |
| `npm run build:safe` | Safe build (preserves dev .next directory)                           |
| `npm run start`      | Start production server                                              |

### Testing

| Command                      | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `npm run lint`               | Run ESLint                                           |
| `npm run typecheck`          | TypeScript type checking                             |

### Deployment

| Command                 | Purpose                           |
| ----------------------- | --------------------------------- |
| `npm run build:doppler` | Build with Doppler dev config     |
| `npm run build:staging` | Build with Doppler staging config |

### Environment Sync

| Command                     | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `make sync-env-staging-dry` | Preview staging env sync                |
| `make sync-env-staging`     | Sync Doppler (stg) to Vercel staging    |
| `make sync-env-prod-dry`    | Preview production env sync             |
| `make sync-env-prod`        | Sync Doppler (prd) to Vercel production |

---

## Environment Selection

audial-admin can run against different backend environments for flexible development and testing workflows.

### Doppler Configs (Shared Project: `lavoz`)

| Config      | Purpose                   | API             | Firebase         | Used By           |
| ----------- | ------------------------- | --------------- | ---------------- | ----------------- |
| `dev`       | Local admin + staging API | staging API     | Staging Firebase | Admin only        |
| `dev_local` | Full local stack          | localhost:8989  | Emulator (9210)  | API + Admin local |
| `dev_stg`   | Local admin + staging API | staging API     | Staging Firebase | Admin only        |
| `stg`       | Staging deployment        | staging API     | Staging Firebase | **CI/CD only**    |
| `prd`       | Production deployment     | Production API  | Prod Firebase    | **CI/CD only**    |

**⚠️ IMPORTANT**: `stg` and `prd` configs are for CI/CD deployments only. Use `dev` or `dev_stg` for local development.

### Staging API + Firebase Staging (Default)

Use this for testing against the real staging backend without affecting production data.

```bash
make dev
# Uses DOPPLER_CONFIG=dev_stg (safe for local development)
# API: Staging API endpoint
# Firebase: Staging Firebase (NOT emulator)
```

**When to use:**

- Testing features against real staging backend
- Verifying API integration without local API setup
- Collaborating with backend team on staging environment

### Local API + Firebase Emulator

Use this for full local development with both frontend and backend running locally.

```bash
make dev-local              # Start emulators + Next.js (foreground)
make dev-local-bg          # Start emulators + Next.js (background)
make dev-local-logs        # Start everything + tail logs
# Uses DOPPLER_CONFIG=dev_local
# API: http://localhost:8989 (requires API running locally)
# Firebase Auth Emulator: http://localhost:9210
# Emulator UI: http://localhost:4010
```

**Prerequisites:**

- API running on port 8989
- Firebase emulators started automatically by `make dev-local` (Auth on port 9210, UI on port 4010)
- `NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true` in Doppler dev_local config

**When to use:**

- Full stack local development
- Testing auth flows with emulator
- Offline development
- Backend API changes that need frontend testing

**Emulator Commands:**

```bash
make emulator-start        # Start Firebase emulators only
make emulator-stop         # Stop Firebase emulators
make emulator-logs         # Tail emulator logs
make emulator-status       # Check emulator status
```

**Port Configuration:**

- Auth emulator: `9210` (different from chanl-admin's 9200 to avoid conflicts)
- Emulator UI: `4010` (different from chanl-admin's 4000)
- Frontend: `3000`

### Production API (Testing Only)

⚠️ **Use with caution** - connects to production backend with real user data.

```bash
make dev-prod
# Uses DOPPLER_CONFIG=prd
# API: Production API
# Firebase: production
```

**When to use:**

- Emergency debugging of production issues
- Testing production API behavior
- **Never** for development or experimentation

---

## Environment Configuration

### Doppler (Required for Development)

**IMPORTANT**: Doppler CLI is required for all development. There is no `.env.local` fallback.

```bash
# Development
npm run dev              # Uses: doppler run --project lavoz --config dev_stg (default)
make dev-local           # Uses: doppler run --project lavoz --config dev_local (with emulator)

# Building
npm run build:doppler    # Uses: doppler run --project lavoz --config dev
npm run build:staging    # Uses: doppler run --project lavoz --config stg
```

**Required Doppler Secrets:**

**Backend API**:

- `NEXT_PUBLIC_API_URL` - API endpoint (e.g., http://localhost:8989)

**Firebase Authentication**:

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase Web API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase Auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_USE_EMULATOR` - Set to "true" for local emulator

**PostHog Analytics** (optional):

- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL

**Sentry Error Monitoring** (optional):

- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN URL

**Environment Identifier**:

- `NEXT_PUBLIC_ENVIRONMENT` - development | staging | production

### Setting Up Doppler Secrets

1. Install Doppler CLI: https://docs.doppler.com/docs/install-cli
2. Authenticate: `doppler login`
3. Setup project: `doppler setup --project lavoz --config dev_stg` (or `dev_local` for emulator)
4. Verify secrets: `doppler secrets --project lavoz --config dev_stg`

---

## Architecture Notes

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Auth**: Firebase Authentication
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Tables**: TanStack Table

### Directory Structure

```
app/                    # Next.js 16 App Router
├── (auth)/            # Auth pages (login, signup) - route group
├── (dashboard)/       # Protected dashboard pages - route group (virtual folder)
│   ├── analytics/     # Routes to /analytics
│   ├── contacts/       # Routes to /contacts
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

### Key Components

- **PageLayout**: Standard dashboard page wrapper
- **DataTable**: Reusable table with filtering/sorting
- **AuthGuard**: Route protection HOC
- **AuthProvider**: Firebase authentication provider
- **QueryProvider**: TanStack Query provider

### State Management Hierarchy

Use the simplest option that works:

```
Local State (useState)
    ↓ (if shared URL)
URL State (useSearchParams)
    ↓ (if component tree)
Context (React Context)
    ↓ (if server state)
TanStack Query (useQuery/useMutation)
    ↓ (if global client state)
Zustand (global store)
```

---

## Route Groups

This project uses Next.js route groups to organize routes without affecting URLs:

- `app/(auth)/` - Authentication pages (login, signup, forgot-password)
- `app/(dashboard)/` - Dashboard pages (analytics, contacts, etc.)

Routes inside `(dashboard)` become top-level:
- `app/(dashboard)/analytics/page.tsx` → `/analytics` (not `/dashboard/analytics`)
- `app/(dashboard)/contacts/page.tsx` → `/contacts` (not `/dashboard/contacts`)

This allows organizing routes logically without adding URL segments.

---

## Common Development Workflows

### Adding a New Page

1. Create file in `app/(dashboard)/page-name/page.tsx`
2. Use PageLayout wrapper
3. Follow DataTable pattern if list page
4. Add to navigation in `config/sidebar.ts`
5. Test responsiveness

### Adding a New Component

1. Create in `components/` directory
2. Use shadcn/ui primitives
3. Add TypeScript props + JSDoc
4. Follow compound pattern (Card/CardHeader/CardContent)
5. Test in isolation

### Debugging Issues

```bash
# Check browser console
# Open DevTools → Console tab

# Check network requests
# Open DevTools → Network tab
# Filter by "Fetch/XHR"

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## Troubleshooting

### Dev Server Issues

**Problem**: Dev server won't start or is slow

```bash
# 1. Check port 3000 availability
lsof -i :3000  # Kill process if needed: kill -9 <PID>

# 2. Verify Doppler config
doppler setup --project lavoz --config dev_stg

# 3. Restart server
npm run dev
```

### Firebase Emulator Issues

**Problem**: Emulators won't start

```bash
# 1. Check if ports are in use
lsof -i :9210  # Auth emulator port
lsof -i :4010  # Emulator UI port

# 2. Check emulator status
make emulator-status

# 3. Check emulator logs
make emulator-logs

# 4. Stop and restart
make emulator-stop
make emulator-start
```

**Problem**: Next.js can't connect to emulator

```bash
# 1. Verify emulator is running
make emulator-status

# 2. Check NEXT_PUBLIC_FIREBASE_USE_EMULATOR is set
doppler secrets get NEXT_PUBLIC_FIREBASE_USE_EMULATOR --project lavoz --config dev

# 3. Verify port in lib/firebase/config.ts is 9210 (not 9200)

# 4. Restart both emulator and Next.js
make stop
make dev-local-bg
```

**Problem**: Port conflicts with chanl-admin

- audial-admin uses ports: 9210 (Auth), 4010 (UI), 3000 (Frontend)
- chanl-admin uses ports: 9200 (Auth), 4000 (UI), 3001 (Frontend)
- No conflicts should occur, but if they do, check which project is using the port:
  ```bash
  lsof -i :9210  # Check what's using audial-admin's auth port
  ```

### TypeScript Errors

**Problem**: TypeScript compilation errors everywhere

```bash
# Run typecheck to see all errors
npm run typecheck

# Fix errors one by one
```

**Common fixes**:

- No `any` types - use proper interfaces
- Import type definitions: `import type { User } from '@/types'`

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Build again
npm run build
```

### Environment Variable Issues

```bash
# Verify Doppler is configured
doppler setup --project lavoz --config dev_stg

# Check secrets are available
doppler secrets --project lavoz --config dev_stg

# Verify NEXT_PUBLIC_ prefix
# Next.js only exposes vars with NEXT_PUBLIC_ prefix to browser
```

### Firebase Auth Issues

```bash
# Check Firebase config in Doppler
doppler secrets get NEXT_PUBLIC_FIREBASE_PROJECT_ID --project lavoz --config dev_stg

# Verify auth domain is correct
doppler secrets get NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN --project lavoz --config dev_stg
```

### API Connection Issues

```bash
# Verify API is running (if using dev config)
curl http://localhost:8989/health

# Check API URL configuration
doppler secrets get NEXT_PUBLIC_API_URL --project lavoz --config dev_stg
```

---

## Local Development Checklist

### Prerequisites

- [ ] Node.js 20+ installed
- [ ] API running (if using local dev)
- [ ] **Doppler CLI installed** (required for all development)
- [ ] Firebase project configured
- [ ] Doppler access configured for `lavoz` project

### Setup

- [ ] Clone repository
- [ ] Install dependencies: `npm install`
- [ ] Verify Doppler access: `doppler setup --project lavoz --config dev`
- [ ] Verify secrets are configured (see Environment Configuration section)

### Verification

- [ ] Start dev server: `make dev` (uses Doppler)
- [ ] Server starts on port 3000
- [ ] UI loads: http://localhost:3000
- [ ] No console errors in browser devtools
- [ ] No build errors in terminal

### Authentication Testing

- [ ] Navigate to http://localhost:3000/login
- [ ] Firebase Auth UI loads
- [ ] Can sign up/login with test account
- [ ] Redirects to dashboard after auth
- [ ] API calls work (check Network tab)

---

## Code Style

- Use TypeScript for all new code (no `any`)
- Follow existing patterns (PageLayout, DataTable)
- Use logger utility instead of console.log
- Always add `data-testid` attributes to components for E2E tests
- Use shadcn/ui primitives - don't modify files in `components/ui/`
- Use PageLayout for all dashboard pages
- Follow Tailwind spacing scale: 4, 6, 8, 12, 16, 24

### State Management

Follow the hierarchy:

```
useState → useSearchParams → Context → TanStack Query → Zustand
```

Use the simplest option that works. Don't use Zustand for state that belongs in `useState`.

---

## Git Workflow

### Branch Strategy

```
main (production)
  ↑
develop (integration)
  ↑
feat/*, fix/*, chore/* (feature branches)
```

### Branch Types

- `feat/*` - New features (from `develop`)
- `fix/*` - Bug fixes (from `develop`)
- `hotfix/*` - Critical production fixes (from `main`)
- `chore/*` - Maintenance tasks (from `develop`)
- `docs/*` - Documentation updates (from `develop`)

### Commit Message Format

```
<type>(<scope>): <description>

<optional body>

<optional footer>
```

**Examples**:

```bash
feat(contacts): add contact creation form
fix(auth): resolve Firebase token refresh issue
chore(deps): update Next.js to 16.0.10
docs(readme): add Git workflow documentation
```

---

**Last Updated**: 2025-01-17
**Maintained By**: Frontend Team

