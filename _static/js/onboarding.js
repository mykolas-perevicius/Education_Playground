/**
 * Education Playground - Interactive Onboarding System
 * Provides a frictionless "just start" experience
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        STORAGE_KEY: 'education_playground_progress',
        ONBOARDING_KEY: 'education_playground_onboarded',
        PATHS: {
            beginner: 'beginner_scripts/README.html',
            easy: 'easy/01_introduction_to_python.html',
            calibration: '00_calibration_test.html',
            medium: 'medium/01_functions_and_modules.html',
            hard: 'hard/01_advanced_functions_and_decorators.html'
        },
        COLAB_BASE: 'https://colab.research.google.com/github/mykolas-perevicius/Education_Playground/blob/main/'
    };

    let basePath = '/';

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

        return buildDocUrl(path);
    }

    // Progress tracking
    class ProgressTracker {
        constructor() {
            this.data = this.load();
        }

        load() {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            const data = stored ? JSON.parse(stored) : {
                level: null,
                completedLessons: [],
                lastVisited: null,
                startedAt: null
            };
            return this.normalizeData(data);
        }

        normalizeData(data) {
            const normalized = { ...data };

            normalized.lastVisited = normalizePath(normalized.lastVisited);

            if (Array.isArray(normalized.completedLessons)) {
                const lessons = normalized.completedLessons
                    .map(normalizePath)
                    .filter(Boolean);
                normalized.completedLessons = Array.from(new Set(lessons));
            } else {
                normalized.completedLessons = [];
            }

            return normalized;
        }

        save() {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.data));
        }

        setLevel(level) {
            this.data.level = level;
            if (!this.data.startedAt) {
                this.data.startedAt = new Date().toISOString();
            }
            this.save();
        }

        markLessonComplete(lessonPath) {
            const normalized = normalizePath(lessonPath);
            if (!normalized) return;

            if (!this.data.completedLessons.includes(normalized)) {
                this.data.completedLessons.push(normalized);
                this.save();
            }
        }

        setLastVisited(path) {
            this.data.lastVisited = normalizePath(path);
            this.save();
        }

        getProgress() {
            return this.data;
        }

        hasOnboarded() {
            return localStorage.getItem(CONFIG.ONBOARDING_KEY) === 'true';
        }

        setOnboarded() {
            localStorage.setItem(CONFIG.ONBOARDING_KEY, 'true');
        }

        reset() {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            localStorage.removeItem(CONFIG.ONBOARDING_KEY);
            this.data = this.load();
        }
    }

    // Onboarding Modal
    class OnboardingModal {
        constructor(tracker) {
            this.tracker = tracker;
            this.currentStep = 1;
            this.userChoice = {};
        }

        show() {
            // Don't show if already onboarded (can be overridden with ?onboard=true)
            const urlParams = new URLSearchParams(window.location.search);
            if (this.tracker.hasOnboarded() && !urlParams.get('onboard')) {
                return;
            }

            this.createModal();
            this.showStep1();
        }

        createModal() {
            const modal = document.createElement('div');
            modal.id = 'onboarding-modal';
            modal.className = 'onboarding-modal';
            modal.innerHTML = `
                <div class="onboarding-overlay"></div>
                <div class="onboarding-content">
                    <button class="onboarding-close" aria-label="Close">&times;</button>
                    <div class="onboarding-body"></div>
                </div>
            `;
            document.body.appendChild(modal);

            // Close button
            modal.querySelector('.onboarding-close').addEventListener('click', () => {
                this.close();
            });

            // Close on overlay click
            modal.querySelector('.onboarding-overlay').addEventListener('click', () => {
                this.close();
            });
        }

        showStep1() {
            const body = document.querySelector('.onboarding-body');
            body.innerHTML = `
                <div class="onboarding-step step-1">
                    <h2>👋 Welcome to Education Playground!</h2>
                    <p class="subtitle">Let's find your perfect starting point (30 seconds)</p>

                    <div class="question-container">
                        <h3>Have you programmed before?</h3>

                        <div class="choice-cards">
                            <button class="choice-card" data-choice="never">
                                <div class="choice-icon">🌱</div>
                                <div class="choice-title">Never</div>
                                <div class="choice-desc">I've never written code</div>
                            </button>

                            <button class="choice-card" data-choice="little">
                                <div class="choice-icon">💪</div>
                                <div class="choice-title">A Little</div>
                                <div class="choice-desc">I know some basics</div>
                            </button>

                            <button class="choice-card" data-choice="yes">
                                <div class="choice-icon">🚀</div>
                                <div class="choice-title">Yes!</div>
                                <div class="choice-desc">I'm experienced</div>
                            </button>
                        </div>
                    </div>

                    <div class="skip-link">
                        <a href="#" id="skip-onboarding">Skip this and browse on my own</a>
                    </div>
                </div>
            `;

            // Add event listeners
            document.querySelectorAll('.choice-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const choice = e.currentTarget.dataset.choice;
                    this.userChoice.experience = choice;
                    this.handleExperienceChoice(choice);
                });
            });

            document.getElementById('skip-onboarding').addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });

            // Show modal
            document.getElementById('onboarding-modal').classList.add('show');
        }

        handleExperienceChoice(choice) {
            switch(choice) {
                case 'never':
                    this.showFinalStep('beginner', {
                        title: 'Perfect! Let\'s Start Simple',
                        icon: '🌱',
                        description: 'You\'ll begin with Beginner Scripts - 10 simple lessons designed for absolute beginners.',
                        action: 'Start Lesson 1',
                        path: CONFIG.PATHS.beginner,
                        colabPath: 'beginner_scripts/1_hello_world.py',
                        time: '~3-5 hours total',
                        showColab: false // Scripts don't use Colab
                    });
                    break;
                case 'little':
                    this.showStep2();
                    break;
                case 'yes':
                    this.showFinalStep('advanced', {
                        title: 'Great! Choose Your Interest',
                        icon: '🚀',
                        description: 'Jump straight into advanced topics:',
                        options: [
                            { label: 'AI & Machine Learning', path: 'hard/04_deep_learning_and_neural_networks.html', icon: '🤖' },
                            { label: 'GPU & CUDA Computing', path: 'hard/11_cuda_and_parallel_computing.html', icon: '🎮' },
                            { label: 'Algorithms & Interview Prep', path: 'hard/08_classic_problems.html', icon: '🧩' },
                            { label: 'CTF & Security', path: 'hard/09_ctf_challenges.html', icon: '🚩' }
                        ]
                    });
                    break;
            }
        }

        showStep2() {
            const body = document.querySelector('.onboarding-body');
            body.innerHTML = `
                <div class="onboarding-step step-2">
                    <button class="back-button" aria-label="Go back">← Back</button>
                    <h2>🎯 Find Your Level</h2>
                    <p class="subtitle">Which describes you best?</p>

                    <div class="question-container">
                        <div class="choice-cards vertical">
                            <button class="choice-card wide" data-choice="basic">
                                <div class="choice-icon">📗</div>
                                <div class="choice-content">
                                    <div class="choice-title">I know very basic programming</div>
                                    <div class="choice-desc">Variables, basic loops, maybe some functions</div>
                                </div>
                            </button>

                            <button class="choice-card wide" data-choice="intermediate">
                                <div class="choice-icon">📘</div>
                                <div class="choice-content">
                                    <div class="choice-title">I'm comfortable with programming</div>
                                    <div class="choice-desc">OOP, data structures, built projects before</div>
                                </div>
                            </button>

                            <button class="choice-card wide" data-choice="test">
                                <div class="choice-icon">🎯</div>
                                <div class="choice-content">
                                    <div class="choice-title">Not sure - let me take a quick test</div>
                                    <div class="choice-desc">5-minute assessment to find the perfect level</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.querySelector('.back-button').addEventListener('click', () => {
                this.showStep1();
            });

            document.querySelectorAll('.choice-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const choice = e.currentTarget.dataset.choice;
                    this.handleLevelChoice(choice);
                });
            });
        }

        handleLevelChoice(choice) {
            switch(choice) {
                case 'basic':
                    this.showFinalStep('easy', {
                        title: 'You\'re Starting at Easy Level!',
                        icon: '📗',
                        description: 'Perfect for learning Python fundamentals and basic AI concepts.',
                        action: 'Start First Lesson',
                        path: CONFIG.PATHS.easy,
                        colabPath: 'easy/01_introduction_to_python.ipynb',
                        time: '~20-30 hours total'
                    });
                    break;
                case 'intermediate':
                    this.showFinalStep('medium', {
                        title: 'You\'re Starting at Medium Level!',
                        icon: '📘',
                        description: 'Build on your skills with OOP, data structures, and machine learning.',
                        action: 'Start First Lesson',
                        path: CONFIG.PATHS.medium,
                        colabPath: 'medium/01_functions_and_modules.ipynb',
                        time: '~40-60 hours total'
                    });
                    break;
                case 'test':
                    this.showFinalStep('calibration', {
                        title: 'Take the Level Finder!',
                        icon: '🎯',
                        description: 'This 5-minute assessment will recommend the perfect starting point for you.',
                        action: 'Start Assessment',
                        path: CONFIG.PATHS.calibration,
                        colabPath: '00_calibration_test.ipynb',
                        time: '~5 minutes',
                        showColab: true
                    });
                    break;
            }
        }

        showFinalStep(level, config) {
            const body = document.querySelector('.onboarding-body');

            let content = `
                <div class="onboarding-step step-final">
                    <div class="success-icon">${config.icon}</div>
                    <h2>${config.title}</h2>
                    <p class="description">${config.description}</p>
            `;

            if (config.options) {
                // Multiple options (advanced users)
                content += '<div class="final-options">';
                config.options.forEach(opt => {
                    content += `
                        <a href="${buildDocUrl(opt.path)}" class="option-card" data-level="${level}">
                            <span class="option-icon">${opt.icon}</span>
                            <span class="option-label">${opt.label}</span>
                        </a>
                    `;
                });
                content += '</div>';
            } else {
                // Single path
                const showColabButton = config.showColab !== false;

                content += `
                    <div class="time-estimate">⏱️ ${config.time}</div>
                    <div class="final-actions">
                `;

                if (showColabButton) {
                    const colabUrl = CONFIG.COLAB_BASE + config.colabPath;
                    content += `
                        <a href="${colabUrl}" class="btn btn-primary btn-large" target="_blank" data-level="${level}">
                            🚀 ${config.action} (Colab)
                        </a>
                        <div class="or-divider">or</div>
                    `;
                }

                content += `
                        <a href="${buildDocUrl(config.path)}" class="btn btn-secondary" data-level="${level}">
                            📖 Browse Lessons
                        </a>
                    </div>
                `;
            }

            content += `
                    <div class="final-note">
                        💡 Tip: You can always change levels or explore other topics anytime!
                    </div>
                </div>
            `;

            body.innerHTML = content;

            // Track clicks and save level preference
            document.querySelectorAll('[data-level]').forEach(link => {
                link.addEventListener('click', () => {
                    this.tracker.setLevel(level);
                    this.tracker.setOnboarded();
                    this.close();
                });
            });
        }

        close() {
            const modal = document.getElementById('onboarding-modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }
    }

    // Continue Learning Button
    class ContinueLearning {
        constructor(tracker) {
            this.tracker = tracker;
        }

        init() {
            const progress = this.tracker.getProgress();

            // Only show on homepage
            if (!this.isHomepage()) return;

            if (progress.lastVisited) {
                this.showContinueButton(progress);
            }
        }

        isHomepage() {
            return window.location.pathname.endsWith('/') ||
                   window.location.pathname.endsWith('index.html') ||
                   window.location.pathname.endsWith('README.html');
        }

        showContinueButton(progress) {
            const container = document.querySelector('.bd-content');
            if (!container) return;

            const banner = document.createElement('div');
            banner.className = 'continue-learning-banner';
            const continueHref = progress.lastVisited || buildDocUrl();
            banner.innerHTML = `
                <div class="continue-content">
                    <div class="continue-text">
                        <strong>👋 Welcome back!</strong>
                        <span>Continue where you left off</span>
                    </div>
                    <div class="continue-actions">
                        <a href="${continueHref}" class="btn btn-continue">
                            Continue Learning →
                        </a>
                        <button class="btn-reset" title="Start over">
                            <span>Reset Progress</span>
                        </button>
                    </div>
                </div>
                <div class="continue-progress">
                    <span>${progress.completedLessons.length} lessons completed</span>
                </div>
            `;

            container.insertBefore(banner, container.firstChild);

            // Reset button
            banner.querySelector('.btn-reset').addEventListener('click', () => {
                if (confirm('Reset all progress? This will clear your completed lessons.')) {
                    this.tracker.reset();
                    banner.remove();
                    location.reload();
                }
            });
        }
    }

    // Track current page visits
    function trackPageVisit(tracker) {
        const path = window.location.pathname;

        // Only track lesson pages
        if (path.includes('/easy/') ||
            path.includes('/medium/') ||
            path.includes('/hard/') ||
            path.includes('/beginner_scripts/')) {
            tracker.setLastVisited(path);
        }
    }

    // Add "Mark as Complete" buttons to lessons
    function addCompleteButtons(tracker) {
        // Only on lesson pages
        const isLesson = window.location.pathname.match(/\/(easy|medium|hard|beginner_scripts)\//);
        if (!isLesson) return;

        const article = document.querySelector('article.bd-article');
        if (!article) return;

        const currentPath = window.location.pathname;
        const normalizedPath = normalizePath(currentPath);
        let isCompleted = tracker.getProgress().completedLessons.includes(normalizedPath);

        const button = document.createElement('button');
        button.className = 'mark-complete-btn ' + (isCompleted ? 'completed' : '');
        button.innerHTML = isCompleted ?
            '✅ Completed' :
            '☐ Mark as Complete';

        button.addEventListener('click', () => {
            if (!isCompleted) {
                tracker.markLessonComplete(currentPath);
                button.className = 'mark-complete-btn completed';
                button.innerHTML = '✅ Completed';
                isCompleted = true;

                // Show celebration
                showCompletionToast();
            }
        });

        // Insert before the first h1 or at the beginning
        const firstHeading = article.querySelector('h1');
        if (firstHeading) {
            firstHeading.insertAdjacentElement('afterend', button);
        } else {
            article.insertBefore(button, article.firstChild);
        }
    }

    function showCompletionToast() {
        const toast = document.createElement('div');
        toast.className = 'completion-toast';
        toast.innerHTML = '🎉 Lesson completed! Keep going!';
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add quick navigation for mobile
    function addMobileQuickNav() {
        if (window.innerWidth > 768) return;

        const nav = document.createElement('div');
        nav.className = 'mobile-quick-nav';
        nav.innerHTML = `
            <button class="quick-nav-btn" id="quick-nav-toggle">
                📚 Quick Nav
            </button>
            <div class="quick-nav-menu hidden">
                <a data-rel="home">🏠 Home</a>
                <a data-rel="beginner">🌱 Beginner</a>
                <a data-rel="easy">📗 Easy</a>
                <a data-rel="medium">📘 Medium</a>
                <a data-rel="hard">📕 Hard</a>
                <a data-rel="tools">🛠️ Tools</a>
            </div>
        `;

        document.body.appendChild(nav);

        const menu = nav.querySelector('.quick-nav-menu');
        const links = {
            home: '',
            beginner: CONFIG.PATHS.beginner,
            easy: 'easy/README_EASY.html',
            medium: 'medium/README_MEDIUM.html',
            hard: 'hard/README_HARD.html',
            tools: 'tools/README.html'
        };

        Object.entries(links).forEach(([rel, target]) => {
            const anchor = menu.querySelector(`[data-rel="${rel}"]`);
            if (anchor) {
                anchor.setAttribute('href', buildDocUrl(target));
            }
        });

        document.getElementById('quick-nav-toggle').addEventListener('click', () => {
            nav.querySelector('.quick-nav-menu').classList.toggle('hidden');
        });
    }

    function syncSidebarToggleTargets() {
        const primaryCheckbox = document.getElementById('pst-primary-sidebar-checkbox');
        const secondaryCheckbox = document.getElementById('pst-secondary-sidebar-checkbox');

        if (primaryCheckbox) {
            const labels = document.querySelectorAll('label[for="__primary"], label.primary-toggle');
            labels.forEach(label => {
                label.setAttribute('for', primaryCheckbox.id);
            });
        }

        if (secondaryCheckbox) {
            const labels = document.querySelectorAll('label[for="__secondary"], label.secondary-toggle');
            labels.forEach(label => {
                label.setAttribute('for', secondaryCheckbox.id);
            });
        }
    }

    // Initialize everything when DOM is ready
    function init() {
        basePath = computeBasePath();
        const tracker = new ProgressTracker();

        // Track current page
        trackPageVisit(tracker);

        // Show onboarding modal on first visit (homepage only)
        if (window.location.pathname.endsWith('/') ||
            window.location.pathname.endsWith('index.html') ||
            window.location.pathname.endsWith('README.html')) {
            const modal = new OnboardingModal(tracker);
            // Show after a brief delay for better UX
            setTimeout(() => modal.show(), 500);
        }

        // Show continue learning banner - DISABLED for cleaner UI
        // const continueLearning = new ContinueLearning(tracker);
        // continueLearning.init();

        // Add mark as complete buttons
        addCompleteButtons(tracker);

        // Fix sidebar toggles (Jupyter Book 1.0 compatibility)
        syncSidebarToggleTargets();

        // Add mobile navigation
        addMobileQuickNav();

        // Expose reset function globally for debugging
        window.resetProgress = () => tracker.reset();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
