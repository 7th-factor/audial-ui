#!/bin/bash

# Start Firebase emulators in background
# Logs are written to logs/emulator.log
# PID is saved to .emulator.pid

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

EMULATOR_PID_FILE=".emulator.pid"
EMULATOR_LOG_FILE="logs/emulator.log"
EMULATOR_AUTH_PORT=9210
EMULATOR_UI_PORT=4010

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if emulators are already running
if [ -f "$EMULATOR_PID_FILE" ]; then
  PID=$(cat "$EMULATOR_PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "⚠️  Firebase emulators already running (PID: $PID)"
    echo "   Stop with: make emulator-stop"
    exit 0
  else
    # PID file exists but process is dead, remove it
    rm -f "$EMULATOR_PID_FILE"
  fi
fi

# Check if ports are already in use
if lsof -i:$EMULATOR_AUTH_PORT > /dev/null 2>&1; then
  echo "❌ Port $EMULATOR_AUTH_PORT is already in use"
  echo "   Stop the process using this port or change the port in firebase.json"
  exit 1
fi

if lsof -i:$EMULATOR_UI_PORT > /dev/null 2>&1; then
  echo "❌ Port $EMULATOR_UI_PORT is already in use"
  echo "   Stop the process using this port or change the port in firebase.json"
  exit 1
fi

echo "🔥 Starting Firebase emulators..."
echo "   Auth emulator: http://localhost:$EMULATOR_AUTH_PORT"
echo "   Emulator UI: http://localhost:$EMULATOR_UI_PORT"
echo "   Logs: $EMULATOR_LOG_FILE"

# Start emulators in background
npm run emulator:start > "$EMULATOR_LOG_FILE" 2>&1 &
EMULATOR_PID=$!

# Save PID
echo $EMULATOR_PID > "$EMULATOR_PID_FILE"

# Wait a moment to check if it started successfully
sleep 3

if ps -p "$EMULATOR_PID" > /dev/null 2>&1; then
  echo "✅ Firebase emulators started (PID: $EMULATOR_PID)"
  echo "   View logs: make emulator-logs"
  echo "   Stop: make emulator-stop"
else
  echo "❌ Failed to start Firebase emulators"
  echo "   Check logs: tail -n 50 $EMULATOR_LOG_FILE"
  rm -f "$EMULATOR_PID_FILE"
  exit 1
fi

