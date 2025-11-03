import asyncio
import contextlib
import logging
import shutil
import subprocess
import sys
from collections import deque
from pathlib import Path

import pytest
from playwright.async_api import Error, async_playwright

from tools.playwright_utils import load_expected_paths, normalize_internal_href


PROJECT_ROOT = Path(__file__).resolve().parents[1]
TOC_PATH = PROJECT_ROOT / "_toc.yml"
DOCS_ROOT = PROJECT_ROOT / "_build" / "html"
BASE_URL = DOCS_ROOT.resolve().as_uri().rstrip("/") + "/"
HOME_PAGE = "README.html"
NAV_TIMEOUT_MS = 15_000
MAX_EXTRA_PAGES = 25

LOGGER = logging.getLogger(__name__)
LOGGER.addHandler(logging.NullHandler())


def _ensure_html_build() -> None:
    if DOCS_ROOT.exists():
        return

    LOGGER.info("HTML build not found; running `jupyter-book build .`")
    jb_bin = shutil.which("jupyter-book")
    if not jb_bin:
        candidates = [
            Path(sys.executable).with_name("jupyter-book"),
            Path.home() / "Library" / "Python" / f"{sys.version_info.major}.{sys.version_info.minor}" / "bin" / "jupyter-book",
        ]
        for candidate in candidates:
            if candidate.exists():
                jb_bin = str(candidate)
                break
    if not jb_bin:
        raise RuntimeError("jupyter-book CLI not found on PATH")

    subprocess.run([jb_bin, "build", "."], check=True, cwd=PROJECT_ROOT)


async def _launch_browser(playwright):
    errors = []
    for launcher, name in (
        (playwright.chromium, "Chromium"),
        (playwright.firefox, "Firefox"),
        (playwright.webkit, "WebKit"),
    ):
        try:
            LOGGER.debug("Attempting to launch %s", name)
            browser = await launcher.launch(headless=True)
            return browser, None
        except Error as exc:  # pragma: no cover - depends on environment capabilities
            LOGGER.warning("Failed to launch %s: %s", name, exc)
            errors.append(f"{name}: {exc}")
    return None, "; ".join(errors)


async def _crawl_site(expected_pages):
    _ensure_html_build()

    async with async_playwright() as p:
        browser, err = await _launch_browser(p)
        if not browser:
            return None, err

        context = await browser.new_context()
        page = await context.new_page()
        page.set_default_navigation_timeout(NAV_TIMEOUT_MS)
        page.set_default_timeout(NAV_TIMEOUT_MS)

        visited = set()
        queue = deque([HOME_PAGE])
        max_pages = len(expected_pages) + MAX_EXTRA_PAGES

        try:
            while queue:
                rel_path = queue.popleft()
                if rel_path in visited:
                    continue

                target_url = f"{BASE_URL}{rel_path}"
                LOGGER.info("Visiting %s (%d/%d)", rel_path, len(visited) + 1, len(expected_pages))
                await page.goto(target_url)
                visited.add(rel_path)

                anchors = await page.locator("a[href]").all()
                for anchor in anchors:
                    href = await anchor.get_attribute("href")
                    candidate = normalize_internal_href(BASE_URL, href, home_page=HOME_PAGE)
                    if not candidate:
                        continue
                    if candidate in visited or candidate in queue:
                        continue
                    queue.append(candidate)

                if expected_pages.issubset(visited):
                    LOGGER.info("Reached all expected pages; stopping crawl.")
                    break

                if len(visited) > max_pages:
                    LOGGER.warning(
                        "Visited %d pages, exceeding the allowed %d (expected %d). Aborting crawl.",
                        len(visited),
                        max_pages,
                        len(expected_pages),
                    )
                    break
        finally:
            with contextlib.suppress(Exception):
                await page.close()
            with contextlib.suppress(Exception):
                await context.close()
            with contextlib.suppress(Exception):
                await browser.close()

    return visited, None


def test_site_navigation_bfs(caplog):
    caplog.set_level(logging.INFO)
    expected = load_expected_paths(TOC_PATH)

    visited, err = asyncio.run(_crawl_site(expected))
    if visited is None:
        pytest.skip(f"Playwright browser launch failed: {err}")

    missing = sorted(expected - visited)
    assert not missing, f"Missing pages during crawl: {missing}"
