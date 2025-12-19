.PHONY: help dev dev-prod dev-local dev-local-bg dev-local-logs dev-bg dev-bg-prod dev-bg-local stop kill test test-e2e test-browser test-browser-ui test-browser-headed test-browser-debug test-browser-report lint typecheck build build-safe build-staging logs tail tail-live logs-live logs-emulator logs-dev logs-errors logs-clear emulator-start emulator-stop emulator-logs emulator-status health status doctor ports ps clean reinstall check-port kill-port deploy-staging deploy-prod deploy-status sync-env-staging sync-env-prod sync-env-staging-dry sync-env-prod-dry

# Configuration
ADMIN_PORT := 3000
NODE_VERSION := 20.x
EMULATOR_AUTH_PORT := 9210
EMULATOR_UI_PORT := 4010
EMULATOR_PID_FILE := .emulator.pid

# Load .env.local if exists (for DOPPLER_CONFIG override)
-include .env.local

# Default to dev_stg (staging), override via .env.local or CLI
DOPPLER_CONFIG ?= dev_stg

# Default target
.DEFAULT_GOAL := help

##@ General

help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development

dev: ## Start dev server with staging API (default, uses dev_stg config)
	@echo "🚀 Starting dev server with STAGING API..."
	@DOPPLER_CONFIG=dev_stg npm run dev

dev-prod: ## Start dev server with production API
	@echo "🚀 Starting dev server with PRODUCTION API..."
	@DOPPLER_CONFIG=prd npm run dev

dev-local: ## Start emulators + dev server with local API (foreground)
	@echo "🚀 Starting Firebase emulators + dev server..."
	@$(MAKE) emulator-start
	@sleep 2
	@echo "🚀 Starting Next.js dev server..."
	@DOPPLER_CONFIG=dev_local npm run dev

dev-local-bg: ## Start emulators + dev server in background
	@echo "🚀 Starting Firebase emulators + dev server in background..."
	@$(MAKE) emulator-start
	@sleep 2
	@mkdir -p logs
	@DOPPLER_CONFIG=dev_local npm run dev > logs/dev.log 2>&1 & echo $$! > .dev.pid
	@sleep 3
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "✅ Dev server running on port $(ADMIN_PORT)"; \
		echo "📝 View logs: make logs-live"; \
	else \
		echo "⚠️  Server may still be starting. Check logs: make logs-live"; \
	fi

dev-local-logs: ## Start everything + tail combined logs
	@echo "🚀 Starting Firebase emulators + dev server with log tailing..."
	@$(MAKE) dev-local-bg
	@sleep 2
	@$(MAKE) logs-live

dev-bg: ## Start dev server in background with staging API
	@echo "🚀 Starting Next.js dev server in background (STAGING API)..."
	@mkdir -p logs
	@DOPPLER_CONFIG=dev_stg npm run dev > logs/dev.log 2>&1 & echo $$! > .dev.pid
	@sleep 3
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "✅ Dev server running on port $(ADMIN_PORT)"; \
		echo "📝 View logs: make tail"; \
	else \
		echo "⚠️  Server may still be starting. Check logs: make tail"; \
	fi

dev-bg-prod: ## Start dev server in background with production API
	@echo "🚀 Starting Next.js dev server in background (PRODUCTION API)..."
	@mkdir -p logs
	@DOPPLER_CONFIG=prd npm run dev > logs/dev.log 2>&1 & echo $$! > .dev.pid
	@sleep 3
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "✅ Dev server running on port $(ADMIN_PORT)"; \
		echo "📝 View logs: make tail"; \
	else \
		echo "⚠️  Server may still be starting. Check logs: make tail"; \
	fi

dev-bg-local: ## Start dev server in background with local API
	@echo "🚀 Starting Next.js dev server in background (LOCAL API)..."
	@mkdir -p logs
	@DOPPLER_CONFIG=dev npm run dev > logs/dev.log 2>&1 & echo $$! > .dev.pid
	@sleep 3
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "✅ Dev server running on port $(ADMIN_PORT)"; \
		echo "📝 View logs: make tail"; \
	else \
		echo "⚠️  Server may still be starting. Check logs: make tail"; \
	fi

dev-debug: ## Start dev server in debug mode
	@echo "🐛 Starting Next.js dev server in debug mode..."
	@NODE_OPTIONS="--inspect" npm run dev

stop: kill ## Alias for kill

