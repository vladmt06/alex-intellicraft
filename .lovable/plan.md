## Goal

Take Alexandria from "technically correct meta tags" to a real SEO/AEO surface that ranks and gets cited by AI assistants — plus tighten the on-page messaging to make the M&A / licensing diligence positioning unmistakable but elegant.

## 1. On-page positioning refinement

Tighten copy so "M&A and licensing diligence" is the obvious read without being literal/clunky. Edit:

- **HeroSection** — Add a small refined eyebrow above the H1: `Diligence for licensing & M&A` (uppercase tracking, muted). Keep the existing "death of manual diligence" headline.
- **ArchitectureSection** — Rework lead line to frame the engine around deal evaluation (licensing, asset acquisition, M&A) without listing them as a bullet.
- **Title + meta** — Update to `Alexandria — AI diligence for biopharma licensing & M&A` so the keyword pair lives in the title.

## 2. Content hub (blog) — the actual SEO + AEO lever

Add a `/insights` index plus 4 long-form posts. These are what gets indexed, cited by ChatGPT/Perplexity, and pulls in qualified traffic. Topics chosen around real query intent for BD/IB/consulting/biopharma readers:

1. `/insights/rnpv-biotech-valuation` — *How to model rNPV for a biotech asset (with worked example)*
2. `/insights/monte-carlo-licensing-deals` — *Monte Carlo simulation for licensing deal valuation*
3. `/insights/biopharma-diligence-checklist` — *The biopharma M&A diligence checklist analysts actually use*
4. `/insights/licensing-vs-acquisition` — *Licensing vs. acquisition: how BD teams decide*

Each post:
- Unique `<Helmet>` title, description, canonical, og:*
- `Article` + `BreadcrumbList` JSON-LD
- An FAQ section at the bottom with `FAQPage` JSON-LD (the highest-leverage AEO move — gets pulled directly into AI answers)
- Internal links back to home + cross-links to the other posts
- ~1200–1800 words, real substance (not lorem)

Routing: add `/insights` and `/insights/:slug` routes in `App.tsx`. Content lives as typed objects in `src/content/posts.ts`.

## 3. AEO (Answer Engine Optimization) extras

- **Home FAQ section** — Add a clean "Common questions" block at the bottom of the home page (above contact) with 6 Q&As: *What is Alexandria? Who uses it? How is it different from a generic LLM? Is my data room secure? What outputs does it produce? How fast is it?* Wrap in `FAQPage` JSON-LD via Helmet.
- **`SoftwareApplication` JSON-LD** on home (category: BusinessApplication) — gives AI assistants a structured product card.
- **Expand `/llms.txt`** to list every insights post with one-line descriptions (this is exactly what `llms.txt` is for).
- **Sitemap regeneration** — Convert hand-edited `public/sitemap.xml` to `scripts/generate-sitemap.ts` wired to `predev`/`prebuild`, listing `/`, `/insights`, and one entry per post. Single source of truth so future posts auto-publish.

## 4. Technical SEO cleanup

- **Image alt text audit** — Pass over components, fill missing alts.
- **LCP / fonts** — Confirm `font-display: swap` on `@font-face` rules; if hero has an image, add `fetchpriority="high"`.
- **Single `<main>`** — Confirm only one per route (already fine on Index; verify on new pages).
- **`<h1>` per page** — Each insights post has exactly one H1.

## 5. Technical details (for reference)

- `react-helmet-async` already installed and provider mounted.
- New files:
  - `src/content/posts.ts` — post metadata + MDX-free TSX bodies (component-per-post is simpler than MDX plumbing for 4 posts).
  - `src/pages/Insights.tsx` — index page listing posts.
  - `src/pages/InsightPost.tsx` — generic post renderer (resolves slug → post component).
  - `src/components/FAQ.tsx` — reusable FAQ accordion + JSON-LD emitter.
  - `scripts/generate-sitemap.ts` + `predev`/`prebuild` hooks.
- Edits: `src/App.tsx` (routes), `src/pages/Index.tsx` (FAQ section, SoftwareApplication JSON-LD, refined meta), `src/components/HeroSection.tsx` + `ArchitectureSection.tsx` (copy), `index.html` (title), `public/llms.txt` (post links), `public/robots.txt` (already references sitemap).

## 6. Out of scope (call out, don't do)

- Google Search Console verification — needs the user to complete OAuth; I'll remind them after publishing.
- Backlinks / off-site SEO — requires outreach, not code.
- Social-preview image generation — placeholder previews worse than none; I'll ask separately if you want one designed.

## Order of execution

1. Copy refinements + home FAQ + SoftwareApplication schema
2. Blog infrastructure (routes, post renderer, FAQ component)
3. Write the 4 posts
4. Sitemap generator + llms.txt expansion
5. Verify build, mark SEO findings fixed
