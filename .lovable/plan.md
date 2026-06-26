
# Alexandria SEO/AEO — audit + execution plan

Domain target: `https://www.alexandrialabs.uk`. Stack: React 18 + Vite + react-helmet-async. Sitemap generator already wired (`scripts/generate-sitemap.ts`). Already done last turn: every canonical/og:url/JSON-LD switched from the old lovable/discovery URL to alexandrialabs.uk, robots/sitemap/llms.txt updated.

## 1. Audit — what's actually on the site

Routes in `src/App.tsx`:

| Route | Title (current) | Meta (current) | H1 (current) | Intent |
|---|---|---|---|---|
| `/` | "Alexandria — AI diligence for biopharma licensing & M&A" | rNPV/Monte Carlo pitch | "The future of diligence." | Brand + product |
| `/insights` | "Insights — Alexandria \| Biopharma diligence, valuation & deal strategy" | working notes | "Notes from the diligence floor." | Blog hub |
| `/insights/:slug` (4 posts) | post title \| Alexandria | post description | post title | Informational |
| `/404` | "Page Not Found — Alexandria" | — | "404" | utility, noindex ✓ |

Technical issues found:
- **H1 has zero target keyword.** "The future of diligence." reads well but Googlebot has nothing to match. Same with `/insights` H1.
- **No `BreadcrumbList` on `/`** and no `WebSite` `SearchAction`.
- **Organization schema lacks `sameAs`, `contactPoint`, address**, so entity disambiguation is weak.
- **`/` Helmet emits `SoftwareApplication` with `offers.price=0`** — false; AEO-quotable but wrong.
- **No `og:image`** anywhere now (old preview-host image was removed). Social previews are blank.
- **Internal link from `/` → `/insights` doesn't exist** — only via the InsightsNav on `/insights/*`. Nav on the homepage needs the link.
- **Hero copy lost the keywords** ("biopharma diligence", "rNPV", "licensing", "M&A") after the recent text edit. Body H2s elsewhere carry them, but the most-weighted spot doesn't.
- **Iframe video hero** = poor LCP and CLS. *User asked us to leave the video alone — flagged only.*
- **No `prerender` / SSR** for the JS-rendered Helmet content. Googlebot is fine; LinkedIn/Slack preview crawlers see only `index.html`. → keep authoritative og:* in `index.html` too (already true).
- **Sitemap** good. **robots.txt** good. **Canonicals self-reference** ✓ after last turn.

Keyword gap vs the space (Semrush, US): "rnpv valuation", "biotech valuation methods", "monte carlo drug development", "biopharma due diligence checklist", "in-licensing vs acquisition", "BD&L diligence" — all low-volume, low-KD; ideal capture set for a new site.

## 2. Keyword map

| Page | Primary | Secondary | Long-tail / AEO question |
|---|---|---|---|
| `/` | biopharma diligence platform | AI diligence for licensing and M&A; rNPV software | "What is the fastest way to run biopharma licensing diligence?" |
| `/insights` | biopharma diligence insights | BD&L valuation notes | "How do BD teams evaluate biotech assets?" |
| `/insights/rnpv-biotech-valuation` | rNPV biotech valuation | risk-adjusted NPV biotech; phase transition probabilities | "How do you calculate rNPV for a biotech asset?" |
| `/insights/monte-carlo-licensing-deals` | monte carlo simulation licensing deals | biotech deal valuation distribution | "Why use Monte Carlo instead of a single rNPV?" |
| `/insights/biopharma-diligence-checklist` | biopharma M&A diligence checklist | licensing diligence framework | "What goes into a biopharma diligence checklist?" |
| `/insights/licensing-vs-acquisition` | licensing vs acquisition biotech | in-licensing vs M&A | "When should a pharma in-license vs acquire?" |

## 3. On-page rewrites (the ones I'll ship)

**`/` (Home)** — keep current title (already keyword-rich), but:
- Add a visually-hidden H1 with keyword load OR rewrite hero H1 to *"The future of biopharma diligence."* (1-word add, keeps the brand line).
- Add **InsightsNav-style link to `/insights`** in the home navbar.
- Fix `SoftwareApplication.offers` (remove the false `price:0`).
- Add Organization `sameAs` (placeholder LinkedIn/X — needs your URLs; I'll leave the array empty + a TODO if you don't have them).
- Add `WebSite` + `BreadcrumbList` schema.

