# Firebase Emulator targets

##@ Emulator

emulator-start: ## Start Firebase emulators in background
	@./scripts/start-emulators.sh

emulator-stop: ## Stop Firebase emulators (graceful - saves data)
	@echo "🛑 Stopping Firebase emulators (graceful shutdown)..."
	@if [ -f $(EMULATOR_PID_FILE) ]; then \
		PID=$$(cat $(EMULATOR_PID_FILE)); \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "   💾 Exporting data before shutdown..."; \
			kill -TERM $$PID 2>/dev/null || true; \
			sleep 3; \
			if ps -p $$PID > /dev/null 2>&1; then \
				echo "   ⚠️  Process still running, force killing..."; \
				kill -9 $$PID 2>/dev/null || true; \
			fi; \
			echo "✅ Emulators stopped (PID: $$PID)"; \
		else \
			echo "⚠️  Emulator process not found"; \
		fi; \
		rm -f $(EMULATOR_PID_FILE); \
	else \
		echo "⚠️  No emulator PID file found"; \
	fi
	@pkill -TERM -f "firebase emulators" 2>/dev/null || true
	@sleep 2
	@lsof -ti:$(EMULATOR_AUTH_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti:$(EMULATOR_UI_PORT) | xargs kill -9 2>/dev/null || true

emulator-logs: ## Tail emulator logs
	@echo "📋 Tailing emulator logs (Ctrl+C to stop):"
	@if [ -f logs/emulator.log ]; then \
		tail -f logs/emulator.log; \
	else \
		echo "No emulator logs found. Start emulators with 'make emulator-start'"; \
	fi

emulator-export: ## Export emulator data manually
	@echo "📦 Exporting emulator data..."
	@if lsof -i:$(EMULATOR_AUTH_PORT) > /dev/null 2>&1; then \
		firebase emulators:export .firebase-emulator-data --project elemente-dev --force; \
		echo "✅ Emulator data exported to .firebase-emulator-data/"; \
	else \
		echo "⚠️  Emulators not running. Data is auto-exported on graceful shutdown."; \
	fi

emulator-clear: ## Clear persisted emulator data
	@echo "🗑️  Clearing emulator data..."
	@rm -rf .firebase-emulator-data
	@echo "✅ Emulator data cleared. Next start will be fresh."

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
	@echo ""
	@echo "Persisted Data:"
	@if [ -d .firebase-emulator-data ]; then \
		echo "   📦 Data exists: .firebase-emulator-data/"; \
		ls -la .firebase-emulator-data/ 2>/dev/null | head -5 || true; \
	else \
		echo "   ⚪ No persisted data (first run or cleared)"; \
	fi
