# Logging targets

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
