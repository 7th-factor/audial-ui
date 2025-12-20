# Testing targets

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
