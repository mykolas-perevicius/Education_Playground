# AI Agent Design Fix Prompt for Education Playground

## Overview
You are being provided with screenshots of a dual-site educational platform that has alignment and design consistency issues. Your task is to analyze the screenshots and provide specific code fixes to resolve all visual inconsistencies.

## Project Structure

### Site 1: CodeBridge Labs Landing Page
- **Technology**: Next.js 16 with TypeScript, Tailwind CSS 4
- **Location**: `/home/myko/Education_Playground/codebridge-landing/`
- **Deployment**: GitHub Pages at `/Education_Playground/` subdirectory
- **Purpose**: B2B marketing site for schools

### Site 2: Coding Playground (Jupyter Book)
- **Technology**: Jupyter Book with Sphinx backend
- **Location**: `/home/myko/Education_Playground/`
- **Build Output**: `_build/html/`
- **Purpose**: Interactive Python/ML/AI educational content

## Unified Design System (CRITICAL - Must Be Consistent Across Both Sites)

### Color Palette
```css
/* Primary Colors */
--primary-color: #4CAF50;        /* Main green for CTAs */
--primary-hover: #45a049;        /* Hover state */
--primary-light: #e8f5e9;        /* Light backgrounds */

/* Secondary Colors */
--secondary-color: #667eea;      /* Purple gradient start */
--secondary-dark: #764ba2;       /* Purple gradient end */

/* Neutral Colors */
--navy: #0D1B2A;                 /* Headers and emphasis */
--text-primary: #1a1a1a;         /* Body text */
--text-secondary: #666666;       /* Secondary text */
--soft-gray: #F3F4F6;            /* Card backgrounds */
--border-color: #e0e0e0;         /* Borders */
--white: #FFFFFF;

/* Accent */
--accent-color: #ff6b6b;         /* Warnings/highlights */
--sky-blue: #0ea5e9;             /* Info elements */
```

### Dark Mode Palette
```css
/* Dark Mode Overrides */
--bg-primary: #1a1a1a;
--bg-secondary: #242424;
--bg-tertiary: #2d2d2d;
--text-primary: #e0e0e0;
--text-secondary: #b0b0b0;
--border-color: #404040;
--soft-gray: #242424;
```

### Typography
- **Primary Font**: Inter (sans-serif)
- **Heading Font Weight**: 700-800
- **Body Font Weight**: 400-500
- **Line Height**: 1.6 for body, 1.2 for headings

### Spacing System
- **Section Gaps**: `gap-8` (2rem) - MUST be consistent across all grid layouts
- **Card Padding**: `p-8` (2rem)
- **Section Padding**: `py-16` (4rem) on mobile, `py-24` (6rem) on desktop

## Common Design Issues to Fix

### 1. Card Height Inconsistencies
**Problem**: Cards in grid layouts have varying heights based on content length.

**Solution**: Apply this pattern to ALL card components:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Header content */}
      <div className="mb-4">
        {/* Icons, titles, etc. */}
      </div>

      {/* Main content - should grow to fill space */}
      <p className="text-gray-700 mb-6 flex-1">
        {item.description}
      </p>

      {/* Footer content - anchored to bottom */}
      <div className="mt-auto">
        {/* Buttons, author info, etc. */}
      </div>
    </div>
  ))}
</div>
```

**Key Classes**:
- Parent card: `flex flex-col h-full`
- Growing content: `flex-1`
- Bottom-aligned sections: `mt-auto`

### 2. Inconsistent Gap Spacing
**Problem**: Different sections use different gap values (gap-6, gap-8, gap-12) creating visual inconsistency.

**Solution**: Standardize to `gap-8` for all grid layouts:
```tsx
// WRONG
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">

// RIGHT
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
```

### 3. Color Inconsistency
**Problem**: Some components use hardcoded colors instead of CSS variables.

**Solution**:
- In Tailwind components, use custom color classes
- In custom CSS, use CSS variables
```tsx
// WRONG
<button className="bg-green-500 hover:bg-green-600">

// RIGHT
<button className="bg-primary hover:bg-primary-hover">
```

### 4. Shadow and Border Inconsistencies
**Problem**: Cards use different shadow intensities and border styles.

**Solution**: Standardize to:
```tsx
className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
```

## Critical Files to Review

### Landing Page Components
1. **`codebridge-landing/components/Problem.tsx`**
   - Contains 3-column grid of problem cards
   - Check: Card heights, content alignment, spacing

2. **`codebridge-landing/components/HowItWorks.tsx`**
   - Contains 3-step process visualization
   - Check: Gap spacing (should be `gap-8`), card heights, arrow alignment

3. **`codebridge-landing/components/Results.tsx`**
   - Contains metrics and testimonial cards
   - Check: Testimonial card heights, author info alignment at bottom

4. **`codebridge-landing/components/Courses.tsx`**
   - Contains course offering cards
   - Check: Card heights, button alignment at bottom

5. **`codebridge-landing/components/Hero.tsx`**
   - Main hero section with CTA buttons
   - Check: Button colors match primary green, gradient background

6. **`codebridge-landing/components/CTASection.tsx`**
   - Final call-to-action section
   - Check: Button styling, background gradient

### Style Files
1. **`codebridge-landing/app/globals.css`**
   - Global styles and CSS variables
   - Check: All color variables are defined correctly

2. **`Education_Playground/_static/css/custom.css`**
   - Jupyter Book custom styling
   - Check: Color palette matches landing page, dark mode works

3. **`codebridge-landing/tailwind.config.ts`**
   - Tailwind configuration
   - Check: Custom colors are defined in theme extension

## Screenshot Analysis Instructions

When you receive screenshots, analyze for:

### Visual Alignment Issues
1. **Horizontal Alignment**
   - Are cards in the same row aligned at the top?
   - Do cards have equal heights?
   - Are grid columns evenly spaced?

2. **Vertical Alignment**
   - Is content within cards aligned consistently?
   - Are bottom elements (buttons, author info) at the same level?
   - Is spacing between sections uniform?

3. **Typography Consistency**
   - Are heading sizes consistent across sections?
   - Is text hierarchy clear (h1 > h2 > h3 > p)?
   - Are font weights appropriate for emphasis?

4. **Color Usage**
   - Are primary colors (green #4CAF50) used for CTAs?
   - Are secondary colors (purple gradient) used appropriately?
   - Is there sufficient contrast for accessibility?

5. **Spacing Issues**
   - Are gaps between cards consistent?
   - Is padding inside cards uniform?
   - Is there proper breathing room between sections?

6. **Shadow and Depth**
   - Are card shadows consistent?
   - Do hover states provide clear feedback?
   - Is depth hierarchy appropriate?

## Fix Implementation Pattern

For each issue identified, provide fixes in this format:

```markdown
### Issue: [Description]
**Location**: `path/to/file.tsx:lineNumber`
**Current Code**:
```tsx
// Problematic code
```

