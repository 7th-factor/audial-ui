# Deployment targets

##@ Deployment

sync-env-staging: ## Sync Doppler (stg) → Vercel preview environment
	@./scripts/sync-env-to-vercel.sh stg preview

sync-env-prod: ## Sync Doppler (prd) → Vercel production environment
	@./scripts/sync-env-to-vercel.sh prd production

sync-env-staging-dry: ## Preview staging env sync (dry run)
	@echo "🔍 Previewing staging environment sync..."
	@echo "Would sync these NEXT_PUBLIC_* vars from Doppler (stg) to Vercel (preview):"
	@doppler secrets download --project lavoz --config stg --format json --no-file | \
		jq -r 'to_entries[] | select(.key | test("NEXT_PUBLIC_|SENTRY_DSN")) | "   → \(.key)"'

sync-env-prod-dry: ## Preview production env sync (dry run)
	@echo "🔍 Previewing production environment sync..."
	@echo "Would sync these NEXT_PUBLIC_* vars from Doppler (prd) to Vercel (production):"
	@doppler secrets download --project lavoz --config prd --format json --no-file | \
		jq -r 'to_entries[] | select(.key | test("NEXT_PUBLIC_|SENTRY_DSN")) | "   → \(.key)"'

deploy-staging: sync-env-staging ## Sync env + deploy to Vercel staging
	@echo "🚀 Deploying to Vercel staging..."
	@npx vercel --yes

deploy-prod: ## Sync env + deploy to Vercel production (requires confirmation)
	@echo "🚀 Deploying to Vercel production..."
	@read -p "⚠️  Deploy to PRODUCTION? [yes/NO]: " confirm && [ "$$confirm" = "yes" ] || (echo "❌ Deployment cancelled" && exit 1)
	@$(MAKE) sync-env-prod
	@npx vercel --prod --yes

deploy-preview: ## Deploy preview without env sync (uses existing Vercel env)
	@echo "🚀 Deploying preview..."
	@npx vercel --yes

deploy-status: ## Show deployment status and recent deployments
	@echo "📊 Deployment Status"
	@echo "==================="
	@echo ""
	@echo "Recent deployments:"
	@npx vercel ls --limit 5 2>/dev/null || echo "   Run 'vercel login' first"
	@echo ""
	@echo "💡 Deployment commands:"
	@echo "   make deploy-staging  - Sync env + deploy to preview"
	@echo "   make deploy-prod     - Sync env + deploy to production"
	@echo ""
	@echo "💡 GitHub Actions: .github/workflows/deploy.yml"
