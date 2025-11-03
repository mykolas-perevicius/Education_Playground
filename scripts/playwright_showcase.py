#!/usr/bin/env python3
"""Interactive Playwright walkthrough of the Education Playground site."""

from __future__ import annotations

import argparse
import asyncio
import contextlib
import logging
import shutil
import sys
import tempfile
from collections import deque
from pathlib import Path
from typing import Deque, Set

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from playwright.async_api import Browser, Page, async_playwright

from tools.playwright_utils import load_expected_paths, normalize_internal_href

ARTIFACTS_DIR = PROJECT_ROOT / "artifacts" / "showcase"
ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

TOC_PATH = PROJECT_ROOT / "_toc.yml"
DOCS_ROOT = PROJECT_ROOT / "_build" / "html"
BASE_URL = DOCS_ROOT.resolve().as_uri().rstrip("/") + "/"
HOME_PAGE = "README.html"

LOGGER = logging.getLogger("education_playground.playwright.showcase")


async def perform_interactions(page: Page, base_delay: float, enabled: bool) -> None:
    if not enabled:
        return

    try:
        await page.evaluate(
            """
            () => {
                try {
                    localStorage.setItem('education_playground_onboarded', 'true');
                    const existing = localStorage.getItem('education_playground_progress');
                    if (!existing) {
                        localStorage.setItem('education_playground_progress', JSON.stringify({
                            level: 'auto',
                            completedLessons: [],
                            lastVisited: null,
                            startedAt: new Date().toISOString()
                        }));
                    }
                    const modal = document.getElementById('onboarding-modal');
                    if (modal) modal.remove();
                    document.body.classList.remove('modal-open');
                } catch (err) {}
            }
            """
        )
    except Exception:
        pass

    async def try_click(selector: str, description: str, pause: float = 0.2):
        try:
            locator = page.locator(selector).first
            if await locator.count():
                LOGGER.debug("Interacting with %s", description)
                await locator.click()
                await page.wait_for_timeout(int(pause * 1000))
                return True
        except Exception:
            pass
        return False

    opened_sidebar = await try_click("label.primary-toggle", "sidebar toggle")
    if opened_sidebar:
        await try_click("label.primary-toggle", "sidebar toggle", pause=0.1)

    await try_click(".mark-complete-btn:not(.completed)", "mark-complete button", pause=0.15)

    opened_quick_nav = await try_click(".quick-nav-btn", "quick-nav button")
    if opened_quick_nav:
        await try_click(".quick-nav-btn", "quick-nav button", pause=0.1)

    try:
        await page.wait_for_timeout(int(min(base_delay, 0.4) * 1000))
    except Exception:
        pass


async def launch_browser(playwright) -> tuple[Browser, str]:
    errors = []
    for launcher, name in (
        (playwright.chromium, "Chromium"),
        (playwright.firefox, "Firefox"),
        (playwright.webkit, "WebKit"),
    ):
        try:
            LOGGER.debug("Attempting to launch %s", name)
            browser = await launcher.launch(headless=False)
            return browser, name
        except Exception as exc:
            LOGGER.warning("Failed to launch %s: %s", name, exc)
            errors.append(f"{name}: {exc}")
    raise RuntimeError("Unable to launch a Playwright browser:\n" + "\n".join(errors))


