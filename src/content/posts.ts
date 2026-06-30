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
    slug: "phase-2-readouts-are-misread",
    title: "Why most Phase 2 readouts are misread by deal teams",
    description:
      "Subgroup chasing, hazard ratios that decay over time, and crossover-contaminated OS curves are the three signals that separate a real Phase 2 from a marketable one. What to actually read in the press release.",
    date: "2026-05-10",
    category: "Diligence",
    readTime: "10 min read",
    blocks: [
      { type: "p", text: "A Phase 2 press release is a marketing document written under SEC constraint. The job of the BD analyst reading it at 7am is to separate the data that survives Phase 3 from the data that was engineered to clear a fundraise. After several hundred of these, three patterns explain most of the false positives." },
      { type: "h2", text: "1. The subgroup that became the trial" },
      { type: "p", text: "If the headline efficacy lives in a subgroup that was not pre-specified in the original SAP, you are looking at hypothesis generation dressed up as confirmation. The tell is language: 'in patients with X', 'in the biomarker-positive population', 'in those receiving prior Y'. Pull the original ClinicalTrials.gov protocol version and check the analysis plan. If the subgroup was added after enrollment started, discount the effect size heavily — the registrational study will almost certainly fail to reproduce it." },
      { type: "h2", text: "2. Hazard ratios that decay" },
      { type: "p", text: "A Phase 2 HR of 0.55 at the first interim, drifting to 0.78 at a later cutoff, is the signature of a proportional hazards violation. The most common cause is heterogeneous patient response: a fraction of patients respond deeply and the rest barely move, and as the deep responders exit the at-risk set, the curves converge. This matters because Phase 3 will be powered on the early HR and read out on the late one. Always ask for the latest data cut, not the cut in the publication." },
      { type: "h2", text: "3. OS curves contaminated by crossover" },
      { type: "p", text: "Crossover is the standard humane design choice in oncology and the standard reason OS endpoints are uninterpretable. If more than ~30% of control-arm patients received the experimental drug post-progression, the OS HR is an attenuated estimate of the true effect. The fix is RPSFT or IPCW analyses, which sponsors will sometimes provide on request. If they do not, treat OS as directional, not registrational." },
      { type: "h2", text: "What this means for valuation" },
      { type: "p", text: "Each of these three issues maps to a specific PTRS adjustment. Post-hoc subgroup wins should drop Phase 2 → Phase 3 PTRS by 15–25 points relative to indication benchmarks. Decaying HRs justify a 10-point cut and a tighter peak-sales distribution. Crossover-contaminated OS should not move PTRS but should compress the upper tail of your peak sales lognormal, because the commercial story will struggle without a clean OS win." },
      { type: "h2", text: "The press-release reading order" },
      { type: "ol", items: [
        "Skip the headline. Go to the table.",
        "Confirm the analysis was pre-specified — find the SAP version date.",
        "Check the data cutoff date vs. the median follow-up. Short follow-up + dramatic HR = wait.",
        "Look for the crossover rate before reading OS.",
        "Read the safety table last. A pristine safety profile in a small Phase 2 is information about sample size, not about the drug.",
      ] },
    ],
    faqs: [
      { q: "What is a post-hoc subgroup analysis?", a: "A post-hoc subgroup analysis is one defined after looking at the data. Effects identified this way are exploratory and have a high false-positive rate; they fail to replicate in Phase 3 far more often than pre-specified analyses." },
      { q: "Why do hazard ratios change over time?", a: "When the assumption of proportional hazards is violated — usually because a subset of patients responds far more deeply than the rest — the HR drifts as patients exit the risk set. This is a structural feature of the patient population, not a statistical artifact." },
      { q: "How does crossover affect overall survival results?", a: "If control-arm patients receive the experimental drug after progression, the OS curves converge and the OS hazard ratio understates the true survival benefit. Sensitivity analyses (RPSFT, IPCW) attempt to correct for this." },
    ],
  },
  {
    slug: "hidden-royalty-stack",
    title: "The hidden royalty stack: why headline rates mislead BD teams",
    description:
      "A 10% royalty is rarely a 10% royalty. Step-downs, sublicense pass-throughs, anti-stacking provisions, and inbound licenses can compress effective rates by 300–600 bps. How to model what the licensee actually pays.",
    date: "2026-05-15",
    category: "Deal Strategy",
    readTime: "9 min read",
    blocks: [
      { type: "p", text: "Most rNPV models we see use the headline royalty rate from the term sheet and stop. That number is almost never what the licensee actually pays. The economics of a real licensing deal are governed by a stack of inbound obligations, step-downs, and pass-through provisions that can compress the effective rate by hundreds of basis points." },
      { type: "h2", text: "What sits underneath a 10% royalty" },
      { type: "p", text: "Walk through a typical mid-size in-licensing deal for a Phase 2 asset:" },
      { type: "ul", items: [
        "Headline royalty: 10% on net sales above a threshold",
        "Step-down on biosimilar entry: drops to 5%, sometimes 3%, when share crosses a defined band",
        "Step-down on patent expiry: usually drops to a knowledge-only royalty of 1–2% for a defined tail",
        "Anti-stacking: licensee can deduct up to 50% of third-party royalties needed to commercialize, capped at a floor (often 50% of the headline)",
        "Sublicense pass-through: if the licensee further sublicenses, the licensor takes a percentage of sublicense income that is rarely equivalent to the headline economics",
      ] },
      { type: "p", text: "The effective NPV-weighted royalty across a 12-year exclusivity window typically lands between 6% and 7.5% on a headline 10% — and that is before the inbound stack." },
      { type: "h2", text: "The inbound stack" },
      { type: "p", text: "Most assets carry a chain of upstream licenses: academic IP, platform technology licenses, CDMO arrangements that include royalty components, and occasionally a discovery-stage license that survived an earlier deal. Each contributes a few hundred bps. A common configuration for a discovery-academic asset:" },
      { type: "ul", items: [
        "Originating university license: 2–4% on net sales, sometimes with a sublicense fee component",
        "Platform technology license: 0.5–2% (delivery tech, antibody scaffold, etc.)",
        "Manufacturing royalty: 0.5–1.5% on net sales depending on process complexity",
      ] },
      { type: "p", text: "Anti-stacking lets the licensee net some of this against the headline, but never all of it. The licensor's headline 10% is, in practice, an obligation to pay roughly 5–6% on net sales after the stack and the step-downs." },
      { type: "h2", text: "How to model it" },
      { type: "p", text: "Build the royalty cash flow line by line, not as a single rate. Each step-down trigger needs a probability and a timing distribution. The result is a royalty stream that looks nothing like a flat percentage of revenue — it is high early, compresses around LOE, and tails into a knowledge-only stub." },
      { type: "h2", text: "The negotiation implication" },
      { type: "p", text: "When the licensee is arguing for a lower headline rate, they are usually trading visible economics for the right to deduct less aggressively elsewhere. The deals that close at high headline royalties with broad anti-stacking are economically equivalent to deals that close at low headline royalties with narrow anti-stacking. The reason to prefer one structure over the other is reporting and tax — not economic substance." },
    ],
    faqs: [
      { q: "What is anti-stacking in a license agreement?", a: "Anti-stacking provisions allow the licensee to deduct a portion of third-party royalties (paid to upstream IP holders) from the royalties owed to the licensor, usually subject to a floor that protects the licensor's minimum economics." },
      { q: "How much do step-downs typically reduce royalties?", a: "A typical step-down structure compresses the effective NPV-weighted royalty by 200–400 bps versus the headline rate, driven mostly by post-LOE step-downs and biosimilar-triggered reductions." },
      { q: "Why do royalty stacks matter for rNPV?", a: "rNPV models built on headline royalty rates systematically overstate licensee economics. A correctly modeled stack — inbound licenses, step-downs, anti-stacking — usually moves licensee NPV down by 15–25%." },
    ],
  },
  {
    slug: "ira-small-molecule-penalty",
    title: "The IRA's small-molecule penalty is repricing oral oncology BD",
    description:
      "The IRA gives biologics 13 years before Medicare negotiation and small molecules 9. That four-year delta is moving deal multiples for oral oncology assets by 20–35% and reshaping where pharma writes checks.",
    date: "2026-05-20",
    category: "Policy",
    readTime: "8 min read",
    blocks: [
      { type: "p", text: "The Inflation Reduction Act of 2022 did something subtle and consequential: it made small molecules eligible for Medicare price negotiation at 9 years post-approval, and biologics at 13. The four-year gap is not a rounding error in an oncology model. It is the difference between selling at peak price for two years versus six." },
      { type: "h2", text: "What the math actually does" },
      { type: "p", text: "Take a hypothetical oral kinase inhibitor with peak US sales of $800M, of which roughly 55% is Medicare-exposed. Negotiated prices to date have come in 38–79% below WAC, with a median around 55%. Applied to year 10 onward, that is a ~30% revenue haircut on the Medicare slice — roughly $130M of annual revenue evaporating four years earlier than its biologic equivalent." },
      { type: "p", text: "Discounted at 10%, that delta is worth $300–500M in present value for a single asset. For a typical mid-cap pipeline of three oral oncology programs, the IRA is a billion-dollar repricing." },
      { type: "h2", text: "Where the capital is moving" },
      { type: "p", text: "BD heads we work with have responded in three observable ways:" },
      { type: "ol", items: [
        "Biologic and ADC programs at equivalent stages now clear higher implied valuations than oral small molecules — the spread is roughly 20–35% for late-clinical assets.",
        "Oral programs in rare disease and pediatric indications hold value because Medicare exposure is limited.",
        "Combination strategies that pair an oral with a biologic backbone are getting renewed attention because they protect the oral's pricing via the biologic's exclusivity window.",
      ] },
      { type: "h2", text: "The orphan drug carve-out trap" },
      { type: "p", text: "The IRA originally exempted single-indication orphan drugs from negotiation but penalized any expansion into a second indication. The 2025 technical fix narrowed the penalty, but the chilling effect on label expansion for orphan small molecules is still measurable in BD pipelines. If an asset has a clean rare-disease path and a possible follow-on indication, model the second indication's contribution down by 30–50% to reflect the disincentive to pursue it." },
      { type: "h2", text: "What the model should capture" },
      { type: "p", text: "A defensible rNPV for a US-marketed small molecule now needs three IRA-specific inputs:" },
      { type: "ul", items: [
        "Probability the asset is selected for negotiation in years 9–11 (function of Medicare spend rank)",
        "Expected MFP (Maximum Fair Price) discount distribution — center around 55% with a wide spread",
        "Probability of orphan-status preservation across label expansion decisions",
      ] },
      { type: "p", text: "Anyone still using a flat LOE-and-erosion model for a US small molecule is producing a number that is wrong by a quarter." },
    ],
    faqs: [
      { q: "What is the IRA small-molecule penalty?", a: "Under the Inflation Reduction Act, Medicare can negotiate prices on small molecules at 9 years post-approval and on biologics at 13. The four-year gap creates a structural valuation advantage for biologic modalities." },
      { q: "How much does the IRA reduce oral oncology asset values?", a: "Modeled across typical Medicare exposure and observed MFP discounts, the IRA reduces NPV for oral oncology assets by roughly 20–35% relative to a biologic equivalent, concentrated in the year-9-to-LOE window." },
      { q: "Does the IRA affect rare disease drugs?", a: "Single-indication orphan drugs are largely protected, but the original statute penalized label expansion. The 2025 technical correction narrowed but did not eliminate the disincentive." },
    ],
  },
  {
    slug: "decoding-fda-meeting-minutes",
    title: "Decoding FDA Type B meeting minutes: what the agency's language actually signals",
    description:
      "'The Agency recommends' is a soft warning. 'The Agency does not agree' is a kill signal. A working translation of the diplomatic register the FDA uses in Type B minutes, and what it means for deal risk.",
    date: "2026-05-25",
    category: "Regulatory",
    readTime: "11 min read",
    blocks: [
      { type: "p", text: "FDA Type B meeting minutes are written in a deliberate diplomatic register. Sponsors quote them selectively in press releases and term sheet narratives, and diligence teams reading the actual minutes need to know what the language is doing. After reading thousands of these documents, a working dictionary." },
      { type: "h2", text: "The escalation ladder" },
      { type: "ul", items: [
        "'The Agency acknowledges' — neutral receipt; no commitment.",
        "'The Agency agrees' — strong; treat as binding for the design element discussed.",
        "'The Agency does not object' — passive agreement; usable but the sponsor carries the risk.",
        "'The Agency recommends' — soft warning. The sponsor can deviate, but should expect the deviation to be raised at review.",
        "'The Agency advises' — stronger than recommends. Deviation will require justification.",
        "'The Agency has concerns' — explicit pushback. The issue is open and the sponsor needs to resolve it before the next interaction.",
        "'The Agency does not agree' — kill signal for the proposed design as stated.",
      ] },
      { type: "h2", text: "Three patterns that should change your model" },
      { type: "p", text: "First, when minutes contain 'the Agency recommends' on a primary endpoint and the sponsor's subsequent press release says the endpoint is 'agreed', the disclosure is misaligned with the document. This shows up surprisingly often. Always pull the minutes." },
      { type: "p", text: "Second, when the minutes record disagreement on the control arm and the sponsor's response is 'we will provide additional justification', read that as an unresolved Phase 3 design risk worth 5–10 points of Phase 3 → Approval PTRS." },
      { type: "p", text: "Third, when the minutes mention 'a single adequate and well-controlled trial may not be sufficient', the sponsor is being told they need two Phase 3 trials. The implications for cost and timeline are material and frequently buried in subsequent investor materials." },
      { type: "h2", text: "What to ask for in the data room" },
      { type: "ol", items: [
        "All Type B and Type C minutes for the asset, including pre-IND.",
        "The Briefing Document submitted before each meeting (this tells you what the sponsor was asking for, which contextualizes what the Agency said back).",
        "The sponsor's internal post-meeting summary — divergence between the official minutes and the internal summary is one of the most reliable diligence signals.",
        "Correspondence following the meeting, especially Information Request responses, which are where the actual operational disagreements get resolved.",
      ] },
      { type: "h2", text: "The deal-killer pattern" },
      { type: "p", text: "The configuration that ends deals: pre-IND minutes recording disagreement on the primary endpoint, followed by an End-of-Phase-2 meeting where the sponsor re-proposes the same endpoint, followed by Agency language that has stiffened from 'recommends' to 'does not agree'. That sequence means the Phase 3 design risk is severe and the sponsor has not been honest with itself. Walk." },
    ],
    faqs: [
      { q: "What is an FDA Type B meeting?", a: "Type B meetings are formal interactions between a drug sponsor and the FDA at defined milestones — pre-IND, end-of-Phase-1, end-of-Phase-2, pre-NDA/BLA. Minutes from these meetings are the most important regulatory document in any biopharma diligence." },
      { q: "What does 'the Agency does not agree' mean?", a: "It is the strongest disagreement the FDA expresses in writing short of a Refuse-to-File. It means the proposed design or position as stated will not be accepted and the sponsor must materially revise it." },
      { q: "Are FDA meeting minutes binding?", a: "Type B minutes are not formally binding, but the Agency holds itself and sponsors to the positions documented in them. Deviating from agreed positions creates risk at NDA review." },
    ],
  },
  {
    slug: "platform-ma-integration-math",
    title: "Why platform M&A keeps failing — the integration math no one runs",
    description:
      "Platform acquisitions are priced on the option value of unbuilt programs. They fail because the value depends on retaining the people building them, and acquirers consistently underestimate post-deal attrition.",
    date: "2026-06-01",
    category: "Deal Strategy",
    readTime: "10 min read",
    blocks: [
      { type: "p", text: "Across the last decade of platform biotech acquisitions, the median outcome has been a write-down. The pattern is consistent enough that it deserves a structural explanation, not the usual 'integration is hard' shrug. The math is unforgiving and most acquirers do not run it." },
      { type: "h2", text: "What a platform acquisition actually buys" },
      { type: "p", text: "A platform company's value is dominated by the option value of programs not yet started. The lead asset is usually 20–40% of the modeled NPV; the rest is the expected NPV of future programs that the platform is expected to generate at a defined rate and quality. That option value is real but it is contingent on three things: the platform technology continues to produce assets at the historical rate, those assets are at least as good as the lead, and the people running the platform stay long enough to deliver them." },
      { type: "h2", text: "The attrition problem" },
      { type: "p", text: "Post-acquisition attrition in biotech platform companies is concentrated in the scientific founders and the early platform builders. Public data on retention is poor, but our observation across two dozen platform deals: roughly 40–60% of the senior platform team has left within 24 months of close, weighted heavily toward the people whose tacit knowledge actually drives output." },
      { type: "p", text: "Acquirers consistently model this attrition as a cost issue (replacement hires, retention pool) rather than as a productivity issue. The productivity hit is what kills the deal: a platform that was producing two INDs per year pre-deal is often producing one IND per year by year three." },
      { type: "h2", text: "The integration math" },
      { type: "p", text: "If the platform's NPV depends on producing N assets over T years, and post-deal productivity drops to αN, the option-value portion of the deal scales linearly with α. A 50% productivity hit on a deal where 70% of the price was option value is a 35% headline overpay — and that is before considering the discount rate effect of the longer cycle time." },
      { type: "p", text: "Translated: most platform deals need α to remain above ~0.75 to clear the deal hurdle. The observed α across the cohort is closer to 0.5." },
      { type: "h2", text: "What works when it works" },
      { type: "p", text: "The successful platform integrations share three structural features:" },
      { type: "ol", items: [
        "The acquirer left the platform team in a discrete unit with its own management, budget, and decision rights, often for 3+ years.",
        "Retention economics were structured around platform-specific milestones (assets nominated, INDs filed) rather than asset-specific or corporate-level milestones.",
        "The acquirer's existing R&D leadership did not attempt to 'apply rigor' to the platform's discovery process within the first 18 months — the imposition of process is what triggers the senior departures.",
      ] },
      { type: "h2", text: "The diligence implication" },
      { type: "p", text: "If you are diligencing a platform acquisition, the question is not whether the platform works. It is whether your organization can leave it alone for three years. The honest answer is usually no, and the price should reflect that." },
    ],
    faqs: [
      { q: "Why do platform biotech acquisitions fail?", a: "Most platform acquisitions fail because the deal value depends on option value from unbuilt future programs, and post-deal scientific attrition reduces the platform's productivity enough to destroy that option value." },
      { q: "What is the average post-deal attrition rate in biotech platforms?", a: "Empirically, 40–60% of the senior platform team typically departs within 24 months of an acquisition, with the departures concentrated in the scientific founders and early platform builders whose tacit knowledge drives productivity." },
      { q: "How should acquirers price platform option value?", a: "By explicitly modeling a productivity multiplier (α) on post-deal asset generation and stress-testing the deal at α = 0.5 to 0.7. Most platform deals do not clear that hurdle, which is why the cohort underperforms." },
    ],
  },
  {
    slug: "reading-a-crl",
    title: "Reading a Complete Response Letter: deal-relevant signal versus noise",
    description:
      "A CRL on CMC is usually a 12–18 month problem. A CRL on efficacy is usually a deal-breaking problem. How to triage a Complete Response Letter for deal timing and asset value.",
    date: "2026-06-05",
    category: "Regulatory",
    readTime: "9 min read",
    blocks: [
      { type: "p", text: "When the FDA issues a Complete Response Letter, the sponsor's stock moves before the letter is read. That gap — between the headline and the actual content — is where deal teams make or lose money. The letter itself is not public, but the sponsor must disclose the reasons in broad terms, and how those reasons are phrased tells you the resolution timeline." },
      { type: "h2", text: "The four categories" },
      { type: "p", text: "CRL issues fall into four buckets, each with a characteristic resolution path:" },
      { type: "ol", items: [
        "CMC / manufacturing — usually 6 to 18 months to resolve, often via a facility re-inspection. Asset value is largely preserved; deal timing is delayed.",
        "Clinical / safety — 12 to 36 months, sometimes requiring an additional study. Asset value is impaired but the asset is usually still viable.",
        "Efficacy — 24+ months and frequently terminal. Either an additional confirmatory study or a label that no longer supports the original commercial case.",
        "Statistical / analysis — variable. Sometimes resolved by a re-analysis (months); sometimes requires a new trial (years).",
      ] },
      { type: "h2", text: "How to read the press release" },
      { type: "p", text: "Sponsors are required to disclose the substance of the deficiencies but get to choose the language. The patterns:" },
      { type: "ul", items: [
        "'Additional information regarding [CMC/manufacturing/facility]' — almost always a Category 1 issue. Plan for 9–15 months.",
        "'Additional clinical data' — Category 2 or 3 depending on context. If the trial is already running, Category 2. If the FDA wants a new trial, Category 3.",
        "'Did not establish substantial evidence of effectiveness' — Category 3. This is the language that kills assets.",
        "'Reanalysis of existing data' — Category 4, usually resolvable in under a year.",
      ] },
      { type: "h2", text: "What sponsors do not say" },
      { type: "p", text: "The disclosure obligation covers the substance of the deficiencies, not the breadth. A CRL with three categories of issue will often be disclosed in a way that emphasizes the most resolvable one. The diagnostic question is whether the resubmission timeline being guided matches the deficiency category disclosed. A 'CMC issue' that the sponsor is guiding to a 24-month resubmission is not actually a CMC issue." },
      { type: "h2", text: "Deal implications" },
      { type: "p", text: "If you hold an option on an asset that receives a CRL, the option value depends almost entirely on which category the deficiencies fall into. A Category 1 CRL is a buying opportunity — the asset is largely intact and the market has overreacted to the headline. A Category 3 CRL is a sell-or-walk situation, and the longer the sponsor takes to clarify the category, the more likely it is Category 3." },
    ],
    faqs: [
      { q: "What is a Complete Response Letter?", a: "A Complete Response Letter (CRL) is the FDA's formal communication that an NDA or BLA cannot be approved in its current form. It identifies deficiencies that must be addressed before approval." },
      { q: "How long does it take to resolve a CRL?", a: "Resolution timelines depend on the deficiency category — CMC issues typically take 6–18 months, clinical issues 12–36 months, and efficacy issues often 24+ months or are terminal for the asset." },
      { q: "Is a CRL the same as a rejection?", a: "Not exactly. A CRL identifies deficiencies but leaves the door open to approval after the sponsor resubmits. A rejection in any operational sense is implicit when the deficiencies cannot reasonably be addressed." },
    ],
  },
  {
    slug: "oncology-deal-multiples-diverged",
    title: "The structural reason oncology deal multiples diverged from the rest of biopharma",
    description:
      "Oncology trades at a 1.8–2.5x multiple to other therapeutic areas at equivalent stages. The reason is not science fashion — it is the convergence of accelerated approval, biomarker-defined populations, and a buyer cohort with structural revenue gaps.",
    date: "2026-06-10",
    category: "Deal Strategy",
    readTime: "9 min read",
    blocks: [
      { type: "p", text: "Across the last five years, oncology assets at Phase 2 have traded at consistently higher multiples than equivalent-stage assets in cardiovascular, neurology, or immunology. The gap is not 10% — it is 80–150%. Three structural forces explain it, and understanding them tells you when the gap will compress." },
      { type: "h2", text: "Force 1: accelerated approval compresses time to revenue" },
      { type: "p", text: "Oncology benefits from accelerated approval more than any other therapeutic area. Roughly 40% of FDA oncology approvals in the last decade used accelerated pathways, compared to under 10% in most other areas. The effect on rNPV is direct: a 24-month earlier launch on a $1B peak-sales asset adds roughly $200–300M of NPV at a 10% discount rate." },
      { type: "h2", text: "Force 2: biomarker-defined populations raise PTRS" },
      { type: "p", text: "Phase 2 → Phase 3 PTRS in oncology is ~28% on average, but in biomarker-selected populations it is closer to 45%. Most modern oncology assets are biomarker-defined by construction (targeted therapies, IO+biomarker combos, ADCs). That PTRS lift compounds through to the Phase 3 → Approval transition." },
      { type: "h2", text: "Force 3: a buyer cohort with revenue gaps" },
      { type: "p", text: "The structural fact that drives the multiple is who is buying. Roughly twelve large pharmas account for the vast majority of oncology BD activity. Most of them face material LOE between 2026 and 2030 on oncology franchises. The number of strategic buyers chasing late-clinical oncology assets is high relative to the asset supply, and BD is a sealed-bid auction." },
      { type: "h2", text: "When the gap will compress" },
      { type: "p", text: "Two scenarios compress the oncology multiple back toward the rest of biopharma:" },
      { type: "ul", items: [
        "If the IRA's small-molecule penalty hits oral oncology hard enough to reduce buyer urgency — already partially priced in but not fully.",
        "If the FDA narrows accelerated approval, which has been signaled but not enacted. A meaningful tightening would directly reverse Force 1.",
      ] },
      { type: "p", text: "Until either of those occurs, oncology multiples are structurally elevated. BD teams pricing oncology assets against historical multi-therapeutic benchmarks systematically undershoot the market clearing price." },
      { type: "h2", text: "The diligence implication" },
      { type: "p", text: "If you are on the buy side, the multiple is not a bug; it is the price of access. Adjust your model to use oncology-specific PTRS and accelerated-approval timing, and the multiple stops looking irrational. If you are on the sell side, run the auction — bilateral negotiations leave 20%+ on the table in this environment." },
    ],
    faqs: [
      { q: "Why are oncology deals more expensive than other biopharma deals?", a: "Three structural forces: accelerated approval compresses time to revenue, biomarker-defined populations raise probability of success, and a concentrated buyer cohort facing oncology LOE creates competitive bidding dynamics." },
      { q: "How much higher are oncology multiples?", a: "Oncology assets at Phase 2 typically trade at 1.8–2.5x the multiples of comparable-stage assets in other therapeutic areas, based on observed precedent transactions over the last five years." },
      { q: "Will oncology deal multiples compress?", a: "The two most likely compression triggers are the IRA's small-molecule penalty reducing buyer urgency for oral oncology, and any FDA tightening of the accelerated approval pathway. Neither has fully played out yet." },
    ],
  },
  {
    slug: "biosimilar-erosion-curves-wrong",
    title: "The biosimilar erosion curve everyone uses is wrong",
    description:
      "The standard 'biosimilar = small molecule erosion minus 20%' heuristic is a useful approximation that fails on the assets that matter. The actual curve is bimodal, driven by interchangeability designation and channel mix.",
    date: "2026-06-15",
    category: "Valuation",
    readTime: "8 min read",
    blocks: [
      { type: "p", text: "When modeling LOE for a biologic, the standard practice is to take the small-molecule erosion curve (60–80% revenue loss in year 1, asymptoting to 90%+ by year 3) and shift it less aggressive. The most common heuristic is small-molecule minus 20 points, applied uniformly. That curve is, on average, roughly right. On the assets that matter for valuation, it is materially wrong." },
      { type: "h2", text: "The actual curve is bimodal" },
      { type: "p", text: "Empirical post-2019 biologic erosion data clusters into two regimes. In the first, erosion looks small-molecule-like — 50–70% revenue loss in year 1, accelerating. In the second, erosion is dramatically slower — 15–30% in year 1, often plateauing around 50% for years. The bimodal shape is not noise; it is the consequence of three policy-and-market features." },
      { type: "h2", text: "What predicts which regime applies" },
      { type: "ol", items: [
        "Interchangeability designation. A biosimilar with FDA interchangeability status that allows pharmacy-level substitution behaves like a small-molecule generic. Without it, biosimilars compete only through provider prescribing, which erodes share far more slowly.",
        "Channel mix. Assets dispensed primarily through specialty pharmacy and buy-and-bill (most oncology biologics, anti-TNFs in dermatology/rheumatology) erode more slowly than assets in retail or hospital channels because formulary decisions are slower and prescriber inertia is higher.",
        "Manufacturer rebate position. Originators that have established 340B or Medicare Part B rebate positions can defend share via net-price moves that biosimilars cannot easily match.",
      ] },
      { type: "h2", text: "The modeling implication" },
      { type: "p", text: "Do not blend the two regimes into a single weighted curve. Build the model as a probability-weighted mixture: a probability the asset enters the fast-erosion regime (interchangeable, retail channel) and a probability it stays in the slow regime, each with its own curve. The mean of that mixture is close to the standard heuristic, but the tails are radically different — and the tails are where valuation argument lives." },
      { type: "h2", text: "Where this matters most" },
      { type: "p", text: "For an asset within 4 years of LOE, the choice between regimes can change rNPV by 15–25%. Most pre-LOE deals are priced on the heuristic curve, which means assets headed for the slow regime are systematically underpriced and assets headed for the fast regime are systematically overpriced. The diligence work is identifying which regime applies before the market does." },
    ],
    faqs: [
      { q: "What is interchangeability for a biosimilar?", a: "FDA interchangeability designation allows a biosimilar to be substituted for the reference biologic at the pharmacy level without prescriber intervention. It is the single biggest driver of fast versus slow biosimilar erosion." },
      { q: "How fast do biosimilars erode biologic sales?", a: "Biosimilar erosion is bimodal. Interchangeable biosimilars in retail channels can erode 50–70% of revenue in year 1; biosimilars without interchangeability in specialty channels often take 15–30% in year 1, sometimes plateauing around 50% for years." },
      { q: "Why is the standard biosimilar erosion model wrong?", a: "The standard 'small molecule minus 20 points' heuristic averages a bimodal distribution. The mean is approximately right, but using it on any specific asset can be 15–25% off in either direction." },
    ],
  },
  {
    slug: "china-out-licensing",
    title: "China-out licensing: what changed structurally, and what BD teams are missing",
    description:
      "China-originated assets now account for roughly a third of global late-clinical pipeline by some counts. The diligence challenge is no longer whether Chinese data will be accepted — it is whether the asset's IP and CMC will survive a multinational franchise.",
    date: "2026-06-20",
    category: "Deal Strategy",
    readTime: "10 min read",
    blocks: [
      { type: "p", text: "The volume of out-licensing deals originating from Chinese biotechs has crossed a threshold where it is now a default sourcing channel for global pharma BD, not a niche. The diligence challenge has shifted accordingly. The question is no longer 'will the FDA accept the data', it is 'will the asset survive integration into a multinational franchise'." },
      { type: "h2", text: "What changed" },
      { type: "ul", items: [
        "FDA acceptance of single-country (China-only) trial data improved meaningfully post-2023, but remains a case-by-case decision. The Agency now expects bridging in most cases.",
        "Chinese sponsors have professionalized IP filing dramatically — composition of matter quality is broadly equivalent to US/EU sponsors for assets filed since 2020. Secondary patent strategy remains uneven.",
        "Out-licensing structures have shifted from full ex-China rights toward 'global ex-China' or specific-region carve-outs that preserve optionality.",
      ] },
      { type: "h2", text: "The CMC trap" },
      { type: "p", text: "The most common deal-killer in China-out licensing is manufacturing. Chinese sponsors often run clinical supply through CMOs that are not approved for commercial supply in the US or EU. The technology transfer and process comparability work required to commercialize is real (12–24 months) and frequently not budgeted in the BD case." },
      { type: "p", text: "The CMC diligence question to ask first: where will the commercial product be made, and what is the process comparability status between clinical and commercial drug substance. If the answer is 'we will transfer to a Western CDMO', add a year to the timeline and 30% to the launch-readiness cost." },
      { type: "h2", text: "The IP question that gets missed" },
      { type: "p", text: "Composition of matter is usually clean. The exposures sit elsewhere:" },
      { type: "ul", items: [
        "Method-of-use patents filed only in China, leaving the global market exposed to label-restriction workarounds",
        "Manufacturing process patents owned by the Chinese CMO rather than the sponsor, which complicates technology transfer",
        "Outbound license terms that conflict with US export-control or biosecurity regimes — relevant for certain genomics and cell-therapy assets",
      ] },
      { type: "h2", text: "What competent diligence looks like" },
      { type: "p", text: "For a China-origin asset, the diligence work that distinguishes good from poor deals is concentrated in three workstreams: an independent CMC assessment by a Western consultant, a global IP audit that includes Chinese filings translated and reviewed, and a clinical data integrity review — not a quality review, but a check that the source documents, monitoring logs, and case report forms support the published results. The third item sounds routine but is the most predictive of deal regret." },
    ],
    faqs: [
      { q: "Does the FDA accept China-only clinical data?", a: "FDA acceptance of single-country Chinese clinical data has improved post-2023 but remains case-by-case. In most cases the Agency expects bridging studies in the intended global population." },
      { q: "What is the biggest risk in a China-out licensing deal?", a: "The most frequent deal-killer is CMC — Chinese sponsors often run clinical supply through CMOs not approved for Western commercial supply, and the technology transfer to a Western CDMO takes 12–24 months and is often unbudgeted." },
      { q: "How should BD teams price China-origin assets?", a: "On the same rNPV framework as any other asset, with explicit adjustments for CMC technology-transfer cost and timeline, IP exposure in non-Chinese jurisdictions, and a bridging-study cost line in the Phase 3 plan." },
    ],
  },
  {
    slug: "milestone-design-real-economics",
    title: "Milestone design is where deal economics actually live",
    description:
      "Upfront and total deal value are press-release numbers. The expected value of the deal depends almost entirely on which milestones are triggered, when, and how they are defined. The clauses that move NPV by 20%.",
    date: "2026-06-25",
    category: "Deal Strategy",
    readTime: "9 min read",
    blocks: [
      { type: "p", text: "Press releases announcing licensing deals lead with two numbers: upfront and total potential deal value. Both are misleading. The upfront is real but small; the total is a function of milestone definitions that determine whether any of it is ever paid. The expected value of a typical milestone-heavy deal lives in clauses that never make the press release." },
      { type: "h2", text: "The three milestone categories" },
      { type: "ol", items: [
        "Development milestones — IND, Phase 2 start, Phase 3 start, BLA/NDA acceptance, approval. These are well-defined and most of the deal's risk-adjusted value typically sits in the approval milestone, not earlier ones.",
        "Regulatory milestones — territorial approvals beyond the first, additional indications, label expansions. These are where deal value compounds for successful assets and where the definitions matter most.",
        "Sales milestones — first dollar, $100M, $500M, $1B, $2B+. Often advertised prominently in the press release; in practice, paid in less than half of deals.",
      ] },
      { type: "h2", text: "Definitions that move NPV" },
      { type: "p", text: "The clauses that move expected value materially:" },
      { type: "ul", items: [
        "Geographic scope of regulatory milestones. Does 'first approval' mean first regulatory approval anywhere, or first FDA/EMA approval? A definition that allows a small-market approval to trigger the payment can compress timelines significantly.",
        "Indication-specific vs. asset-level milestones. Does a label expansion to a second indication re-trigger the development milestone stack, or does it only trigger a smaller expansion milestone? This is a 5–15% NPV swing.",
        "Sales milestone definitions — net vs. gross, annualized vs. trailing, single-country vs. global. A milestone defined on 'first calendar year exceeding $500M global net sales' is materially harder to hit than one defined on 'annualized run rate exceeding $500M based on any trailing two quarters'.",
        "Catch-up provisions. Some deals include provisions that pay an earlier-missed milestone if a later one is hit. These are valuable to the licensor and often given up cheaply.",
      ] },
      { type: "h2", text: "How to model it correctly" },
      { type: "p", text: "Treat each milestone as a contingent claim with its own probability and timing distribution. The probability is conditional on the milestones before it, and the timing is correlated with development pace. The expected value of the milestone schedule is rarely above 40% of the headline 'total deal value' the press release leads with, and frequently below 25%." },
      { type: "h2", text: "Negotiating implication" },
      { type: "p", text: "The licensee usually pushes for a low upfront and a large biobucks number, because biobucks rarely get paid in full. The sophisticated licensor pushes for higher upfront and clean, broadly-defined milestones — even at a lower headline number — because the realized economics are usually better. When you see a deal with a large gap between upfront and biobucks, the licensor almost always lost the negotiation." },
    ],
    faqs: [
      { q: "What percentage of biopharma milestones actually get paid?", a: "Across the cohort of disclosed licensing deals, sales milestones are paid in less than half of cases and full-stack development milestones in roughly 10–20%. The risk-adjusted expected value of the milestone schedule is typically 25–40% of the headline total." },
      { q: "What is biobucks?", a: "Biobucks is industry slang for the contingent, milestone-based portion of a licensing deal. The term is used because the announced total is dominated by payments that may never be made." },
      { q: "Which milestone clauses matter most for NPV?", a: "Geographic scope of regulatory milestones, indication-specific vs. asset-level structuring, and the precise definition of sales-milestone triggers (net vs. gross, annualized vs. trailing) are the clauses that swing NPV most." },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
