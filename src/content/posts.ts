export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  category: string;
  readTime: string;
  blocks: Block[];
  faqs: Faq[];
};

export const posts: Post[] = [
  {
    slug: "rnpv-biotech-valuation",
    title: "How to model rNPV for a biotech asset (with a worked example)",
    description:
      "rNPV discounts each future cash flow by both the time value of money and the cumulative probability a biotech program survives every prior clinical phase. A worked Phase 2 oncology example, with the assumptions analysts get wrong.",
    date: "2026-04-12",
    category: "Valuation",
    readTime: "11 min read",
    blocks: [
      { type: "p", text: "Risk-adjusted Net Present Value (rNPV) is the default valuation framework for pre-revenue biopharma assets. Unlike a generic DCF, rNPV explicitly prices the probability that a clinical program survives each stage of development — and that single adjustment usually moves the headline number by an order of magnitude." },
      { type: "p", text: "If you sit in BD&L, investment banking healthcare, or a consulting life-sciences practice, you are almost certainly being asked to produce rNPV models faster than you can build them by hand. This piece is a working analyst's guide: what the math actually does, where the assumptions hide, and how to avoid the three mistakes we see most often in licensing and M&A diligence." },
      { type: "h2", text: "The core formula" },
      { type: "p", text: "rNPV discounts each future cash flow not only for time value, but for the cumulative probability that the program reaches the period in which the cash flow occurs:" },
      { type: "quote", text: "rNPV = Σ ( CFₜ × Pₜ ) / (1 + r)ᵗ − Σ ( Costₜ × Pₜ_cost ) / (1 + r)ᵗ" },
      { type: "p", text: "Where CFₜ is the projected post-launch cash flow in period t, Pₜ is the cumulative probability the asset reaches that period, Costₜ is the R&D outlay in period t, Pₜ_cost is the probability you still incur that cost, and r is the discount rate. The asymmetry between Pₜ and Pₜ_cost matters — you spend money to fail, but only earn revenue if you succeed." },
      { type: "h2", text: "Phase transition probabilities" },
      { type: "p", text: "The single biggest lever in any rNPV is the probability of technical and regulatory success (PTRS) at each phase. Industry benchmarks vary by therapeutic area, but the canonical BIO / Informa cuts give a reasonable starting point:" },
      { type: "ul", items: [
        "Phase 1 → Phase 2: ~52% on average; oncology closer to 57%",
        "Phase 2 → Phase 3: ~29% — this is where most assets die",
        "Phase 3 → Filing: ~58%",
        "Filing → Approval: ~91%",
        "Compounded Phase 1 → Approval: roughly 8% across all indications, materially lower in oncology",
      ] },
      { type: "p", text: "These numbers are averages. A serious model adjusts for indication, mechanism novelty, biomarker availability, and the strength of phase 2 readouts. Using the population average for a first-in-class CNS asset will systematically overvalue it." },
      { type: "h2", text: "Worked example: a Phase 2 oncology asset" },
      { type: "p", text: "Suppose you are evaluating an in-licensing opportunity for a Phase 2 oncology asset with the following inputs:" },
      { type: "ul", items: [
        "Peak unadjusted sales: $1.2B in year 8 post-launch",
        "Launch year: 5 years from today (assuming Phase 2 starts now)",
        "Remaining R&D cost: $180M over 4 years",
        "Discount rate: 11%",
        "PTRS Phase 2 → Approval: 18%",
      ] },
      { type: "p", text: "On a non-risk-adjusted basis the asset looks like a low-billions NPV. Once you apply the 18% cumulative probability to post-launch cash flows and a phase-weighted probability to the R&D spend, the rNPV typically lands between $90M and $160M depending on ramp curve and terminal assumptions. That spread — not the point estimate — is what licensing negotiations actually argue about." },
      { type: "h2", text: "The three mistakes we see most often" },
      { type: "ol", items: [
        "Using full PTRS on costs as well as revenues. You incur most of the cost regardless of outcome — risk-adjust the spend at a higher (closer to 100%) probability than the revenue side.",
        "Holding peak sales flat across scenarios. Peak sales should move with success probability — the worlds where the asset succeeds and the worlds where it dominates the market are not the same world.",
        "Anchoring to one discount rate. For early-stage assets, the discount rate is a proxy for everything the PTRS doesn't capture (commercial risk, competition, payer dynamics). Run a sensitivity, not a single number.",
      ] },
      { type: "h2", text: "How Alexandria does this" },
      { type: "p", text: "Inside Alexandria, an rNPV is a first-class deliverable, not a spreadsheet artifact. You point the workspace at an asset, the engine pulls phase status, indication, mechanism, comparable trials, and competitive landscape from the live corpus, and returns a defensible rNPV with the assumptions exposed line by line. The same model feeds the Monte Carlo simulation that produces the distribution you actually need to negotiate against." },
    ],
    faqs: [
      { q: "What is rNPV in biotech valuation?", a: "rNPV (risk-adjusted Net Present Value) is a discounted cash flow valuation that explicitly multiplies each future cash flow by the cumulative probability of the program reaching that stage of development. It is the standard framework for valuing pre-revenue biopharma assets." },
      { q: "What discount rate should I use for an rNPV model?", a: "Discount rates for early-stage biopharma assets typically range from 10% to 15% depending on stage, indication, and capital source. Late-stage and approved assets can sustain lower rates (7–10%); pre-clinical and platform plays usually require 15%+." },
      { q: "How is rNPV different from a regular DCF?", a: "A standard DCF assumes the projected cash flows will occur and only discounts for time value. rNPV layers a phase-by-phase probability of technical and regulatory success on top, so unsuccessful scenarios are explicitly priced into the headline number." },
      { q: "Where do PTRS benchmarks come from?", a: "The most commonly cited probability of technical and regulatory success benchmarks come from the BIO / Informa Clinical Development Success Rates studies, which aggregate transition rates across thousands of clinical programs by phase and indication." },
    ],
  },
  {
    slug: "monte-carlo-licensing-deals",
    title: "Monte Carlo simulation for licensing deal valuation",
    description:
      "Monte Carlo simulation turns a single rNPV into a probability distribution by varying PTRS, peak sales, and discount rate across thousands of iterations — the range BD and IB teams negotiate against.",
    date: "2026-04-18",
    category: "Valuation",
    readTime: "9 min read",
    blocks: [
      { type: "p", text: "A licensing term sheet does not get negotiated on a point estimate. It gets negotiated on the shape of the distribution — what is the asset worth in the 90th-percentile world, what does it look like in the 10th, where does the median land, and how much should the upfront move to compensate for the risk that lives in the tails." },
      { type: "p", text: "Monte Carlo simulation is how you build that distribution. You take the inputs that drive your rNPV — peak sales, ramp curve, PTRS, discount rate, COGS, royalty stack — let each one vary according to a defined distribution, and run the model thousands of times. The output is not a number; it is a probability density that maps directly to deal structuring." },
      { type: "h2", text: "Which inputs to randomize" },
      { type: "p", text: "Resist the temptation to randomize everything. Three or four inputs explain most of the spread in almost every biopharma model:" },
      { type: "ul", items: [
        "PTRS at the current and next phase — usually a beta distribution anchored to BIO benchmarks",
        "Peak sales — lognormal, with the mean set by analog launches and the variance by the strength of the differentiation case",
        "Time to peak — triangular distribution, typically 4 to 8 years post-launch",
        "Discount rate — normal, with the standard deviation reflecting uncertainty about the cost of capital",
      ] },
      { type: "p", text: "Adding more inputs feels rigorous but mostly adds noise. The discipline is identifying the two or three variables whose uncertainty actually drives the deal." },
      { type: "h2", text: "How many iterations are enough" },
      { type: "p", text: "For licensing deal work, 10,000 iterations is the practical floor. The reason is not statistical — it is so that the 5th and 95th percentiles stabilize across runs. If your P5 and P95 move by more than a few percent between runs, you do not have a defensible distribution yet." },
      { type: "h2", text: "Reading the output for negotiation" },
      { type: "p", text: "A Monte Carlo output gives you three things a single rNPV cannot:" },
      { type: "ol", items: [
        "A median valuation — the number you anchor the negotiation to. This is usually below the mean because the distribution is right-skewed.",
        "A defensible upper bound — the P90 is the number you justify the upfront against. Anything above P95 is asking the licensee to pay for outcomes that rarely happen.",
        "A probability of value destruction — the percentage of simulations where rNPV is negative. If that number is above 30%, the deal structure needs more milestones and less upfront.",
      ] },
      { type: "h2", text: "Common pitfalls" },
      { type: "p", text: "The two errors we see most often: assuming independence between variables that are actually correlated (a higher PTRS and a higher peak sales tend to co-occur, because both reflect the strength of the data), and using uniform distributions for parameters that have well-characterized empirical distributions. Both errors flatten the output and understate the tails." },
      { type: "h2", text: "Inside Alexandria" },
      { type: "p", text: "Monte Carlo simulation is built into the workspace. The same rNPV you generate becomes the simulation's base case, you select which inputs to randomize, and Alexandria returns the distribution with sensitivities ranked by contribution to variance — the chart that ends up in the committee deck." },
    ],
    faqs: [
      { q: "Why use Monte Carlo simulation in biopharma deal valuation?", a: "Monte Carlo simulation converts a single-point rNPV into a probability distribution by varying key inputs (PTRS, peak sales, discount rate) across thousands of iterations. This gives BD and IB teams a defensible range to negotiate against, not just one number." },
      { q: "How many Monte Carlo iterations are needed for a licensing deal model?", a: "10,000 iterations is the practical floor for licensing work. At that volume, the 5th and 95th percentile estimates stabilize between runs, which is what makes the output defensible in committee." },
      { q: "What distributions should I use for Monte Carlo inputs?", a: "Use beta distributions for PTRS, lognormal for peak sales, triangular for time-to-peak, and normal for discount rate. These match the empirical shapes those variables take in the historical data." },
      { q: "What is a good probability of negative rNPV?", a: "For an in-licensing decision, a probability of negative rNPV below 20% is comfortable. Between 20% and 30% the deal needs heavier back-loaded milestones; above 30% the structure usually needs to be rethought." },
    ],
  },
  {
    slug: "biopharma-diligence-checklist",
    title: "The biopharma M&A diligence checklist analysts actually use",
    description:
      "Biopharma M&A diligence covers six workstreams — scientific, IP, regulatory, CMC, commercial, and financial. The working checklist deal teams actually use, organized by what kills a deal.",
    date: "2026-04-25",
    category: "Diligence",
    readTime: "12 min read",
    blocks: [
      { type: "p", text: "Diligence checklists are easy to find and mostly useless. The published ones read like compliance documents: exhaustive, undifferentiated, and indifferent to the realities of how a deal team actually allocates two analysts and four weeks. This is the version we see used in practice — organized by what kills a deal, not by what fills a binder." },
      { type: "h2", text: "1. Scientific diligence" },
      { type: "p", text: "The objective is not to validate the science; it is to identify the scenarios in which the science fails and price them. Focus the workstream on:" },
      { type: "ul", items: [
        "Mechanism of action: is it novel, validated, or precedented? Novel mechanisms carry latent risk that historical PTRS does not capture.",
        "Biomarker strategy: assets with a validated biomarker for patient selection have meaningfully higher Phase 2 → Phase 3 transition rates.",
        "Translational evidence: animal model relevance to the human indication is where most diligence reports skip the hard question.",
        "Comparable trials: read every prior trial in the indication that hit the same mechanism — failures included.",
      ] },
      { type: "h2", text: "2. Intellectual property" },
      { type: "p", text: "IP diligence in biopharma is dominated by composition of matter coverage, secondary patent strategy, and freedom to operate. The questions that matter:" },
      { type: "ul", items: [
        "When does composition of matter expire? Everything downstream is leverage against that date.",
        "Are there secondary patents (formulation, method-of-use, manufacturing) that meaningfully extend exclusivity, and how defensible are they?",
        "What is the FTO landscape? An asset can be patented and still infringe.",
        "Are there any inventorship disputes, prior art issues, or post-grant proceedings active?",
      ] },
      { type: "h2", text: "3. Regulatory" },
      { type: "p", text: "Regulatory diligence is read as a story: what has the sponsor agreed with the agency, what have they not, and where are the unresolved questions." },
      { type: "ul", items: [
        "Pull the meeting minutes (Type B / Type C with FDA, Scientific Advice with EMA). What did the agency push back on?",
        "Is there a Special Protocol Assessment or equivalent? If yes, the Phase 3 design risk is materially lower.",
        "Designations (Fast Track, Breakthrough, ODD, PRIME): valuable but read the underlying basis — designations get granted on early data that does not always hold up.",
        "Pediatric study plan, manufacturing comparability, and post-marketing commitments — these are the diligence items that ambush deals at the last minute.",
      ] },
      { type: "h2", text: "4. Manufacturing and CMC" },
      { type: "p", text: "Often deprioritized in BD diligence, frequently the actual reason a deal slips. Confirm process scale, comparability between clinical and commercial batches, and whether the sponsor has a real commercial supply chain or is still relying on a CDMO arrangement that does not scale." },
      { type: "h2", text: "5. Commercial and market access" },
      { type: "p", text: "Commercial diligence in biopharma is not market sizing — it is reimbursement architecture. The questions are:" },
      { type: "ul", items: [
        "Who pays, and what coverage decision logic do they apply?",
        "What is the comparator and what does the value story look like against it?",
        "Are there IRA implications (Part D negotiation, small-molecule vs. biologic timing)?",
        "What is the realistic ramp curve given launch sequencing and competitor pipelines?",
      ] },
      { type: "h2", text: "6. Financial and deal structure" },
      { type: "p", text: "rNPV, Monte Carlo, comparable transaction analysis, and a clear view on milestone and royalty stacking against the licensor's existing obligations. If there is an inbound license, read it — the economics flow through." },
      { type: "h2", text: "How Alexandria runs this" },
      { type: "p", text: "The reason this checklist takes deal teams four weeks is not the work itself; it is the cross-referencing. Every line item above is an intersection of internal documents, external databases, and judgement. Alexandria runs the cross-references in parallel against the live corpus and the data room, then returns the diligence pack — scientific, IP, regulatory, CMC, commercial, and financial — in the deliverable format your team already uses." },
    ],
    faqs: [
      { q: "What does biopharma M&A diligence cover?", a: "Standard biopharma M&A diligence covers six workstreams: scientific, intellectual property, regulatory, manufacturing/CMC, commercial and market access, and financial including rNPV and deal-structure modeling." },
      { q: "How long does biopharma diligence usually take?", a: "End-to-end diligence for a mid-size biopharma licensing or acquisition deal typically runs four to eight weeks with a deal team of three to five people. Tools that automate cross-referencing can compress the analytical portion to under a week." },
      { q: "What is the most overlooked area of biopharma diligence?", a: "Manufacturing and CMC diligence is the most frequently deprioritized and most frequently cited reason for deals slipping or breaking in the final stretch — usually around comparability between clinical and commercial batches." },
      { q: "Who runs biopharma M&A diligence?", a: "Diligence is typically run by the acquirer's or licensee's internal BD&L team, supported by investment banking healthcare coverage, life-sciences consulting firms, and specialist legal and scientific advisors depending on deal size." },
    ],
  },
  {
    slug: "licensing-vs-acquisition",
    title: "Licensing vs. acquisition: how biopharma BD teams actually decide",
    description:
      "The framework BD&L teams use to choose between in-licensing a single asset and acquiring the company that owns it — and the factors that decide which path wins.",
    date: "2026-05-02",
    category: "Deal Strategy",
    readTime: "8 min read",
    blocks: [
      { type: "p", text: "When a biopharma is attractive, the strategic question is almost never whether to engage — it is whether to license the asset or acquire the company that owns it. The trade-off looks straightforward on a slide and is brutal in practice. Here is the framework BD teams actually apply." },
      { type: "h2", text: "When licensing wins" },
      { type: "p", text: "In-licensing a single asset is the right answer when the target's value is concentrated in one program, the rest of the pipeline is non-core, and the licensee can operate the asset more efficiently than the licensor. The economic logic is that the licensor keeps optionality on the rest of the portfolio and the licensee pays only for what it values." },
      { type: "p", text: "Licensing also wins when antitrust, regulatory, or geographic constraints make a full acquisition expensive or slow. Regional licensing (ex-US rights, China rights, Japan rights) lets a deal close in weeks rather than quarters." },
      { type: "h2", text: "When acquisition wins" },
      { type: "p", text: "Acquisitions win when value is distributed across multiple programs, the platform itself has option value, or the talent and tacit knowledge inside the target are critical to executing the lead asset. The classic example is acquiring a company whose lead asset is in Phase 2 — the program economics may not justify the premium, but the pipeline depth and team behind it do." },
      { type: "p", text: "Acquisitions also dominate when the licensee needs to consolidate control of IP across multiple targets, manufacturing, or geographies — anywhere the licensing carve-outs would create coordination cost." },
      { type: "h2", text: "The decision framework" },
      { type: "p", text: "Three questions resolve most cases:" },
      { type: "ol", items: [
        "What fraction of the target's enterprise value sits in the lead asset? If above ~70%, lean licensing. Below ~50%, lean acquisition.",
        "Is the team behind the asset replaceable post-deal? If not, you are buying the team, which means acquisition.",
        "What is the optionality you are giving up by not owning the platform? Quantify it as an expected NPV across the next two pipeline programs and add it to the acquisition case.",
      ] },
      { type: "h2", text: "Hybrid structures" },
      { type: "p", text: "The most interesting deals in the last few years have been hybrid: option-to-acquire arrangements, structured collaborations with milestone-triggered acquisition rights, and co-development agreements that resolve into either outcome depending on data readouts. These exist precisely because the licensing-vs-acquisition trade-off has more dimensions than either pure structure captures." },
      { type: "h2", text: "Where Alexandria fits" },
      { type: "p", text: "Alexandria sizes both paths in the same workspace. You ask a single question — should we license or acquire — and the engine produces the rNPV and Monte Carlo distribution for the asset under licensing economics, the equivalent for the full company under acquisition economics, and the side-by-side that lets the committee make the call." },
    ],
    faqs: [
      { q: "When should a biopharma in-license rather than acquire?", a: "In-licensing is the right structure when the target's value is concentrated in a single asset (typically more than 70% of enterprise value), the licensee can operate the asset efficiently without the surrounding team, and regulatory or antitrust constraints make a full acquisition slow or expensive." },
      { q: "What makes an acquisition preferable to licensing?", a: "Acquisition is preferable when value is spread across multiple pipeline programs, when the platform itself carries optionality, or when the target's team and tacit knowledge are essential to executing the lead asset." },
      { q: "What are hybrid licensing-acquisition structures?", a: "Hybrid structures include option-to-acquire arrangements, structured collaborations with milestone-triggered acquisition rights, and co-development agreements that resolve into either licensing or acquisition outcomes depending on clinical data readouts." },
      { q: "How do BD teams price the difference between licensing and acquisition?", a: "BD teams model both paths as rNPV with Monte Carlo distributions — licensing economics for the single asset, acquisition economics for the full enterprise — then add the option value of the broader pipeline to the acquisition case to make them comparable." },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);