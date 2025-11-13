# Changelog

All notable changes to the Education Playground project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2025-11-13

### 🎨 Major UX/UI Overhaul

#### Added
- **Dark Mode Auto-Detection** - Automatic dark mode using `@media (prefers-color-scheme: dark)`
- **CSS Variables System** - Comprehensive theme variables for colors, spacing, and shadows
- **Improved Content Layout** - Better centering and max-width constraints for readability
- **Enhanced Typography** - Better font sizing, line heights, and spacing
- **Better List Formatting** - Improved spacing and indentation for lists
- **Centered Images** - All images and figures now center properly with appropriate margins

#### Changed
- **Removed Announcement Banner** - Orange "Skip to content" banner removed from Jupyter Book config
- **Updated Dark Mode Implementation** - Switched from manual activation to automatic detection
- **Improved Article Layout** - Max-width of 1000px with proper centering
- **Better Section Spacing** - Consistent 3rem spacing between major sections
- **Enhanced Code Blocks** - Better contrast and readability in both light and dark modes
- **Landing Page Theme** - Forced light mode for consistent professional appearance

#### Fixed
- **Dark Mode Not Working** - Added proper CSS media queries to activate dark mode
- **Mixed Light/Dark Sections** - Landing page now consistently light themed
- **Poor Content Alignment** - Main content now properly centered and aligned
- **Inconsistent Spacing** - Standardized padding and margins throughout
- **Welcome Modal Dark Mode** - Onboarding modal now properly styled in dark mode
- **Choice Cards in Dark Mode** - Interactive cards now have proper dark mode styling

#### Technical Details

**Files Modified:**
```
_config.yml                              - Removed announcement banner
_static/css/custom.css                   - Added 56 lines of dark mode and layout improvements
codebridge-landing/app/globals.css       - Forced light mode (removed dark mode detection)
```

**CSS Architecture:**
```css
/* Auto-detect dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #1a1a1a;
        --bg-secondary: #242424;
        --text-primary: #e0e0e0;
        /* ... */
    }
}

/* Better content centering */
.bd-article {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}
```

**Deployment:**
- Git commit: `96ddf9a`
- GitHub Pages: `df18f30`
- Status: ✅ Live

---

## [2.2.0] - 2025-11-13

### 🎯 Layout Alignment Fixes

#### Fixed
- **Problem Section Cards** - Added `flex flex-col h-full` for equal-height cards
- **How It Works Cards** - Fixed gap spacing from `gap-12 lg:gap-8` to consistent `gap-8`
- **Results Testimonials** - Anchored author info to bottom with `mt-auto`
- **Visual Symmetry** - All grid layouts now perfectly aligned and symmetrical

#### Technical Details

**Flexbox Pattern:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item) => (
    <div className="... flex flex-col h-full">
      <div className="flex-1">
        {/* Expandable content */}
      </div>
      <div className="mt-auto">
        {/* Anchored to bottom */}
      </div>
    </div>
  ))}
