# Alexandria — SEO + AEO Audit & Action Plan

_Audit date: 2026-06-26. Scope: live source in this project. Keyword data: Semrush (US database)._

---

## 0. Assumptions & data gaps

- **Canonical domain.** Memory says the production domain is `alexandria-discovery.com` (A records → 185.158.133.1). All current canonicals, `og:url`, and JSON-LD `url` fields point to `alexandria-mind-forge.lovable.app`. **The single biggest finding in this audit.** If the production domain is something else, tell me and I'll re-target.
- **No live ranking data.** `alexandria-discovery.com` returned no Semrush data, meaning Google hasn't meaningfully indexed it yet. Treat the whole audit as a launch plan, not a recovery plan.
- **Competitors.** I've used the named adjacent tools BD/IB analysts actually look at: DealForma, Cortellis (Clarivate), Evaluate Pharma, BioCentury, GlobalData, Citeline. None of these compete on the same long-tail content niche, which is your opening.
- **Hero copy was just shortened** to "The future of diligence." / "One platform for the biopharma deal workflow." Strong brand line, but it stripped the keyword pair ("licensing", "M&A", "diligence") from the H1. The fix is in §3.

---

## 1. One-page summary — top 10 actions, ranked

| # | Action | Why it's #N | Effort | Impact |
|---|---|---|---|---|
| 1 | **Replace every `alexandria-mind-forge.lovable.app` URL** in `index.html`, `src/pages/Index.tsx`, `src/pages/Insights.tsx`, `src/pages/InsightPost.tsx`, `public/sitemap.xml`, `public/llms.txt` with `https://www.alexandria-discovery.com`. Pick one host (with or without `www`) and 301 the other. | Canonicals on the wrong domain = Google indexes nothing on your real domain. | S | H |
| 2 | **Verify the production domain in Google Search Console** and submit `sitemap.xml`. Repeat for Bing Webmaster. | Without this you are blind and slow to index. | S | H |
| 3 | **Restore keyword-bearing H1 on home**: keep "The future of diligence." as a visual line but add a supporting H2 *"AI diligence for biopharma licensing and M&A"* immediately under it. Search engines and LLMs read the H1+H2 pair as the page's topic. | Current H1 is brand poetry with zero entity signal. | S | H |
| 4 | **Add `Product` + `Offer` JSON-LD** and **convert the home `SoftwareApplication` price from `0` to remove the `Offer` block** (a free offer is misleading and triggers shopping snippets). Replace with `aggregateRating` only if you can show one, otherwise drop `offers`. | Schema accuracy: bad offers will hide you from rich results. | S | H |
| 5 | **Add `FAQPage` JSON-LD on the home page** (currently the FAQ renders visually but emits no schema — confirm in `src/components/FAQ.tsx`; if missing, add it). | FAQ schema is the highest-yield AEO win for a single-page site. | S | H |
| 6 | **Publish two more long-form posts** targeting "biotech valuation methods" and "pharmaceutical company evaluation criteria" (880 and 320 monthly searches, both low competition). See §6. | These are the only meaningful-volume terms you can realistically own in <6 months. | M | H |
| 7 | **Add `<picture>` + AVIF/WebP + explicit `width`/`height`** to logos and any hero media; add `loading="lazy"` to anything below the fold; ensure the YouTube iframe in `HeroSection.tsx` is replaced by a poster image + click-to-load. | The YouTube iframe is the single largest LCP/CLS/CWV penalty on the site. | M | H |
| 8 | **Internal links between posts** — every insights post should link to the other three, and the home FAQ answers should link to the post that expands each answer. | Topical authority is built by tight internal linking, not by writing more. | S | M |
| 9 | **Add `BreadcrumbList` JSON-LD on `/insights`** (currently only the post pages emit it). | Cheap, consistent crawl signal. | S | M |
| 10 | **Write a `/methodology` page** describing the rNPV + Monte Carlo engine in technical detail, with `TechArticle` schema. This is the page LLMs will cite when asked "how does Alexandria compute rNPV?" — exactly the prompt your buyers will type. | Direct AEO citation target with no equivalent on the web. | M | H |

---

## 2. Page-by-page audit

### 2.1 Pages discovered

