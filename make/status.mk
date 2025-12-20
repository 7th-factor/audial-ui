# Health & Status targets

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