</div>
```

**Files Modified:**
- `codebridge-landing/components/Problem.tsx`
- `codebridge-landing/components/HowItWorks.tsx`
- `codebridge-landing/components/Results.tsx`

**Deployment:**
- Git commit: `90b70c8`
- Status: ✅ Live

---

## [2.1.0] - 2025-11-13

### 🎨 Color Palette Unification

#### Changed
- **Primary Color** - Changed from Blue (#3A86FF) to Green (#4CAF50)
- **Continue Button** - Updated from white to green primary color
- **Unified Variables** - Synchronized CSS variables between both sites

#### Color Palette
```css
/* Unified Across Both Sites */
--primary-color: #4CAF50;        /* Green - Actions, buttons, links */
--primary-hover: #45a049;        /* Darker green - Hover states */
--secondary-color: #667eea;      /* Purple - Gradients, highlights */
--secondary-dark: #764ba2;       /* Dark purple - Gradient end */
--navy: #0D1B2A;                /* Navy - Headings, text */
```

#### Rationale
- Green represents growth and learning
- Better accessibility and contrast
- Warmer, more approachable than blue
- Purple gradient adds creative flair without overwhelming

**Files Modified:**
- `codebridge-landing/app/globals.css`
- `_static/css/custom.css`

**Deployment:**
- Git commit: `8f9ef59`
- Status: ✅ Live

---

## [2.0.0] - 2025-11-12

### 🚀 Major Feature: Landing Page Integration

#### Added

**CodeBridge Labs Landing Page:**
- Modern Next.js 16 (Turbopack) site
- 6 comprehensive sections:
  1. **Hero** - Gradient background with compelling CTAs
  2. **Problem** - Why Schools Choose CodeBridge (3 pain points)
  3. **How It Works** - 3-step implementation process
  4. **Courses** - 6 course offerings with detailed descriptions
  5. **Results** - Metrics and testimonials
  6. **Pricing** - Custom quote inquiry form

**Components:**
```
components/
├── Navigation.tsx       - Top nav with mobile menu
├── Hero.tsx            - Hero section with CTAs
├── Problem.tsx         - Pain points section
├── HowItWorks.tsx      - Process overview
├── Courses.tsx         - Course catalog
├── Results.tsx         - Testimonials and metrics
├── Pricing.tsx         - Pricing inquiry
└── Footer.tsx          - Footer with links
```

**Infrastructure:**
- `deploy.sh` - Automated deployment script
- GitHub Pages integration
- PostHog analytics (ready for activation)
- A/B testing framework

**Documentation:**
- `ARCHITECTURE.md` - System design and architecture
- `QUICK_START.md` - Daily operations guide
- `AB_TESTING_STRATEGY.md` - A/B testing playbook
- `ANALYTICS_SETUP.md` - PostHog setup guide

#### Technical Stack
- **Framework:** Next.js 16 with Turbopack
- **Styling:** Tailwind CSS 4
- **Deployment:** GitHub Pages (static export)
- **Build:** `output: 'export'` for static generation
- **Base Path:** `/Education_Playground` for GitHub Pages

#### Configuration
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  basePath: '/Education_Playground',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

#### Deployment Automation
```bash
# deploy.sh workflow
1. npm install
2. npm run build
3. Copy output to _build/html/
4. ghp-import and push to gh-pages
```

**Status:** ✅ Live at https://mykolas-perevicius.github.io/Education_Playground/

---

## [1.0.0] - Earlier

### 🎓 Initial Release: Jupyter Book Learning Platform

#### Features

**Interactive Learning Platform:**
- Jupyter Book-based content delivery
- 50+ lessons across 4 skill levels
- Interactive onboarding system
- Progress tracking with localStorage

**Content Structure:**
```
Content/
├── beginner_scripts/    - 10 basic lessons
├── easy/               - Python fundamentals
├── medium/             - OOP and data structures
└── hard/              - Advanced topics (ML, CUDA, CTF)
```

**Technologies:**
- Jupyter Book for content generation
- Sphinx for documentation building
- Custom JavaScript for interactivity
- Vanilla CSS for styling

**Key Features:**
- Skill level assessment
- Personalized learning paths
- Colab integration
- Progress badges
- Mobile responsive

---

## Version Comparison

| Feature | v1.0 | v2.0 | v2.1 | v2.2 | v3.0 |
|---------|------|------|------|------|------|
| Jupyter Book Content | ✅ | ✅ | ✅ | ✅ | ✅ |
| Landing Page | ❌ | ✅ | ✅ | ✅ | ✅ |
| Unified Colors | ❌ | ❌ | ✅ | ✅ | ✅ |
| Perfect Alignment | ❌ | ❌ | ❌ | ✅ | ✅ |
| Dark Mode | ❌ | ❌ | ❌ | ❌ | ✅ |
| Optimized Layout | ❌ | ❌ | ❌ | ❌ | ✅ |
| Announcement Banner | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## Breaking Changes

### v3.0.0
- **Removed:** Announcement banner from Jupyter Book
- **Changed:** Landing page now light-mode only (removed dark mode auto-detection)
- **Impact:** None - improvements only

### v2.0.0
- **Added:** Landing page as new entry point
- **Changed:** Site structure now includes `/` (landing) and content
- **Impact:** URLs remain the same, landing page is additive

---

## Upgrade Path

### From v2.x to v3.0
```bash
git pull origin main
cd codebridge-landing
npm install
npm run build
cd ..
./codebridge-landing/deploy.sh
```

No breaking changes - all content and URLs remain compatible.

---

## Future Roadmap

### Planned Features
- [ ] Manual dark mode toggle button
- [ ] User authentication system
- [ ] Cloud progress synchronization
- [ ] Achievement system with badges
- [ ] Discussion forums per lesson
- [ ] Code challenge integration
- [ ] Video tutorial embeds
- [ ] Certificate generation
- [ ] LMS integration (Moodle, Canvas)

### Technical Improvements
- [ ] Fix Jupyter Book build issue (KeyError: 'anchorname')
- [ ] Implement PostHog analytics
- [ ] Set up A/B testing experiments
- [ ] Add search functionality
- [ ] Improve SEO metadata
- [ ] Add social sharing features

### Content Expansion
- [ ] More beginner content
- [ ] Web development track
- [ ] Database tutorials
- [ ] DevOps and cloud computing
- [ ] Cybersecurity track
- [ ] Interview preparation section

---

## Links

- **Live Site:** https://mykolas-perevicius.github.io/Education_Playground/
- **Repository:** https://github.com/mykolas-perevicius/Education_Playground
- **Landing Page Repo:** https://github.com/mykolas-perevicius/codebridge-landing
- **Issues:** https://github.com/mykolas-perevicius/Education_Playground/issues

---

**Maintained by:** Mykolas Perevicius
**AI Assistant:** Claude (Anthropic)
**License:** MIT
**Last Updated:** November 13, 2025