| Route | Component | Status | Indexable |
|---|---|---|---|
| `/` | `src/pages/Index.tsx` | Live | ✅ |
| `/insights` | `src/pages/Insights.tsx` | Live | ✅ |
| `/insights/rnpv-biotech-valuation` | `InsightPost` | Live | ✅ |
| `/insights/monte-carlo-licensing-deals` | `InsightPost` | Live | ✅ |
| `/insights/biopharma-diligence-checklist` | `InsightPost` | Live | ✅ |
| `/insights/licensing-vs-acquisition` | `InsightPost` | Live | ✅ |
| `*` (NotFound) | `NotFound.tsx` | Live | Returns 200, not 404 (SPA fallback). **Add `<meta name="robots" content="noindex">` in the Helmet.** |

### 2.2 Current titles, meta, H1 vs recommended

| Page | Field | Current | Recommended |
|---|---|---|---|
| `/` | Title | "Alexandria — AI diligence for biopharma licensing & M&A" | Keep (good). |
| `/` | Meta | "Alexandria turns weeks of biopharma licensing and M&A diligence into ten-minute, decision-ready deliverables — rNPV, Monte Carlo, and a dynamic workspace over a live pharma corpus." | Keep. |
| `/` | H1 | "The future of diligence." | Keep as visual H1. **Add H2 directly under it: "AI diligence for biopharma licensing and M&A."** |
| `/` | Intent | Brand + product overview | One intent, fine. |
| `/insights` | Title | "Insights — Alexandria \| Biopharma diligence, valuation & deal strategy" | Shorten to ≤60 chars: **"Biopharma diligence & valuation insights — Alexandria"** (52). |
| `/insights` | Meta | (read in file) | Make sure it ends with a CTA fragment like "…long-form notes for BD, IB, and consulting teams." |
| `/insights` | H1 | Generic | **"Biopharma diligence, valuation, and deal strategy"** |
| `/insights/rnpv-biotech-valuation` | Title | "How to model rNPV for a biotech asset (with a worked example) \| Alexandria" | Tighten to **"rNPV for biotech: how to model it (worked example) — Alexandria"** (keyword first; 59 chars). |
| `/insights/monte-carlo-licensing-deals` | Title | "Monte Carlo simulation for licensing deal valuation \| Alexandria" | **"Monte Carlo for biotech licensing deals — Alexandria"** (51). |
| `/insights/biopharma-diligence-checklist` | Title | (in posts.ts) | **"Biopharma M&A diligence checklist (working analyst version)"** |
| `/insights/licensing-vs-acquisition` | Title | (in posts.ts) | **"Licensing vs. acquisition: how biotech BD teams decide"** |
| `/404` | robots | (default indexable) | Add `noindex`. |

### 2.3 Technical issues

| Issue | Severity | Where | Fix |
|---|---|---|---|
| Canonical/OG/JSON-LD URLs point to lovable preview, not production domain | **Critical** | `index.html`, all `Helmet` blocks, `sitemap.xml`, `llms.txt` | Action #1. |
| YouTube iframe auto-plays in hero | **High** (CWV) | `src/components/HeroSection.tsx` line 21 | Replace with poster image + click-to-load, or self-host a 2-3s MP4 + `<video muted autoplay loop playsinline preload="metadata">`. |
| SPA NotFound returns HTTP 200 with "Not Found" body | **Medium** | `src/pages/NotFound.tsx` | Add `<meta name="robots" content="noindex,follow">` in Helmet. Lovable hosting cannot return real 404s for SPA routes, so `noindex` is the workaround. |
| `Offer` with price `0` in `SoftwareApplication` schema | Medium | `src/pages/Index.tsx` line 47 | Remove `offers` entirely until you have a real price. |
| Sitemap hand-maintained, not generated | Low | `public/sitemap.xml` | Convert to `scripts/generate-sitemap.ts` as outlined in the existing plan, so future posts auto-publish. |
| `WebSite` JSON-LD missing `potentialAction` SearchAction | Low | `index.html` | Optional — only useful if site search exists. Skip for now. |
| Sitemap `<lastmod>` dates are static; `/` and `/insights` have no `lastmod` | Low | `public/sitemap.xml` | Add `<lastmod>` to all entries when migrating to the generator. |
| `<html lang="en">` is correct; no hreflang needed | — | — | US English only. No action. |
| Mobile: viewport meta present, layout responsive | — | — | No action. |

