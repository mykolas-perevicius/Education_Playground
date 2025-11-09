/**
 * Education Playground - Advanced Learning Enhancements
 * - Guided curriculum paths
 * - Progress badges & sync
 * - Inline exercise checkers with Pyodide
 * - Interactive console snippets
 * - Analytics export
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'education_playground_progress';
    const ONBOARDING_KEY = 'education_playground_onboarded';
    const BADGE_CLASS = 'ep-progress-badge';
    const GUIDE_CARD_CLASS = 'ep-guided-card';
    const ANALYTICS_BUTTON_ID = 'ep-analytics-download';
    const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

    const GUIDED_PATHS = [
        {
            id: 'data-analyst',
            title: 'Data Analyst Jumpstart',
            icon: '📊',
            description: 'From beginner Python to practical data analysis in four weeks.',
            lessons: [
                'beginner_scripts/README.html',
                'easy/02_working_with_data.html',
                'medium/05_data_analysis_with_pandas.html',
                'hard/04_machine_learning_pipeline.html'
            ]
        },
        {
            id: 'ml-engineer',
            title: 'ML Engineer Sprint',
            icon: '🤖',
            description: 'Master essential ML concepts and deployment-ready notebooks.',
            lessons: [
                'easy/04_machine_learning_basics.html',
                'medium/04_machine_learning_basics.html',
                'hard/07_model_serving_and_monitoring.html',
                'hard/11_cuda_and_parallel_computing.html'
            ]
        },
        {
            id: 'python-pro',
            title: 'Python Pro Track',
            icon: '🐍',
            description: 'Level up from fundamentals to advanced Python mastery.',
            lessons: [
                'easy/01_introduction_to_python.html',
                'medium/01_functions_and_modules.html',
                'hard/02_generators_and_iterators.html',
                'hard/03_algorithms_and_complexity.html'
            ]
        }
    ];

    let basePath = '/';
    let pyodidePromise = null;

    function computeBasePath() {
        const docOptions = document.getElementById('documentation_options');
        if (docOptions) {
            const root = docOptions.getAttribute('data-url_root') || '/';
            const url = new URL(root, window.location.href);
            let path = url.pathname;
            if (!path.endsWith('/')) {
                path += '/';
            }
            return path;
        }
        const path = window.location.pathname;
        const idx = path.lastIndexOf('/');
        let base = idx >= 0 ? path.slice(0, idx + 1) : '/';
        if (!base.endsWith('/')) {
            base += '/';
        }
        return base || '/';
    }

    function buildDocUrl(relativePath = '') {
        const trimmedBase = basePath.replace(/\/+$/, '');
        const trimmedRelative = (relativePath || '').replace(/^\/+/, '');

        if (!trimmedRelative) {
            return trimmedBase ? `${trimmedBase}/` : '/';
        }

        if (!trimmedBase) {
            return `/${trimmedRelative}`;
        }

        return `${trimmedBase}/${trimmedRelative}`;
    }

    function normalizePath(path) {
        if (!path) return null;

        try {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                return new URL(path).pathname;
            }
        } catch (err) {
            // Ignore malformed URLs and fall back to relative handling
        }

        if (path.startsWith('/')) {
            return path;
        }

        return buildDocUrl(path)
            .replace(window.location.origin, '')
            .replace(/index\.html$/, '')
            .replace(/\/+$/, '/');
    }

    function loadProgress() {
        const raw = localStorage.getItem(STORAGE_KEY);
        let data;
        try {
            data = raw ? JSON.parse(raw) : {};
        } catch (err) {
            data = {};
        }
        const normalized = {
            level: data.level || null,
            guidedPath: data.guidedPath || null,
            guidedIndex: typeof data.guidedIndex === 'number' ? data.guidedIndex : 0,
            startedAt: data.startedAt || null,
            completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
            lastVisited: data.lastVisited || null
        };

        normalized.completedLessons = Array.from(
            new Set(
                normalized.completedLessons
                    .map(normalizePath)
                    .filter(Boolean)
            )
        );
        normalized.lastVisited = normalizePath(normalized.lastVisited);
        return normalized;
    }

    function saveProgress(progress) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(progress)
        );
    }

    function getCurrentPage() {
        return normalizePath(window.location.pathname);
    }

    function markLessonComplete(progress, lessonPath) {
        const normalized = normalizePath(lessonPath);
        if (!normalized) return false;
        if (!progress.completedLessons.includes(normalized)) {
            progress.completedLessons.push(normalized);
            saveProgress(progress);
            return true;
        }
        return false;
    }

    function setGuidedPath(progress, pathId) {
        progress.guidedPath = pathId;
        progress.guidedIndex = 0;
        if (!progress.startedAt) {
            progress.startedAt = new Date().toISOString();
        }
        saveProgress(progress);
    }

    function advanceGuidedPath(progress, lessonPath) {
        if (!progress.guidedPath) return;
        const path = GUIDED_PATHS.find((p) => p.id === progress.guidedPath);
        if (!path) return;
        const idx = path.lessons.map(normalizePath).indexOf(normalizePath(lessonPath));
        if (idx >= progress.guidedIndex) {
            progress.guidedIndex = idx + 1;
            saveProgress(progress);
        }
    }

    function renderProgressBadges(progress) {
        const links = document.querySelectorAll('.bd-sidenav a.reference.internal');
        links.forEach((link) => {
            if (link.classList.contains(BADGE_CLASS)) return;

            const href = link.getAttribute('href');
            const normalized = normalizePath(href);
            if (!normalized) return;

            if (progress.completedLessons.includes(normalized)) {
                link.classList.add(BADGE_CLASS);
                if (!link.querySelector('.ep-badge-pill')) {
                    const pill = document.createElement('span');
                    pill.className = 'ep-badge-pill';
                    pill.textContent = 'Completed';
                    link.appendChild(pill);
                }
            }
        });

        const header = document.querySelector('.bd-header__inner');
        if (header) {
            let summary = header.querySelector('.ep-progress-summary');
            const totalLessons = links.length;
            const completed = progress.completedLessons.length;
            if (!summary) {
                summary = document.createElement('div');
                summary.className = 'ep-progress-summary';
                header.appendChild(summary);
            }
            summary.textContent = `Progress: ${completed}/${totalLessons} lessons`;
        }
    }

    function createGuidedPanel(progress) {
        const sidebar = document.querySelector('.bd-sidebar-primary .bd-links');
        if (!sidebar || sidebar.querySelector('.ep-guided-panel')) return;

        const panel = document.createElement('div');
        panel.className = 'ep-guided-panel';
        panel.innerHTML = `
            <div class="ep-guided-header">
                <span class="ep-guided-title">Guided Paths</span>
                <button class="ep-guided-reset" type="button" aria-label="Reset guided path">Reset</button>
            </div>
            <div class="ep-guided-cards"></div>
        `;
        sidebar.prepend(panel);

        const cardsContainer = panel.querySelector('.ep-guided-cards');
        GUIDED_PATHS.forEach((path) => {
            const completedCount = progress.completedLessons.filter((lesson) =>
                path.lessons.map(normalizePath).includes(normalizePath(lesson))
            ).length;
            const card = document.createElement('button');
            card.type = 'button';
            card.className = GUIDE_CARD_CLASS;
            card.dataset.pathId = path.id;
            card.innerHTML = `
                <span class="ep-guided-icon">${path.icon}</span>
                <span class="ep-guided-info">
                    <strong>${path.title}</strong>
                    <span class="ep-guided-desc">${path.description}</span>
                    <span class="ep-guided-progress">${completedCount}/${path.lessons.length} lessons completed</span>
                </span>
            `;
            cardsContainer.appendChild(card);

            card.addEventListener('click', () => {
                setGuidedPath(progress, path.id);
                const target = path.lessons[0];
                if (target) {
                    window.location.href = buildDocUrl(target);
                }
            });
        });

        panel.querySelector('.ep-guided-reset').addEventListener('click', () => {
            progress.guidedPath = null;
            progress.guidedIndex = 0;
            saveProgress(progress);
            panel.querySelectorAll(`.${GUIDE_CARD_CLASS}`).forEach((card) => {
                card.classList.remove('active');
            });
        });

        if (progress.guidedPath) {
            const activeCard = panel.querySelector(`[data-path-id="${progress.guidedPath}"]`);
            if (activeCard) {
                activeCard.classList.add('active');
            }
        }
    }

    function setupMarkComplete(progress) {
        const header = document.querySelector('.bd-article-container h1');
        if (!header || document.querySelector('.ep-mark-complete')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ep-mark-complete';
        button.textContent = 'Mark Lesson Complete';
        header.insertAdjacentElement('afterend', button);

        button.addEventListener('click', () => {
            const current = getCurrentPage();
            const updated = markLessonComplete(progress, current);
            if (updated) {
                advanceGuidedPath(progress, current);
                renderProgressBadges(progress);
                button.classList.add('ep-marked');
                button.textContent = 'Completed ✓';
            }
        });
    }

    async function ensurePyodide() {
        if (window.pyodide) {
            return window.pyodide;
        }
        if (pyodidePromise) {
            return pyodidePromise;
        }
        pyodidePromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = PYODIDE_URL;
            script.async = true;
            script.onload = async () => {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
                    });
                    resolve(pyodide);
                } catch (err) {
                    reject(err);
                }
            };
            script.onerror = (err) => {
                reject(err);
            };
            document.head.appendChild(script);
        });
        return pyodidePromise;
    }

    function createOutputElement() {
        const output = document.createElement('div');
        output.className = 'ep-console-output';
        return output;
    }

    async function runPython(code, outputEl) {
        try {
            const pyodide = await ensurePyodide();
            const result = await pyodide.runPythonAsync(code);
            if (typeof result === 'undefined' || result === null) {
                outputEl.textContent = '✓ Execution finished.';
            } else {
                outputEl.textContent = String(result);
            }
            outputEl.dataset.state = 'success';
            return true;
        } catch (err) {
            outputEl.textContent = `Error: ${err}`;
            outputEl.dataset.state = 'error';
            return false;
        }
    }

    function setupLiveConsoles(progress) {
        const consoles = document.querySelectorAll('[data-live-console]');
        consoles.forEach((container) => {
            if (container.classList.contains('ep-console-ready')) return;
            container.classList.add('ep-console-ready');

            const defaultCode = container.textContent.trim();
            container.textContent = '';

            const textarea = document.createElement('textarea');
            textarea.className = 'ep-console-input';
            textarea.value = defaultCode;

            const actions = document.createElement('div');
            actions.className = 'ep-console-actions';

            const runBtn = document.createElement('button');
            runBtn.type = 'button';
            runBtn.className = 'ep-console-run';
            runBtn.textContent = 'Run Code';

            const resetBtn = document.createElement('button');
            resetBtn.type = 'button';
            resetBtn.className = 'ep-console-reset';
            resetBtn.textContent = 'Reset';

            const output = createOutputElement();

            actions.appendChild(runBtn);
            actions.appendChild(resetBtn);
            container.appendChild(textarea);
            container.appendChild(actions);
            container.appendChild(output);

            runBtn.addEventListener('click', async () => {
                output.textContent = 'Running...';
                output.dataset.state = 'pending';
                const success = await runPython(textarea.value, output);
                if (success) {
                    const current = getCurrentPage();
                    if (markLessonComplete(progress, current)) {
                        advanceGuidedPath(progress, current);
                    }
                    renderProgressBadges(progress);
                }
            });

            resetBtn.addEventListener('click', () => {
                textarea.value = defaultCode;
                output.textContent = '';
                output.dataset.state = '';
            });
        });
    }

    function parseExpectation(block) {
        const raw = block.getAttribute('data-expected');
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (err) {
            return null;
        }
    }

    function setupInlineCheckers(progress) {
        const blocks = document.querySelectorAll('[data-inline-checker]');
        blocks.forEach((block) => {
            if (block.classList.contains('ep-checker-ready')) return;
            block.classList.add('ep-checker-ready');

            const expectation = parseExpectation(block);
            const code = block.textContent.trim();
            block.textContent = '';

            const editor = document.createElement('textarea');
            editor.className = 'ep-checker-input';
            editor.value = code;

            const actions = document.createElement('div');
            actions.className = 'ep-checker-actions';

            const checkBtn = document.createElement('button');
            checkBtn.type = 'button';
            checkBtn.className = 'ep-checker-run';
            checkBtn.textContent = 'Run Check';

            const output = document.createElement('div');
            output.className = 'ep-checker-output';

            actions.appendChild(checkBtn);
            block.appendChild(editor);
            block.appendChild(actions);
            block.appendChild(output);

            const matchesExpectation = (value) => {
                if (!expectation) return true;
                if (expectation.equals !== undefined) {
                    return String(value).trim() === String(expectation.equals).trim();
                }
                if (expectation.contains !== undefined) {
                    return String(value).includes(expectation.contains);
                }
                if (expectation.regex !== undefined) {
                    try {
                        return new RegExp(expectation.regex).test(String(value));
                    } catch (err) {
                        return false;
                    }
                }
                return true;
            };

            checkBtn.addEventListener('click', async () => {
                output.textContent = 'Checking...';
                output.dataset.state = 'pending';
                const pySuccess = await runPython(editor.value, output);
                if (pySuccess && matchesExpectation(output.textContent)) {
                    output.dataset.state = 'success';
                    output.textContent = '✅ Great job! Exercise passed.';
                    const current = getCurrentPage();
                    if (markLessonComplete(progress, current)) {
                        advanceGuidedPath(progress, current);
                    }
                    renderProgressBadges(progress);
                } else if (pySuccess) {
                    output.dataset.state = 'warning';
                    output.textContent = '⚠️ Output did not match the expectation. Adjust and try again.';
                }
            });
        });
    }

    function setupAnalytics(progress) {
        if (document.getElementById(ANALYTICS_BUTTON_ID)) return;

        const footer = document.querySelector('.bd-footer') || document.body;
        const button = document.createElement('button');
        button.type = 'button';
        button.id = ANALYTICS_BUTTON_ID;
        button.className = 'ep-analytics-button';
        button.textContent = 'Download Learning Analytics';

        button.addEventListener('click', () => {
            const timestamp = new Date().toISOString();
            const payload = {
                generatedAt: timestamp,
                progress,
                guidedPaths: GUIDED_PATHS.map((path) => ({
                    id: path.id,
                    title: path.title,
                    totalLessons: path.lessons.length,
                    completed: path.lessons
                        .map(normalizePath)
                        .filter((lesson) => progress.completedLessons.includes(lesson)).length
                }))
            };

            const blob = new Blob([JSON.stringify(payload, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `education-playground-analytics-${timestamp}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });

        footer.appendChild(button);
    }

    function init() {
        basePath = computeBasePath();
        const progress = loadProgress();
        const current = getCurrentPage();
        if (current) {
            progress.lastVisited = current;
            saveProgress(progress);
        }

        renderProgressBadges(progress);
        createGuidedPanel(progress);
        setupMarkComplete(progress);
        setupLiveConsoles(progress);
        setupInlineCheckers(progress);
        setupAnalytics(progress);

        window.EducationPlayground = window.EducationPlayground || {};
        window.EducationPlayground.progress = progress;
        window.EducationPlayground.refreshProgressUI = () => {
            const latest = loadProgress();
            renderProgressBadges(latest);
            createGuidedPanel(latest);
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
