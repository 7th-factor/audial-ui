# Utility targets

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
