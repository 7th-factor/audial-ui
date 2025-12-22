#!/bin/bash

# Dev local with log tailing - handles Ctrl+C to stop all services

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

EMULATOR_PID_FILE=".emulator.pid"
DEV_PID_FILE=".dev.pid"

# Cleanup function
cleanup() {
  echo ""
  echo "🛑 Shutting down gracefully..."

  # Stop Next.js
  if [ -f "$DEV_PID_FILE" ]; then
    PID=$(cat "$DEV_PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "   Stopping Next.js (PID: $PID)..."
      kill -TERM "$PID" 2>/dev/null || true
      sleep 1
    fi
    rm -f "$DEV_PID_FILE"
  fi

  # Stop emulators gracefully
  if [ -f "$EMULATOR_PID_FILE" ]; then
    PID=$(cat "$EMULATOR_PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "   💾 Stopping emulators & exporting data (PID: $PID)..."
      kill -TERM "$PID" 2>/dev/null || true
      for i in {1..10}; do
        if ! ps -p "$PID" > /dev/null 2>&1; then
          break
        fi
        sleep 0.5
      done
      if ps -p "$PID" > /dev/null 2>&1; then
        kill -9 "$PID" 2>/dev/null || true
      fi
    fi
    rm -f "$EMULATOR_PID_FILE"
  fi

  # Kill any remaining processes
  pkill -f "next dev" 2>/dev/null || true
  lsof -ti:9210 | xargs kill -9 2>/dev/null || true
  lsof -ti:4010 | xargs kill -9 2>/dev/null || true
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true

  echo "✅ All services stopped"
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "🚀 Starting development environment with log tailing..."
echo "   Press Ctrl+C to stop all services gracefully"
echo ""

# Start emulators
./scripts/start-emulators.sh
sleep 2

# Start Next.js in background
mkdir -p logs
echo "🚀 Starting Next.js dev server (background)..."
DOPPLER_CONFIG=dev_local npm run dev > logs/dev.log 2>&1 &
echo $! > "$DEV_PID_FILE"

sleep 3

if lsof -i:3000 > /dev/null 2>&1; then
  echo "✅ Dev server running on port 3000"
else
  echo "⚠️  Server may still be starting..."
fi

echo ""
echo "📋 Tailing logs (Ctrl+C to stop all services):"
echo "================================================"
echo ""

# Tail both logs - this blocks until Ctrl+C
tail -f logs/emulator.log logs/dev.log 2>/dev/null || tail -f logs/dev.log 2>/dev/null || sleep infinity
