# Build targets

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