### 2.4 Indexability checklist

- `robots.txt` allows all crawlers ✅
- `sitemap.xml` exists, referenced from robots.txt ✅ (but hosts wrong domain)
- All routes return 200 via SPA fallback ✅
- All pages have unique `<title>` and `<meta description>` ✅
- Single H1 per page ✅
- `<main>` element per route ✅
- Canonical present on each route ✅ (but wrong domain)

### 2.5 Cannibalisation check

No cannibalisation. Each post targets a distinct query cluster:

- `rnpv-biotech-valuation` → "rnpv", "risk adjusted npv"
- `monte-carlo-licensing-deals` → "monte carlo licensing valuation"
- `biopharma-diligence-checklist` → "biopharma diligence checklist"
- `licensing-vs-acquisition` → "licensing vs acquisition biotech"
- `/` → brand + "AI diligence biopharma"

Keep it this way as you add new posts.

### 2.6 Keyword gaps vs competitive landscape

No direct content competitor occupies the BD-analyst long-tail. Adjacent players (DealForma, Cortellis, BioCentury, GlobalData) compete on brand + database access, not on "how to" content. **The entire ICP-facing long tail is open.** Gaps worth filling are in §6.

---

## 3. Keyword map

### 3.1 Term universe (Semrush, US, June 2026)

| Term | Volume | KDI | Intent | Stage | Status |
|---|---|---|---|---|---|
| pharmaceutical biotech company valuation metrics | 880 | low | informational | TOFU | **Build page** |
| biotech ipos highest valuation increase post-ipo 2025 | 480 | low | informational | TOFU | Skip (year-bound) |
| pharmaceutical company evaluation criteria categories | 320 | low | informational | TOFU | **Build page** |
| pharmaceutical deal terms valuation 2021 | 320 | low | informational | TOFU | Skip (year-bound) |
| risk adjusted npv of drugs | 210 | low | informational | MOFU | Owned by `/insights/rnpv-biotech-valuation` — **expand** |
| rnpv | 170 | low | informational | MOFU | Owned — **add to H1** of that post |
| biopharma m&a | 110 | 38 | informational | TOFU | Realistic with effort |
| biotech values | 110 | low | informational | TOFU | Low ICP fit — skip |
| biotech valuation | 70 | 19 | informational | MOFU | Realistic — **build pillar page** |
| biotechnology valuation | 50 | low | informational | MOFU | Variant of above |
| clinical stage pharmaceutical assets acquisition criteria | 50 | low | informational | BOFU | **Build page** |
| biotech r&d compliance evaluation metrics | 50 | low | informational | MOFU | Low ICP fit |
| biotech valuation model | 30 | 0 | informational/tool | MOFU | **Build interactive page** (link to product) |
| rnpv valuation | 20 | 0 | informational | MOFU | Owned |
| "biopharma diligence", "licensing diligence", "BD&L software" | <10 | n/a | branded/ICP | BOFU | Negligible volume; targets are LLM citations, not search |

### 3.2 Keyword → page mapping

| Page | Primary | Secondary | Long-tail |
|---|---|---|---|
| `/` | AI biopharma diligence | biopharma licensing diligence, biopharma M&A diligence | BD&L software, rNPV software biotech |
| `/insights` | biopharma diligence insights | biotech valuation methods | BD analyst resources |
| `/insights/rnpv-biotech-valuation` | rnpv | risk adjusted npv of drugs, rnpv valuation | how to model rnpv, rnpv worked example |
| `/insights/monte-carlo-licensing-deals` | monte carlo licensing valuation | monte carlo simulation biotech | distribution rnpv negotiate |
| `/insights/biopharma-diligence-checklist` | biopharma diligence checklist | biotech M&A diligence checklist | clinical IP regulatory CMC commercial checklist |
| `/insights/licensing-vs-acquisition` | licensing vs acquisition biotech | in-license vs acquire biotech | BD framework licensing decision |
| **NEW** `/insights/biotech-valuation-methods` | biotech valuation | biotech valuation methods, pharmaceutical valuation metrics | rNPV vs comparables vs real options |
| **NEW** `/insights/pharma-company-evaluation-criteria` | pharmaceutical company evaluation criteria | pharma due diligence categories | scientific commercial regulatory IP categories |
| **NEW** `/methodology` | how alexandria models rnpv | alexandria monte carlo engine | alexandria data sources biopharma corpus |

