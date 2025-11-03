#!/usr/bin/env bash

# Launch a headed Playwright run that walks the site in real time.
# Usage: bash scripts/playwright_showcase.sh [--delay SECONDS] [--limit N]

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

cd "$ROOT_DIR"

ARGS=()
WITH_GIF=0

for arg in "$@"; do
  case "$arg" in
    --with-gif)
      WITH_GIF=1
      ;;
    *)
      ARGS+=("$arg")
      ;;
  esac
done

if ! printf '%s\n' "${ARGS[@]}" | grep -q -- '--video-out'; then
  ARGS+=(--video-out "$ROOT_DIR/artifacts/showcase/latest.mp4")
fi

if [ "$WITH_GIF" -eq 1 ] && ! printf '%s\n' "${ARGS[@]}" | grep -q -- '--gif-out'; then
  ARGS+=(--gif-out "$ROOT_DIR/artifacts/showcase/latest.gif")
fi

python3 scripts/playwright_showcase.py "${ARGS[@]}"
