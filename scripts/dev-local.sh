#!/bin/bash

# Dev local script with proper signal handling
# Starts Firebase emulators + Next.js, handles Ctrl+C gracefully

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

EMULATOR_PID_FILE=".emulator.pid"

# Cleanup function
cleanup() {
  echo ""
  echo "🛑 Shutting down gracefully..."

  # Stop Next.js if running
  if [ -n "$NEXT_PID" ] && ps -p "$NEXT_PID" > /dev/null 2>&1; then
    echo "   Stopping Next.js (PID: $NEXT_PID)..."
    kill -TERM "$NEXT_PID" 2>/dev/null || true
    wait "$NEXT_PID" 2>/dev/null || true
  fi

  # Stop emulators gracefully (allows export)
  if [ -f "$EMULATOR_PID_FILE" ]; then
    PID=$(cat "$EMULATOR_PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "   💾 Stopping emulators & exporting data (PID: $PID)..."
      kill -TERM "$PID" 2>/dev/null || true
      # Wait up to 5 seconds for graceful shutdown
      for i in {1..10}; do
        if ! ps -p "$PID" > /dev/null 2>&1; then
          break
        fi
        sleep 0.5
      done
      # Force kill if still running
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "   ⚠️  Force killing emulators..."
        kill -9 "$PID" 2>/dev/null || true
      fi
    fi
    rm -f "$EMULATOR_PID_FILE"
  fi

  # Kill any remaining processes on ports
  lsof -ti:9210 | xargs kill -9 2>/dev/null || true
  lsof -ti:4010 | xargs kill -9 2>/dev/null || true
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true

  echo "✅ All services stopped"
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM EXIT

echo "🚀 Starting development environment (local API + emulators)..."
echo "   Press Ctrl+C to stop all services gracefully"
echo ""

# Start emulators
./scripts/start-emulators.sh

# Wait for emulators to be ready
sleep 2

# Check if emulators started
if ! lsof -i:9210 > /dev/null 2>&1; then
  echo "❌ Failed to start emulators"
  exit 1
fi

echo ""
echo "🚀 Starting Next.js dev server..."
echo ""

# Start Next.js in foreground, capture PID
DOPPLER_CONFIG=dev_local npm run dev &
NEXT_PID=$!

# Wait for Next.js process
wait "$NEXT_PID"
