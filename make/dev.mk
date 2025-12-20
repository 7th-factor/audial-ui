# Development targets

##@ Development

dev: ## Start dev server with staging API (default, uses dev_stg config)
	@echo "🚀 Starting dev server with STAGING API..."
	@DOPPLER_CONFIG=dev_stg npm run dev

dev-prod: ## Start dev server with production API
	@echo "🚀 Starting dev server with PRODUCTION API..."
	@DOPPLER_CONFIG=prd npm run dev

dev-local: ## Start emulators + dev server with local API (Ctrl+C stops all)
	@./scripts/dev-local.sh

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

dev-local-logs: ## Start everything + tail logs (Ctrl+C stops all)
	@./scripts/dev-local-logs.sh

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
