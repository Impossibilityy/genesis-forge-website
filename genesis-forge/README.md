# Genesis Forge

A production-ready marketing website for **Genesis Forge**, a custom 3D-printing and creative-fabrication studio. It turns sketches, photos, broken parts, and half-formed ideas into real, physical objects — and the site is built to make that promise believable within seconds.

Single-page React + Vite + TypeScript application. Animated with Framer Motion, styled with plain modern CSS driven entirely by design tokens. No UI framework, no CSS framework, no 3D engine — the hero "forge" is hand-built SVG so it stays fast and accessible.

```bash
npm install
npm run dev      # local dev server (Vite)
npm run build    # type-check (tsc -b) + production build
npm run preview  # preview the production build
```

---

## 1. Creative direction

**Concept — The Digital Forge.** Ideas enter as raw possibility and leave as refined objects. Rather than decorate that idea, the site *demonstrates* it: the hero is a vessel that assembles disc-by-disc out of a blueprint wireframe, literally visualising FDM print layers stacking into a finished form. A single molten heat-sweep passes over it once, then it settles. The "print layer line" recurs as a structural motif — in section dividers and in the CAD-style corner brackets framing featured work.

**Tone.** Bold, capable, imaginative, precise, welcoming, honest. Plain language first; technical vocabulary only once value is established. The word "forge" is used sparingly, not in every heading.

**What it deliberately avoids:** game-menu/sci-fi dashboards, glassmorphism, neon glow borders, floating decorative spheres, rainbow or generic blue-purple SaaS gradients, repeated identical card grids, low-contrast gray-on-gray text, hover-only information, and any invented stats, testimonials, client logos, awards, or years in business.

---

## 2. Design system

All values live as semantic tokens in `src/styles/tokens.css`. Components reference tokens only — there are no raw hex values in component code.

**Color.** Layered obsidian/graphite/charcoal surfaces (never flat black) carry a dual-temperature accent system used *semantically*:

- **Molten orange** `--color-primary` `#FF6B2C` — creation and primary actions. Paired with a dark label (`--color-on-primary`) for high contrast on the hot fill.
- **Precision cyan** `--color-secondary` `#46C6E6` — the technical / digital voice (eyebrows, wireframes, "you bring").
- **Violet** `--color-accent` `#8B7BE8` — a restrained third highlight, used sparingly.
- Functional: `--color-success`, `--color-error`, `--color-focus`.

Color never carries meaning alone — active states, errors, and stages all have text or shape cues alongside.

**Typography.** Distinct from the usual defaults: **Archivo** (engineered grotesque) for display/headings, **Hanken Grotesk** for body, **JetBrains Mono** for technical metadata, eyebrows, and specs. Fluid scale via `clamp()` from 375 → 1440px. Loaded with `display=swap` in `index.html`.

**Spacing** is a 4px rhythm (`--space-1` … `--space-10`); section rhythm and page gutters are adaptive (`--section-y`, `--gutter`). **Shape** mixes sharper forms for technical structures (tech frames, spec plates) with moderate rounding for interactive surfaces. **Elevation**, **borders**, **radius**, **z-index**, and **motion** (easing + duration tokens) are all tokenised. Icons are one consistent set — Lucide React — at a uniform stroke weight; no emoji.

---

## 3. Architecture

```
genesis-forge/
├─ index.html                 # font preconnect/links, meta/OG, #root
├─ public/
│  └─ forge-mark.svg          # favicon
├─ src/
│  ├─ main.tsx                # root; CSS import order: tokens → base → app
│  ├─ App.tsx                 # section composition / story order
│  ├─ styles/
│  │  ├─ tokens.css           # design tokens (single source of truth)
│  │  ├─ base.css             # reset, element defaults, a11y primitives, utilities
│  │  └─ app.css              # all component + section styles (mobile-first)
│  ├─ data/                   # structured content (no copy hard-coded in components)
│  │  ├─ navigation.ts services.ts creations.ts process.ts
│  │  └─ strengths.ts transformation.ts
│  ├─ hooks/                  # useReducedMotion, useScrollProgress,
│  │                          #   useActiveSection, useBodyScrollLock
│  ├─ lib/motion.ts           # shared Framer Motion variants + tokens
│  ├─ components/
│  │  ├─ ui/                  # Button, Tag, SectionHeader, TechFrame, LayerDivider
│  │  ├─ layout/              # SkipLink, Navbar, Footer
│  │  ├─ forge/ForgeObject.tsx# hand-built SVG hero signature
│  │  └─ sections/            # Hero, Possibility, Services, Creations, Process,
│  │                          #   WhyForge, Transformation, About, Inquiry
└─ vite.config.ts             # @ → src alias
```

Content is separated from presentation: editing copy or adding a creation is a data change in `src/data/`, not a component rewrite. The `@/` alias maps to `src/`.

---

## 4. Motion plan

Motion is purposeful and gated. Every animation explains transformation, directs attention, or gives feedback — nothing animates merely because it scrolled into view. Tokens (`--ease-out`, `--dur-micro/base/large`) keep timing consistent; micro-interactions sit at 150–300ms, larger transitions under 400ms, and exits are quicker than entrances.

