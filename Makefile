# audial-admin Makefile
# Modular structure - see make/*.mk for target definitions

.PHONY: help dev dev-prod dev-local dev-local-bg dev-local-logs dev-bg dev-bg-prod dev-bg-local dev-debug stop kill test test-e2e test-browser test-browser-ui test-browser-headed test-browser-debug test-browser-report test-watch lint typecheck build build-safe build-staging logs tail tail-live logs-live logs-emulator logs-dev logs-errors logs-clear emulator-start emulator-stop emulator-logs emulator-export emulator-clear emulator-status health status doctor ports ps clean clean-all reinstall check-port kill-port deploy-staging deploy-prod deploy-preview deploy-status sync-env-staging sync-env-prod sync-env-staging-dry sync-env-prod-dry theme-list theme theme-save theme-add

# =============================================================================
# Configuration
# =============================================================================

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

# =============================================================================
# Include modular makefiles
# =============================================================================

include make/dev.mk
include make/test.mk
include make/build.mk
include make/emulator.mk
include make/logs.mk
include make/deploy.mk
include make/status.mk
include make/utils.mk
include make/theme.mk

# =============================================================================
# Help (must be in main file to aggregate all targets)
# =============================================================================

##@ General

help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
