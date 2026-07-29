# Requirements Document

## Introduction

This feature covers a comprehensive modernisation of the personal portfolio website (React + TypeScript, CSS Modules). The revamp targets five areas: a complete Skills section UI overhaul, fixing the particle system's z-index/pointer-events conflict, codebase cleanup and refactoring, adding purposeful Framer Motion animations, and redesigning the work-showcase sections. The result should feel polished and interactive, inspired by modern portfolio sites, while remaining consistent with the existing dark/gold design language.

---

## Glossary

- **Portfolio_App**: The React + TypeScript single-page application deployed at `https://lalith321.github.io/allegroartisticleap`.
- **LandingPage**: The root route (`/`) component defined in `src/pages/LandingPage.tsx`.
- **Skills_Section**: The `<section className="myskills">` block inside LandingPage that displays technical and creative skill tags.
- **Particle_System**: The `tsparticles`-powered canvas rendered by `src/components/AboutBack.tsx` inside the About section.
- **Work_Section**: Any `<section className="work-section">` block that lists project cards (3D Environments, AI, Digital Art, Programming).
- **Work_Card**: An `<a className="work-card">` element representing a single project inside a Work_Section.
- **Framer_Motion**: The `framer-motion` library (already listed in `package.json`) used for declarative React animations.
- **NavPanel**: The fixed top navigation bar rendered by `src/components/NavPanel.tsx`.
- **SvgPathAnimation**: The scroll-driven SVG drawing section in `src/components/SvgPathAnimation.tsx` that acts as a category navigator.
- **GlassmorphContainer**: The reusable glassmorphism panel in `src/components/GlassmorphContainer.tsx`.
- **Sub_Page**: Any route other than `/` — `/ai`, `/env3d`, `/programs`, `/digitalart`, `/ai/ProjectHotel1`.

---

## Requirements

---

### Requirement 1: Skills Section UI Overhaul

**User Story:** As a visitor, I want the Skills section to have a modern, visually compelling layout so that I immediately understand the breadth of capabilities on offer.

#### Acceptance Criteria

1. THE Skills_Section SHALL replace the current two-column pill-tag grid with a redesigned layout that groups skills into categorised, visually distinct cards or interactive tiles.
2. WHEN a skill tile is hovered, THE Skills_Section SHALL animate the tile (e.g., lift, glow, or scale) using Framer_Motion to provide tactile feedback.
3. THE Skills_Section SHALL display each skill with an associated icon or visual indicator that differentiates Technical skills (muted/neutral palette) from Creative skills (gold-tinted palette), consistent with existing design tokens in `global.css`.
4. THE Skills_Section SHALL remain fully legible and correctly laid out at viewport widths from 320 px to 2 560 px.
5. WHEN the Skills_Section scrolls into the viewport for the first time, THE Skills_Section SHALL trigger a staggered entrance animation via Framer_Motion (each skill tile animates in sequentially, not all at once).
6. THE Skills_Section SHALL not introduce any new external icon libraries; it SHALL use only Font Awesome icons already present in the project or Unicode/SVG inline icons.

---

### Requirement 2: Fix Particle Overlap and Click Blocking

**User Story:** As a visitor, I want to be able to click every link and button on the page without the particle canvas intercepting my clicks so that navigation works correctly.

#### Acceptance Criteria

1. THE Particle_System SHALL have its canvas element styled with `pointer-events: none` at all times so that it never captures mouse or touch events intended for content beneath it.
2. WHEN a user hovers over the About section, THE Particle_System SHALL still respond to the hover repulse interaction by reading hover coordinates from a sibling element or window events rather than relying on canvas pointer capture.
3. THE Particle_System SHALL be rendered at a z-index lower than all interactive content elements (text, links, buttons, images) within the About section.
4. IF `pointer-events: none` cannot be applied via tsparticles config alone, THEN THE Portfolio_App SHALL override the canvas `pointer-events` style via CSS targeting `#about-hexagon-particles canvas`.
5. THE Particle_System canvas SHALL not extend beyond the boundaries of its containing `<section className="aboutwhole">` element.

---

### Requirement 3: Codebase Cleanup and Refactoring

**User Story:** As a developer, I want a clean, consistent codebase so that future changes are straightforward and maintenance overhead is low.

#### Acceptance Criteria