kill: ## Kill all processes (emulators + Next.js) and free ports
	@echo "🛑 Stopping all services..."
	@$(MAKE) emulator-stop
	@if [ -f .dev.pid ]; then \
		kill $$(cat .dev.pid) 2>/dev/null || true; \
		rm -f .dev.pid; \
	fi
	@pkill -f "next dev" 2>/dev/null || true
	@pkill -f "next-server" 2>/dev/null || true
	@lsof -ti:$(ADMIN_PORT) | xargs kill -9 2>/dev/null || true
	@echo "✅ All processes stopped"

##@ Testing

test: ## Run unit tests (if configured)
	@if npm run test 2>/dev/null; then \
		npm test; \
	else \
		echo "⚠️  No test script configured. Run 'make test-e2e' for E2E tests."; \
	fi

test-e2e: ## Run E2E tests with Playwright
	@echo "🧪 Running Playwright E2E tests..."
	@npx playwright test

test-browser: ## Run browser tests (headless)
	@echo "🧪 Running Playwright browser tests..."
	@npx playwright test

test-browser-ui: ## Run browser tests with Playwright UI (interactive)
	@echo "🧪 Opening Playwright Test UI..."
	@npx playwright test --ui

test-browser-headed: ## Run browser tests with visible browser
	@echo "🧪 Running tests with visible browser..."
	@npx playwright test --headed

test-browser-debug: ## Run browser tests with Playwright Inspector
	@echo "🐛 Running tests in debug mode..."
	@PWDEBUG=1 npx playwright test

test-browser-report: ## Open HTML test report
	@echo "📊 Opening test report..."
	@npx playwright show-report

test-watch: ## Run tests in watch mode (if configured)
	@if npm run test:watch 2>/dev/null; then \
		npm run test:watch; \
	else \
		echo "⚠️  No test:watch script configured."; \
	fi

##@ Build

build: ## Build production bundle
	npm run build

build-safe: ## Build with dev server stopped (prevents corruption)
	@echo "🔨 Building production bundle (safe mode)..."
	@$(MAKE) kill 2>/dev/null || true
	@sleep 2
	@npm run build:safe || npm run build
	@echo "✅ Build complete"

build-staging: ## Build with staging environment variables
	@echo "🔨 Building for staging..."
	@npm run build:staging

lint: ## Run ESLint
	npm run lint

typecheck: ## Run TypeScript type checking
	@echo "🔍 Type checking..."
	@npm run typecheck

##@ Emulator

emulator-start: ## Start Firebase emulators in background
	@./scripts/start-emulators.sh

