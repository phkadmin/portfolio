/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Content ----------
const TAGS = [
  "Systems Thinker",
  "0–1 & Scale Specialist",
  "Performance Obsessed",
  "End-to-End Owner",
  "Cross-functional Catalyst",
  "Tasteful Maximalist",
];

// Remote image URLs from the existing site — referenced directly so nothing needs copying.
const IMG = {
  desk: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/693a3322d0cf37e57c411416_3682EB05-9AAB-4E50-AD3D-A73B01948B41.JPG",
  screen1: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/6944d82f9b114fff690b9ff5_Screen%20Shot%202025-12-18%20at%209.44.07%20PM.png",
  field: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/693a32d1e8f4b346bae6f0f9_IMG_0594.JPG",
  road: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/6944d7de15458c3cc7c2f4ea_IMG_3172.JPG",
  light: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/6944d8de46f3d4b18a2ff17e_IMG_1824.jpg",
  screen2: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/6944d98540d924c31be488af_Screen%20Shot%202025-12-18%20at%209.49.50%20PM.png",
  horse: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69497445c2587614f2b36195_IMG_1669.jpg",
  a1: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461b6dbddd59b6e13f0835_IMG_4640.jpg",
  a2: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461ad54e1d2b85c54b2201_M60A5490-147.jpg",
  a3: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461b1e607da6c5b7020378_nograin-9%20(1).jpg",
  a4: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/6946264efc110f7465cb7637_PM-206.jpg",
  a5: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461c1151129a28090bde08_IMG_2809.jpg",
  a6: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461b75f7e722bdabfabd54_IMG_1914.jpg",
  a7: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461ce17f289c52ed89519e_IMG_2355.jpg",
  a8: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461b0fcbf872e9872e6f32_IMG_2012.jpg",
  a9: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461ecf3dae77e229e4188e_IMG_1873.jpg",
  a10: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461df0175096e790a20a35_IMG_6732.jpg",
  a11: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461ec6ef63bafa6e72e45d_IMG_2378.jpg",
  a12: "https://cdn.prod.website-files.com/6937a553a1daf210b6897abc/69461df81aac61089dc11f76_IMG_6939.JPG",
};

const WORK = [
  {
    id: "flex",
    num: "00",
    tags: ["FLEX", "ONBOARDING", "EXPERIMENTATION"],
    title: "Reimagining Onboarding Search",
    titleEm: "Through Experimentation.",
    desc: "Flex onboarding hinged on one fragile interaction: property search. I led the UX strategy to replace legacy property-name lookup with a residential address autocomplete experience, then chased the result through the infrastructure underneath it.",
    metrics: [
      { n: "+17.68%", l: "Bill connection lift vs. control" },
      { n: "+4.42%", l: "Incremental bill connections (absolute lift)" },
      { n: "+204%", l: "Autocomplete selection (25% to 76%)" },
    ],
    flex: true,
  },
  {
    id: "nwx",
    num: "01",
    tags: ["WEAVE", "2022–2024", "PLATFORM"],
    title: "Replatforming Weave to Unlock Revenue,",
    titleEm: "Retention, and Scale.",
    desc: "Led an 18-month reinvention of Weave's core product experience — consolidating fragmented applications into a single, scalable interface that reduced context switching, accelerated complex workflows, and unlocked measurable business impact.",
    metrics: [
      { n: "$2M", l: "Bookings increase Q after release" },
      { n: "–27%", l: "Logo churn (product-attributed)" },
      { n: "+13", l: "Product NPS" },
      { n: "+11", l: "SUS score" },
    ],
  },
  {
    id: "plg",
    num: "02",
    tags: ["WEAVE", "PLG", "PAYMENTS"],
    title: "Building a Self-Serve PLG Engine",
    titleEm: "that Scaled Payments Volume.",
    desc: "Established Weave's first self-service Payments growth engine by designing the PLG activation pathway that moved onboarding from an ops-driven model to a customer-led motion. Generated a net-new, scalable revenue stream and materially reduced CAC.",
    metrics: [
      { n: "$48.8M", l: "Payments volume in 9 months" },
      { n: "$361K", l: "Net new revenue in 9 months" },
      { n: "+2,769", l: "Accounts processing Payments" },
    ],
  },
  {
    id: "ci",
    num: "03",
    tags: ["WEAVE", "AI", "0→1"],
    title: "Converting Competitive Pressure into",
    titleEm: "$3.5M in Revenue.",
    desc: "Created and led the product vision for Call Intelligence — a net-new revenue driver born from competitive pressure and unmet customer demand. Diagnosed adoption and churn issues, rebuilt narrative framing, tightened AI output confidence, and shipped the gaps.",
    metrics: [
      { n: "$3.5M", l: "Incremental revenue added" },
      { n: "5,000", l: "New deals sold CI" },
      { n: "–91%", l: "Monthly churn (15% → 1.3%)" },
    ],
  },
];