1. THE Portfolio_App SHALL remove all CSS rules flagged with `display: none` stubs (e.g., `.setlogo-icon`, `.blurbg`, `.profilemask`, `.myskillsbg2`, `.supertext`, `.skilldisplay`, `.technical`, `.artistic`, `.skill-group-label`, `.skills-divider`) that exist only as legacy no-ops.
2. THE Portfolio_App SHALL consolidate duplicated work-card and work-section styles that currently exist in both `LandingPage.css` and individual Sub_Page CSS files into a single shared stylesheet or CSS module.
3. THE Portfolio_App SHALL remove the unused `Position` import from `GlassmorphContainer.tsx` (imported from `estree` but never used).
4. THE Portfolio_App SHALL fix the missing `key` prop warning on the `<div className="card-pg">` element in `ProgrammingPage.tsx`.
5. WHEN building the project with `npm run build`, THE Portfolio_App SHALL produce zero TypeScript compiler errors and zero ESLint errors (using the existing `eslintConfig` in `package.json`).
6. THE Portfolio_App SHALL ensure all image `<img>` elements that are purely decorative carry `alt=""` and `aria-hidden="true"`, and all meaningful images carry descriptive `alt` text.
7. THE Portfolio_App SHALL deduplicate the `works` array in `ProgrammingPage.tsx` with the data already present in `src/data/projects-code.json` by reading from the JSON file directly.

---

### Requirement 4: Framer Motion Animations

**User Story:** As a visitor, I want purposeful, interactive animations throughout the site so that the experience feels dynamic and engaging without being distracting.

#### Acceptance Criteria

1. WHEN the LandingPage first renders, THE LandingPage SHALL animate the hero content (eyebrow text, heading, subtitle, and CTA buttons) into view using Framer_Motion with a staggered fade-up sequence (each element enters 80–120 ms after the previous one).
2. WHEN a Work_Card enters the viewport, THE Work_Card SHALL animate in using a Framer_Motion `whileInView` fade-up transition with `once: true` so the animation plays exactly one time per page load.
3. WHEN a Work_Card is hovered, THE Work_Card SHALL respond with a subtle Framer_Motion `whileHover` scale or lift animation (scale ≤ 1.04 or translateY ≤ −6 px) in addition to the existing CSS transition.
4. THE NavPanel SHALL animate its entrance on first render using a Framer_Motion slide-down transition (translateY from −100% to 0) with a duration of 400–600 ms, and WHERE reduced-motion is preferred by the user's OS settings, THE NavPanel SHALL skip the slide-down animation.
5. WHEN the About section enters the viewport, THE Portfolio_App SHALL animate the about-left-panel text block and the about-right-panel profile photo separately using Framer_Motion `whileInView` — the text sliding in from the left and the photo from the right.
6. WHEN a Sub_Page is navigated to, THE Sub_Page SHALL use a Framer_Motion `AnimatePresence` page-transition (already wired in `App.tsx`) with a consistent enter and exit animation (e.g., fade + slight vertical slide), replacing the current per-page ad-hoc `rotateZ` animation in `ProgrammingPage.tsx`.
7. THE Portfolio_App SHALL define all reusable animation variants in a single shared file (e.g., `src/animations/variants.ts`) so that animation constants are not duplicated across components.
8. WHEN reduced-motion is preferred by the user's OS settings, THE Portfolio_App SHALL reduce Framer_Motion animation intensity (e.g., shorter durations, smaller translate distances) while keeping animations active rather than disabling them entirely.

---

### Requirement 5: Work Showcase Redesign

**User Story:** As a visitor, I want the project showcase sections to look modern and visually engaging so that my work is presented in the best possible light.

#### Acceptance Criteria

1. THE Work_Section SHALL replace the current uniform grid of small cards with a layout that visually emphasises featured projects — at least one project per section SHALL be rendered as a "hero card" with a larger image and more prominent typography.
2. WHEN a Work_Card image is hovered, THE Work_Card SHALL display an overlay that reveals the project description and action link on top of the image, rather than showing the description below the image at all times.
3. THE Work_Card SHALL display category tags or technology badges derived from the project data (the JSON files in `src/data/`) to give visitors quick context.
4. WHEN a Work_Section enters the viewport and the section header's horizontal rule element is visible, THE Work_Section SHALL animate the rule via Framer_Motion (line draws from left to right). IF the horizontal rule element is not visible or fails to render, THEN THE Portfolio_App SHALL skip the animation entirely without error.
5. WHEN a Work_Card link is activated, THE Portfolio_App SHALL open the link in a new tab with `target="_blank" rel="noopener noreferrer"` (already in use; this criterion confirms the behaviour must be preserved).
6. THE Work_Section SHALL maintain keyboard accessibility: each Work_Card SHALL be reachable and activatable via the Tab and Enter keys.
7. WHEN there are no projects in a category's JSON file, THE Work_Section SHALL render an empty-state message (e.g., "Coming soon") instead of an empty grid.