emulator-stop: ## Stop Firebase emulators
	@echo "🛑 Stopping Firebase emulators..."
	@if [ -f $(EMULATOR_PID_FILE) ]; then \
		PID=$$(cat $(EMULATOR_PID_FILE)); \
		if ps -p $$PID > /dev/null 2>&1; then \
			kill $$PID 2>/dev/null || true; \
			echo "✅ Emulators stopped (PID: $$PID)"; \
		else \
			echo "⚠️  Emulator process not found"; \
		fi; \
		rm -f $(EMULATOR_PID_FILE); \
	else \
		echo "⚠️  No emulator PID file found"; \
	fi
	@pkill -f "firebase emulators" 2>/dev/null || true
	@lsof -ti:$(EMULATOR_AUTH_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti:$(EMULATOR_UI_PORT) | xargs kill -9 2>/dev/null || true

emulator-logs: ## Tail emulator logs
	@echo "📋 Tailing emulator logs (Ctrl+C to stop):"
	@if [ -f logs/emulator.log ]; then \
		tail -f logs/emulator.log; \
	else \
		echo "No emulator logs found. Start emulators with 'make emulator-start'"; \
	fi

emulator-status: ## Check emulator status
	@echo "🔍 Firebase Emulator Status"
	@echo "=========================="
	@if [ -f $(EMULATOR_PID_FILE) ]; then \
		PID=$$(cat $(EMULATOR_PID_FILE)); \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "   ✅ Emulators running (PID: $$PID)"; \
		else \
			echo "   ⚪ Emulator process not found"; \
		fi; \
	else \
		echo "   ⚪ Emulators not running"; \
	fi
	@echo ""
	@echo "Port Status:"
	@if lsof -i:$(EMULATOR_AUTH_PORT) > /dev/null 2>&1; then \
		echo "   ✅ Auth emulator: Port $(EMULATOR_AUTH_PORT) in use"; \
	else \
		echo "   ⚪ Auth emulator: Port $(EMULATOR_AUTH_PORT) available"; \
	fi
	@if lsof -i:$(EMULATOR_UI_PORT) > /dev/null 2>&1; then \
		echo "   ✅ Emulator UI: Port $(EMULATOR_UI_PORT) in use"; \
		echo "      UI: http://localhost:$(EMULATOR_UI_PORT)"; \
	else \
		echo "   ⚪ Emulator UI: Port $(EMULATOR_UI_PORT) available"; \
	fi

##@ Logs

logs: tail ## Alias for tail

tail: ## View last 30 lines of combined logs
	@if [ -f logs/dev.log ] || [ -f logs/emulator.log ]; then \
		if [ -f logs/emulator.log ]; then \
			echo "=== Emulator Logs ==="; \
			tail -n 15 logs/emulator.log; \
			echo ""; \
		fi; \
		if [ -f logs/dev.log ]; then \
			echo "=== Dev Server Logs ==="; \
			tail -n 15 logs/dev.log; \
		fi; \
	else \
		echo "No logs found. Start services with 'make dev-local-bg'"; \
	fi

tail-live: logs-live ## Alias for logs-live

logs-live: ## Live tail combined logs (emulator + dev server)
	@./scripts/tail-logs.sh

logs-emulator: ## Tail only emulator logs
	@$(MAKE) emulator-logs

logs-dev: ## Tail only dev server logs
	@echo "📋 Tailing dev server logs (Ctrl+C to stop):"
	@if [ -f logs/dev.log ]; then \
		tail -f logs/dev.log; \
	else \
		echo "No dev logs found. Start dev server with 'make dev-bg'"; \
	fi

logs-errors: ## Show only error logs (last 20 lines)
	@echo "❌ Recent errors:"
	@if [ -f logs/emulator.log ]; then \
		echo "=== Emulator Errors ==="; \
		grep -i "error\|fail\|exception" logs/emulator.log 2>/dev/null | tail -n 10 || echo "No errors found"; \
		echo ""; \
	fi
	@if [ -f logs/dev.log ]; then \
		echo "=== Dev Server Errors ==="; \
		grep -i "error\|fail\|exception" logs/dev.log 2>/dev/null | tail -n 10 || echo "No errors found"; \
	fi
	@if [ ! -f logs/emulator.log ] && [ ! -f logs/dev.log ]; then \
		echo "No logs found"; \
	fi

logs-clear: ## Clear all log files
	@rm -f logs/dev.log logs/emulator.log
	@echo "✅ Logs cleared"

##@ Health & Status

health: ## Check frontend health
	@echo "🏥 Checking frontend health..."
	@if curl -s -f http://localhost:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "✅ Frontend is healthy on port $(ADMIN_PORT)"; \
	else \
		echo "❌ Frontend is not responding on port $(ADMIN_PORT)"; \
		echo "   Start server with: make dev"; \
		exit 1; \
	fi

status: ## Show development status
	@echo "=== audial-admin Status ==="
	@echo ""
	@echo "Frontend Status:"
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "   ✅ Port $(ADMIN_PORT): Frontend running"; \
	else \
		echo "   ⚪ Port $(ADMIN_PORT): Available"; \
	fi
	@if curl -s http://localhost:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "   ✅ Frontend: Healthy"; \
	else \
		echo "   ❌ Frontend: Not responding"; \
	fi
	@if [ -f .dev.pid ] && ps -p $$(cat .dev.pid) > /dev/null 2>&1; then \
		echo "   ✅ Dev server process: Running (PID: $$(cat .dev.pid))"; \
	else \
		echo "   ⚪ Dev server process: Not running"; \
	fi
	@echo ""
	@$(MAKE) emulator-status

doctor: ## Diagnose common issues
	@echo "🩺 Running diagnostics..."
	@echo "1. Checking port $(ADMIN_PORT)..."
	@$(MAKE) ports
	@echo ""
	@echo "2. Checking health endpoint..."
	@$(MAKE) health || echo "   ⚠️  Health check failed"
	@echo ""
	@echo "3. Checking logs for errors..."
	@$(MAKE) logs-errors || true
	@echo ""
	@echo "4. Checking disk space..."
	@df -h . | head -2
	@echo ""
	@echo "5. Checking Node version..."
	@node --version
	@echo ""
	@echo "Diagnosis complete. If issues persist, try: make kill && make dev-bg"

ports: ## Check port usage
	@echo "🔍 Port $(ADMIN_PORT) status:"
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "   ✅ Port $(ADMIN_PORT): Frontend running"; \
		lsof -i:$(ADMIN_PORT) | grep -v COMMAND; \
	else \
		echo "   ⚪ Port $(ADMIN_PORT): Available"; \
	fi

ps: ## Show running Node processes
	@echo "🔍 Running Node processes:"
	@ps aux | grep -E "node|npm|next" | grep -v grep || echo "   No Node processes running"

##@ Deployment

deploy-staging: ## Deploy to Vercel staging (requires VERCEL_TOKEN)
	@echo "🚀 Deploying to Vercel staging..."
	@if [ -z "$$VERCEL_TOKEN" ]; then \
		echo "❌ VERCEL_TOKEN not set"; \
		echo "   Export token: export VERCEL_TOKEN=your-token"; \
		exit 1; \
	fi
	@echo "📦 Building for staging..."
	@npm run build:staging
	@echo "✅ Build complete. Deploy via Vercel CLI or GitHub Actions workflow."

deploy-prod: ## Deploy to Vercel production (requires confirmation)
	@echo "🚀 Deploying to Vercel production..."
	@read -p "⚠️  Deploy to PRODUCTION? [yes/NO]: " confirm && [ "$$confirm" = "yes" ] || (echo "❌ Deployment cancelled" && exit 1)
	@if [ -z "$$VERCEL_TOKEN" ]; then \
		echo "❌ VERCEL_TOKEN not set"; \
		echo "   Export token: export VERCEL_TOKEN=your-token"; \
		exit 1; \
	fi
	@echo "📦 Building for production..."
	@npm run build
	@echo "✅ Build complete. Deploy via Vercel CLI or GitHub Actions workflow."

deploy-status: ## Show deployment status
	@echo "📊 Deployment Status"
	@echo "==================="
	@echo ""
	@echo "💡 Use GitHub Actions workflows for automated deployment:"
	@echo "   - .github/workflows/deploy-staging.yml"
	@echo "   - .github/workflows/deploy-prod.yml"

##@ Utilities

clean: ## Clean node_modules and build artifacts
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf .next node_modules/.cache
	@echo "✅ Clean complete"

clean-all: ## Clean everything including node_modules (WARNING: requires reinstall)
	@echo "⚠️  WARNING: This will delete node_modules!"
	@read -p "Are you sure? [y/N]: " confirm && [ "$$confirm" = "y" ] || (echo "❌ Clean cancelled" && exit 1)
	@rm -rf node_modules .next logs/*.log .dev.pid
	@echo "✅ All artifacts cleaned"

reinstall: clean-all ## Reinstall dependencies
	@echo "📦 Reinstalling dependencies..."
	@npm install
	@echo "✅ Dependencies reinstalled"

check-port: ## Check if port 3000 is in use
	@if lsof -i:$(ADMIN_PORT) > /dev/null 2>&1; then \
		echo "⚠️  Port $(ADMIN_PORT) is in use:"; \
		lsof -i:$(ADMIN_PORT); \
	else \
		echo "✅ Port $(ADMIN_PORT) is free"; \
	fi

kill-port: ## Kill process using port 3000
	@echo "🔪 Killing process on port $(ADMIN_PORT)..."
	@lsof -ti:$(ADMIN_PORT) | xargs kill -9 2>/dev/null || echo "No process found on port $(ADMIN_PORT)"
	@echo "✅ Port $(ADMIN_PORT) freed"

##@ Environment Sync (Local Only - requires vercel login)

sync-env-staging: ## Sync NEXT_PUBLIC_* vars from Doppler (stg) to Vercel staging
	@echo "🔄 Syncing staging environment variables..."
	@echo "⚠️  Environment sync script not yet configured. Create scripts/sync-env-to-vercel.sh"

sync-env-prod: ## Sync NEXT_PUBLIC_* vars from Doppler (prd) to Vercel production
	@echo "🔄 Syncing production environment variables..."
	@echo "⚠️  Environment sync script not yet configured. Create scripts/sync-env-to-vercel.sh"

sync-env-staging-dry: ## Preview staging env sync (dry run)
	@echo "🔍 Previewing staging environment sync..."
	@echo "⚠️  Environment sync script not yet configured. Create scripts/sync-env-to-vercel.sh"

sync-env-prod-dry: ## Preview production env sync (dry run)
	@echo "🔍 Previewing production environment sync..."
	@echo "⚠️  Environment sync script not yet configured. Create scripts/sync-env-to-vercel.sh"

