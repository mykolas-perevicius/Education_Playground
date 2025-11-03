#!/usr/bin/env bash

# Install the required Playwright browser and run the test suite with coverage.
# Usage: bash scripts/run_site_checks.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

cd "$ROOT_DIR"

echo "Installing Playwright Chromium browser (safe to rerun)..."
playwright install chromium

echo "Running pytest with coverage..."
PYTEST_ARGS=(
  --cov=tools.check_notebooks
  --cov-report=term-missing
  --log-cli-level=INFO
  "--log-cli-format=%(levelname)s %(message)s"
)
pytest "${PYTEST_ARGS[@]}" "$@"