### 3.3 Prioritisation rule applied

Volume × intent fit × distance from BOFU. Anything with KDI > 30 deprioritised until the domain has 6+ months of crawl history.

---

## 4. On-page rewrites (ready to paste)

### 4.1 Home — `src/pages/Index.tsx`

**Helmet block** (replace lines 52–61):

```tsx
<Helmet>
  <title>Alexandria — AI diligence for biopharma licensing & M&A</title>
  <meta name="description" content="Alexandria turns weeks of biopharma licensing and M&A diligence into ten-minute, decision-ready deliverables — rNPV, Monte Carlo, and a dynamic workspace over a live pharma corpus." />
  <link rel="canonical" href="https://www.alexandria-discovery.com/" />
  <meta property="og:title" content="Alexandria — AI diligence for biopharma licensing & M&A" />
  <meta property="og:description" content="Turn weeks of biopharma licensing and M&A diligence into ten-minute deliverables. rNPV, Monte Carlo, and a dynamic workspace over a live pharma corpus." />
  <meta property="og:url" content="https://www.alexandria-discovery.com/" />
  <meta property="og:type" content="website" />
  <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
  <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
</Helmet>
```

**`SoftwareApplication` schema** (replace lines 38–48):

```ts
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Alexandria",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Biopharma diligence automation",
  operatingSystem: "Web",
  description:
    "AI-native diligence engine for biopharma licensing and M&A deals. Cross-references a live pharma corpus and your data room, runs rNPV and Monte Carlo analysis, and returns decision-ready deliverables.",
  url: "https://www.alexandria-discovery.com/",
  publisher: { "@type": "Organization", name: "Alexandria" },
};
```

**FAQ schema** (add):

```ts
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
```

**Hero H2** (add in `HeroSection.tsx` immediately after the H1):

```tsx
<h2 className="animate-fade-up-delay-1 text-base md:text-lg font-mono uppercase tracking-[0.18em] text-white/55 mb-4">
  AI diligence for biopharma licensing and M&A
</h2>
```

### 4.2 `index.html` — replace lines 8–48

```html
<title>Alexandria — AI diligence for biopharma licensing & M&A</title>
<meta name="description" content="Alexandria turns weeks of biopharma licensing and M&A diligence into ten-minute, decision-ready deliverables." />
<meta name="author" content="Alexandria" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.alexandria-discovery.com/" />
<meta property="og:title" content="Alexandria — AI diligence for biopharma licensing & M&A" />
<meta property="og:description" content="Turn weeks of biopharma diligence into ten-minute deliverables." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Alexandria — AI diligence for biopharma licensing & M&A" />
<meta name="twitter:description" content="Turn weeks of biopharma diligence into ten-minute deliverables." />
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"Organization","name":"Alexandria",
  "url":"https://www.alexandria-discovery.com/",
  "logo":"https://www.alexandria-discovery.com/favicon.ico",
  "description":"AI-native diligence engine for biopharma licensing and M&A.",
  "sameAs":[] }
</script>
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"WebSite","name":"Alexandria",
  "url":"https://www.alexandria-discovery.com/" }
</script>
```

### 4.3 `public/sitemap.xml` — replace every `alexandria-mind-forge.lovable.app` with `www.alexandria-discovery.com`. Add the two new pages from §6 once published.

### 4.4 `public/llms.txt` — replace the `(/...)` paths so they resolve against your domain when LLM crawlers prepend the host header. Replace the "Custom domain" line at the bottom (no longer needed once #1 is done).

### 4.5 InsightPost — `src/pages/InsightPost.tsx` lines 86–95

Already emits Article + Breadcrumb. **Add a third script tag for `FAQPage`** so each post's FAQ is independently quotable by LLMs:

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: post.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
// …inside Helmet:
<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
```

Also replace every hardcoded `alexandria-mind-forge.lovable.app` URL in the breadcrumb block (lines 88–93) with `https://www.alexandria-discovery.com`.

### 4.6 First-paragraph rewrites (AEO — self-contained answer in 1–2 sentences)

