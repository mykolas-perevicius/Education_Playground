# Human To-Do

- Open the freshly built site (`_build/html/index.html`) in a browser to experience the guided paths, inline checkers, live consoles, and progress badges.
- Trigger a few inline exercises/live consoles and download the analytics JSON to confirm the exported schema looks good.
- Review the default guided path lesson lists in `_static/js/learning_tools.js` and tweak/add journeys that best match the curriculum goals.
- Investigate Playwright headless support if desired for CI: the current pytest crawl skips when Chromium cannot launch in this environment (see latest `run_site_checks.sh` output) — rerun locally to confirm once a headless-compatible browser is available.
