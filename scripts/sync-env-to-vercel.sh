#!/bin/bash
# Sync Doppler secrets to Vercel environment variables
# Usage: ./scripts/sync-env-to-vercel.sh <doppler-config> <vercel-env>
# Example: ./scripts/sync-env-to-vercel.sh stg preview

set -e

DOPPLER_CONFIG="${1:-stg}"
VERCEL_ENV="${2:-preview}"  # preview, development, or production

echo "🔄 Syncing Doppler ($DOPPLER_CONFIG) → Vercel ($VERCEL_ENV)..."

# Check for required tools
if ! command -v doppler &> /dev/null; then
    echo "❌ Doppler CLI not found. Install: curl -sLf https://cli.doppler.com/install.sh | sh"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install: npm install -g vercel"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo "❌ jq not found. Install: brew install jq"
    exit 1
fi

# Get secrets from Doppler and sync to Vercel
# Filter for NEXT_PUBLIC_* vars and other allowed vars
ALLOWED_VARS="NEXT_PUBLIC_|SENTRY_DSN|SENTRY_AUTH_TOKEN"

echo "📥 Fetching secrets from Doppler (project: lavoz, config: $DOPPLER_CONFIG)..."

# Use DOPPLER_TOKEN if set (for CI), otherwise use local auth
if [ -n "$DOPPLER_TOKEN" ]; then
    SECRETS=$(doppler secrets download --token "$DOPPLER_TOKEN" --project lavoz --config "$DOPPLER_CONFIG" --format json --no-file)
else
    SECRETS=$(doppler secrets download --project lavoz --config "$DOPPLER_CONFIG" --format json --no-file)
fi

# Count and display vars to sync
VAR_COUNT=$(echo "$SECRETS" | jq -r "to_entries[] | select(.key | test(\"$ALLOWED_VARS\")) | .key" | wc -l | tr -d ' ')
echo "📦 Found $VAR_COUNT environment variables to sync"

# Sync each variable
echo "$SECRETS" | jq -r "to_entries[] | select(.key | test(\"$ALLOWED_VARS\")) | \"\(.key)=\(.value)\"" | \
while IFS='=' read -r key value; do
    echo "   → $key"
    # Remove existing var (ignore errors if it doesn't exist)
    vercel env rm "$key" "$VERCEL_ENV" -y 2>/dev/null || true
    # Add new var
    echo "$value" | vercel env add "$key" "$VERCEL_ENV" --force 2>/dev/null || \
        echo "     ⚠️  Failed to set $key (may already exist with same value)"
done

echo ""
echo "✅ Sync complete for $VERCEL_ENV environment"
echo "   Run 'vercel env ls' to verify"