These are the rewrites that make LLMs quote you. Each opens with a direct definitional answer, then expands.

**`/insights/rnpv-biotech-valuation`** — new opening paragraph:

> Risk-adjusted NPV (rNPV) is a valuation method that discounts each future biopharma cash flow both for the time value of money and for the cumulative probability that the program reaches the period in which the cash flow occurs. Unlike a generic DCF, rNPV multiplies each post-launch cash flow by the chained phase-success probabilities (Phase 1 → 2 → 3 → Approval), and multiplies each R&D outlay by the probability you still incur it — this asymmetry is why a single PTRS revision typically moves a biotech valuation by an order of magnitude.

**`/insights/monte-carlo-licensing-deals`** — new opening:

> Monte Carlo simulation for a licensing deal replaces a single rNPV point estimate with a distribution of outcomes, by sampling input assumptions (PTRS, peak sales, launch year, COGS, royalty rate) from probability ranges across thousands of trials. The output is a probability-weighted valuation curve — the 25th, 50th, and 75th percentiles of deal value — which is what BD and IB teams actually negotiate against, because a counterparty cannot defend a number that sits in the bottom decile of your simulated distribution.

**`/insights/biopharma-diligence-checklist`** — new opening:

> A biopharma M&A diligence checklist covers six categories: scientific (mechanism, biomarker, preclinical data), clinical (trial design, readouts, PTRS), IP (composition, method, freedom-to-operate), regulatory (FDA/EMA pathway, prior interactions), CMC (manufacturing scalability, process IP), and commercial (TAM, payer landscape, comparable deals). Each category produces a defensible diligence memo section; the work is in reconciling primary sources — protocols, SEC filings, patent prosecution histories, payer policies — against the seller's data room representations.

**`/insights/licensing-vs-acquisition`** — new opening:

> In-licensing acquires rights to a single asset; acquisition acquires the company that owns it. The decision hinges on three variables: (1) breadth — does the target own one asset or a platform with optionality, (2) integration cost — does the target carry operational liabilities (a clinical org, manufacturing, debt) you do not want, and (3) deal structure — can a licensing milestone schedule de-risk capital exposure better than an upfront acquisition price. BD teams use a one-page framework: license when optionality is concentrated in a single asset and the seller's overhead is not strategic; acquire when the platform, team, or IP estate creates value beyond the lead program.

---

## 5. AEO — Answer Engine Optimisation

### 5.1 Entity clarity

Add `sameAs` to the Organization schema as soon as the following exist: LinkedIn company page, Crunchbase entry, founder LinkedIn profiles. Each `sameAs` URL is an entity anchor that LLMs use to resolve "Alexandria" to your company specifically (not the city, the library, or the Tarantino character).

### 5.2 Question targets — the specific prompts to be the cited source for

Each row pairs a prompt your buyer types into ChatGPT/Perplexity/Claude with the page that should win the citation and the content beat required to win it.

| Prompt | Target page | What to add to win the citation |
|---|---|---|
| "How do you calculate rNPV for a biotech asset?" | `/insights/rnpv-biotech-valuation` | Self-contained 2-sentence definition in the first paragraph (done above). The numeric worked example with named inputs. |
| "What are typical phase transition probabilities for biotech drugs?" | `/insights/rnpv-biotech-valuation` | A numbered list with each transition probability + the BIO/Informa source citation. (Already present — make sure each bullet is parseable as a standalone fact.) |
| "What's the difference between rNPV and DCF?" | New FAQ entry on rNPV post | Add an FAQ Q "How is rNPV different from DCF?" with a 2-sentence answer. |
| "How do BD teams use Monte Carlo simulation for licensing deals?" | `/insights/monte-carlo-licensing-deals` | Opening paragraph rewrite (done above). |
| "What's on a biotech M&A diligence checklist?" | `/insights/biopharma-diligence-checklist` | Opening paragraph (done above) + a flat 6-category list of section headings. |
| "Should I license or acquire a biotech asset?" | `/insights/licensing-vs-acquisition` | Opening paragraph (done above). |
| "What is a good biotech valuation method?" | NEW `/insights/biotech-valuation-methods` | Pillar page comparing rNPV, comparables, real options, deal-implied. |
| "How does Alexandria work?" | NEW `/methodology` | Plain-language description of corpus + retrieval + analysis layer + output. |
| "What tools do BD teams use for biotech diligence?" | `/` home page | Add a one-line "Alexandria is a diligence platform for biopharma BD, IB, and consulting teams" near the top. |

