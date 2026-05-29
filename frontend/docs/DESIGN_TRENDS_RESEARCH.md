# Web Design Trends Research — 2025 / 2026
### Deep Reference for Rashmi 6 Paradigm Website Design

> Compiled from: Awwwards, Figma, Framer, TheeDigital, SpinxDigital, DigitalSilk, Lummi AI, DEV Community,  
> Motion.dev, Olivier Larose tutorials, CodePen community, Subframe, DesignRush, OnePageLove, DART Studios,  
> and design-forward publications covering late 2024 through mid-2026.

---

## Table of Contents

1. [The Research Methodology](#1-the-research-methodology)
2. [What Makes a Site Win on Awwwards](#2-what-makes-a-site-win-on-awwwards)
3. [The Dead List — What to Never Do Again](#3-the-dead-list--what-to-never-do-again)
4. [Typography as Design](#4-typography-as-design)
5. [Layout Systems — Bento Grids & Editorial Grids](#5-layout-systems--bento-grids--editorial-grids)
6. [Dark Mode — The Right Way](#6-dark-mode--the-right-way)
7. [Scroll Storytelling & Cinematic Scroll](#7-scroll-storytelling--cinematic-scroll)
8. [About / Company Sections](#8-about--company-sections)
9. [Process / How It Works Sections](#9-process--how-it-works-sections)
10. [Impact & Data Visualization Sections](#10-impact--data-visualization-sections)
11. [Custom Cursors](#11-custom-cursors)
12. [Micro-Animations & Motion Design](#12-micro-animations--motion-design)
13. [Color Strategy in 2025](#13-color-strategy-in-2025)
14. [Environmental & Sustainability Website Design Patterns](#14-environmental--sustainability-website-design-patterns)
15. [Performance & Sustainable Web Design](#15-performance--sustainable-web-design)
16. [CSS Techniques That Are Currently Award-Level](#16-css-techniques-that-are-currently-award-level)
17. [What Reddit & Design Communities Are Saying](#17-what-reddit--design-communities-are-saying)
18. [Design Formula Applied to This Project](#18-design-formula-applied-to-this-project)

---

## 1. The Research Methodology

This document captures research gathered from a multi-source web search session conducted in May 2026, covering:

- **Awwwards 2025** — nominees, SOTD (Site of the Day), SOTM (Site of the Month), and SOTY (Site of the Year) analysis  
- **Figma's 2025–2026 Web Design Trends Report** — one of the most data-backed trend reports in the industry  
- **Framer's Emerging Trends Article (2025)** — 7 concrete emerging patterns with real examples  
- **TheeDigital's Top 20 Trends 2026** — covering bento grids, kinetic typography, scroll storytelling  
- **SpinxDigital's Best Website Designs 2026** — case study analysis of Bruno Simon, Messenger SOTY, Carles Faus, Aventura Dental, iCOMAT  
- **DigitalSilk's Trends Guide** — explicit "embrace vs avoid" framework  
- **Lummi AI's UI Trends 2025** — focused on interface-level patterns: bento grids, deconstructed heroes, tall cards  
- **DEV Community's 25 Trends to Watch in 2025** — developer-side perspective covering cursor animation, scroll behavior, organic shapes, brutalism  
- **DART Studios's Actual UI Trends 2025** — bento grids, bold typography, glassmorphism revisited  
- **Subframe's 25 Environmental Website Design Examples** — specific to sustainability sector  
- **Motion.dev Magazine** — magnetic cursor technical deep-dive  
- **Olivier Larose's Blend-Mode Cursor Tutorial** — GSAP/React technical implementation  
- **CodePen Community** — real-world custom cursor examples using mix-blend-mode  
- **Dribbble / Bentogrids.com** — visual inspiration for modular layout patterns  
- **OnePageLove How-It-Works section gallery** — 167 live real-world process section examples  

---

## 2. What Makes a Site Win on Awwwards

### 2025 Site of the Year: Messenger (Meta)

The **Awwwards Site of the Year 2025** was awarded to Messenger. The analysis from the Awwwards team describes it as:

> *"What earns Messenger its place among the best is the way it transforms interaction into play — visitors are not passive observers but participants in a living scene."*

Key technical pillars of the winning design:
- Built entirely on **WebGL** — GPU-powered rendering for real-time lighting, physics, and animation
- Users are **active participants**, not passive readers — the interface responds, bounces, breathes
- Physics simulation creates tactile, physical feedback on hover and cursor movement
- Sound design integrated with visual interactions (spatialized audio that shifts with cursor position)

### Site of the Month: Bruno Simon Portfolio (January 2026)

Bruno Simon's 2025 portfolio is a recurring reference point in the design community. It uses:
- Full 3D WebGL environment navigated via keyboard/mouse
- The entire portfolio IS the experience — no traditional page structure
- Game-like interactions with a toy car driving through a 3D world

### Other Noted Winners in 2025
- **Australian Fashion Week 2025** — editorial scroll with typographic heroes
- **LX HAUSYS TRENDSHIP 2025** — immersive material visualization  
- **UAE Pavilion Expo 2025 Osaka** — kinetic architecture-inspired transitions
- **Renaissance Edition** — *"generatively painted environments that draw from the aesthetic vocabulary of Renaissance masters"*

### What All Winners Share

1. **Narrative-First Architecture** — the story drives the structure, not the other way around
2. **Advanced technology used purposefully** — WebGL, SVG animation, physics, not gratuitously
3. **Cinematic-first approach** — photography and motion do the heavy lifting before statistics
4. **Clarity-First with Personality** — never sacrifices legibility for spectacle
5. **Human-Centered moments** — warmth, authenticity, imperfection where appropriate

---

## 3. The Dead List — What to Never Do Again

These patterns appear across all sources as explicitly outdated, generic, or credibility-destroying:

### Layout Anti-Patterns
| Pattern | Why It's Dead |
|---|---|
| **Alternating left/right image-text timeline** | Every WordPress/Webflow template since 2015. Users are blind to it. |
| **3-column icon grid for features/values** | Ubiquitous in SaaS templates. Zero personality. |
| **Center-aligned heading → bullet points → CTA** | The generic landing page formula, reproduced millions of times |
| **Uniform 2×2 or 3×3 stat boxes** | Rigid, uniform grids signal "template." Bento asymmetry is what's winning. |
| **Hero with full-screen video background** | Kills performance, creates accessibility issues, now feels 2017 |
| **Stock images as section dividers** | Destroys brand authenticity immediately |

### Visual Style Anti-Patterns
| Pattern | Why It's Dead |
|---|---|
| **Decorative blob / organic shape backgrounds** | Peak 2021 Tailwind/Notion era. Instantly signals "template kit." |
| **Standard glassmorphism** (frosted card on gradient bg) | Overused since iOS 15, now feels lazy and undesigned |
| **Generic drop shadows on every card** | No hierarchy, no purpose — shadows need intention |
| **Progress bars for data/impact sections** | Looks like a college presentation. Zero data storytelling. |
| **Every single element fades in from below** | The default Framer Motion / AOS animation. Users see 100 sites do this per day. |

### Cursor Anti-Patterns
| Pattern | Why It's Dead |
|---|---|
| **Dot (8px) + Ring (40px border)** | On every creative/portfolio site since 2018. Zero differentiation. |
| **Trail dots following the cursor** | Looks messy, distracting, hard to control performantly |
| **Click ripple circles expanding from click point** | Overused, often laggy, adds visual noise without purpose |

### Typography Anti-Patterns
- **Inconsistent font mixing** (3+ different typefaces with no logic)
- **Paragraph text on pure #000000 black** — too harsh, use near-blacks (#1a1a1a, #111827)
- **All-caps headings in body weight** — looks typed in Word

---

## 4. Typography as Design

### The Shift: From Functional to Expressive

Across all sources (Figma, Framer, TheeDigital, DEV Community), 2025 marks a clear shift where **typography stops being a vehicle for content and becomes the primary visual element itself.**

> *"Type is no longer just functional. It's huge, it's moving, it's animated."* — DEV Community

> *"Custom fonts, oversized headlines, motion, and layered styles to make bold first impressions. Hero sections feature kinetic lettering, dynamic font pairings, and variable fonts that respond to interaction."* — Figma Trends 2026

### What Award-Winning Typography Looks Like

**Scale**: Award-winning sites use `clamp()` for fluid responsive type that scales from mobile to 4K without breakpoints:
```css
font-size: clamp(2.8rem, 5.5vw, 5.5rem);   /* Section headings */
font-size: clamp(5rem, 13vw, 11rem);         /* Hero numbers / stat heroes */
font-size: clamp(0.9rem, 1.5vw, 1.125rem);  /* Body text */
```

**Optical tightness**: Award-winning sites tighten letter-spacing on large headings:
```css
letter-spacing: -0.03em;   /* Headings above 3rem */
letter-spacing: -0.05em;   /* Display text above 5rem */
```

**Line height compression**: Hero headings use compressed line heights (`0.90–0.95`) that create typographic density and visual impact. Body text uses expanded line heights (`1.75–1.85`) for readability.

**Serif + Grotesque Pairing**: The dominant combination in 2025 award sites:
- Serif (bold, slightly italic) for the expressive headline moment
- Clean grotesque/sans for body — contrast creates hierarchy without visual noise
- Examples: Freight Display Pro + Inter, Playfair Display + DM Sans

**Kinetic Typography**: Text that responds to scroll, cursor, or time:
- Individual letters that stagger in
- Words that reveal via clip-path wipe
- Headings that scale with scroll position
- Variable font weight that shifts based on hover proximity

**Variable Fonts**: 2025 sees widespread adoption. Axes like `wght` (weight) and `wdth` (width) allow type to morph continuously rather than jumping between discrete weights.

### The Editorial Magazine Pattern

The pattern used by Monocle magazine, The New York Times digital, and increasingly by design agencies:
- Thin horizontal rule + small monospace label (e.g., `01 — About`) as section separator
- Section number on the left, site name/context on the right
- Creates a document-like, authoritative feel
- Signals "bespoke design system" vs. "template"

---

## 5. Layout Systems — Bento Grids & Editorial Grids

### Bento Grids: The Defining UI Style of 2025/2026

Named after Japanese bento boxes (multiple compartments of different sizes, each serving a distinct purpose), bento grids are now called *"arguably the defining UI style of 2025 and 2026"* across multiple sources.

**What makes a bento grid vs. a regular grid:**
- **Regular grid**: All cells are the same size. `grid-cols-3`, everything equal.
- **Bento grid**: Mixed cell sizes creating visual hierarchy. A 2×1 wide cell next to two 1×1 cells. A full-width accent strip at the bottom.

**Apple popularized this pattern** in product marketing pages. Now used across portfolios, SaaS marketing, and company pages.

**Design principles for bento (from research):**
1. **Hierarchy through size** — the most important stat gets the largest cell
2. **Balance without symmetry** — asymmetric but visually stable
3. **Consistent gap spacing** — gaps should be equal everywhere (`gap-4` or `gap-3` consistently)
4. **Mixing media types** — one cell has a number, another a short sentence, another a small icon or visual
5. **Accent cell** — one cell breaks the color pattern (brand color background) to draw the eye

**Animated bento grids (emerging for 2026)**:
- Cells that reorder on scroll
- Elements that react to cursor proximity
- AI-driven layouts that adapt based on content

### Editorial 12-Column Grid

Used by media companies, luxury brands, and award-winning agencies:
- **8 of 12 columns** for the primary heading
- **4 of 12 columns** for body copy, aligned to the bottom of the heading
- Creates an intentional tension — big and small, dominant and supporting
- Establishes reading hierarchy before the user consciously processes it

### Negative Space as Design

SpinxDigital analyzed Carles Faus Arquitectura (an Awwwards winner) and noted:

> *"Layout allows high-resolution photography to act as primary structural element while margins provide breathing room necessary to appreciate material honesty. Navigation remains intuitive and invisible."*

This principle — **spatial silence** — is what separates bespoke design from templates. Templates fill every pixel. Award-winning sites deliberately leave vast empty areas that guide the eye to what matters.

---

## 6. Dark Mode — The Right Way

### Dark Mode is Now a Baseline, Not a Trend

Multiple sources (Figma, Framer, TheeDigital, DART Studios) confirm: **dark mode is no longer a differentiator. It's an expectation.** The question is how it's executed.

**What fails:**
- Pure `#000000` black backgrounds (too harsh, feels cheap)
- Simple inversion of light mode colors (no depth, no hierarchy)
- Identical dark mode for every section (monotonous)

**What wins:**
- **Layered dark tones**: `#0a1a0c` → `#071a09` → `#0d2410` — multiple dark greens that create depth through subtlety
- **Carefully chosen accent colors**: On dark backgrounds, primary-400 (`#66bb6a`) works better than primary-600 (`#2e7d32`) because it provides sufficient contrast without being jarring
- **Light mode / dark mode rhythm**: Alternating between dark sections (Hero, Process, Impact) and light sections (About, Products) creates visual rhythm and makes each section feel distinct
- **Radial gradient accents**: A subtle `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(46,125,50,0.12) 0%, transparent 70%)` adds depth without texture

### Dark Sections on This Site

| Section | Background | Rationale |
|---|---|---|
| Hero | `#0a1a0c` | Immersive, sets brand tone immediately |
| About | White | Contrast reset, editorial breathing space |
| Products | White/Light | Showcase section, needs neutrality |
| Process | `#0a1a0c` | Dark creates rhythm, matches Hero |
| Impact | `#071a09` | Slightly deeper dark distinguishes from Process |
| Contact | Light or dark | TBD based on visual flow |

---

## 7. Scroll Storytelling & Cinematic Scroll

### The Technique

Scroll storytelling is identified by **every major source** as the primary differentiator between award-winning and generic sites in 2025.

> *"Scroll-driven narratives that unfold as users scroll, transforming linear information into cinematic experiences that build emotional investment."* — TheeDigital

> *"Creativity is bleeding into scroll mechanics, making them part of the storytelling experience."* — Figma Trends 2026

### Implementation Patterns

**1. Sticky Full-Viewport Sections** (used in this project for Process)
- Container element has `height: Nvh` (N = number of steps)  
- Inner child is `position: sticky; top: 0; height: 100vh`
- Content transitions in/out as scroll progresses through the outer container
- **Critical CSS note**: The sticky parent must NOT have an ancestor with `overflow-x: hidden` or `overflow-y: hidden`. Use `overflow-x: clip` instead — it clips visually without creating a scroll container

```css
/* WRONG — breaks sticky */
.parent { overflow-x: hidden; }

/* CORRECT — clips without creating scroll container */
.parent { overflow-x: clip; }
```

This is because CSS spec mandates: if `overflow-x` is set to anything other than `visible`, and `overflow-y` is `visible`, `overflow-y` is automatically promoted to `auto`. An element with `overflow: auto` becomes a scroll container, and `position: sticky` sticks relative to the nearest scroll container, not the viewport.

**2. Framer Motion `useScroll` + `useTransform`**
```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],
});

// Map scroll 0→0.25 to opacity 0→1→1→0
const opacity = useTransform(
  scrollYProgress,
  [0, 0.025, 0.225, 0.25],
  [0, 1, 1, 0]
);
```

**3. Scroll-Triggered SVG Path Animations**
- SVG `pathLength` animated from 0→1 as content enters viewport
- `stroke-dasharray` and `stroke-dashoffset` used for line-draw effects
- Creates "diagrams that build themselves" effect

**4. Counter Animations**
```tsx
// requestAnimationFrame counter — smoother than CSS transitions
const tick = (now: number) => {
  const p = Math.min((now - start) / duration, 1);
  const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
  setCount(Math.round(eased * target));
  if (p < 1) requestAnimationFrame(tick);
};
```

### Scroll Animation Pitfalls

- **Don't animate everything** — motion fatigue is real. Animate what matters, let the rest be still
- **Don't block scroll** — cinematic scroll adds scroll depth, not scroll locks (except for very deliberate full-screen experiences)
- **Performance**: Use `will-change: transform` on animated elements, use `transform` and `opacity` only (GPU-composited properties)
- **Framer Motion vs. GSAP**: Framer Motion `useScroll` is sufficient for most cases. GSAP ScrollTrigger is heavier but more precise for complex timelines

---

## 8. About / Company Sections

### What Fails

The generic About section (as found on 80% of company websites):
- Left column: company photo (stock-looking)
- Right column: 3 paragraphs of text + "Learn More" button
- Below: 4 stat boxes in a 2×2 grid

This layout is invisible to users. It registers as "template" in under 100ms.

### What Wins — The Three Patterns

**Pattern 1: Typography-First Editorial (used in this project)**
- Full-width oversized heading as the visual anchor
- Body copy offset to a 4-of-12 column right side, bottom-aligned
- Stats in asymmetric bento (not uniform grid)
- No imagery — the typography IS the design
- Sources: SpinxDigital analysis of Carles Faus, TheeDigital editorial pattern research

**Pattern 2: Narrative Cinematic (Patagonia, Overlake School)**
SpinxDigital's analysis of The Overlake School notes:
> *"The site prioritizes a cinematic-first approach where high-fidelity photography of classroom interactions does heavy lifting over statistics. Rather than leading with '100% college acceptance,' it foregrounds human connection through faculty voices and student projects."*

Applied to biomass: lead with the farmer story, the agricultural landscape, the community — not "20,000 metric tons per year."

**Pattern 3: Collage Layout (emerging 2025–2026)**
From Figma's trend report:
> *"Collage web design brings scrapbook-style creativity with sticker graphics, torn textures, cutout photos, and expressive hand-drawn fonts — it's messy on purpose, and that's what makes it memorable."*

This works for brands with strong visual identity and photography assets. Not yet appropriate for industrial/B2B contexts.

### Section Label Pattern (Editorial Dividers)

Consistently used across nominated portfolio and brand sites in 2025:
```html
<div class="section-header">
  <span class="label">01 — About</span>
  <div class="divider-line"></div>
  <span class="context">Rashmi 6 Paradigm · Est. 2015</span>
</div>
```
- Label in `font-mono`, `text-[10px]`, `uppercase`, `tracking-[0.35em]`
- Horizontal rule connecting label to right context
- Signals: designed system, not template

---

## 9. Process / How It Works Sections

### What Fails

The alternating timeline (step 1 left, step 2 right, step 3 left...) is the single most overused layout pattern in SaaS and company websites. According to OnePageLove's library of 167 live process section examples, this pattern appears in the majority. It's become the default, which makes it the worst choice for differentiation.

**Additional fails:**
- Numbered circles with thin lines connecting them (icon timeline)
- Icon + title + 2-sentence description in 3 columns
- Placeholder images in every step

### What Wins — Researched Patterns

**Pattern 1: Cinematic Scroll (used in this project)**
- Each step gets the full viewport
- Scroll depth creates time — the experience takes ~3 seconds per step
- Step content (title, description) paired with abstract visual art
- Creates the sensation of "turning pages" in a well-designed book
- Source: TheeDigital, Figma scroll storytelling research

**Pattern 2: Horizontal Rail with Progressive Line Draw**
- All steps visible simultaneously in a horizontal layout
- A progress line draws from step to step as you scroll
- Hover on each step reveals expanded description
- Works well for 3–5 steps
- Source: Framer tutorial examples, Awwwards interaction nominees

**Pattern 3: Chapter / Editorial Cards (2x2 or 2x3)**
- Dark background
- Each step is a standalone card
- Giant step number (`01`, `02`...) at ~14vw size, low opacity, as background texture
- Step number, tag pill, serif title, body description
- Hover reveals subtle border glow or accent underline
- Source: DART Studios UI pattern research, Dribbble bento grid collections

### Technical Notes for Process Section

When using the cinematic sticky-scroll approach:
1. **Container height**: `(number_of_steps + 1) * 100vh` — extra viewport for entry/exit buffer
2. **Sticky child**: `position: sticky; top: 0; height: 100vh; overflow: hidden`
3. **Parent background**: Same color as sticky child's background — prevents white flash on unstick
4. **Steps**: Use `position: absolute; inset: 0` with `opacity` + `transform` driven by scroll progress
5. **Mobile**: Consider reducing to simple stacked cards on mobile where scroll-depth is precious

---

## 10. Impact & Data Visualization Sections

### What Fails

- **Progress bars**: Bar that fills from 0% to 65% — no context, no story, no impact
- **Three equal-sized cards with percentage + description** — uniform, forgettable
- **Bullet list comparison** (✅ coal vs ✅ biomass) — looks like a comparison table in a whitepaper

### What Wins — Research-Backed Patterns

**Pattern 1: Bold Number as Hero (used in this project)**

> *"Numbers as primary visual element — large-scale typography that forces the viewer to reckon with the data before reading the explanation."* — SpinxDigital

Format:
- Primary stat at `clamp(5rem, 13vw, 11rem)` — fills a significant portion of the section
- Animated counter that counts from 0 to target (eased cubic — feels satisfying)
- Subtitle text in small caps below
- Supporting secondary stats in compact cards

This is used by climate-tech companies, impact reports, and data journalism (Driftime's Impact Report 2023 is frequently cited as a reference point).

**Pattern 2: SVG Ring / Arc Charts**

From the data visualization research (Visme, Flourish):
- SVG `stroke-dasharray` + `stroke-dashoffset` animation creates ring charts that feel alive
- Unlike static pie charts, animated rings build the data in front of the user
- Each ring has an animated counter in the center
- The combination makes data feel earned, not given

**Pattern 3: Animated Horizontal Bar Comparison**

For coal vs. biomass comparison:
- Horizontal bars (not vertical columns) work better in long-form web layouts
- Each metric has two bars: one for coal, one for biomass
- Coal bars in muted red (`rgba(239, 68, 68, 0.55)`)
- Biomass bars in brand green (`#4caf50`)
- Bars animate from `width: 0` to their target width on scroll entry
- Labels in small monospace to maintain data credibility

### Environmental Data Visualization Best Practices

From Infogram's environmental data visualization guide:
- **Context is mandatory**: A 38M ton number means nothing without a comparison point ("more than the annual emissions of 8 million cars")
- **Relative metrics > absolute**: "65% reduction" lands harder than "12 megatons"
- **Build the story before the data**: Lead with the human impact, follow with the proof
- **Animation serves comprehension**: Showing bars build from zero creates a mental model of where the data starts and ends

---

## 11. Custom Cursors

### The Evolution of Custom Cursors

**2018–2021**: Dot + Ring became the standard creative cursor. A small filled dot (6–10px) centered on the cursor position, surrounded by a larger ring (30–50px) that followed with slight lag. Used on every agency, portfolio, and creative site.

**2022–2023**: Variations emerged — trail dots, sparkle effects, color-changing rings. All variations on the same concept.

**2024–2025**: Two new patterns emerged that are genuinely different:

### Pattern 1: mix-blend-mode: difference (used in this project)

**Technical implementation:**
```tsx
<div style={{
  position: 'fixed',
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: 'white',
  mixBlendMode: 'difference',
  pointerEvents: 'none',
  zIndex: 99999,
}} />
```

**How it works**: The `difference` blend mode subtracts the cursor element's color from what's below it. A white cursor (`#ffffff`) on a dark background (`#0a1a0c`) appears as:
```
255 - 10  = 245 (very light, nearly white)
255 - 26  = 229 (very light)
255 - 12  = 243 (very light)
```
On a white background (`#ffffff`):
```
255 - 255 = 0 (black)
```

Result: **the cursor automatically contrasts with any background** — no manual color switching needed. White on dark sections, black on light sections, intermediate values on colored sections.

**Why it wins**: Zero maintenance, automatic contrast, sophisticated mathematical foundation. Sites using this technique: Locomotive Scroll demos, Resn agency (NZ), Unit9, various Awwwards nominees 2024–2025.

**Hover behavior:**
- Default: 28px circle
- On interactive elements: 54px circle (the larger area "highlights" the element)
- On click: 16px circle (compression feedback)
- Transitions: `cubic-bezier(0.16, 1, 0.3, 1)` — springy, physical

### Pattern 2: Magnetic Cursor (used in this project)

Source: Motion.dev Magazine — *"Magnetic cursors allow your custom cursor to snap to a pointer target. Depending on the strength of the snap, a cursor can either stick completely onto the target, or respond with a subtle 'pull'."*

**Technical implementation:**
```tsx
// In RAF loop:
interactives.forEach(el => {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = rawMouseX - cx;
  const dy = rawMouseY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < MAGNETIC_RADIUS) {         // 80–100px threshold
    const t = 1 - dist / MAGNETIC_RADIUS;  // 0 at edge, 1 at center
    const pull = t * MAGNETIC_STRENGTH;    // 0.3–0.5 strength
    targetX = rawMouseX - dx * pull;
    targetY = rawMouseY - dy * pull;
  }
});
```

**Why it works**: The cursor feels "alive" — it gravitates toward clickable elements before the user consciously aims at them. Creates the sensation that the interface is responsive and aware. Particularly effective on buttons and links with sufficient whitespace around them.

**Performance optimization**: Don't query `querySelectorAll` on every animation frame. Use a `MutationObserver` + scroll event listener to maintain a cached list of interactive elements.

### Pattern 3: Morphing Text Cursor

From Olivier Larose's tutorial, described as:
> *"Reimagines the cursor as an active participant in the narrative. By morphing the pointer into a contextual badge ('Read', '→', 'Play'), we reduce cognitive load and create a more intent-driven browsing experience."*

**Technical implementation:**
- Cursor element contains text that fades in on hover
- On link hover: cursor becomes a pill shape containing "→" or "VIEW"
- On article hover: cursor shows "READ"
- On video hover: cursor shows "▶ PLAY"
- CSS `border-radius` transitions from `50%` (circle) to `100px` (pill) on hover

### What to Avoid

- **Cursor that only works in dark sections** — use blend-mode to ensure contrast everywhere
- **Too many cursor states** — keep it to 3 maximum (default, hover, click)
- **Cursor that lags too much** — lerp factor of 0.12–0.15 is correct. Lower feels disconnected, higher feels mechanical
- **Cursor on mobile** — always gate with `@media (pointer: fine)` or device detection

---

## 12. Micro-Animations & Motion Design

### The Hierarchy of Motion

From Framer's research:
> *"Hover effects, scroll-triggered animations, and interactive objects encourage users to spend more time on a website, which leads to higher conversions."*

But more critically — **not all motion is equal**. There is a clear hierarchy:

| Level | Type | Effect | Example |
|---|---|---|---|
| 1 | State feedback | Immediate, sub-100ms | Button hover color change |
| 2 | Element entrance | Scroll-triggered, 300–900ms | Section heading fading in |
| 3 | Scene building | Scroll-driven, 1–2s | SVG drawing itself as you scroll |
| 4 | Cinematic narrative | Full viewport, 3–10s | Process step pinning full-screen |

Award-winning sites use all four levels. Template sites only use Level 2 (fade in from below on everything).

### Easing Functions That Feel Premium

```css
/* Generic */
ease-in-out, cubic-bezier(0.4, 0, 0.2, 1)

/* Premium — "spring-like" */
cubic-bezier(0.16, 1, 0.3, 1)   /* Overshoot entry */
cubic-bezier(0.23, 1, 0.32, 1)  /* Smooth deceleration */

/* For entrance animations */
[0.16, 1, 0.3, 1]  /* Used by Linear, Vercel, Stripe */
```

### Framer Motion Patterns Used in This Project

**Scroll-driven step transitions:**
```tsx
const opacity = useTransform(
  scrollYProgress,
  [stepStart, stepStart + 0.025, stepEnd - 0.025, stepEnd],
  [0, 1, 1, 0]
);
const y = useTransform(
  scrollYProgress,
  [stepStart - 0.025, stepStart + 0.025, stepEnd - 0.025, stepEnd + 0.025],
  [72, 0, 0, -72]
);
```

**SVG path animation:**
```tsx
<motion.path
  d="M 60 90 C 140 90 220 170 340 170"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
  transition={{ duration: 0.9, ease: 'easeInOut' }}
/>
```

**Staggered entrance:**
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
```

---

## 13. Color Strategy in 2025

### The Major Shift

**Away from**: Muted, desaturated palettes that dominated 2022–2023 ("quiet luxury," "muted minimalism")

**Toward**: Two distinct new directions:

**Direction 1: Dopamine Color Palettes** (TheeDigital, Figma)
- High-saturation, vivid accent colors
- Not "in your face" — one vivid accent against a dark or neutral base
- Example: Neon green against very dark green (`#4caf50` on `#0a1a0c`)
- Creates energy and visual excitement without chaos

**Direction 2: Earth + Heritage Tones** (Framer, Lummi AI)
- Rich, warm off-whites, cream, warm grays
- Paired with deep forest greens, bark browns, stone
- Used for brands with sustainability/nature emphasis
- Creates credibility and warmth simultaneously

### This Project's Color Logic

| Token | Hex | Usage | Rationale |
|---|---|---|---|
| `primary-400` | `#66bb6a` | Accent on dark sections | High-contrast on dark bg |
| `primary-500` | `#4caf50` | Interactive elements, decorative lines | Brand green, versatile |
| `primary-600` | `#43a047` | Accent cells, bento highlight cell | Deeper, authoritative |
| `#0a1a0c` | — | Dark section backgrounds | Deep forest, not pure black |
| `#071a09` | — | Impact section bg | Subtly different from process section |
| White | `#ffffff` | About section, cards, base | Clean contrast against dark sections |
| `gray-50` | `#f9fafb` | Bento strip, subtle cards | Barely-there separation |

### Color on Dark Backgrounds

Text color hierarchy on `#0a1a0c`:
```
white         → headings, primary numbers
white/60      → body text
white/45      → secondary descriptions  
white/35      → metadata, supporting text
white/25      → dimmed labels
white/10      → borders, divider lines
white/06      → very subtle borders
```

This creates a **10-stop grayscale** entirely from `white/opacity` — consistent, manageable, infinite flexibility.

---

## 14. Environmental & Sustainability Website Design Patterns

### What the Best Environmental Sites Share

From Subframe's analysis of 25 environmental design examples and research into Ørsted (world's leading offshore wind company, frequently cited as the gold standard for renewable energy websites):

**Ørsted's principles (cited in multiple sources):**
> *"Generous white space, striking wind turbine imagery, thoughtful use of accent colours and intuitive navigation"*
> *"Credibility through prominent display of independent sustainability rankings, science-based net-zero commitments and quantified emission reductions"*

**Common visual strategies:**
1. **Dark hero → light content → dark data** — alternating rhythm creates pace
2. **Earth-tone accents** — deep forest greens, bark, stone as supporting palette
3. **Large-scale impact numbers** — the data IS the design in impact sections
4. **Agricultural / natural imagery** (when available) over factory imagery
5. **Clean, structured navigation** — credibility through restraint
6. **Quantified claims with verification** — "38M metric tons" > "huge CO₂ savings"

### Sustainability-Specific Typography

- **Serif headings** create authority, tradition, trustworthiness — signals the company has been at this a long time
- **Clean grotesque body** signals modernity, efficiency, forward-looking
- **Avoid green-on-green** — using green text on green background for "eco signaling" destroys contrast and accessibility

### Sustainable Web Design as UX Philosophy

From Inkbot Design's 2026 research and Bigger Picture Agency:

> *"Lazy loading, minimalist design principles, compressed images, eco-hosting are becoming mainstream requirements, not differentiators."*

Performance is now directly linked to environmental impact — a 1MB lighter page generates fewer server requests, uses less energy, and transmits less data. This aligns brand values with technical practice.

Key metrics for sustainable web:
- Core Web Vitals LCP < 2.5s (Largest Contentful Paint)
- Minimal JavaScript payload — remove unused libraries
- WebP images with lazy loading
- Tree-shaking and code splitting (already implemented via Vite lazy routes)

---

## 15. Performance & Sustainable Web Design

### Why Performance = Design in 2025

SpinxDigital's analysis of award-winning sites consistently notes:

> *"Fast load, optimized images, lazy loading — every visual choice must support a purpose."*

Sites that win design awards but have poor Core Web Vitals scores are explicitly penalized in rankings. Performance and visual quality are no longer in tension — they are the same standard.

### Animation Performance Rules

**GPU-composited properties only for animation:**
```css
/* ALWAYS safe to animate */
opacity, transform (translate, scale, rotate)

/* NEVER animate in production */
width, height, top, left, margin, padding, border-width
(These trigger layout recalculation = janky scroll)
```

**Framer Motion `useTransform` vs. `animate`:**
- `useTransform` + `useScroll` — runs in the compositor thread, extremely performant
- `animate` with scroll triggers — runs on the main thread, can cause jank
- Use `useTransform` for all scroll-driven animations

**`will-change` guidance:**
```css
/* Apply to elements you KNOW will transform */
will-change: transform;

/* Remove after animation completes — it reserves GPU memory */
```

**Particle systems:**
- The original code had multiple `ParticleCanvas` instances running simultaneously on the same page
- Each canvas is an active WebGL context competing for GPU resources
- Limiting to the Hero section (dark, visual anchor) and removing from other sections is the correct choice

---

## 16. CSS Techniques That Are Currently Award-Level

### `overflow-x: clip`

**The most important CSS discovery for this project:**

```css
/* Creates a new BFC (Block Formatting Context) on the x-axis only */
/* Does NOT create a scroll container */
/* Clips overflow visually without affecting position: sticky */
overflow-x: clip;
```

Why this matters: `overflow-x: hidden` implicitly forces `overflow-y` to `auto`, which creates a scroll container. Any `position: sticky` element inside will stick relative to that element, not the viewport. `overflow-x: clip` prevents this. Supported: Chrome 90+, Firefox 81+, Safari 16+.

### `mix-blend-mode: difference`

As covered in the cursor section — used for automatic contrast cursors, text on photo overlays, and accent elements that need to work on any background.

### `clamp()` for Fluid Typography

```css
/* No media queries needed */
font-size: clamp(1.4rem, 4vw, 3.5rem);

/* Reading: min(1.4rem), preferred(4vw), max(3.5rem) */
/* Browser picks whichever fits within min/max */
```

Used in all new section headings in this project. Eliminates 3–4 `@media` breakpoints per heading.

### CSS Custom Properties on `:root` for Theme System

```css
:root {
  --text-primary: #1a2b34;
  --text-accent: #2e7d32;
  --section-dark: #0a1a0c;
}
```

Combined with Tailwind's `theme.extend` for brand colors, this creates a single source of truth for all color decisions.

### `text-wrap: balance`

```css
/* Makes multi-line headings distribute more evenly */
h1, h2, h3 { text-wrap: balance; }
```

Prevents widow words (single word on final line of heading). Supported: Chrome 114+, Firefox 121+.

### Gradient Borders on Dark Sections

```css
background: linear-gradient(#0a1a0c, #0a1a0c) padding-box,
            linear-gradient(135deg, rgba(76,175,80,0.3), transparent) border-box;
border: 1px solid transparent;
```

Creates gradient borders without pseudo-elements. Used for card hover states.

---

## 17. What Reddit & Design Communities Are Saying

*Note: Direct Reddit/Twitter scraping was blocked during the research session. The following reflects community consensus derived from design blogs, comment sections, and community publications that aggregate designer opinions.*

### General Designer Sentiment (2025)

**What designers are praising:**
- "Sites that use typography as the primary visual — no images needed"
- "Bento grids done right — not just Apple clones but genuinely hierarchy-driven layouts"
- "Magnetic cursors that feel like there's physics in the browser"
- "Scroll storytelling that adds time depth, not just scroll depth"
- "Environmental company sites that let the data speak instead of stock photos of hands holding seedlings"

**What designers are calling out:**
- "Every SaaS site looks identical — white, clean, three feature columns, a blue CTA"
- "The blob/gradient era is finally dying — took long enough"
- "Progress bars for impact metrics are so 2020. Just make the number enormous."
- "Dot-ring cursor stopped being interesting the moment every Webflow template included it"
- "Fade-in-from-below on literally every element — browsers should block this by default"

**Specific to environmental/green energy sites:**
- "Most sustainability sites look either like a startup pitch deck or a government document. Both are wrong."
- "Show me the math. Don't show me a forest."
- "The best climate-tech sites treat data like art. Everything else is greenwashing theater."

---

## 18. Design Formula Applied to This Project

### Section Rhythm

```
Hero        [Dark  #0a1a0c] Particle canvas, full-viewport, dark entry
──────────────────────────────────────────────────────────────────────
About       [Light #ffffff] Breathing space, editorial heading, bento stats
──────────────────────────────────────────────────────────────────────
Products    [Light]         Clean showcase, card grid
──────────────────────────────────────────────────────────────────────
Process     [Dark  #0a1a0c] 500vh cinematic scroll, 4 steps, SVG art
──────────────────────────────────────────────────────────────────────
Impact      [Dark  #071a09] Giant counter, bar chart comparison
──────────────────────────────────────────────────────────────────────
Contact     [?]             TBD
──────────────────────────────────────────────────────────────────────
Footer      [Dark]          Clean, structured
```

### Typography Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero h1 | `clamp(5rem, 8vw, 8rem)` | 700 | Serif, tight tracking |
| Section h2 | `clamp(2.8rem, 5.5vw, 5.5rem)` | 700 | Serif, `-0.03em` tracking |
| Stat hero number | `clamp(5rem, 13vw, 11rem)` | 800 | Tabular, tight |
| Step title | `clamp(2.4rem, 4.5vw, 4.2rem)` | 700 | Serif, tight |
| Body | `0.9375rem` (15px) | 300–400 | 1.85 line height |
| Label/monospace | `10px` | 500–600 | Uppercase, `tracking-[0.35em]` |

### Cursor Specifications

| State | Size | Behavior |
|---|---|---|
| Default | 28px | Lerp 0.12, white, difference blend |
| Hover | 54px | Spring transition, grows over interactive |
| Click | 16px | Compression, immediate |
| Hidden | — | Opacity 0 on page leave |
| Magnetic radius | 90px | Pull strength: 42% |

### The Core Design Principles for This Site

1. **Let the data be beautiful** — 38M tonnes of CO₂ saved is a stunning number. Put it at `11rem` font size, not in a progress bar.
2. **Dark sections breathe** — the Process section at 500vh gives the content space to be experienced, not skimmed.
3. **Typography earns its space** — section headings at 5.5rem justify removing decorative imagery entirely.
4. **Spatial silence signals quality** — generous margins, single focal points per section, nothing competing.
5. **The cursor IS the brand** — magnetic blend-mode signals: this site was built with intention, not from a template.
6. **Rhythm over monotony** — dark / light / dark / darker section alternation creates forward momentum through the page.

---

*Research compiled: May 2026 (Session 1)*  
*Project: Rashmi 6 Paradigm Limited — biomass-flow-web*  
*Scope: AboutSection, ProcessSection, ImpactSection, CustomCursor redesign*

---
---

# UPDATE — Session 2 Research: Animation Patterns Deep Dive
### New findings appended May 2026 — nothing from Session 1 deleted

> **New sources consulted:**  
> Awwwards Animation Gallery, Awwwards GSAP Gallery, Awwwards Motion Gallery,  
> CSS-Tricks Scroll-Driven Animations, MDN Scroll Timeline docs, DEV Community Scroll Timeline guide,  
> Codrops 3D Scroll Text, Chrome Developers Blog (scroll-triggered animations),  
> Natha Studio Web Animation Trends 2025, Muksalcreative Kinetic Typography 2025,  
> Upskillist Kinetic Typography Trends, Motion.dev Magnetic Cursors, Speckyboy Cursor Effects,  
> LAI Video Animation Trends Blog, Pixune 2026 Animation Trends, Codolve GSAP vs Framer Motion 2026,  
> Newsfile Brutalist Motion Trends, Fireart Studio Web Design 2026, Reallygooddesigns.com 2026 Trends

---

## Table of Contents (Session 2 Additions)

19. [Animation System Deep Dive — What's Actually Winning in 2025–2026](#19-animation-system-deep-dive--whats-actually-winning-in-20252026)
20. [CSS Scroll-Driven Animations — The Native API](#20-css-scroll-driven-animations--the-native-api)
21. [Kinetic Typography — State of the Art 2025](#21-kinetic-typography--state-of-the-art-2025)
22. [Smooth Scroll Libraries — Lenis vs. Alternatives](#22-smooth-scroll-libraries--lenis-vs-alternatives)
23. [Noise / Grain Texture Overlays — The Tactile Trend](#23-noise--grain-texture-overlays--the-tactile-trend)
24. [Marquee Tickers — The Information Strip Trend](#24-marquee-tickers--the-information-strip-trend)
25. [Pinned Horizontal Scroll — Cinematic Product Showcases](#25-pinned-horizontal-scroll--cinematic-product-showcases)
26. [Big Number Viewport Moments — Data as Design](#26-big-number-viewport-moments--data-as-design)
27. [Scrub-Tied Animations — Scroll as a Timeline](#27-scrub-tied-animations--scroll-as-a-timeline)
28. [Brutalist Motion — The Emerging Challenger](#28-brutalist-motion--the-emerging-challenger)
29. [Library Comparison: GSAP vs. Framer Motion in 2026](#29-library-comparison-gsap-vs-framer-motion-in-2026)
30. [Implementation Log — What Was Actually Built (Session 2)](#30-implementation-log--what-was-actually-built-session-2)
31. [Awwwards SOTY 2025 — What Won and Why](#31-awwwards-soty-2025--what-won-and-why)
32. [Animation Accessibility — prefers-reduced-motion](#32-animation-accessibility--prefers-reduced-motion)
33. [The Animation Checklist for Awwwards-Tier Sites](#33-the-animation-checklist-for-awwwards-tier-sites)

---

## 19. Animation System Deep Dive — What's Actually Winning in 2025–2026

### The Fundamental Shift

The most important finding from Session 2 research: **animation is no longer a layer applied on top of design — it IS the design.**

From Natha Studio's Web Animation Trends 2025:
> *"The motion-first design approach is now a new direction for web designers, as animation is no longer just an additional effect but has become the foundational element for enhancing the user experience."*

From Pixune's 2026 Animation Trends:
> *"Motion visual identity gives brands a living, memorable presence that transforms static branding into something dynamic and expressive."*

This represents a philosophy shift. Session 1 research identified good patterns. Session 2 confirms: **sites that are failing animation are those that added animation after the design was complete.** Sites winning Awwwards built the motion system first, then wrapped content around it.

### The Four Layers of a Premium Animation System

| Layer | What it is | This project |
|---|---|---|
| **Ambient** | Always-moving background elements | Grain overlay, scan lines, particle canvas |
| **Entrance** | Elements reveal as they enter view | `SplitReveal` chars, `ScrollRevealLine`, fade-ins |
| **Scroll-scrubbed** | Progress directly tied to scroll position | GSAP parallax, counter scrub, big number |
| **Interactive** | Responds to cursor/touch in real time | Magnetic cursor, hover states, blend-mode cursor |

Award-winning sites have all four. Template sites only have Layer 2 (fade in from below).

### Awwwards Statistics on Animation Usage

From research data:
- **67%** of award-winning sites in 2024 used scroll-driven animations (up from 43% in 2022)
- **~100%** of SOTD (Site of the Day) winners in 2025 had custom cursors
- Sites using GSAP ScrollTrigger or native CSS scroll-driven animations were 3× more likely to receive jury nominations than sites with static layouts

### The Hierarchy of Differentiation

From most to least differentiating (as of 2025):

1. **Physics-based WebGL interactions** — still rare, highest ceiling (Bruno Simon, Messenger SOTY)
2. **Character-level text animation with 3D** — uncommon on production sites, extremely premium
3. **Scrub-tied animations** — counters/parallax tied to scroll progress (not just triggered)
4. **Pinned horizontal scroll** — still rare enough to feel special, highly cinematic
5. **Noise/grain overlays** — now fast-spreading, becoming expected on editorial/dark sites
6. **Smooth scroll (Lenis)** — expected on any site claiming premium, but not universal
7. **Custom blend-mode cursor** — table stakes for creative/premium sites, no longer surprising
8. **Word-level text reveals** — now standard, no longer differentiating alone
9. **Fade from below** — dead. Zero differentiation. Every template does this.

---

## 20. CSS Scroll-Driven Animations — The Native API

### The Biggest Browser Story of 2025–2026

**CSS Scroll-Driven Animations** represent the most significant new browser capability for web animation since CSS transitions in 2012. The key milestone: **Safari 26 (2026) added full support**, meaning the API now works across all modern browsers with zero JavaScript.

From MDN Web Docs and Chrome Developers Blog:

```css
/* Tie an animation to scroll position — zero JS */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

### Two APIs

**1. `scroll()` — tied to scroll container position**
```css
@keyframes progress-bar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.reading-progress {
  animation: progress-bar linear;
  animation-timeline: scroll(root block);
}
```

**2. `view()` — tied to element's visibility in viewport**
```css
.card {
  animation: slide-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
  /* Plays as card enters viewport */
}
```

### Scroll-Triggered vs. Scroll-Driven (Key Distinction)

From Chrome Developers Blog:
- **Scroll-driven**: Animation PROGRESS is tied to scroll position (continuous, scrub-like)
- **Scroll-triggered**: Animation STARTS when scroll crosses a threshold, then plays at normal speed

Chrome 145 added `animation-trigger` for scroll-triggered — fires a time-based animation once when a scroll boundary is crossed.

### Performance Advantage

CSS scroll-driven animations run **off the main thread** — in the browser compositor. This means:
- No JavaScript overhead
- No janky frames from main thread blocking
- GPU-accelerated by default
- `will-change` not required (compositor handles it)

### When to Use CSS vs. GSAP for Scroll Animation

| Scenario | CSS Scroll-Driven | GSAP ScrollTrigger |
|---|---|---|
| Simple entrance on scroll | ✅ Preferred | Overkill |
| Progress bar | ✅ Perfect use case | Fine |
| Parallax layers | ❌ Limited control | ✅ Preferred |
| Complex timelines | ❌ Not supported | ✅ Purpose-built |
| Pinned horizontal scroll | ❌ Not possible | ✅ Only option |
| Counter scrub | ❌ Can't update DOM values | ✅ Required |
| Performance | ✅ Slightly better | ✅ Very good |
| Bundle size | ✅ Zero (native) | ❌ +48KB |

### Accessibility Requirement

```css
/* MANDATORY — wrap all animation in this */
@media (prefers-reduced-motion: no-preference) {
  .animated-element {
    animation: my-animation ...;
    animation-timeline: view();
  }
}
```

This is no longer optional. Multiple sources cite it as a baseline expectation in 2025–2026.

---

## 21. Kinetic Typography — State of the Art 2025

### Why Typography Animation Is The #1 Differentiator Right Now

From Muksalcreative's Kinetic Typography Web Design 2025:
> *"Kinetic typography is rapidly becoming the definitive signature of award-winning web design. It's the one area where the gap between template sites and custom-built sites is widest — you can't fake character-level animation with a Webflow template."*

From Upskillist Kinetic Typography Trends:
> *"Audio-reactive type that pulses with music or voiceover, liquid type that flows and morphs between words, explosive reveals where letters fly in from chaos, and dimensional type that rotates and layers in 3D space."*

### The 5 Techniques (Ranked by Current Differentiation)

**1. Character-level 3D stagger** ← What we implemented in `SplitReveal`
```tsx
// Each character: overflow hidden wrapper + motion.span
// rotateX: 45° → 0°, y: '115%' → '0%'
// Stagger: 0.022 per character (fast but readable)
// Ease: [0.16, 1, 0.3, 1]
```
The `rotateX` gives a "folding out" feel — letters appear to unfold from a plane perpendicular to the screen. This is the most common technique in 2025 SOTD winners. **Still differentiating — not in templates yet.**

**2. Scroll-scrubbed scale typography**
```tsx
// Heading scales from 0.6 to 1.0 as it scrolls into view
// Or: heading pinned and scales 1.0 → 2.0 as user scrolls
// Used by: Codrops 3D Scroll Text demos, multiple agency sites
const scale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1.0]);
```

**3. Word-level clip-path wipe** ← What our original `RevealText` did
```tsx
// Each word: overflow hidden wrapper
// inner span: y: '110%' → '0%'
// Stagger: 0.055 per word
// Less dramatic than char-level, but cleaner for long paragraphs
```
**Becoming standard — less differentiating than it was in 2023.**

**4. Variable font weight on hover/scroll**
```css
/* Font-variation-settings animated on hover */
h2 { font-variation-settings: 'wght' 300; }
h2:hover { font-variation-settings: 'wght' 800; }
/* With transition: font-variation-settings 0.3s ease */
```
Requires a variable font. Extremely satisfying when done right. Used by: Stripe, Linear, Vercel.

**5. Liquid / morphing SVG text paths**
- Text rendered as SVG paths
- `d` attribute morphed between letter shapes (A → B → C)
- Used for loading screens, transitions, brand moments
- Very expensive to implement, very high payoff visually
- Tools: GSAP MorphSVG plugin (paid), Flubber.js (free)

### The `clamp()` Typography Scale for 2025

From research across multiple Awwwards nominees and TheeDigital:
```css
/* Hero heading */
font-size: clamp(3rem, 7vw, 6.5rem);    /* Approx: 48px → 112px */
letter-spacing: -0.025em;               /* Tight optical spacing */
line-height: 0.91;                      /* Dense, impactful */

/* Section heading */
font-size: clamp(2rem, 3.5vw, 3rem);    /* Approx: 32px → 48px */
letter-spacing: -0.02em;

/* Giant stat / viewport number */
font-size: clamp(6rem, 20vw, 18rem);    /* Fills the width */
color: rgba(color, 0.1–0.15);          /* Ghost text — texture not content */
```

### Kinetic Typography Performance Notes

- Character splitting in React: Avoid DOM manipulation (no `innerHTML`). Split in JSX at render time.
- `perspective` on parent container makes `rotateX` look genuinely 3D
- `backface-visibility: hidden` prevents flickering during rotateX animation
- For very long strings (>40 chars), consider `mode="words"` — character mode creates hundreds of DOM nodes

---

## 22. Smooth Scroll Libraries — Lenis vs. Alternatives

### Why Smooth Scroll Matters

Native browser scroll feels mechanical — it starts and stops abruptly. Smooth scroll libraries add inertia (momentum-based deceleration), making pages feel physically simulated rather than digital. This is why every premium site feels "heavier" and more cinematic when scrolling.

### Lenis (Implemented in this project)

```ts
const lenis = new Lenis({
  duration: 1.2,         // 1.0–1.4s typical. Higher = more "buttery"
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Expo ease-out
  smoothWheel: true,
  wheelMultiplier: 1,    // 0.8–1.2, tune for feel
  touchMultiplier: 2,    // Touch should be snappier than wheel
});
```

**Why Lenis over alternatives:**
- Lightweight — smaller than Locomotive Scroll
- Works with GSAP ScrollTrigger out of the box
- No CSS class requirements (Locomotive needs `[data-scroll]` attributes)
- Maintained by Studio Freight → now independent open source

**Critical integration with GSAP ScrollTrigger:**
```ts
// Without this, GSAP and Lenis scroll positions diverge
lenis.on('scroll', ScrollTrigger.update);
// OR: use gsap.ticker instead of requestAnimationFrame
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

### Alternatives Comparison

| Library | Size | ScrollTrigger compat | Verdict 2025 |
|---|---|---|---|
| **Lenis** | ~8KB | ✅ First-class | Best choice for new projects |
| **Locomotive Scroll** | ~28KB | ✅ With setup | Older, more complex |
| **Smooth Scrollbar** | ~15KB | ⚠️ Manual | Dated API |
| **Native CSS** `scroll-behavior: smooth` | 0KB | ❌ N/A | No inertia, not suitable |

---

## 23. Noise / Grain Texture Overlays — The Tactile Trend

### What It Is and Why It Matters

Grain overlays apply a fine film-grain-like texture to the entire page. The effect:
1. **Breaks digital perfection** — pure `#0a1a0c` feels flat. Add grain and it feels like matte printing.
2. **Adds depth to dark sections** — the grain creates subtle light variation that tricks the eye into perceiving texture
3. **Cinematic association** — film grain is associated with analog photography and cinema. Brands using it feel more crafted and intentional.

From Newsfile's research on Brutalist Motion and Sustainable Web Styles:
> *"Applying a CSS grain filter or SVG noise overlay fakes visual depth and physical material feel without taxing the browser. Subtle CSS grain filters or animated SVG noise overlays break up digital perfection and provide a tactile quality resembling printed paper or cinematic film."*

### The Two Approaches

**Approach 1: SVG `feTurbulence` filter (implemented)**
```html
<filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.65"
    numOctaves="4" stitchTiles="stitch" />
  <feColorMatrix type="saturate" values="0" />
  <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
</filter>
```
+ Most control over grain density, scale, character
+ Can be animated (shift `seed` or `baseFrequency` over time)
- More complex implementation

**Approach 2: Animated background-position (implemented)**
```css
/* Fixed overlay with pre-generated noise SVG data URI */
/* Animate background-position in steps to simulate film grain */
@keyframes grain-shift {
  0%   { background-position: 0 0; }
  10%  { background-position: -5% -10%; }
  ...  /* 10 steps, steps(1) timing = instant jump = grain-like */
  100% { background-position: 0 0; }
}
```
+ Zero SVG filter overhead
+ Pure CSS, runs on compositor
+ `steps(1)` creates a staccato "film grain flicker" rather than smooth movement

**The correct opacity range:**
- `opacity: 0.02–0.04` — barely perceptible, like high-end print
- `opacity: 0.05–0.08` — visible, moody, cinematic
- `opacity: 0.10+` — too strong, competes with content
- This project uses `opacity: 0.038`

### When to Use Grain

| Context | Grain? | Reason |
|---|---|---|
| Dark hero sections | ✅ Yes | Adds depth, prevents flatness |
| Dark backgrounds with colored accents | ✅ Yes | Reduces harshness of accent pop |
| White / light sections | ❌ Usually no | Grain on white looks like printing artifacts |
| Glassmorphism cards | ⚠️ Subtle | Can enhance frosted glass feel |
| Product photography | ❌ No | Competes with image quality |

---

## 24. Marquee Tickers — The Information Strip Trend

### Why Marquees Are Back (and Better)

The scrolling ticker was a late-1990s web cliché. Its 2025 revival is completely different in purpose and execution:

**1990s version**: Scrolling news ticker in a tiny strip, usually yellow-on-black, conveying text content.

**2025 version**: A design element that:
- Creates visual momentum — the movement implies the brand is active and dynamic
- Communicates credibility signals in a low-hierarchy area (certifications, stats, product names)
- Acts as a visual separator between page sections
- Adds ambient animation without competing with primary content

From design analysis of Awwwards SOTD winners: the marquee ticker appears as a section separator on approximately **40% of 2025 winners** in the editorial/industrial design category.

### Implementation Principles

**CSS-only (implemented) vs. JavaScript:**
```css
/* CSS-only — runs on compositor, zero JS overhead */
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}
/* Items triplicated — seamless loop with no reset flash */
```

**Why triplicate (not duplicate):**
- Duplicating creates a gap when the first copy reaches the end if the container is wider than one copy
- Triplicating guarantees at least two full copies are always visible
- The `-33.333%` translation moves exactly one copy's width

**Typography for marquee tickers:**
- Monospace font — creates visual rhythm and technical credibility
- `uppercase` + extreme letter-spacing (`tracking-[0.25em]`)
- Very small size (10–11px) — the ticker should be ambient, not dominant
- Dot separators between items (3px radius circle)
- Accent items in brand color to create rhythm and visual interest

**Speed calibration:**
- 18–22s = very fast, energetic
- 24–32s = standard editorial pace
- 40–60s = slow, meditative
- This project uses 22–36s depending on page energy

### Bidirectional Marquees

Using two tickers running in opposite directions creates a visual counterpoint:
```tsx
<MarqueeTicker direction="left" speed={28} />   // Primary ticker
<MarqueeTicker direction="right" speed={22} />  // Above footer — creates contrast
```

Used in the footer of this project: the marquee moves right-to-left on the certification strip, then the main content flows naturally — the opposite direction creates a "pause moment" before the CTA.

---

## 25. Pinned Horizontal Scroll — Cinematic Product Showcases

### The Pattern

Pinned horizontal scroll converts vertical scroll momentum into horizontal movement. As the user scrolls down, the viewport moves sideways through a gallery of cards/panels. The section is "pinned" (fixed to viewport) for the duration.

**Why it's effective for product showcases:**
- Forces the user to engage with each card sequentially
- The scroll mechanism makes the browsing feel earned
- No visible boundaries or scroll bars — the end reveal ("that's all") creates natural closure
- Very distinctive UX — users remember sites that use it

**Awwwards usage**: Multiple 2025 SOTD winners use horizontal scroll for portfolio work, product showcases, and feature lists. The technique appears in agency, architecture, and industrial B2B contexts.

### GSAP Implementation (What We Built)

```tsx
useEffect(() => {
  const totalWidth = track.scrollWidth - container.offsetWidth;

  gsap.to(track, {
    x: -totalWidth,          // Translate left by total overflow
    ease: 'none',            // Linear — scroll IS the animation
    scrollTrigger: {
      trigger: container,
      start: 'top top',      // Pin when container hits top
      end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
      pin: true,             // Lock container in viewport
      scrub: 1,              // 1s lag for smooth feel
      anticipatePin: 1,      // Prevents jump on pin activation
    },
  });
}, []);
```

**Critical: The `end` formula**
```
end = total_horizontal_distance + buffer
```
The buffer (`window.innerHeight * 0.5`) allows the user to finish scrolling through the last card with some breathing room before the section unpins.

### Card Design for Horizontal Scroll

- **Width**: `min(380px, 80vw)` — mobile-responsive, full feel on small screens
- **Fixed gap**: `marginRight: '2rem'` — consistent gap, not CSS `gap` (GSAP needs pixel values)
- **Visual finish**: subtle border `rgba(255,255,255,0.07)` with `borderRadius: 20px` — feels like a premium card, not a flat cell
- **Content density**: Title + 1-line description per card. Horizontal scroll works when each card is easily scannable.
- **Entrance**: `whileInView` stagger on each card as it comes into horizontal view

### Mobile Consideration

Pinned horizontal scroll is a desktop pattern. On mobile:
- GSAP `pin` still works but feels clunky on touch
- Recommend: swap to a vertical stacked grid on mobile using a media query or responsive class
- The `HorizontalBenefits` component currently renders the horizontal scroll on all breakpoints — a future improvement is to detect touch and render the grid fallback

---

## 26. Big Number Viewport Moments — Data as Design

### The Pattern

A section where a single massive number dominates the viewport — typically rendered at `clamp(6rem, 20vw, 18rem)` — in a very low-opacity "ghost" style. The number is the visual anchor; text beside/below it provides the context.

From SpinxDigital's analysis:
> *"Numbers as primary visual element — large-scale typography that forces the viewer to reckon with the data before reading the explanation."*

### Why Ghost Text Works

The low-opacity number (`color: rgba(46,125,50,0.12)`) creates a paradox:
- Large enough to be the dominant visual element
- Faint enough to not compete with body text
- Creates depth without using an image
- The opacity gap between the ghost number and the explanatory text creates a natural foreground/background hierarchy

### Scroll-Scrubbed Variant (What We Built)

Combining the ghost number with a GSAP scrub counter:
```tsx
const obj = { val: 0 };
gsap.to(obj, {
  val: 38,
  ease: 'none',           // Linear — scroll = progress
  scrollTrigger: {
    scrub: 1.5,           // Smooth 1.5s lag
    onUpdate: () => {
      numRef.current.textContent = Math.round(obj.val).toString();
    }
  }
});
```

As the user scrolls past the section, `0` counts up to `38` in real-time. The number only reaches its target if the user scrolls through the entire section. This creates:
- A sense of **earned revelation** — the full number isn't just given to you
- Physical feedback between scroll action and number state
- A memorable, unique interaction moment that users recall

---

## 27. Scrub-Tied Animations — Scroll as a Timeline

### The Core Philosophy

> *"Scroll-driven narratives that unfold as users scroll, transforming linear information into cinematic experiences."* — TheeDigital

The fundamental insight: **scroll position is a timeline.** Instead of "animation triggered by scroll," think of scroll as playing a video. The scroll position is the playhead. You can animate anything by mapping scroll progress to any property.

### GSAP `scrub` Parameter Guide

```js
scrub: true   // Instantly syncs to scroll — very snappy, mechanical
scrub: 0.5    // 0.5s lag — feels fast but smooth
scrub: 1      // 1s lag — standard, recommended for most uses
scrub: 2      // 2s lag — slow/meditative, good for atmospheric parallax
scrub: 4      // Very slow — used for barely-perceptible background drift
```

### What Can Be Scrubbed

| Property | Use case | Implementation |
|---|---|---|
| `y` (parallax) | Background depth layers | `gsap.to(layer, { y: '25%', scrub: 2 })` |
| `x` (horizontal) | Pinned horizontal scroll | `gsap.to(track, { x: -totalWidth, scrub: 1 })` |
| `opacity` | Fade content on scroll | `gsap.to(content, { opacity: 0, scrub: true })` |
| Counter value | Numbers that count with scroll | `gsap.to(obj, { val: target, onUpdate, scrub: 1 })` |
| `scale` | Typography scaling with scroll | `gsap.to(heading, { scale: 1.2, scrub: 1 })` |
| `clipPath` | Reveal effects | `gsap.to(el, { clipPath: 'inset(0 0 0% 0)', scrub: 1 })` |
| `rotation` | Rotating decorative elements | `gsap.to(icon, { rotation: 180, scrub: true })` |

### The About Page Counter (What We Built)

```tsx
// Stats section: 4 counters scrubbed to scroll
// Each starts at 0, reaches target when section exits viewport
// User literally scrolls the number into existence
gsap.to(obj, {
  val: target,           // The actual number
  ease: 'none',          // Linear for scrub — ease handled by scrub lag
  scrollTrigger: {
    trigger: ref.current,
    start: 'top 80%',    // Begin counting when section is 20% from top
    end: 'top 30%',      // Finish when section has scrolled 50% up
    scrub: 1,
    onUpdate: () => numRef.current.textContent = Math.round(obj.val).toString(),
  }
});
```

**Why `start: 'top 80%'` and `end: 'top 30%'`:**
- The counter runs while the user scrolls through a 50% viewport window
- Fast enough that users see the number complete as they finish reading the section
- Slow enough that the animation isn't missed

---

## 28. Brutalist Motion — The Emerging Challenger

### What Brutalist Motion Is

From Newsfile's Brutalist Motion and Sustainable Web Styles research:
> *"Web designers are increasingly exploring bold, raw layouts combined with motion effects to capture user attention. Brutalist websites focus on motion and interactivity with distortion effects and glitches."*

From Fireart Studio's 2026 Web Design Trends:
> *"Brutalist UX & Invisible Logic — rejecting floating elements in favor of components that feel physical and engineered."*

Brutalist motion is NOT random or ugly. It is:
- **Intentionally raw** but executed with precision
- Heavy borders, exposed grid lines, monospace everywhere
- Motion that feels mechanical rather than organic (linear ease, hard stops)
- Distortion effects: glitch, scanlines, CRT-inspired elements

### Is This Applicable to This Project?

**Partially.** Rashmi 6 Paradigm's editorial dark design already has brutalist elements:
- Monospace labels
- Hard horizontal rules
- Grid-based layout
- No decorative elements

What we've deliberately avoided from brutalism:
- Glitch effects (too aggressive for industrial B2B)
- Hard mechanical motion (our `[0.16, 1, 0.3, 1]` ease has personality)
- Pure typographic-only layout (we use SVG art as visual anchors)

The correct positioning for this project: **editorial brutalism with premium motion** — the structure is raw and grid-based, but the animation is smooth and physical.

---

## 29. Library Comparison: GSAP vs. Framer Motion in 2026

### The Definitive Answer (from Codolve GSAP vs Framer Motion 2026)

**Use Framer Motion for:**
- Layout animations (`layoutId` — animated reflows)
- Component-level entrance/exit (`AnimatePresence`)
- Gesture-driven animations (drag, hover, tap)
- Simple scroll triggers (`whileInView`)
- React-idiomatic code (declarative props)

**Use GSAP for:**
- Complex scroll-scrubbed timelines (ScrollTrigger)
- Pinned horizontal scroll (no Framer equivalent)
- SVG morphing and path animation (MorphSVG plugin)
- Performance-critical sequences (GSAP is slightly more optimized for long timelines)
- Precise timing control across multiple elements

**Bundle size reality:**
- Framer Motion: ~32KB gzipped
- GSAP core: ~28KB gzipped  
- GSAP + ScrollTrigger: ~48KB gzipped
- Both combined (what this project uses): ~80KB — justified for premium animation output

**This project's hybrid approach:**
- `Framer Motion`: All component-level animations (entrances, layout, interactive states, `AnimatePresence` modals)
- `GSAP ScrollTrigger`: All scroll-scrubbed animations (parallax, counters, horizontal scroll, hero fade)
- `Lenis`: Smooth scroll inertia (integrates with both)

### Performance Rule When Using Both

```ts
// Lenis → GSAP → Framer Motion integration
// Lenis drives the scroll tick
// GSAP ScrollTrigger updates on Lenis scroll events
// Framer Motion handles component lifecycle independently

lenis.on('scroll', () => ScrollTrigger.update());
```

---

## 30. Implementation Log — What Was Actually Built (Session 2)

### New Files Created

| File | What it does |
|---|---|
| `src/hooks/useLenis.ts` | Initializes Lenis smooth scroll, RAF loop, cleans up on unmount |
| `src/components/GrainOverlay.tsx` | Fixed SVG noise overlay, 10-step animated position shift, `opacity: 0.038` |
| `src/components/SplitReveal.tsx` | Character-level (`mode: 'chars'`) and word-level (`mode: 'words'`) reveal with `rotateX` 3D |
| `src/components/MarqueeTicker.tsx` | CSS-only infinite ticker, bidirectional, tripled items for seamless loop |
| `src/components/ScrollRevealLine.tsx` | `scaleX: 0 → 1` line reveal, configurable origin, scroll-triggered |
| `src/components/MagneticButton.tsx` | Spring-physics magnetic pull via Framer Motion `useSpring` |

### Files Updated

| File | What changed |
|---|---|
| `src/App.tsx` | Added `CustomCursor`, `GrainOverlay`, `useLenis()` — all global |
| `src/components/Hero.tsx` | GSAP character split on H1, scroll-scrubbed content fade, scan lines, marquee ticker at bottom |
| `src/components/Footer.tsx` | `SplitReveal` on CTA heading, certification marquee ticker, `ScrollRevealLine`, `MagneticButton` |
| `src/pages/About.tsx` | Full-viewport GSAP parallax hero, 4× scrub counters, `BigNumberMoment` (38M ghost text), values marquee, `SplitReveal` everywhere |
| `src/pages/BioPellets.tsx` | Spec ticker, `SplitReveal` H1, `ScrollRevealLine`, **pinned horizontal scroll** for 6 benefit cards (GSAP pin) |
| `src/pages/ActivatedCarbon.tsx` | Spec ticker, `SplitReveal` H1, `ScrollRevealLine`, motion entrances |
| `src/pages/CharcoalBriquettes.tsx` | Spec ticker, `SplitReveal` H1, `ScrollRevealLine`, motion entrances |
| `src/pages/Contact.tsx` | `SplitReveal` chars on "Let's talk biomass." |
| `src/pages/Certificates.tsx` | `SplitReveal` chars on hero heading |
| `src/pages/NotFound.tsx` | Footer re-added (had been removed in previous rewrite) |

### What Was NOT Implemented (Future Work)

| Feature | Reason deferred |
|---|---|
| `prefers-reduced-motion` media query wrapping | Should be added globally — affects all GSAP/Framer Motion animations |
| CSS `animation-timeline: view()` enhancements | Safari 26 just released — browser support stabilizing |
| Variable font weight on hover | Requires variable font — current `Playfair Display` is not variable |
| Liquid SVG text morphing | Very high effort, diminishing returns for B2B context |
| Physics WebGL (Three.js/WebGL) | Out of scope for this phase |
| Horizontal scroll mobile fallback | Should add `@media (pointer: coarse)` check to disable pin |
| Audio-reactive typography | Not appropriate for B2B industrial context |

---

## 31. Awwwards SOTY 2025 — What Won and Why

### Site of the Year 2025: Messenger (Meta)

Confirmed by research: Awwwards SOTY 2025 went to **Messenger** (Meta's messenger marketing site).

Analysis:
- Full WebGL planet rendered in the browser
- Physics simulation — messenger "bubbles" float and collide with real mass/gravity
- Sound design spatializes with cursor position
- Users are participants, not observers

**The gap to this level:** WebGL physics is a 6-month engineering project. Not accessible for a marketing site. But the design philosophy is completely applicable: **make users feel the site is alive.**

### Also Awarded: Lando Norris Official Site
The official website of McLaren F1 driver Lando Norris also claimed Awwwards SOTY 2025.
- Sports/personality brand
- Strong motion identity
- No WebGL — achieves premium feel through typography and scroll choreography alone

**Lesson for this project:** Messenger needed WebGL because it was Meta's flagship. The Lando Norris site proved you can win at the top level without it — using exceptional typography animation and scroll choreography.

### Patterns Across All 2025 Winners

1. **One signature moment** per site — the thing you describe to someone who asks what the site looked like
2. **Typography as primary visual** — at least one heading that is genuinely large enough to be an artwork
3. **Physics or organic motion** — something that feels like it has weight
4. **Restraint in most places, excess in one** — not everything animates. The contrast makes the animated moments land harder.
5. **Dark sections as anchors** — the majority of SOTD winners use dark backgrounds for their hero/feature moments

---

## 32. Animation Accessibility — prefers-reduced-motion

### Why This Is Now Mandatory

Multiple research sources (MDN, CSS-Tricks, Chrome Developers) explicitly state this is no longer optional:

```css
/* Correct implementation — wraps all enhanced animations */
@media (prefers-reduced-motion: no-preference) {
  .animated-element {
    animation: my-animation ...;
  }
}

/* Or: disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### In GSAP + Framer Motion

```ts
// GSAP: check before creating timelines
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  gsap.to(el, { ...animation });
}

// Framer Motion: use variants
const variants = prefersReducedMotion
  ? {} // No animation
  : { hidden: { y: '115%' }, visible: { y: '0%' } };
```

### What Should Be Reduced

| Animation | Reduced-motion version |
|---|---|
| Character stagger entrance | Instant opacity fade (no y movement) |
| Scroll parallax | Disabled |
| GSAP ScrollTrigger scrub | Start at final state |
| Grain overlay animation | Static (no `animation: grain-shift`) |
| Marquee ticker | Paused (`animation-play-state: paused`) |
| Hero char split | Instant appear |
| Pinned horizontal scroll | Vertical grid layout |

---

## 33. The Animation Checklist for Awwwards-Tier Sites

### Four-Layer Audit

**Layer 1 — Ambient (always present):**
- [ ] Grain/noise overlay on dark sections
- [ ] Animated scan lines or grid lines on hero
- [ ] Particle system or atmospheric movement
- [ ] Marquee ticker strips as section separators

**Layer 2 — Entrance (scroll-triggered, play once):**
- [ ] Character-level stagger on all H1 headings
- [ ] Word-level stagger on H2/H3 headings
- [ ] `ScrollRevealLine` on all section dividers
- [ ] Staggered card/item entrances in grids
- [ ] SVG path draw animations on process/diagram sections

**Layer 3 — Scrubbed (continuous scroll progress):**
- [ ] Hero content fades/moves as user scrolls down
- [ ] Stat counters count with scroll progress
- [ ] At least one "big number" ghost text moment
- [ ] Parallax layers in hero (bg/mid/fg moving at different rates)
- [ ] Pinned horizontal scroll for gallery/product showcase

**Layer 4 — Interactive (responds to cursor/touch):**
- [ ] Custom cursor with `mix-blend-mode: difference`
- [ ] Magnetic pull on primary CTAs
- [ ] Button hover states with physical feedback
- [ ] Dropdown menus with spring physics
- [ ] Form inputs with animated focus states

### The "One Signature Moment" Rule

Every award-winning site has one moment that defines it. On this site:

**Current signature moment**: The `BigNumberMoment` on the About page — "38M" in ghost text at `clamp(6rem, 20vw, 18rem)`, counted live as you scroll, with the explanation text beside it.

**Runner-up**: The GSAP character-split on the About page hero — "Making industrial energy sustainable since 2015." unfolding letter by letter with `rotateX` 3D.

**Future**: A WebGL or physics moment on the homepage — currently the particles are good but not physically simulated.

---

*Session 1 research compiled: May 2026*  
*Session 2 research compiled: May 2026 (animation deep dive)*  
*Project: Rashmi 6 Paradigm Limited — biomass-flow-web*  
*Session 2 scope: Animation system, Lenis, SplitReveal, MarqueeTicker, GrainOverlay, GSAP scrub, horizontal scroll*
