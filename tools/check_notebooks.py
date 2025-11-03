#!/usr/bin/env python3
"""Utility to inspect and optionally execute Education Playground notebooks."""

from __future__ import annotations

import argparse
import ast
import importlib
import json
import logging
import subprocess
import sys
from pathlib import Path
from typing import Iterable, List, Set, Tuple


DEFAULT_NOTEBOOKS = [
    Path("hard/10_performance_computing.ipynb"),
    Path("hard/11_cuda_and_parallel_computing.ipynb"),
]


def collect_imports(nb_path: Path) -> Set[str]:
    """Return the set of top-level modules imported in the notebook."""
    raw = json.loads(nb_path.read_text())
    modules: Set[str] = set()

    for cell in raw.get("cells", []):
        if cell.get("cell_type") != "code":
            continue
        source = "".join(cell.get("source", []))
        try:
            tree = ast.parse(source)
        except SyntaxError:
            # Skip cells that are intentionally incomplete (e.g., exercise stubs)
            continue

        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    modules.add(alias.name.split(".", maxsplit=1)[0])
            elif isinstance(node, ast.ImportFrom) and node.module:
                modules.add(node.module.split(".", maxsplit=1)[0])

    return modules


def check_modules(modules: Iterable[str]) -> List[Tuple[str, bool, str]]:
    """Attempt to import each module, returning status and error detail."""
    results: List[Tuple[str, bool, str]] = []
    for name in sorted(set(modules)):
        try:
            importlib.import_module(name)
        except Exception as exc:  # pragma: no cover - defensive reporting
            results.append((name, False, f"{exc.__class__.__name__}: {exc}"))
        else:
            results.append((name, True, "ok"))
    return results


def execute_notebook(nb_path: Path, timeout: int) -> int:
    """Execute notebook via nbconvert; returns subprocess return code."""
    cache_dir = Path(".nbexec-cache")
    cache_dir.mkdir(exist_ok=True)
    output_name = nb_path.with_suffix("").name + "__executed.ipynb"
    logging.getLogger(__name__).debug(
        "Executing notebook %s (timeout=%s)", nb_path, timeout
    )
    cmd = [
        sys.executable,
        "-m",
        "nbconvert",
        "--execute",
        "--ExecutePreprocessor.allow_errors=True",
        "--to",
        "notebook",
        "--output",
        output_name,
        "--output-dir",
        str(cache_dir),
        str(nb_path),
    ]
    try:
        proc = subprocess.run(
            cmd,
            timeout=timeout,
            check=False,
            capture_output=True,
            text=True,
        )
    except subprocess.TimeoutExpired as exc:  # pragma: no cover - defensive
        logging.getLogger(__name__).error("Execution timed out: %s", exc)
        raise

    logger = logging.getLogger(__name__)
    if proc.stdout:
        logger.debug("nbconvert stdout for %s:\n%s", nb_path, proc.stdout.rstrip())
    if proc.stderr:
        logger.warning("nbconvert stderr for %s:\n%s", nb_path, proc.stderr.rstrip())

    return proc.returncode


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "notebooks",
        nargs="*",
        type=Path,
        default=DEFAULT_NOTEBOOKS,
        help="Notebook paths to inspect (defaults to key hard-track notebooks).",
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Execute notebooks via nbconvert after dependency checks.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=600,
        help="Execution timeout per notebook in seconds (when using --execute).",
    )
    parser.add_argument(
        "--optional",
        action="append",
        default=[],
        help="Module names to treat as optional (missing entries will not block execution).",
    )
    parser.add_argument(
        "--log-level",
        default="INFO",
        choices=["CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"],
        help="Logging verbosity (default: INFO).",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="%(levelname)s %(message)s",
    )
    logger = logging.getLogger(__name__)

    exit_code = 0
    for nb_path in args.notebooks:
        if not nb_path.exists():
            logger.error("%s not found", nb_path)
            exit_code = 1
            continue

        logger.info("Notebook: %s", nb_path)
        modules = collect_imports(nb_path)
        optional = set(args.optional)
        results = check_modules(modules)

        missing = [
            name for name, ok, _ in results if not ok and name not in optional
        ]
        if results:
            logger.info("Dependency check:")
            for name, ok, detail in results:
                status = "OK"
                if not ok:
                    status = "OPTIONAL" if name in optional else "MISSING"
                logger.info("  - %-12s %s (%s)", name, status, detail)
        else:
            logger.info("No imports detected.")

        if missing:
            logger.warning(
                "Skipping execution because required modules are missing: %s",
                ", ".join(missing),
            )
            exit_code = 1
            continue

        if args.execute:
            logger.info("Executing notebook...")
            try:
                rc = execute_notebook(nb_path, timeout=args.timeout)
            except subprocess.TimeoutExpired:
                logger.error("Execution timed out.")
                exit_code = 1
            else:
                if rc == 0:
                    logger.info("Execution succeeded.")
                else:
                    logger.error("Execution failed with exit code %s.", rc)
                    exit_code = 1

    return exit_code


if __name__ == "__main__":  # pragma: no cover - entry point exercised via CLI
    raise SystemExit(main())