### 5.3 Structural rules for every AEO page

1. **First two sentences must answer the heading literally.** No throat-clearing, no "In this article…".
2. **Headings are questions or noun phrases, never marketing slogans.** `## What is rNPV?` not `## The death of guesswork.`
3. **Facts in lists, not paragraphs.** LLMs extract list items as bullets.
4. **Source citations inline** (`per BIO/Informa 2024`) — gives the LLM a reason to trust the line.
5. **One claim per sentence** in the first paragraph. Compound sentences get truncated.

### 5.4 JSON-LD blocks — ready to paste

**Organization** (in `index.html`):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Alexandria",
  "url": "https://www.alexandria-discovery.com/",
  "logo": "https://www.alexandria-discovery.com/favicon.ico",
  "description": "AI-native diligence engine for biopharma licensing and M&A.",
  "sameAs": []
}
```

**SoftwareApplication** (in `Index.tsx`): see §4.1.

**FAQPage** (in `Index.tsx` and each post): see §4.1 and §4.5.

**Article** (already in `InsightPost.tsx` — verify the `image` field is an absolute URL on the production domain once #1 is done).

**BreadcrumbList for `/insights`** (add to `Insights.tsx` Helmet):

```ts
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alexandria-discovery.com/" },
    { "@type": "ListItem", position: 2, name: "Insights", item: "https://www.alexandria-discovery.com/insights" },
  ],
};
```

**TechArticle for the new `/methodology` page**:

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How Alexandria models biopharma diligence",
  "author": { "@type": "Organization", "name": "Alexandria" },
  "publisher": { "@type": "Organization", "name": "Alexandria",
    "logo": { "@type": "ImageObject", "url": "https://www.alexandria-discovery.com/favicon.ico" } },
  "proficiencyLevel": "Expert",
  "dependencies": "Risk-adjusted NPV, Monte Carlo simulation, retrieval-augmented generation",
  "url": "https://www.alexandria-discovery.com/methodology"
}
```

---

## 6. Content roadmap

### Do now — quick wins (this week)

| Item | Target query | Intent | Format | Outline | Why |
|---|---|---|---|---|---|
| Rewrite opening paragraphs of all 4 posts | (see §3.2) | informational | inline | §4.6 | Highest-leverage AEO change. |
| Add FAQ schema to home + all posts | brand + topic | informational | JSON-LD | §4.1, §4.5 | Direct rich-result eligibility. |
| Add 3 cross-links per post (to other posts + home) | topical authority | navigational | inline | bottom of each post body | Cheap, compounding. |
| Replace YouTube hero iframe | n/a — CWV | n/a | poster + click-to-load OR self-hosted MP4 | swap `<iframe>` for `<img>` + onClick reveal | Single biggest LCP fix. |
| Fix canonical domain everywhere | n/a — indexability | n/a | search/replace | §4 | Unlocks indexing. |
| Add `noindex` to NotFound | n/a — indexability | n/a | Helmet meta | one line | Prevents soft-404 sprawl. |

### Do next — bigger projects (4–8 weeks)

