#!/usr/bin/env bash

# Build the Jupyter Book site with the repo-local configuration.
# Usage: bash scripts/build_book.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

cd "$ROOT_DIR"
echo "Building Jupyter Book from ${ROOT_DIR}"
jupyter-book build .
