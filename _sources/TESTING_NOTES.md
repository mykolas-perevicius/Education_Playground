# Testing Notes - Education Playground

## Focus of Current Session
- Target notebooks: `hard/10_performance_computing.ipynb` and `hard/11_cuda_and_parallel_computing.ipynb`.
- Goal: Spot-check recent additions and outline a repeatable validation strategy.

## Spot-Check Results
- `hard/10_performance_computing.ipynb`
  - Early profiling cells execute successfully in the current environment.
  - Cells that import `numpy` fail (`ModuleNotFoundError`), confirming the notebook requires scientific-computing dependencies not yet installed locally.
  - Numba-specific sections gracefully skip execution when the package is missing.
- `hard/11_cuda_and_parallel_computing.ipynb`
  - The CUDA availability diagnostic cell runs and reports missing tooling with clear install guidance (`pip install torch`, `pip install cupy-cuda11x`).
  - GPU-intensive sections are gated behind the `GPU_AVAILABLE` or similar checks, so the notebook can be opened without crashing, but full execution still depends on GPU support and the related libraries.

## Dependency Checklist (per notebook)
- Performance Computing (`hard/10_...`)
  - Required for full execution: `numpy`, `numba`.
  - Optional accelerators covered: `asyncio` (stdlib), `concurrent.futures` (stdlib), `cProfile` (stdlib).
- CUDA & Parallel Computing (`hard/11_...`)
  - Required for CPU-only walkthroughs: `numpy`, `torch` (for feature detection, even if CUDA is unavailable).
  - Required for GPU execution: `torch` with CUDA support, `cupy-cuda11x` (or matching CUDA version), NVIDIA drivers (`nvidia-smi`) when testing on local hardware.

## Recommended Automation Enhancements
1. Create a `requirements-notebooks.txt` (or similar) capturing the union of notebook dependencies (`numpy`, `numba`, `torch`, `cupy-cuda11x`, plus any supporting libraries such as `nbconvert`).
2. Add a lightweight validation script (e.g., `tools/check_notebooks.py`) that:
   - Loads each target notebook.
   - Executes dependency-check cells.
   - Provides a summary of which sections were skipped due to missing packages.
3. Once dependencies are available, use `jupyter nbconvert --execute` (or `pytest --nbval`) in CI to ensure notebooks continue to run after future changes.
4. Document environment setup steps in `SETUP.md` (link the new requirements file and note GPU prerequisites).

## Session Updates (2025-11-03)
- Installed CPU-side dependencies via `requirements-notebooks.txt` (`numpy`, `numba`, `torch`, `nbformat`, `nbconvert`).
- Created `tools/check_notebooks.py` to summarize import availability and optionally execute notebooks with `nbconvert`.
- `cupy-cuda11x` remains optional for GPU-enabled environments; document manual install steps when CUDA drivers are present.
- Successful execution run (`python3 tools/check_notebooks.py --optional cupy --execute`) saves executed notebooks under `.nbexec-cache/`. The multiprocessing demo in `hard/10` emits pickling warnings when run headless; wrapping the ProcessPool example in an `if __name__ == "__main__":` guard would eliminate the message on future revisions.
- Added automated tests (`pytest --cov=tools.check_notebooks --cov-report=term-missing`) delivering 100% statement coverage for `tools/check_notebooks.py`, with real notebook execution simulated via stubbed `nbconvert` calls for sandbox compatibility.
- Implemented Playwright BFS crawler test (`tests/test_site_navigation.py`). The test auto-builds the book (`jupyter-book build .`) and skips gracefully if browsers cannot launch in the current environment. Install browsers with `/Users/myko/Library/Python/3.9/bin/playwright install chromium` (and optionally firefox/webkit) before running locally.
- For convenience, use `bash scripts/build_book.sh` to rebuild the site and `bash scripts/run_site_checks.sh` to install Playwright Chromium and execute the pytest suite with coverage.
- For a live browser demo that walks every page, run `bash scripts/playwright_showcase.sh`. Use `--delay` (seconds) or `--limit` to control pacing. Pass `--with-gif` to generate an accelerated animated GIF (`--gif-speed` controls the multiplier); otherwise only an `.mp4` video is saved.

## Session Updates (2025-11-04)
- Wrapped the ProcessPoolExecutor benchmarking cell in `hard/10_performance_computing.ipynb` with `if __name__ == "__main__":` to prevent additional processes from forking when the notebook runs under nbconvert or other automation.
- Re-validated the notebook dependency scan via `python3 tools/check_notebooks.py hard/10_performance_computing.ipynb --optional numba --optional torch --optional cupy` to confirm the guard does not change required modules.
- Extracted shared Playwright helpers into `tools/playwright_utils.py`, added canonical URL handling, and introduced explicit navigation timeouts so crawls bail out cleanly instead of hanging.
- Enhanced `tests/test_site_navigation.py` and `scripts/playwright_showcase.py` with structured logging (`--log-level` for the showcase, `--log-cli-level=INFO` wired through `scripts/run_site_checks.sh`) so long crawls emit steady progress instead of appearing stuck when run in CI.
- Updated `scripts/playwright_showcase.py` to prepend the project root to `sys.path`, letting `bash scripts/playwright_showcase.sh ...` work without manual `PYTHONPATH` tweaks.
- Added cancellation handling in `scripts/playwright_showcase.py` so Ctrl+C exits quietly after cleaning up Playwright resources.

## Outstanding Items
- Decide whether to vendor lightweight CPU fallbacks for NumPy-heavy sections or require contributors to install the scientific stack before running tests.
- Evaluate whether `cupy` should be optional for CI (mocked or skipped) to avoid GPU availability issues.
- Integrate notebook execution into the existing development workflow (Makefile target, `tox`, or GitHub Actions matrix with CPU/GPU labels).