| Item | Target query | Intent | Format | Outline | Why |
|---|---|---|---|---|---|
| **`/insights/biotech-valuation-methods`** | "biotech valuation" (70/mo, KDI 19) | informational, MOFU | pillar, 2500 words | (1) What "biotech valuation" actually means, (2) rNPV — link to existing post, (3) Comparable transactions — how to pick comps, (4) Real options — when it matters, (5) Deal-implied valuation, (6) Which method when, (7) FAQ | Highest realistic volume + clean topical fit. |
| **`/insights/pharma-company-evaluation-criteria`** | "pharmaceutical company evaluation criteria categories" (320/mo) | informational, TOFU | 1800 words | Six-category framework (scientific, clinical, IP, regulatory, CMC, commercial) with one sub-page per category linked. Anchor for the topic cluster. | High volume, no incumbent answer. |
| **`/insights/pharma-biotech-valuation-metrics`** | "pharmaceutical biotech company valuation metrics" (880/mo) | informational, TOFU | 2200 words | Twelve named metrics (rNPV, peak sales, NPV/share, EV/pipeline, deal-implied multiples, etc.) each with definition, formula, when to use. | Highest volume in the universe; achievable because no current page answers it cleanly. |
| **`/methodology`** | "how does alexandria work", "alexandria diligence ai" | navigational/branded | TechArticle, 1500 words | Corpus → retrieval → analysis (rNPV, MC) → deliverable. Architecture diagram. Source list. | The page LLMs cite when summarising Alexandria. |
| **`/case-studies/[slug]`** | "[client name] alexandria case study" | navigational | 800 words each | Once you have permission. | Branded long-tail + sales asset. |
| **`/insights/clinical-stage-asset-acquisition-criteria`** | "clinical stage pharmaceutical assets acquisition criteria" (50/mo) | informational, BOFU | 1500 words | High-fit ICP. | Low volume but exactly your buyer's query. |
| **Consolidations** | n/a | n/a | n/a | None needed yet — 4 posts, no overlap. Revisit at 12+ posts. | |

### Editorial cadence

One pillar (2000+ words) every 2 weeks; one short FAQ-style post (600 words, 5+ FAQs) every week. Stop when the publishing rate exceeds the rate at which you can actually update prior posts — stale content beats new content for ranking.

---

## 7. Authority — realistic topical-authority, citations, mentions

### 7.1 Directories worth submitting to

| Directory | Effort | Why |
|---|---|---|
| Crunchbase | S | Default LLM citation source for "what is Alexandria". |
| LinkedIn company page | S | Same; sameAs anchor. |
| G2 / Capterra under "Healthcare Analytics" or "Life Sciences" | M | High-DA backlinks, buyer-intent traffic. |
| Product Hunt launch | M | One-time DA boost + early users. |
| BioPharma Dive vendor directory | S | Niche relevance. |
| AngelList / Wellfound | S | Niche relevance + hiring signal. |

### 7.2 Citation opportunities (mention-without-link is still useful for LLMs)

- Guest essay on Endpoints News, STAT Plus, BioCentury, In Vivo (Citeline) — pitch around the rNPV/Monte Carlo content.
- Comment on LinkedIn posts by BD leaders at large pharmas; reply with substantive technical notes that cite your essays.
- Podcasts: *The Long Run* (Luke Timmerman), *Business of Biotech*, *BioCentury This Week*. Pitch the rNPV/Monte Carlo angle, not the product.
- Sponsor / present at: BIO-Europe, JP Morgan Healthcare Conference side events, LSX, BIO International.

### 7.3 Backlink seed list

Realistic in 6 months: 25–40 referring domains. Targets:

- Substack newsletters: *Bioverge*, *Decoding Bio*, *Timmerman Report*, *Pharma Strategies*. One paid sponsorship each.
- Academic syllabi: email biotech-finance courses at Wharton, HBS, MIT Sloan, INSEAD with a free analyst-edition link. Course pages are high-DA.
- Open-source: publish a small Python rNPV-calculator library on GitHub, link to `/insights/rnpv-biotech-valuation` from the README. Developer SEO works.

### 7.4 Topical authority — the cluster to dominate

Pick **"biopharma deal valuation"** as the cluster. Map every new post under one of three sub-clusters:

```text
biopharma deal valuation
├─ methods      → rNPV, Monte Carlo, comparables, real options, deal-implied
├─ diligence    → checklist, criteria, sub-category guides
└─ structures   → licensing vs acquisition, milestone design, royalty stacking
```

Refuse to publish anything that doesn't fit one of those three branches for the next 12 months.

---

## 8. Measurement

### 8.1 KPIs

| KPI | Source | Target — 90d | Target — 180d |
|---|---|---|---|
| Organic clicks | GSC | 200/mo | 1500/mo |
| Indexed pages | GSC Coverage | 6 | 18 |
| Avg position (top 20 tracked keywords) | GSC / Semrush | <40 | <20 |
| Referring domains | Semrush Backlinks | 5 | 25 |
| Ranking keywords (top 100) | Semrush | 30 | 150 |
| Demo requests from organic | site form attribution | 2/mo | 10/mo |