const PRINCIPLES = [
  {
    n: "I.",
    title: "Build",
    em: "What Lasts.",
    body: "Systems and products that hold up under scale — not just at launch. The shortest path to trust is something that still works a year from now.",
  },
  {
    n: "II.",
    title: "Take",
    em: "Responsibility.",
    body: "Own the problem end-to-end. The best outcomes come from people who refuse to hand off the hard part — who stay in it until the user, the team, and the business are all on the other side.",
  },
  {
    n: "III.",
    title: "Ask",
    em: "Better Questions.",
    body: "Reframe the tangled thing. Most stuck teams don't need more answers, they need a sharper question. Curiosity, applied with rigor, is the quickest way forward.",
  },
];

const ABOUT_COPY = [
  "Payge is a design + product executive who specializes in making complexity workable. She builds products, systems, and teams that hold up under scale — not just at launch.",
  "She leads end-to-end, with a bias for ownership and follow-through. Known for her pragmatism, Payge is often brought into environments where things feel tangled or stalled. She has a talent for reframing problems, aligning teams, and turning ambiguity into forward motion, without sacrificing craft or human impact.",
  "Her work centers on designing systems that respect both the people who use them and the businesses that depend on them. She believes the best solutions feel intuitive not because they're simple, but because someone did the hard work to make them so.",
  "That same care shows up in how she lives and leads. Payge brings deep curiosity, empathy, and high standards to everything she does. She believes that caring deeply is a competitive advantage, that details are where values become real, and that strong leadership is equal parts rigor and heart.",
  "At work and in life, her philosophy is consistent: Take responsibility, ask better questions, and build things worth standing behind.",
];

