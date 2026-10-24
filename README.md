# MyWeb

Requires [Node.js](https://nodejs.org/en/download/).

## Dev

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run build   # outputs to dist/
npm run deploy  # pushes dist/ to gh-pages branch
```

## Git setup (first time)

```bash
git init
git add .
git config --global user.email "<email>"
git config --global user.name "<name>"
git remote add origin <repo.git>
```

---

## Adding Standalone Project Landing Pages Below Main Content

You can build self-contained project landing pages (1–2 slides / `100vh`–`200vh` each) in their own folders and drop them cleanly below the main portfolio content (`.page-main`).

### How the Architecture Works
1. **Complete Visual Isolation**:
   - The `<div className="project-showcase-zone">` container in `src/pages/LandingPage.tsx` sits at `z-index: 150`.
   - It automatically covers everything from the upper portfolio (`ParallaxBackground` at `z-index: 0`, `hero-glow` at `z-index: 5`, and the floating `SocialPanel` at `z-index: 100`).
   - **Only** the top navigation ribbon (`.hero-nav` at `z-index: 9999`) remains visible on top.
2. **Scoped Parallax Scroll**:
   - The 200-frame `ParallaxBackground` scroll progress is scoped strictly to `.portfolio-upper-zone` (`HeroSection` + `.page-main`). Adding any number of project landing pages below will never stretch or slow down the parallax timelapse.

---

### Step 1: Create Your Project Component Folder
Create a folder for your project under `src/projects/` (or `src/components/`), for example:
`src/projects/NeuralRenderer/NeuralRendererPage.tsx` and `NeuralRendererPage.css`.

```tsx
// src/projects/NeuralRenderer/NeuralRendererPage.tsx
import React from "react";
import "./NeuralRendererPage.css";

export default function NeuralRendererPage() {
  return (
    <section
      className="project-landing-page neural-project"
      // OPTIONAL: Change the top nav ribbon when this section is in view
      data-nav-theme="dark"
    >
      {/* Slide 1 */}
      <div className="project-slide neural-project__slide-1">
        <h2>Neural Renderer</h2>
        <p>Slide 1 content goes here...</p>
      </div>

      {/* Slide 2 (Optional) */}
      <div className="project-slide neural-project__slide-2">
        <h3>Architecture & Results</h3>
        <p>Slide 2 content goes here...</p>
      </div>
    </section>
  );
}
```

```css
/* src/projects/NeuralRenderer/NeuralRendererPage.css */
.neural-project {
  background: #0d0f14;
  color: #f5f5f0;
}

.neural-project__slide-1,
.neural-project__slide-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem clamp(1.5rem, 6vw, 5rem);
}
```

---

### Step 2: Import and Render in `src/pages/LandingPage.tsx`
Open `src/pages/LandingPage.tsx`, import your component at the top, and place it inside `<div className="project-showcase-zone">`:

```tsx
import NeuralRendererPage from "../projects/NeuralRenderer/NeuralRendererPage";
```

```tsx
      {/* ── Custom Project Landing Pages (1–2 Slides Each) ── */}
      <div className="project-showcase-zone">
        <NeuralRendererPage />
      </div>
```

---

### Step 3 (Optional): Customizing the Top Nav Ribbon Color Per Project or Slide
By default, if you do not add any `data-nav-*` attributes, the top nav ribbon keeps its standard cream frosted style.

To make the top nav ribbon automatically adapt when scrolling into your project page (or even change between Slide 1 and Slide 2), add any of these optional attributes to your `<section className="project-landing-page">` or individual `<div className="project-slide">` elements:

#### Option A: Built-in Preset Themes (`data-nav-theme`)
| Attribute | Effect |
| :--- | :--- |
| `data-nav-theme="dark"` | Dark frosted glass (`rgba(14, 14, 18, 0.82)`), light text (`#f5f5f0`), subtle white border |
| `data-nav-theme="light"` | Cream frosted glass (`rgba(236, 236, 232, 0.88)`), dark text (`#1a1a18`) |
| `data-nav-theme="transparent"` | Fully transparent background with no border or shadow |

#### Option B: Custom Exact Colors (`data-nav-bg`, `data-nav-text`, `data-nav-border`)
You can pass any valid CSS color (`hex`, `rgb`, `rgba`, `hsl`) to match your project's exact palette:

```tsx
<section
  className="project-landing-page"
  data-nav-bg="rgba(12, 24, 38, 0.85)"
  data-nav-text="#e2f1ff"
  data-nav-border="rgba(226, 241, 255, 0.12)"
>
  {/* Your 1–2 slides */}
</section>
```

You can also set different nav colors per slide inside the same project:

```tsx
<section className="project-landing-page">
  <div className="project-slide" data-nav-theme="dark">
    {/* Slide 1: Dark nav */}
  </div>
  <div className="project-slide" data-nav-bg="rgba(245, 240, 230, 0.9)" data-nav-text="#1a1a18">
    {/* Slide 2: Warm light nav */}
  </div>
</section>
```

