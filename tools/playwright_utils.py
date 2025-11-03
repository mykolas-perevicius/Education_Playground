#!/usr/bin/env python3
"""Shared helpers for Playwright-driven Education Playground crawls."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Optional, Set
from urllib.parse import urldefrag, urljoin, urlparse

import yaml

LOGGER = logging.getLogger(__name__)


def load_expected_paths(toc_path: Path, *, suffix: str = ".html") -> Set[str]:
    """Return the set of HTML outputs defined in a Jupyter Book _toc.yml file."""
    data = yaml.safe_load(toc_path.read_text())
    expected: Set[str] = set()

    def add_entry(entry) -> None:
        file_ref = entry.get("file")
        if file_ref:
            expected.add(f"{file_ref}{suffix}")
        for section in entry.get("sections", []) or []:
            add_entry(section)

    add_entry({"file": data.get("root", "README")})
    for chapter in data.get("chapters", []):
        add_entry(chapter)
    return expected


def canonicalize_relative(relative: str, *, home_page: str) -> Optional[str]:
    """Normalise a relative path into our canonical `.html` representation."""
    parsed = urlparse(relative)
    path = parsed.path or ""

    if parsed.query:
        LOGGER.debug("Dropping query string '%s' from %s", parsed.query, relative)

    if path.startswith("/"):
        path = path[1:]

    if not path or path == ".":
        path = home_page

    if path.endswith("/"):
        path = f"{path}index.html"

    if not path.endswith(".html"):
        return None

    return path


def normalize_internal_href(base_url: str, href: str, *, home_page: str) -> Optional[str]:
    """Return a canonical relative path for internal links, or None when external."""
    if not href or href.startswith(("mailto:", "javascript:", "#")):
        return None

    absolute = urljoin(base_url, href)
    absolute, _ = urldefrag(absolute)

    if not absolute.startswith(base_url):
        return None

    relative = absolute[len(base_url) :]
    return canonicalize_relative(relative, home_page=home_page)
