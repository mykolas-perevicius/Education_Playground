#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

cd "$ROOT_DIR"

echo "🔄 Building site..."
bash scripts/build_book.sh

echo "🧪 Running coverage suite..."
bash scripts/run_site_checks.sh

echo "🎬 Recording Playwright showcase (video)..."
bash scripts/playwright_showcase.sh --delay 1.0

echo "🎞  Recording Playwright showcase (video + GIF)..."
bash scripts/playwright_showcase.sh --delay 1.0 --with-gif --gif-speed 4