**`/insights`** — H1 → *"Biopharma diligence, valuation & deal strategy."* (was "Notes from the diligence floor"). Adds the target keyword phrase. Keep the tagline as a deck below.

**Each post** — add an **AEO-quotable opening sentence** (single self-contained answer to the post's headline question), then keep current body. FAQs already exist and emit `FAQPage` JSON-LD via the FAQ component.

**Meta descriptions** — rewrite each post's meta to lead with the answer ("rNPV is …"), not the framing.

## 4. Technical

- Keep sitemap generator; confirm it includes `/insights` + 4 posts ✓.
- robots.txt advertises sitemap at canonical domain ✓.
- Add `theme-color`, `og:image` once you supply one (or I'll skip per the head-meta rules — no placeholder).
- Add `<link rel="preconnect" href="https://www.youtube-nocookie.com">` to soften iframe cost without touching the video.
- Self-referencing canonicals confirmed.
- No i18n → no hreflang.

## 5. AEO

For each insight post I'll prepend a 1-2 sentence direct answer using the format:
> "**rNPV** is the standard valuation method for pre-revenue biotech assets: it discounts each future cash flow by both the time value of money and the cumulative probability that the program survives every prior clinical phase."

Questions we want to be cited for:
1. "How do you calculate rNPV for a biotech asset?"
2. "What probabilities should I use for clinical phase transitions?"
3. "Why use Monte Carlo for biopharma deal valuation?"
4. "What's on a biopharma M&A diligence checklist?"
5. "Should we license or acquire a biotech asset?"
6. "What is Alexandria (the biopharma diligence platform)?"

Each is already partially covered by FAQ items; I'll align wording so the FAQ answer matches the on-page answer.

## 6. Content plan (no new pages this batch)

Existing 4 posts cover the highest-priority queries. Recommended next posts (not built today unless you greenlight):
- "Phase transition probabilities by therapeutic area (2026 update)"
- "rNPV vs DCF for biotech — when each is right"
- "How to read a CMC section in M&A diligence"

## 7. Authority

Realistic now: BIO directory listing, Endpoints News tip line, Fierce Biotech press, LinkedIn company page (link from Organization `sameAs`), Crunchbase profile, Y Combinator/AngelList if applicable. I'll wire `sameAs` once you give me URLs.

## 8. Measurement

- GSC + Bing Webmaster (submit `https://www.alexandrialabs.uk/sitemap.xml`).
- AEO citation tracking: weekly manual probes on ChatGPT/Perplexity/Claude for the 6 target questions; log whether alexandrialabs.uk is cited.
- Plausible/Umami for traffic; Lighthouse CI for CWV.

---

## Execution batches

**Batch 1 (this turn, awaiting approval before publish):**
1. Hero H1 → "The future of biopharma diligence."
2. `/insights` H1 → "Biopharma diligence, valuation & deal strategy."
3. Add `/insights` link to homepage Navbar.
4. Fix `SoftwareApplication` schema on `/` (drop fake offer, add `provider`, `audience`).
5. Expand Organization JSON-LD in `index.html` (`sameAs:[]` TODO, `contactPoint`).
6. Add `WebSite` `potentialAction` + `BreadcrumbList` to `/`.
7. Add YouTube preconnect to `index.html`.

**Batch 2 (auto, once batch 1 is green):**
8. Per-post AEO opening sentences (4 posts in `src/content/posts.ts`).
9. Per-post meta description rewrite (answer-first).
10. Align FAQ answer wording with on-page opening sentence.
11. Add `Article` `wordCount` + `keywords` to per-post schema.

**Data I need from you:**
- LinkedIn / X / Crunchbase URLs (for Organization `sameAs`).
- A real og-image (1200×630) if you want social previews to look good; otherwise I leave them off (placeholder previews worse than none).
- Contact email for `contactPoint` (or I'll use the one already in `ContactSection`).