### 8.2 AEO measurement

There is no native "AI citation share" metric — build a lightweight one:

1. **Weekly prompt panel.** Maintain a list of 20 buyer-intent prompts (see §5.2). Every Monday, run each through ChatGPT (with browsing), Perplexity, Claude (with search), and Gemini. Record (a) whether Alexandria is cited, (b) whether a competitor is cited instead, (c) which URL is cited.
2. **Citation share** = your cite count ÷ total cite count across the 20 prompts × 4 engines. Track weekly. Target ≥ 25% within 90 days.
3. **Brand mention monitoring**: Google Alert + Mention.com for "Alexandria" + "biopharma" / "diligence" / "rnpv" — exclude noise.
4. **Server-side LLM crawler tracking**: in the access log, count requests with user-agents containing `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Bingbot`. Growth here precedes citation growth by ~4 weeks.

### 8.3 Tooling

- Google Search Console — must.
- Bing Webmaster — must (Bing data feeds ChatGPT search).
- Semrush — already connected; track Position Tracking weekly.
- Plausible or simple GA4 — pageview attribution.
- A 30-line internal script to log + summarise the weekly prompt-panel results.

---

## 9. Master action list (table)

| # | Action | Page | Category | Effort | Impact |
|---|---|---|---|---|---|
| 1 | Replace lovable URL → production domain everywhere | all | Technical | S | H |
| 2 | Verify production domain in GSC + Bing WMT, submit sitemap | n/a | Technical | S | H |
| 3 | Add H2 with keyword pair under hero H1 | / | On-page | S | H |
| 4 | Add FAQPage JSON-LD on home | / | AEO | S | H |
| 5 | Add FAQPage JSON-LD on each post | /insights/* | AEO | S | H |
| 6 | Rewrite opening paragraphs of all 4 posts (§4.6) | /insights/* | AEO | S | H |
| 7 | Remove `offers` from SoftwareApplication schema | / | Schema | S | M |
| 8 | Replace YouTube iframe in hero with poster + click-to-load or self-hosted MP4 | / | CWV | M | H |
| 9 | Add `noindex` to NotFound | * | Technical | S | M |
| 10 | Add BreadcrumbList JSON-LD on /insights | /insights | Schema | S | M |
| 11 | Add 3 cross-links per post | /insights/* | Internal linking | S | M |
| 12 | Convert sitemap to `scripts/generate-sitemap.ts` | n/a | Technical | M | M |
| 13 | Add `sameAs` URLs to Organization schema once social profiles exist | / | Entity clarity | S | M |
| 14 | Publish `/insights/biotech-valuation-methods` (pillar) | new | Content | L | H |
| 15 | Publish `/insights/pharma-biotech-valuation-metrics` | new | Content | L | H |
| 16 | Publish `/insights/pharma-company-evaluation-criteria` | new | Content | L | M |
| 17 | Publish `/methodology` with TechArticle schema | new | Content + AEO | M | H |
| 18 | Add image alt text audit pass | all | On-page | S | M |
| 19 | Add `loading="lazy"` to below-fold imagery | all | CWV | S | M |
| 20 | Set up weekly LLM prompt panel (§8.2) | n/a | Measurement | M | M |
| 21 | Submit to Crunchbase, LinkedIn, G2, BioPharma Dive directory | off-site | Authority | M | M |
| 22 | Publish open-source rNPV Python lib with link back | off-site | Authority | M | M |
| 23 | Pitch one guest essay to Endpoints/STAT/BioCentury | off-site | Authority | L | H |
| 24 | Add server-log tracking for LLM crawler user-agents | n/a | Measurement | S | M |
| 25 | Title tightening pass (§2.2) | all | On-page | S | M |

---

## 10. Recap of assumptions / open questions

1. Production domain confirmed as `www.alexandria-discovery.com`? (Memory says yes.)
2. Are LinkedIn, Crunchbase, GitHub, and Twitter handles live? (Needed for `sameAs`.)
3. Is the YouTube hero video replaceable with a short self-hosted MP4? (Best CWV fix.)
4. Pricing public or gated? (Determines whether to add `offers` later.)
5. Any client logos cleared for `/case-studies`? (BOFU asset.)

Answer those five and I'll implement actions 1–13 in a single pass.
