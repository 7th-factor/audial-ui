#!/bin/bash

# Tail combined logs from emulator and dev server
# Shows both logs simultaneously with prefixes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

EMULATOR_LOG="logs/emulator.log"
DEV_LOG="logs/dev.log"

# Check if logs exist
HAS_EMULATOR=false
HAS_DEV=false

if [ -f "$EMULATOR_LOG" ]; then
  HAS_EMULATOR=true
fi

if [ -f "$DEV_LOG" ]; then
  HAS_DEV=true
fi

if [ "$HAS_EMULATOR" = false ] && [ "$HAS_DEV" = false ]; then
  echo "❌ No log files found"
  echo "   Start services with: make dev-local-bg"
  exit 1
fi

echo "📋 Tailing logs (Ctrl+C to stop)..."
echo ""

# Function to tail with prefix
tail_with_prefix() {
  local file=$1
  local prefix=$2
  if [ -f "$file" ]; then
    tail -f "$file" | sed "s/^/$prefix /"
  fi
}

# Tail both logs simultaneously
if [ "$HAS_EMULATOR" = true ] && [ "$HAS_DEV" = true ]; then
  # Use process substitution to tail both files
  (tail_with_prefix "$EMULATOR_LOG" "[EMULATOR]" &)
  (tail_with_prefix "$DEV_LOG" "[DEV]" &)
  wait
elif [ "$HAS_EMULATOR" = true ]; then
  tail_with_prefix "$EMULATOR_LOG" "[EMULATOR]"
elif [ "$HAS_DEV" = true ]; then
  tail_with_prefix "$DEV_LOG" "[DEV]"
fi