async def play_showcase(
    delay: float,
    limit: int | None,
    interactions: bool,
    video_out: Path | None,
    gif_out: Path | None,
    gif_speed: float,
) -> None:
    if not DOCS_ROOT.exists():
        raise FileNotFoundError(
            f"Built site not found at {DOCS_ROOT}. Run `bash scripts/build_book.sh` first."
        )

    visited: Set[str] = set()
    queue: Deque[str] = deque([HOME_PAGE])
    expected = load_expected_paths(TOC_PATH)
    total_expected = len(expected)
    max_pages = total_expected + 25

    LOGGER.info("Expecting %s pages from _toc.yml", total_expected)

    frame_paths: list[Path] = []
    gif_frames_dir: Path | None = None
    if gif_out:
        gif_frames_dir = ARTIFACTS_DIR / "frames"
        if gif_frames_dir.exists():
            shutil.rmtree(gif_frames_dir)
        gif_frames_dir.mkdir(parents=True, exist_ok=True)

    recorded_video: Path | None = None

    try:
        async with async_playwright() as p:
            browser, browser_name = await launch_browser(p)
            context_kwargs = {"viewport": {"width": 1280, "height": 720}}

        video_temp_dir: Path | None = None
        if video_out:
            video_temp_dir = Path(tempfile.mkdtemp(prefix="playwright-video-", dir=ARTIFACTS_DIR))
            context_kwargs["record_video_dir"] = str(video_temp_dir)
            context_kwargs["record_video_size"] = {"width": 1280, "height": 720}

        context = await browser.new_context(**context_kwargs)
        page = await context.new_page()
        page.set_default_navigation_timeout(15_000)
        page.set_default_timeout(15_000)

        try:
            step = 0
            while queue:
                rel_path = queue.popleft()
                if rel_path in visited:
                    continue

                step += 1
                url = f"{BASE_URL}{rel_path}"
                LOGGER.info("[%s] Visiting %s (%s)", step, rel_path, browser_name)

                await page.goto(url)
                await page.evaluate(
                    """
                    (label) => {
                        if (!window.__playwrightOverlay) {
                            const el = document.createElement('div');
                            el.style.position = 'fixed';
                            el.style.top = '16px';
                            el.style.left = '50%';
                            el.style.transform = 'translateX(-50%)';
                            el.style.zIndex = '9999';
                            el.style.background = 'rgba(76, 175, 80, 0.9)';
                            el.style.color = '#fff';
                            el.style.padding = '10px 18px';
                            el.style.borderRadius = '999px';
                            el.style.fontFamily = 'system-ui, sans-serif';
                            el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
                            el.style.pointerEvents = 'none';
                            document.body.appendChild(el);
                            window.__playwrightOverlay = el;
                        }
                        window.__playwrightOverlay.textContent = `▶ ${label}`;
                    }
                    """,
                    rel_path,
                )

                await perform_interactions(page, delay, interactions)

                if gif_frames_dir:
                    safe_name = rel_path.replace("/", "_")
                    frame_path = gif_frames_dir / f"{step:03d}_{safe_name}.png"
                    await page.screenshot(path=str(frame_path), full_page=True)
                    frame_paths.append(frame_path)

                await page.wait_for_load_state("networkidle")
                with contextlib.suppress(Exception):
                    await page.wait_for_timeout(int(delay * 1000))

                anchors = await page.locator("a[href]").all()
                for anchor in anchors:
                    href = await anchor.get_attribute("href")
                    candidate = normalize_internal_href(BASE_URL, href, home_page=HOME_PAGE)
                    if not candidate:
                        continue
                    if candidate in visited or candidate in queue:
                        continue
                    queue.append(candidate)

                visited.add(rel_path)

                if expected.issubset(visited):
                    LOGGER.info("Reached all %s pages listed in _toc.yml; stopping crawl.", total_expected)
                    break

                if limit is not None and step >= limit:
                    break

                if len(visited) > max_pages:
                    LOGGER.warning(
                        "Visited %s pages, exceeding the allowed %s (expected %s). Aborting crawl.",
                        len(visited),
                        max_pages,
                        total_expected,
                    )
                    break

            missing = sorted(expected - visited)
            if missing:
                LOGGER.warning("Missing pages from crawl:")
                for item in missing:
                    LOGGER.warning("  - %s", item)
            else:
                LOGGER.info("Reached every page listed in _toc.yml!")

            with contextlib.suppress(Exception):
                await page.wait_for_timeout(2000)
        finally:
            recorded_video: Path | None = None
            if video_out:
                try:
                    await page.close()
                    if page.video:
                        video_path = await page.video.path()
                        video_out.parent.mkdir(parents=True, exist_ok=True)
                        shutil.move(video_path, video_out)
                        recorded_video = video_out
                        LOGGER.info("Video saved to %s", video_out)
                    if video_temp_dir and video_temp_dir.exists():
                        shutil.rmtree(video_temp_dir)
                except Exception as exc:
                    LOGGER.warning("Unable to finalize video: %s", exc)

            with contextlib.suppress(Exception):
                await context.close()
            with contextlib.suppress(Exception):
                await browser.close()

    except asyncio.CancelledError:
        LOGGER.info("Showcase cancelled; cleaning up.")
        raise

    if gif_out and frame_paths and recorded_video is None:
        try:
            import imageio.v3 as imageio_v3

            gif_out.parent.mkdir(parents=True, exist_ok=True)
            frames = [imageio_v3.imread(frame) for frame in frame_paths]
            duration = max(delay / gif_speed, 0.02)
            imageio_v3.imwrite(gif_out, frames, loop=0, duration=duration)
            LOGGER.info("GIF saved to %s", gif_out)
        except ImportError:
            LOGGER.warning("Install `imageio` to enable GIF rendering (`pip install imageio`).")
        except Exception as exc:
            LOGGER.warning("Unable to render GIF: %s", exc)


def parse_path(value: str | None) -> Path | None:
    if value is None:
        return None
    return Path(value).expanduser().resolve()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--delay",
        type=float,
        default=1.5,
        help="Seconds to pause on each page (default: 1.5).",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Maximum number of pages to visit (default: entire site).",
    )
    parser.add_argument(
        "--no-interactions",
        action="store_true",
        help="Disable extra button/sidebar interactions; just navigate links.",
    )
    parser.add_argument(
        "--video-out",
        type=parse_path,
        default=None,
        help="Optional path to save a recorded video.",
    )
    parser.add_argument(
        "--gif-out",
        type=parse_path,
        default=None,
        help="Optional path to save an animated GIF composed of page screenshots.",
    )
    parser.add_argument(
        "--gif-speed",
        type=float,
        default=3.0,
        help="Speed multiplier for GIF playback (default: 3.0 = ~3x faster than delay).",
    )
    parser.add_argument(
        "--log-level",
        default="INFO",
        choices=["CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"],
        help="Logging verbosity (default: INFO).",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level.upper()),
        format="%(levelname)s %(message)s",
    )

    try:
        asyncio.run(
            play_showcase(
                delay=args.delay,
                limit=args.limit,
                interactions=not args.no_interactions,
                video_out=args.video_out,
                gif_out=args.gif_out,
                gif_speed=max(args.gif_speed, 0.1),
            )
        )
    except KeyboardInterrupt:
        LOGGER.info("Showcase interrupted by user.")
    except RuntimeError as exc:
        LOGGER.error("%s", exc)
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