**Fixed Code**:
```tsx
// Corrected code with explanation
```

**Reasoning**: [Why this fix resolves the issue]
```

## Deployment Instructions

After making fixes:

1. **Build Landing Page**:
```bash
cd /home/myko/Education_Playground/codebridge-landing
npm run build
```

2. **Deploy to GitHub Pages**:
```bash
cd /home/myko/Education_Playground
./deploy.sh
```

3. **Verify Deployment**:
   - Visit: https://mykolas-perevicius.github.io/Education_Playground/
   - Check responsive design on mobile, tablet, desktop
   - Test dark mode toggle
   - Verify all links work with `/Education_Playground/` basePath

## Success Criteria

Your fixes are complete when:

- ✅ All cards in grid layouts have equal heights
- ✅ Content aligns properly within cards (top-aligned headers, bottom-aligned CTAs)
- ✅ Gap spacing is consistent (`gap-8`) across all sections
- ✅ All colors use CSS variables from the unified design system
- ✅ Shadows and borders are consistent across similar components
- ✅ Typography hierarchy is clear and consistent
- ✅ Responsive design maintains alignment on all screen sizes
- ✅ Dark mode works properly with appropriate contrast
- ✅ Hover states provide clear visual feedback
- ✅ No visual "jumps" or layout shifts during interactions

## Known Issues to Work Around

1. **Jupyter Book Build Error**: If you encounter `KeyError: 'anchorname'` when rebuilding Jupyter Book, copy CSS directly to `_build/html/_static/css/custom.css` instead.

2. **basePath Configuration**: Next.js is configured with `basePath: '/Education_Playground'`. All asset paths must be relative or account for this prefix.

3. **GitHub Pages Deployment**: The site deploys to a subdirectory, not root domain. Test all links with the full URL.

## Additional Context

### Previous Fixes Completed
- Added comprehensive dark mode support to Jupyter Book
- Unified color palette across both sites
- Fixed Problem.tsx, HowItWorks.tsx, and Results.tsx card alignment
- Enhanced welcome modal button styling
- Standardized gap spacing from variable (gap-12 lg:gap-8) to consistent (gap-8)

### Remaining Potential Issues
Based on typical design patterns, also check:
- Courses.tsx for similar card alignment issues
- Hero section button alignment and color consistency
- Mobile responsive breakpoints (especially around 768px and 1024px)
- Focus states for accessibility
- Loading states and animations
- Form inputs and validation styling

## Example: Complete Fix for Card Alignment

```tsx
// BEFORE: Unequal card heights in Problem.tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {problems.map((problem, index) => (
    <div key={index} className="bg-white rounded-xl p-8 shadow-md">
      <div className="text-4xl mb-4">{problem.icon}</div>
      <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
      <p className="text-gray-700">{problem.description}</p>
    </div>
  ))}
</div>

// AFTER: Equal card heights with proper content distribution
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {problems.map((problem, index) => (
    <div
      key={index}
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="text-4xl mb-4">{problem.icon}</div>
      <h3 className="text-xl font-bold mb-3 text-navy">{problem.title}</h3>
      <p className="text-gray-700 flex-1">{problem.description}</p>
    </div>
  ))}
</div>
```

**Changes Made**:
1. Added `flex flex-col h-full` to card container
2. Added `flex-1` to description paragraph (grows to fill space)
3. Added `hover:shadow-xl transition-shadow duration-300` for better interactivity
4. Added `border border-gray-100` for subtle definition
5. Added `text-navy` to heading for color consistency

---

## Your Task

1. **Analyze the provided screenshots carefully**
2. **Identify all visual inconsistencies** related to:
   - Card alignment and height
   - Spacing and gaps
   - Color usage
   - Typography hierarchy
   - Shadow and border consistency
3. **Provide specific code fixes** with file paths and line numbers
4. **Explain the reasoning** behind each fix
5. **Test the deployment** after fixes are applied

Good luck! Focus on creating a visually harmonious, professional design that represents CodeBridge Labs' commitment to quality education technology.