// ---------- Case-study detail content ----------
const CASE_DETAILS = {
  nwx: {
    kicker: "CASE STUDY / 01",
    title: "Replatforming Weave to Unlock Revenue,",
    titleEm: "Retention, and Scale.",
    meta: [
      { k: "Role", v: "Head of Product Design" },
      { k: "Timeline", v: "18 months" },
      { k: "Team", v: "Design, PM, Eng, GTM" },
      { k: "Scope", v: "Platform, end-to-end" },
    ],
    metrics: WORK[1].metrics,
    sections: [
      {
        k: "The Problem",
        v: ["Weave's product had grown into a patchwork of fragmented applications. Customers were context-switching through mismatched UIs, complex workflows were slow, and the inconsistency was visible in churn, NPS, and every usability test we ran.", "The fix was not cosmetic. It was structural."],
      },
      {
        k: "The Approach",
        v: ["I led the design strategy and execution of an 18-month replatforming effort to consolidate the experience into a single, scalable interface. We re-grounded the information architecture, rebuilt the design system, and redesigned the core workflows around the jobs customers actually hired Weave to do.", "The hardest work was keeping the team aligned across roadmap pressure, competing priorities, and an existing customer base we could not break. We released in phases, instrumented everything, and held the line on craft."],
      },
      {
        k: "The Outcome",
        v: ["Bookings increased $2M in the quarter after release, driven by new application sales. Product-attributed logo churn dropped 27% in the year following release. Product NPS rose +13 and SUS rose +11.", "More importantly, the platform became something the business could keep building on — instead of something we kept working around."],
      },
    ],
  },
  plg: {
    kicker: "CASE STUDY / 02",
    title: "Building a Self-Serve PLG Engine",
    titleEm: "that Scaled Payments Volume.",
    meta: [
      { k: "Role", v: "Head of Product Design" },
      { k: "Timeline", v: "9 months to release" },
      { k: "Team", v: "Design, Growth, Payments" },
      { k: "Scope", v: "Activation, onboarding, monetization" },
    ],
    metrics: WORK[2].metrics,
    sections: [
      {
        k: "The Problem",
        v: ["Payments was one of Weave's highest-leverage products, but onboarding required human hands. Ops teams were the bottleneck, CAC was heavy, and scale was capped by headcount rather than demand."],
      },
      {
        k: "The Approach",
        v: ["I led the strategy for the design and the execution of the PLG activation pathway, moving onboarding from an ops-driven model to a customer-led motion. We stripped friction from the first-value moment, exposed the right cues in-product, and let customers ship themselves through activation — with humans standing by, not in front.", "The work was as much about removing things as adding them: fewer screens, clearer commitments, tighter feedback loops."],
      },
      {
        k: "The Outcome",
        v: ["In the nine months following release: $48.8M in Payments volume, $361K in net-new revenue, and +2,769 accounts processing Payments through the self-serve motion.", "CAC came down, ops overhead came down, and a category that required human labor to grow became a repeatable engine."],
      },
    ],
  },
  ci: {
    kicker: "CASE STUDY / 03",
    title: "Converting Competitive Pressure into",
    titleEm: "$3.5M in Revenue.",
    meta: [
      { k: "Role", v: "Head of Product Design" },
      { k: "Timeline", v: "Multi-phase" },
      { k: "Team", v: "AI, Product, Design" },
      { k: "Scope", v: "0→1, then recovery" },
    ],
    metrics: WORK[3].metrics,
    sections: [
      {
        k: "The Problem",
        v: ["Call Intelligence was born out of competitive pressure and genuine customer demand. We shipped. Early adoption lagged. Churn accelerated.", "The temptation was to blame the market. The real issues were ours: the story wasn't sharp enough, AI output confidence was inconsistent, and the feature set didn't finish the job customers hired it for."],
      },
      {
        k: "The Approach",
        v: ["I led the strategy for the design and the execution of the recovery — partnering with the Call Intelligence team to correct each gap. We strengthened the narrative framing, raised the reliability and visible confidence of the AI outputs, and closed the feature deficiencies that kept it feeling like a demo instead of a capability.", "We re-sold it internally, retrained the field, and made sure every improvement was legible to customers who had already tried it."],
      },
      {
        k: "The Outcome",
        v: ["$3.5M in incremental revenue. 5,000 new deals sold Call Intelligence. Monthly churn dropped from 15% to 1.3% — a 91% reduction.", "Call Intelligence stopped being a novelty add-on and became a durable, trusted intelligence capability within the Weave platform."],
      },
    ],
  },
  flex: {
    kicker: "CASE STUDY / 00",
    title: "Reimagining Onboarding Search",
    titleEm: "Through Experimentation.",
    meta: [
      { k: "Role", v: "Sr. Director, Product Design" },
      { k: "Timeline", v: "Multi-phase experiment" },
      { k: "Scope", v: "Onboarding UX" },
    ],
    gallery: {
      before: [
        { src: "assets/flex-before.png", label: "Before: property-name search" },
      ],
      after: [
        { src: "assets/flex-after-2.png", label: "After: search by address" },
        { src: "assets/flex-after-1.png", label: "After: autocomplete results" },
      ],
    },
    metrics: [
      { n: "+17.68%", l: "Bill connection lift vs. control" },
      { n: "+4.42%", l: "Incremental bill connections (absolute lift)" },
      { n: "+204%", l: "Autocomplete selection (25% to 76%)" },
    ],
    sections: [
      {
        k: "The Problem",
        v: [
          "At Flex, onboarding performance was tightly tied to one critical interaction: property search. Before users could activate Flex or connect bills, they first had to successfully identify where they lived.",
          "The existing flow relied on property-name search, a system that regularly conflicted with how real users think. Most renters don't know the official leasing-system name of their building; they know their address. That mismatch produced a funnel full of friction: low match rates, heavy reliance on exact naming, incorrect biller routing, unexpectedly high manual-entry rates, and matching failures driven by data inconsistencies across systems.",
          "The hypothesis was straightforward: if onboarding search aligned with how users naturally think about their home address, bill-connection rates would improve. The operational complexity behind that seemingly simple UX change was enormous.",
        ],
      },
      {
        k: "The Approach",
        v: [
          "As Senior Director of Product Design, I led the UX strategy for a large-scale onboarding experimentation initiative, replacing legacy property-name search with a residential address autocomplete experience powered by Smarty Streets. The work spanned UX strategy, experimentation design, behavioral analysis, cross-functional systems coordination, and rapid iteration in production.",
          "We reframed the experience away from recall (\"what is the exact name of my apartment complex?\") toward recognition (\"start typing your address\"). The new flow introduced residential address autocomplete, faster feedback loops, simplified recovery paths, smarter result handling and deduplication, and latency optimizations for mobile. We ramped progressively across onboarding traffic (25%, then 50%, then 100% exposure) before settling into a 50/50 control-treatment split.",
        ],
      },
      {
        k: "The UX Insight",
        v: [
          "Within days of launch, behavioral data told a story the funnel metrics hadn't. 51% of treatment users were bypassing autocomplete entirely. They were selecting \"Enter address manually,\" and 90% of those manual entries matched what the user had already typed into the autocomplete.",
          "The issue wasn't that search results were technically failing. The issue was that users didn't trust the results enough to select them.",
          "That reframed the entire roadmap. I led a rapid UX optimization sprint focused on confidence and behavioral guidance: reducing the prominence of manual-entry paths, removing lower-performing \"Use My Location\" patterns, deduplicating autocomplete results, improving keyboard interaction, and optimizing perceived latency with debounce and caching. The goal was to reduce hesitation, not just surface results.",
        ],
      },
      {
        k: "When Better UX Exposed Infrastructure",
        v: [
          "As exposure expanded, the data became contradictory. FA bill-connection rates improved while DI rates declined, and activation fluctuated unexpectedly. Rather than treat it as a funnel optimization problem, I helped drive a deeper systems investigation across Product, Billing, Infrastructure, and Data Science.",
          "The findings surfaced hidden operational issues: address normalization mismatches (\"DANIA BEACH\" vs. \"Dania\"; \"Queen Creek\" vs. \"San Tan Valley\"), property-index drift, parsing inconsistencies, properties appearing in one index but not another, synchronization gaps between services, and an Amplitude experiment-assignment race condition that was assigning users to control before their property data had fully synced (effectively masking the real impact of the experiment).",
          "Once the race condition was fixed, the picture changed dramatically. Autocomplete selection jumped from 25% to 76%. Manual-only entry dropped from 50% to 8%. \"Should Be DI\" misrouting fell from 22.3% to 1.6%, and \"Could Be DI\" misrouting from 60.8% to 13.6%.",
        ],
      },
      {
        k: "The Outcome",
        v: [
          "Following the infrastructure and UX fixes, the onboarding experiment delivered statistically significant improvements across the funnel: +17.68% bill connections, +18.17% applications, +17.14% UW completions, +18.01% approvals, +16.90% payment connections, +17.32% signups, and +23.32% M0 signups versus control.",
          "Net of all of it: +4.42% incremental bill connections (absolute lift), a major reduction in manual-entry dependency, and stronger alignment between user intent and the backend matching systems. The work also expanded into multivariate search experiments, unit-number optimization flows, Smarty-standardized address normalization, and a daily automated address-enrichment pipeline, with prefill match rates above 90% across most DI partners.",
          "The takeaway I keep coming back to: great UX work doesn't just improve interfaces. It reveals and strengthens the systems behind them.",
        ],
      },
    ],
  },
};

Object.assign(window, { TAGS, IMG, WORK, PRINCIPLES, ABOUT_COPY, CASE_DETAILS });
