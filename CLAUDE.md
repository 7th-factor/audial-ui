# audial-admin - Development Workflow

**Repository**: audial-admin (7th-factor/audial-ui)
**Tech Stack**: Next.js 16 + React 19 + Firebase Auth + shadcn/ui + Tailwind CSS
**Port**: 3000
**Doppler Project**: `lavoz`

---

## Quick Commands

### Development

| Command              | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `make dev`           | Start with **staging** API (default)                                  |
| `make dev-prod`      | Start with **production** API (use with caution)                      |
| `make dev-local`     | Start **emulators + Next.js** with local API (foreground)            |
| `make dev-local-bg`  | Start **emulators + Next.js** with local API (background)            |
| `make dev-local-logs`| Start everything + tail combined logs                                |
| `npm run build`      | Production build                                                     |
| `npm run build:safe` | Safe build (preserves dev .next directory)                           |

### Firebase Emulators

| Command                | Purpose                    |
| ---------------------- | -------------------------- |
| `make emulator-start`  | Start Firebase emulators   |
| `make emulator-stop`   | Stop Firebase emulators    |
| `make emulator-logs`   | Tail emulator logs         |
| `make emulator-status` | Check emulator status      |

### Testing & Quality

| Command            | Purpose                  |
| ------------------ | ------------------------ |
| `npm run lint`     | Run ESLint               |
| `npm run typecheck`| TypeScript type checking |

### Deployment & Environment

| Command                     | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `npm run build:doppler`     | Build with Doppler dev config           |
| `npm run build:staging`     | Build with Doppler staging config       |
| `make sync-env-staging-dry` | Preview staging env sync                |
| `make sync-env-staging`     | Sync Doppler (stg) to Vercel staging    |
| `make sync-env-prod-dry`    | Preview production env sync             |
| `make sync-env-prod`        | Sync Doppler (prd) to Vercel production |

---

## Environment Selection

### Doppler Configs (Project: `lavoz`)

| Config      | Purpose                   | API             | Firebase         | Used By           |
| ----------- | ------------------------- | --------------- | ---------------- | ----------------- |
| `dev`       | Local admin + staging API | staging API     | Staging Firebase | Admin only        |
| `dev_local` | Full local stack          | localhost:8989  | Emulator (9210)  | API + Admin local |
| `dev_stg`   | Local admin + staging API | staging API     | Staging Firebase | Admin only        |
| `stg`       | Staging deployment        | staging API     | Staging Firebase | **CI/CD only**    |
| `prd`       | Production deployment     | Production API  | Prod Firebase    | **CI/CD only**    |

**Note**: `stg` and `prd` are for CI/CD only. Use `dev` or `dev_stg` for local development.

### Port Configuration

| Service          | Port |
| ---------------- | ---- |
| Frontend         | 3000 |
| Auth Emulator    | 9210 |
| Emulator UI      | 4010 |
| Local API        | 8989 |

---

## Environment Configuration

### Doppler Setup

```bash
# Install Doppler CLI
brew install dopplerhq/cli/doppler

# Authenticate
doppler login

# Setup project
doppler setup --project lavoz --config dev_stg

# Verify secrets
doppler secrets --project lavoz --config dev_stg
```

### Required Secrets

**Backend API**:
- `NEXT_PUBLIC_API_URL` - API endpoint

**Firebase Authentication**:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_USE_EMULATOR` - Set to "true" for local emulator

**Optional**:
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error monitoring
- `NEXT_PUBLIC_ENVIRONMENT` - development | staging | production

---

## Git Workflow (Branch Protection)

**IMPORTANT**: The `main` branch is **PR-only** with required reviews.

### Branch Protection Rules (main)

- Required pull request reviews: 1 approval
- Dismiss stale reviews on new commits
- Enforce for admins: Yes
- Force pushes: Disabled
- Deletions: Disabled

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
```

**Examples**:
```bash
feat(inbox): add call playback component
fix(auth): resolve Firebase token refresh issue
chore(deps): update Next.js to 16.0.10
```

---

## Development Guidelines

### THE GOLDEN RULE: Trust HMR

```bash
npm run dev  # Start once, let HMR handle updates
```

**Only restart for**: Environment variable changes, new package installations, next.config.js changes, server crashes.

### Code Style

- Use TypeScript for all new code (no `any`)
- Follow existing patterns (PageLayout, DataTable)
- Use logger utility instead of console.log
- Always add `data-testid` attributes for E2E tests
- Use shadcn/ui primitives - don't modify files in `components/ui/`
- Use PageLayout for all dashboard pages
- Follow Tailwind spacing scale: 4, 6, 8, 12, 16, 24

### State Management Hierarchy

```
useState → useSearchParams → Context → TanStack Query → Zustand
```

Use the simplest option that works.

### Key Components

- **PageLayout**: Standard dashboard page wrapper
- **DataTable**: Reusable table with filtering/sorting
- **AuthGuard**: Route protection HOC
- **AuthProvider**: Firebase authentication provider

### Route Groups

- `app/(auth)/` - Authentication pages (login, signup)
- `app/(dashboard)/` - Dashboard pages (analytics, contacts, etc.)

Routes inside `(dashboard)` become top-level:
- `app/(dashboard)/analytics/page.tsx` → `/analytics`
- `app/(dashboard)/contacts/page.tsx` → `/contacts`

---

## Troubleshooting

### Dev Server Issues

```bash
# Check port availability
lsof -i :3000

# Verify Doppler config
doppler setup --project lavoz --config dev_stg

# Clear cache and restart
rm -rf .next && npm run dev
```

### Firebase Emulator Issues

```bash
# Check if ports are in use
lsof -i :9210
lsof -i :4010

# Check status
make emulator-status

# Full restart
make emulator-stop && make emulator-start
```

### TypeScript Errors

```bash
npm run typecheck
```

**Common fixes**:
- No `any` types - use proper interfaces
- Import types: `import type { User } from '@/types'`

### Build Errors

```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Environment Variable Issues

```bash
# Verify Doppler
doppler secrets --project lavoz --config dev_stg

# Check specific variable
doppler secrets get NEXT_PUBLIC_API_URL --project lavoz --config dev_stg
```

---

## Local Development Checklist

### Prerequisites

- [ ] Node.js 20+ installed
- [ ] Doppler CLI installed
- [ ] Doppler access configured for `lavoz` project

### Setup

```bash
git clone <repo>
npm install
doppler setup --project lavoz --config dev_stg
make dev
```

### Verification

- [ ] Server starts on port 3000
- [ ] UI loads: http://localhost:3000
- [ ] No console errors
- [ ] Auth flow works (login/logout)

---

## Session-End Checklist

Before committing:

- [ ] TypeScript compiles: `npm run typecheck`
- [ ] ESLint passes: `npm run lint`
- [ ] No console.log statements (use logger)
- [ ] All interactive elements have data-testid
- [ ] Build succeeds: `npm run build`

---

## Notes

- **Primary function**: Building admin UI, not API
- **Playwright MCP**: Can run browser tests and call APIs for verification
- See [README.md](./README.md) for product overview and page specifications

---

**Last Updated**: 2025-12-19