- **Hero forge** — blueprint contours draw via `pathLength`, then solid print layers stagger bottom→top, a one-time molten light sweeps across, and the object responds to pointer tilt (disabled on touch and reduced-motion).
- **Navigation** — transparent over the hero, transitioning to a blurred dark surface after 40px; animated active underline with no layout shift; mobile panel with focus trap.
- **Services / Why** — hover and focus raise the panel and activate its accent rail/edge.
- **Process** — a connecting energy line fills with scroll position (spring-smoothed); reduced-motion shows it full immediately.
- **Transformation** — three representations of one object crossfade as you step through tabs.
- **Inquiry** — step progress, validation transitions, and a loading→success transformation with no confetti.

Everything respects `prefers-reduced-motion`: Framer Motion is gated in JS via `useReducedMotion`, and `base.css` neutralises CSS transitions as a safety net. Animations use transform/opacity only.

---

## 5. Setup

Requires Node 18+ and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

`npm run build` runs `tsc -b` (full type-check) then `vite build`; output lands in `dist/`. `npm run lint` runs `tsc --noEmit`.

---

## 6. Replacing placeholder content with real Genesis Forge assets

**Featured creation photos/renders.** The gallery ships with tasteful, clearly-labelled "Photo pending" spec-plate placeholders so the layout is complete. To add real media:

1. Drop optimized images (WebP/AVIF, roughly square) into `public/creations/`.
2. In `src/data/creations.ts`, set each item's `image` to its path (e.g. `"/creations/lattice-vessel.webp"`) and write a descriptive `alt`. The component swaps the placeholder for a lazy-loaded, dimensioned `<img>` automatically.

You can also add, remove, or reorder entries in that file — the layout adapts.

**Footer contact / social / legal.** In `src/components/layout/Footer.tsx`, replace the placeholder email `hello@genesisforge.example`, the `#` social hrefs (or remove unused networks), and the `#` Privacy/Terms links.

**Inquiry form backend.** `src/components/sections/Inquiry.tsx` is a complete front-end with validation, loading, and success states, but it is **not wired to a backend** — submit currently resolves a timeout (search the file for the `NOTE:` comment). Point `handleSubmit` at a real endpoint (a form service, serverless function, or `/api` route) and handle the failure path by surfacing an error state.

**Brand mark / favicon.** Swap `public/forge-mark.svg` and update the `<title>`/meta in `index.html`.

---

## 7. Deployment

**GitHub**

```bash
git init
git add .
git commit -m "Genesis Forge website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

**Vercel.** Import the repository at vercel.com. It auto-detects Vite (Build `npm run build`, Output `dist`). `vercel.json` is included with an SPA rewrite. Deploy, then add a custom domain under Project → Settings → Domains. Pushes to `main` redeploy automatically.

---

## 8. UX & accessibility self-review

- **Keyboard** — skip-to-content link first in the tab order; visible focus ring on every interactive element; the mobile menu is a focus-trapped dialog that closes on Escape and restores focus to its trigger; the Transformation tablist uses roving focus with arrow keys.
- **Semantics** — one `<h1>`, sequential headings, landmark `<nav>`/`<main>`/`<footer>`, `aria-labelledby` on sections, `aria-current` on the active nav link, icon-only controls labelled, decorative SVG marked `aria-hidden`, the hero graphic exposed as a labelled `role="img"`.
- **Forms** — visible labels, semantic input types with correct mobile keyboards (`inputMode`, `type="email"`/`number`), `autoComplete`, validation after blur, an `aria-live` error summary that focuses and links to each invalid field, focus moved to the first problem, and a `role="status"` success panel. Inputs are 48px tall.
- **Color & contrast** — body/heading text meets ≥4.5:1; meaningful graphics ≥3:1; no information is conveyed by color alone.
- **Motion** — full `prefers-reduced-motion` support in JS and CSS; transform/opacity only; no scroll-jacking, no persistent motion behind text.
- **Touch & responsive** — ≥44×44px targets; mobile-first layouts verified in principle at 375 / 768 / 1024 / 1440px; adaptive gutters; `overflow-x: hidden` guards against horizontal scroll; the hero visual simplifies gracefully on small screens.
- **Performance** — fonts `display=swap`; placeholder/hero art is lightweight inline SVG (no canvas/WebGL); real images get `loading="lazy"`, `decoding="async"`, and explicit dimensions; aspect-ratios reserve space to prevent layout shift.

---

## 9. Placeholders requiring real content

Each is clearly marked in the source (search for `PLACEHOLDER` / `NOTE:`):

1. **Featured creation media** — `src/data/creations.ts` (`image: null`) + files in `public/creations/`. Copy is illustrative; confirm details are truthful before publishing.
2. **Footer email** — `hello@genesisforge.example` in `Footer.tsx`.
3. **Social links** — `#` Instagram/GitHub hrefs in `Footer.tsx`.
4. **Legal links** — `#` Privacy/Terms in `Footer.tsx`.
5. **Inquiry submission endpoint** — `handleSubmit` in `Inquiry.tsx` is a front-end demo only.
6. **Service area / location** — footer line is generic; set a real region if desired.
7. **Brand mark & metadata** — `public/forge-mark.svg`, `index.html` title/meta/OG.

Section body copy is written to be honest and brand-appropriate, but you should review it against your real services and voice before launch.

---

Built as a focused Genesis Forge business site first. Its execution — design system, motion, accessibility, and structure — is intended to stand on its own as evidence of the work.
