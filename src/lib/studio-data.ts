/**
 * Nauka Motion — Studio Data
 * ---------------------------
 * Single source of truth for projects, services, process, and case study content.
 * Consumed by the homepage and /work/[slug] case study pages.
 *
 * All content is server-rendered (no client fetch needed) so crawlers, OG scrapers,
 * and search engines can read every case study in full.
 */

export type ServiceSlug =
  | "product-strategy"
  | "experience-design"
  | "platform-engineering"
  | "brand-experience"
  | "growth-content";

export interface StudioService {
  slug: ServiceSlug;
  index: string; // "01", "02", ...
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  sampleProjectSlug?: string;
}

export interface CaseStudyBlock {
  kind:
    | "challenge"
    | "direction"
    | "user-journey"
    | "system-architecture"
    | "design-system"
    | "key-screens"
    | "mobile"
    | "engineering"
    | "outcome"
    | "lessons";
  title: string;
  body: string[];
  bullets?: string[];
}

export interface StudioProject {
  slug: string;
  index: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  services: string[];
  year: string;
  role: string;
  client: string;
  industry: string;
  cover: string;
  accent: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  caseStudy: {
    overview: string;
    blocks: CaseStudyBlock[];
    nextProjectSlug?: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioServices: StudioService[] = [
  {
    slug: "product-strategy",
    index: "01",
    title: "Product Strategy",
    tagline: "From business problem to product direction.",
    description:
      "We start with the business reality — what is being sold, who buys it, what blocks growth — and translate it into a clear product direction. Discovery sessions, user flow mapping, scope prioritization, and a roadmap that the team can actually execute without re-architecting every quarter.",
    deliverables: [
      "Discovery & stakeholder interviews",
      "User flow & journey maps",
      "Product direction brief",
      "Scope & phase prioritization",
      "12-week delivery roadmap",
    ],
    sampleProjectSlug: "jasaprotect",
  },
  {
    slug: "experience-design",
    index: "02",
    title: "Experience Design",
    tagline: "Clear flows, strong systems, meaningful interfaces.",
    description:
      "UX, UI, design system, prototyping, and interaction design. We treat the interface as a product surface, not decoration — every screen has a job, every state is designed, every component is documented so engineering can ship without ambiguity.",
    deliverables: [
      "Information architecture",
      "Low-fi & high-fi wireframes",
      "Design system & component library",
      "Interactive prototype",
      "Interaction & motion specs",
    ],
    sampleProjectSlug: "inventra-erp",
  },
  {
    slug: "platform-engineering",
    index: "03",
    title: "Platform Engineering",
    tagline: "Reliable platforms designed for growth.",
    description:
      "Websites, e-commerce, dashboards, ERP, CMS, and custom business systems. Built on a modern, type-safe stack (Next.js, Prisma, Postgres) with a clear separation between platform, domain, and presentation — so the system can scale without becoming a rewrite candidate in two years.",
    deliverables: [
      "Architecture & data model",
      "API & backend logic",
      "Admin & operator tooling",
      "Performance & SEO baseline",
      "Deployment & CI/CD",
    ],
    sampleProjectSlug: "automotive-dealer-platform",
  },
  {
    slug: "brand-experience",
    index: "04",
    title: "Brand Experience",
    tagline: "Identity that lives across product and communication.",
    description:
      "Digital identity, art direction, campaign pages, and visual systems. We design brand behavior — how it moves, how it speaks, how it scales — so a campaign page, a product UI, and an invoice template all feel like they came from the same studio.",
    deliverables: [
      "Visual identity system",
      "Art direction guidelines",
      "Campaign & landing pages",
      "Motion language",
      "Brand asset library",
    ],
    sampleProjectSlug: "jejak-cahaya",
  },
  {
    slug: "growth-content",
    index: "05",
    title: "Growth & Content",
    tagline: "SEO foundations, conversion flow, content platform.",
    description:
      "Technical SEO, conversion flow design, content platform architecture, and digital storytelling. We don't write generic blog posts — we build content systems that compound: structured data, reusable schemas, internal linking, and editorial workflow that the team can maintain.",
    deliverables: [
      "Technical SEO audit",
      "Conversion flow redesign",
      "Content platform architecture",
      "Editorial workflow setup",
      "Digital storytelling assets",
    ],
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioProjects: StudioProject[] = [
  {
    slug: "jasaprotect",
    index: "01",
    name: "Jasa Proteksi",
    category: "Insurance Platform",
    tagline:
      "Simulation and premium comparison across multiple insurers, in a single digital flow.",
    summary:
      "Transformed a brochure-style insurance broker site into a working simulation platform. Users now get a real premium estimate before speaking to an agent — which shortened the sales cycle and improved lead quality.",
    services: ["Product Strategy", "UX/UI", "Platform Engineering"],
    year: "2025",
    role: "Strategy · Design · Engineering",
    client: "JasaProtect",
    industry: "Insurance Brokerage",
    cover: "/portfolio/jasaprotect.png",
    accent: "#D85A2A",
    liveUrl: "https://jasa-proteksi.vercel.app",
    featured: true,
    order: 1,
    caseStudy: {
      overview:
        "JasaProtect operates as an insurance brokerage representing multiple insurers. The previous website functioned as a static company profile — visitors had to call or message an agent to learn anything concrete about pricing or coverage. This created friction at the worst possible moment: when a prospect was already interested. The rebuild repositioned the site from brochure to product, with a multi-step calculator, multi-partner comparison, automatic recalculation, and a lead flow that hands qualified prospects to the broker's sales team.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "The old site had no positioning and no workflow. It listed the insurers JasaProtect works with, displayed a phone number, and waited. The team spent hours answering the same first-tier questions — What does this cost? Which provider is cheaper? What does the coverage actually include? — before they could begin a real sales conversation.",
            "Worse, the brand looked like a generic WordPress template. For a financial product, that visual uncertainty is a conversion killer. Visitors did not trust what they could not see, measure, or compare.",
          ],
          bullets: [
            "No premium visibility before consultation",
            "No way to compare insurers side-by-side",
            "Visual identity that undermined trust",
            "Manual lead qualification eating sales hours",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Stop selling the company. Start selling clarity. The product is not the policy — the product is the moment a prospect sees their options and understands them. Every decision followed from that single reframe.",
            "We moved from company-profile architecture to a product-led architecture: home → calculator → comparison → lead form → sales contact. The visual language was rebuilt around trust signals — clear typography, real numbers, transparent comparison tables — instead of stock photography.",
          ],
          bullets: [
            "Reframe: company profile → product platform",
            "Architecture: home → calculator → comparison → lead",
            "Visual language: clarity over decoration",
            "Lead quality over lead volume",
          ],
        },
        {
          kind: "user-journey",
          title: "User Journey",
          body: [
            "A visitor lands on the home page and sees the value proposition immediately — not a hero image of a smiling family, but a working entry point into the calculator. Within three taps they have an estimate. Within five taps they are comparing two insurers. Within seven taps they have submitted a qualified lead.",
            "The handoff to the broker is built into the flow, not bolted on. By the time an agent calls back, they already know the prospect's coverage preference, budget range, and which insurer they leaned toward.",
          ],
        },
        {
          kind: "system-architecture",
          title: "System Architecture",
          body: [
            "Next.js App Router with server components handling the calculator logic and rate tables. Postgres-backed rate engine, with a small admin tool for the broker team to update tariffs and partner configurations without a deploy. Lead submission writes to both the CRM webhook and an internal queue.",
            "The rate engine is intentionally separated from the UI layer — the same calculation powers the calculator, the comparison view, and the email summary, so numbers never drift between surfaces.",
          ],
          bullets: [
            "Next.js App Router (server components)",
            "Postgres rate engine, separated from UI",
            "Admin tool for tariff & partner updates",
            "Webhook → CRM + internal queue",
          ],
        },
        {
          kind: "design-system",
          title: "UI Design System",
          body: [
            "A restrained palette built around clarity: deep navy as primary, soft warm white for surfaces, a single accent color for primary actions. Type scale is tight and deliberate — no decorative sizes, no weights that don't carry meaning.",
            "Components are documented with every state: empty, filled, error, loading, success. This meant engineering could build without coming back to design for every edge case, and the broker team could update copy without breaking layout.",
          ],
          bullets: [
            "Restrained palette: navy + warm white + single accent",
            "Type scale: 6 sizes, 3 weights, no decoration",
            "Component states fully documented",
            "Editable by non-designers without breaking",
          ],
        },
        {
          kind: "key-screens",
          title: "Key Screens",
          body: [
            "The calculator is the spine of the product — a multi-step form that adapts based on the product type (health, life, vehicle, property). Each step shows progress, allows back-navigation without losing state, and recalculates the estimate live.",
            "The comparison view is the conversion moment. Two insurers shown side-by-side with the same coverage parameters, with the differences highlighted and the trade-offs made explicit. No marketing copy in the table — just data.",
          ],
        },
        {
          kind: "mobile",
          title: "Mobile Experience",
          body: [
            "Most prospects in the Indonesian insurance market first encounter a broker on their phone, often over WhatsApp. The entire flow was designed mobile-first: thumb-reachable inputs, large tap targets, persistent CTA, and a comparison view that collapses into a stacked card layout without losing information density.",
          ],
        },
        {
          kind: "engineering",
          title: "Engineering Approach",
          body: [
            "Type-safe end to end with TypeScript and Zod schemas shared between client and server. Form state managed with React Hook Form, with validation rules derived from the same Zod schemas — so the contract is written once. Server actions handle lead submission, with idempotency keys to prevent double-submits on flaky connections.",
            "Performance budget enforced: LCP under 2.5s on a mid-tier Android over 4G, total JS payload under 180KB on the calculator route. No client-side state libraries where server state would do.",
          ],
          bullets: [
            "TypeScript + Zod shared schemas",
            "React Hook Form with derived validation",
            "Server actions with idempotency keys",
            "LCP < 2.5s on mid-tier Android / 4G",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "Visitors get a real estimate before speaking to anyone, which means the conversations the broker does have are with qualified prospects who already understand the ballpark. The internal team can update tariffs and partner configurations without waiting on engineering. Lead quality, measured by close rate, improved materially within the first two months.",
            "More importantly, the brand now looks like what it sells: a serious financial product, not a side project.",
          ],
          bullets: [
            "Pre-qualified leads reach the sales team",
            "Tariff updates ship without deploys",
            "Close rate up within two months of launch",
            "Brand perception aligned with product category",
          ],
        },
        {
          kind: "lessons",
          title: "What We Learned",
          body: [
            "The hardest part of this build was not the calculator — it was deciding what to leave out. Every insurer wanted their product highlighted. Every product type wanted its own landing page. The discipline of saying 'one calculator, one comparison, one lead form' is what made the product legible to a visitor in 90 seconds.",
            "We also learned that a broker's brand trust is built by transparency, not by hero photography. Showing the actual premium range — even before the user fills in details — outperformed every visual experiment we ran.",
          ],
        },
      ],
      nextProjectSlug: "inventra-erp",
    },
  },

  {
    slug: "inventra-erp",
    index: "02",
    name: "Inventra",
    category: "Business Operating System",
    tagline:
      "Inventory, transactions, reporting, and multi-branch workflow in one integrated system.",
    summary:
      "A custom business operating system for a multi-branch retailer. Replaced a patchwork of spreadsheets, WhatsApp confirmations, and a legacy POS with one typed, auditable, role-based platform.",
    services: ["Product Strategy", "Engineering", "Experience Design"],
    year: "2025",
    role: "Architecture · Engineering · UX",
    client: "Inventra Retail Group",
    industry: "Multi-branch Retail",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#B8B3AA",
    featured: true,
    order: 2,
    caseStudy: {
      overview:
        "Inventra operates several retail branches dealing in secondhand electronics — a category where every unit is unique, margins shift weekly, and inventory accuracy is the difference between profit and write-off. The team had been running on spreadsheets, WhatsApp confirmations, and a legacy point-of-sale that did not understand multi-branch. The rebuild unified inventory, transactions, reporting, and inter-branch transfers into a single role-based platform.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "Secondhand electronics is a brutal category for inventory. Every MacBook, every iPhone, every ThinkPad is its own SKU with its own condition, its own serial number, its own acquisition cost. The team was tracking this in spreadsheets that broke weekly, reconciling cash at end of day with paper receipts, and confirming inter-branch transfers over WhatsApp — which meant nobody trusted the numbers until someone physically counted.",
            "The cost was not just time. It was decisions made on stale data, missed reorder windows, and shrinkage that nobody could attribute.",
          ],
          bullets: [
            "Unique-SKU inventory tracked in spreadsheets",
            "End-of-day cash reconciliation by paper receipt",
            "Inter-branch transfers confirmed over WhatsApp",
            "No trusted numbers without physical count",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Build the system around the unit, not around the transaction. Every other choice flowed from that — the data model, the role permissions, the screen design, the reporting structure. If a single unit could be trusted to be where the system said it was, every downstream report became trustworthy by default.",
            "We also made a deliberate decision to keep the operator UI minimal. The people using this system daily are not admins — they are branch staff under time pressure. Every screen had to be readable in three seconds.",
          ],
          bullets: [
            "Model: unit-centric, not transaction-centric",
            "Single source of truth for unit location & state",
            "Minimal operator UI — branch-staff-first",
            "Auditable trail on every state change",
          ],
        },
        {
          kind: "user-journey",
          title: "User Journey",
          body: [
            "A branch staff member scans a unit on intake — the system creates a record, assigns a serial, sets the acquisition cost, and routes it to the appropriate staging area. When the unit is priced, the pricing logic surfaces comparable historical sales and current stock aging. When it sells, the transaction writes back to the unit record, the cash drawer, the branch ledger, and the daily report in one atomic operation.",
            "A manager opening the dashboard sees the numbers that matter — branch revenue today, units aging past threshold, transfers in flight — without clicking into a single sub-page.",
          ],
        },
        {
          kind: "system-architecture",
          title: "System Architecture",
          body: [
            "Postgres at the core with a strict unit-state machine — every unit has exactly one state at any time, and every transition is logged with actor, timestamp, and reason. The application layer is Next.js with server actions for write paths and a small set of typed API routes for read queries.",
            "Role-based access is enforced at the database level with row-level security policies — not just at the UI level — so a compromised session at a branch terminal cannot read another branch's financials.",
          ],
          bullets: [
            "Postgres unit-state machine with audit log",
            "Next.js server actions for write paths",
            "Row-level security enforced at DB level",
            "Single atomic write per transaction",
          ],
        },
        {
          kind: "design-system",
          title: "UI Design System",
          body: [
            "The design system here is functional, not decorative. Dense tables, monospace numerals, status pills, and a single accent color for primary actions. We deliberately avoided card-heavy dashboards — they look modern but hide information density that operators actually need.",
            "Every list view supports keyboard navigation, bulk actions, and inline editing where the permission allows. The system is designed to be used for eight hours a day, not admired.",
          ],
          bullets: [
            "Functional system: tables, not cards",
            "Monospace numerals for financial alignment",
            "Keyboard-first navigation on list views",
            "Bulk actions + inline editing where permitted",
          ],
        },
        {
          kind: "key-screens",
          title: "Key Screens",
          body: [
            "The branch dashboard surfaces three numbers — today's revenue, units in stock, units aging past threshold — and a single action queue. The intake screen is a single form with scan-as-you-type. The transfer screen forces dual confirmation: sending branch marks out, receiving branch marks in, and the system holds the unit in a 'in transit' state until both sides confirm.",
            "The manager dashboard is a different surface entirely — branch comparison, margin trends, shrinkage alerts — built for a different reader on a different device.",
          ],
        },
        {
          kind: "mobile",
          title: "Mobile Experience",
          body: [
            "Intake and transfer confirmation happen on phones — staff use a phone camera to scan serials and a minimal mobile UI to mark state changes. The mobile views are deliberately cut down: three actions per screen, large tap targets, no tables. The full system lives on desktop; mobile is for the floor.",
          ],
        },
        {
          kind: "engineering",
          title: "Engineering Approach",
          body: [
            "TypeScript throughout, with Zod schemas driving both runtime validation and the database types generated by Prisma. Database migrations are reversible and tested against a snapshot of production data before deploy. Background jobs (report generation, end-of-day reconciliation) run on a simple queue — no separate worker infrastructure.",
            "Audit log is append-only and stored separately from operational data, so even an admin-level compromise cannot rewrite history without leaving a trace.",
          ],
          bullets: [
            "TypeScript + Prisma + Zod end-to-end",
            "Reversible, snapshot-tested migrations",
            "Append-only audit log on separate schema",
            "No separate worker infra — simple queue",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "End-of-day reconciliation dropped from 45 minutes to under 5. Inter-branch transfers that used to take a WhatsApp exchange and a phone call now take a scan and a confirmation. The manager opens the dashboard and trusts the numbers — which is the only outcome that actually matters for a system like this.",
            "Shrinkage dropped measurably in the first quarter after launch, not because the system caught a thief, but because the system made the absence of units visible immediately rather than at the next physical count.",
          ],
          bullets: [
            "End-of-day reconciliation: 45min → under 5min",
            "Transfers: phone call + WhatsApp → scan + tap",
            "Manager dashboard: trusted numbers, daily",
            "Shrinkage down in first quarter post-launch",
          ],
        },
        {
          kind: "lessons",
          title: "What We Learned",
          body: [
            "The temptation in a system this broad is to build everything at once. The discipline is to ship the unit-state machine first, get every branch using it for two weeks, and only then layer transactions, reporting, and transfers on top. A system nobody trusts is a system nobody uses — trust has to be earned surface by surface.",
            "We also learned that operators do not want beautiful software. They want software that does not lie to them about where the money is.",
          ],
        },
      ],
      nextProjectSlug: "anima-companion",
    },
  },

  {
    slug: "anima-companion",
    index: "03",
    name: "Anima Companion",
    category: "AI Companion Product",
    tagline:
      "A long-form, context-aware companion app — not a chatbot, a relationship surface.",
    summary:
      "An experimental companion product exploring how AI-mediated conversation can carry context across weeks, remember what matters, and feel less like a search box and more like a relationship.",
    services: ["Product Strategy", "Experience Design", "Platform Engineering"],
    year: "2025",
    role: "Concept · Design · Engineering",
    client: "Nauka Motion Labs",
    industry: "Consumer AI",
    cover: "/portfolio/nauka-gadget.png",
    accent: "#C8E641",
    featured: true,
    order: 3,
    caseStudy: {
      overview:
        "Anima Companion is an in-house product experiment from Nauka Motion Labs. The question was simple: what would an AI companion look like if it was designed less like a chatbot and more like a long-running relationship — something that remembers what you told it last week, references it appropriately, and feels less like a search box with a personality skin. This is not a shipped commercial product — it is a research artifact that informs how we approach AI surfaces in client work.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "Most AI chat products treat memory as a context window — the model remembers the last N messages and forgets everything before. For a search replacement this is fine. For a companion, it is fatal. A relationship that forgets what you told it last Tuesday is not a relationship.",
            "The harder problem is not storage — it is salience. The system has to know which details matter and which are noise, when to bring something up and when to let it rest, when to ask a follow-up and when to wait.",
          ],
          bullets: [
            "Memory as context window — fatal for companion UX",
            "Salience problem: what matters, what is noise",
            "Timing problem: when to surface, when to wait",
            "Tone problem: not a chatbot, not a therapist",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Stop designing the chat. Start designing the relationship surface. The primary interface is not a message thread — it is a slow, weekly cadence of long-form exchanges that the user can return to, annotate, and watch evolve. The chat is a secondary surface, used for in-the-moment check-ins.",
            "Memory is modeled as a typed graph — people, places, themes, emotional weight — not as a transcript. The system surfaces what is salient based on recency, emotional weight, and topical relevance, not just lexical similarity.",
          ],
          bullets: [
            "Primary surface: weekly long-form exchange",
            "Secondary surface: in-the-moment chat",
            "Memory as typed graph, not transcript",
            "Salience = recency × emotional weight × topical relevance",
          ],
        },
        {
          kind: "user-journey",
          title: "User Journey",
          body: [
            "A user opens the app on a Sunday morning and sees their weekly thread — a long-form letter from the companion that references what they talked about last week, asks one thoughtful question, and leaves space for a real answer. During the week, they might pop in for a five-minute chat — quick, contextual, low-stakes.",
            "The companion remembers that the user mentioned a difficult conversation with a sibling two weeks ago, and asks — gently, in this week's letter — how that landed. Not because it was prompted to, but because the salience model decided this was worth surfacing.",
          ],
        },
        {
          kind: "system-architecture",
          title: "System Architecture",
          body: [
            "Three layers: a conversation layer (real-time chat), a memory layer (typed graph with salience scoring), and a synthesis layer (weekly long-form generation). The synthesis layer runs as a scheduled job, pulling salient memory nodes from the previous seven days and composing a long-form letter.",
            "The memory layer is intentionally separate from the model — we use the LLM as a writer, not as a rememberer. This means we can swap models without losing memory, and we can audit what the system 'knows' about a user at any time.",
          ],
          bullets: [
            "Conversation layer (real-time chat)",
            "Memory layer (typed graph + salience scoring)",
            "Synthesis layer (scheduled long-form generation)",
            "LLM as writer, not as rememberer",
          ],
        },
        {
          kind: "design-system",
          title: "UI Design System",
          body: [
            "The interface is deliberately quiet. Long-form letters are set in a serif typeface at a generous measure, with no notifications, no badges, no engagement loops. The chat surface is secondary, smaller, and visually weighted to feel like a quick aside rather than the main event.",
            "Color is restricted to two warm neutrals and one accent that signals 'the companion is thinking' — used sparingly, never as decoration.",
          ],
          bullets: [
            "Serif long-form, sans chat — visual hierarchy by intent",
            "No notifications, no badges, no engagement loops",
            "Two warm neutrals + one thinking-state accent",
            "Generous measure, generous leading",
          ],
        },
        {
          kind: "key-screens",
          title: "Key Screens",
          body: [
            "The weekly letter view is the heart of the product — a single, scrollable document with a header, a body, and a single response field. The memory graph view is a debug surface, exposed to the user as a transparency feature: this is what the companion currently holds about you, and you can edit or delete any node.",
            "The chat surface is intentionally minimal — a single thread, no history sidebar, no threading. If you want to revisit an old exchange, you visit the letter archive.",
          ],
        },
        {
          kind: "mobile",
          title: "Mobile Experience",
          body: [
            "Built mobile-first because the weekly letter is a Sunday-morning object, not a desktop object. The chat surface is thumb-reachable and quick. The memory graph view collapses to a list on mobile — you lose the topology but keep the transparency.",
          ],
        },
        {
          kind: "engineering",
          title: "Engineering Approach",
          body: [
            "Next.js with server actions for write paths, a Postgres-backed memory graph (nodes and edges with typed relationships and salience scores), and a small Python service for the synthesis layer that calls the LLM. The synthesis job is idempotent and resumable — if the model call fails mid-letter, it retries from the last successful section.",
            "Memory writes go through a salience scorer that runs as a separate step — never inline with the conversation — so the user never waits for memory processing.",
          ],
          bullets: [
            "Next.js + Postgres memory graph + Python synthesizer",
            "Idempotent, resumable synthesis jobs",
            "Salience scoring as separate async step",
            "User can audit, edit, or delete any memory node",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "Anima is not a commercial product — it is a research artifact. But it changed how we approach AI surfaces in client work. We stopped building chatbots and started building relationship surfaces. We stopped trusting the model to remember and started designing explicit memory systems. We stopped optimizing for engagement and started optimizing for trust.",
            "The patterns from Anima now inform every AI feature we ship for clients — including the ones that look, on the surface, like ordinary chat.",
          ],
          bullets: [
            "Research artifact, not shipped product",
            "Informed studio's AI surface patterns",
            "Memory model reused in client work",
            "Engagement metrics abandoned in favor of trust metrics",
          ],
        },
        {
          kind: "lessons",
          title: "What We Learned",
          body: [
            "The biggest lesson was about restraint. Every model call is an opportunity to say something — and most of the time, the right answer is to say less. A companion that talks every time you open the app becomes noise within a week. A companion that waits for Sunday, and then says something thoughtful, earns its place in the user's life.",
            "We also learned that transparency is a feature, not a cost. Showing users what the system remembers about them — and letting them edit it — did not reduce engagement. It increased trust, and trust is the only metric that compounds.",
          ],
        },
      ],
      nextProjectSlug: "automotive-dealer-platform",
    },
  },

  {
    slug: "automotive-dealer-platform",
    index: "04",
    name: "Automotive Dealer Platform",
    category: "Multi-Dealer Commerce",
    tagline:
      "A dealer platform that sells the car before the test drive — inventory, comparison, credit simulation, and sales routing in one flow.",
    summary:
      "A reusable platform deployed across multiple automotive dealers. Treats every vehicle as a unique experience — from technical spec to test-drive scheduling — within a single, conversion-shaped flow.",
    services: ["Platform Engineering", "Experience Design", "Product Strategy"],
    year: "2025",
    role: "Platform · UX · Strategy",
    client: "Multiple Dealers (Mitsubishi, Geely)",
    industry: "Automotive Retail",
    cover: "/portfolio/mitsubishi.png",
    accent: "#D85A2A",
    liveUrl: "https://mitsubishi-test.vercel.app",
    featured: true,
    order: 4,
    caseStudy: {
      overview:
        "Modern car buyers do not walk into a showroom cold. They arrive having already researched, compared, and shortlisted online — and they expect the dealer's website to be useful, not decorative. This platform was built for two very different dealers (a mainstream Mitsubishi dealer and an EV-focused Geely dealer) on a shared core, with brand-specific surfaces layered on top.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "Dealer websites in Indonesia are mostly brochures. They list models, show stock photography, and display a phone number. The buyer's actual questions — What is the on-the-road price for my city? What is the monthly installment for a 30% down payment? When can I test drive this Saturday? — go unanswered.",
            "For the EV dealer (Geely), there was an additional layer: buyers needed to understand range, charging options, and total cost of ownership compared to an equivalent ICE vehicle. The site had to educate without lecturing.",
          ],
          bullets: [
            "Brochure sites that ignore buyer intent",
            "OTR pricing opaque until phone call",
            "Credit simulation missing entirely",
            "EV-specific education absent for Geely",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Build a platform, not a website. The shared core handles inventory, pricing logic, credit simulation, and sales routing. The brand layer handles visual identity, copy voice, and dealer-specific configurations (which insurers, which banks, which regions).",
            "For Mitsubishi, the direction was clarity — a serious buyer researching a serious purchase wants numbers, not hero videos. For Geely, the direction was education — the EV buyer needs to understand range and charging before they will book a test drive.",
          ],
          bullets: [
            "Platform core + brand layer architecture",
            "Mitsubishi: clarity, numbers, density",
            "Geely: education, comparison, transparency",
            "Single codebase, two distinct brand experiences",
          ],
        },
        {
          kind: "user-journey",
          title: "User Journey",
          body: [
            "A buyer lands on a model page and sees three things immediately: real inventory (which units are physically at this dealer today), on-the-road pricing for their city, and a credit simulation slider. They can compare two trims side-by-side, schedule a test drive from a calendar that reads actual sales consultant availability, and receive a confirmation over WhatsApp.",
            "For the EV buyer, the comparison view includes range, charging time, and a rough total cost of ownership calculation against an equivalent ICE vehicle. The goal is to answer the 'is this actually a good idea for me' question before the sales consultant has to.",
          ],
        },
        {
          kind: "system-architecture",
          title: "System Architecture",
          body: [
            "A multi-tenant Next.js platform with shared inventory, pricing, and routing logic at the core, and per-tenant configuration for brand assets, tariff tables, and integration endpoints. The pricing engine handles OTR calculation, credit simulation, and trade-in estimation — all server-side, all typed, all auditable.",
            "Sales consultant availability syncs from the dealer's existing calendar system; test-drive bookings write back to it. No double-handling, no phone-call confirmation step.",
          ],
          bullets: [
            "Multi-tenant Next.js, shared core + brand layer",
            "Server-side pricing engine (OTR + credit + trade-in)",
            "Calendar sync with dealer's existing system",
            "WhatsApp confirmation via official API",
          ],
        },
        {
          kind: "design-system",
          title: "UI Design System",
          body: [
            "Two distinct design systems, both built on the same component primitives. Mitsubishi's system is dense, neutral, and number-forward — designed to feel like a serious tool. Geely's system is lighter, more spatial, with education-forward components like range visualizers and charging-time calculators built into the comparison view.",
            "Shared primitives (buttons, inputs, cards, modals) ensure engineering velocity; brand-specific styling tokens ensure the two dealers do not feel like the same template.",
          ],
          bullets: [
            "Shared component primitives, brand-specific tokens",
            "Mitsubishi: dense, neutral, number-forward",
            "Geely: lighter, spatial, education-forward",
            "No shared visual identity between tenants",
          ],
        },
        {
          kind: "key-screens",
          title: "Key Screens",
          body: [
            "The model page is the spine — inventory, pricing, credit simulation, comparison, and test-drive booking all accessible without leaving the page. The comparison view shows two vehicles side-by-side with full spec parity. The booking flow reads real consultant availability and writes back to the dealer's calendar.",
            "For Geely, the range and charging calculator is its own surface — a buyer can enter their daily commute and see whether the vehicle's range covers a week without charging, with visualizations rather than just numbers.",
          ],
        },
        {
          kind: "mobile",
          title: "Mobile Experience",
          body: [
            "Most Indonesian car buyers first encounter a dealer's website on their phone, often shared over WhatsApp. The model page was designed mobile-first with thumb-reachable credit simulation, swipeable image galleries, and a sticky 'Book Test Drive' CTA that follows the scroll.",
          ],
        },
        {
          kind: "engineering",
          title: "Engineering Approach",
          body: [
            "Next.js App Router with multi-tenant routing at the middleware layer — a request to geelypluit.id and a request to mit-subishi-test.vercel.app hit the same codebase, with tenant context resolved from the hostname. Prisma with Postgres, with row-level security ensuring one dealer cannot read another's leads or inventory.",
            "Pricing logic is unit-tested against a corpus of historical deals — every change to the pricing engine runs against the last 1,000 closed deals to ensure no regression in calculated output.",
          ],
          bullets: [
            "Multi-tenant middleware routing",
            "Row-level security at the database",
            "Pricing engine tested against historical deals corpus",
            "No tenant cross-contamination possible",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "Test-drive bookings through the website replaced phone-call bookings as the primary sales pipeline. Sales consultants stopped asking 'where did you find us' because the answer was almost always the website. For Geely specifically, the EV education surfaces reduced the average sales conversation length — buyers arrived better-informed.",
            "The platform now supports two dealers on a shared core, with a third deployment in discussion. Engineering velocity for new tenants is measured in weeks, not months.",
          ],
          bullets: [
            "Web bookings became primary sales pipeline",
            "Sales conversation length reduced for EV buyers",
            "Two dealers live, third in discussion",
            "New tenant onboarding measured in weeks",
          ],
        },
        {
          kind: "lessons",
          title: "What We Learned",
          body: [
            "The biggest lesson was about pricing logic. Every dealer has 'exceptions' — special discounts, year-end promotions, trade-in bonuses — that resist clean abstraction. The temptation is to hard-code them; the right answer is to model them as a rule layer above the pricing engine, so they can be updated without touching the engine itself.",
            "We also learned that two dealers selling the same category of product can have completely different buyer journeys. The platform has to be flexible enough to honor that, not force them into the same funnel.",
          ],
        },
      ],
      nextProjectSlug: "jejak-cahaya",
    },
  },

  {
    slug: "jejak-cahaya",
    index: "05",
    name: "Jejak Cahaya",
    category: "Digital Storytelling",
    tagline:
      "A cinematic digital narrative — invitation as object, story as surface.",
    summary:
      "A digital storytelling project built around an invitation format. Not a landing page, not an e-commerce site — a slow, scrollable, audio-visual narrative designed to be experienced, not skimmed.",
    services: ["Brand Experience", "Experience Design", "Platform Engineering"],
    year: "2025",
    role: "Art Direction · Design · Engineering",
    client: "Private Commission",
    industry: "Cultural / Personal",
    cover: "/portfolio/nauka-kostay.png",
    accent: "#B8B3AA",
    featured: true,
    order: 5,
    caseStudy: {
      overview:
        "Jejak Cahaya (Trail of Light) is a commissioned digital storytelling piece built around a personal milestone. The brief was deliberately open: build something that the recipient would want to revisit, not something they would scroll past. The result is a slow, scroll-driven narrative with original typography, ambient sound, and a single interactive gesture that reveals the closing message.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "Most digital invitations optimize for delivery — get the date, the time, the location in front of the recipient as fast as possible. This brief inverted that optimization: the recipient already knew the date. The object was to make them feel something, not to inform them of anything.",
            "The technical challenge was performance — a slow, ambient, audio-visual experience on the open web has to load fast enough that the recipient does not bounce before the experience begins. That tension between slowness as content and speed as delivery was the core design problem.",
          ],
          bullets: [
            "Inverse brief: feeling, not information delivery",
            "Performance tension: slow content, fast load",
            "Audio-visual without plugins or native apps",
            "Mobile-first because recipients open links on phones",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Build the experience around a single gesture: a slow scroll that reveals light. Every other design decision followed from that constraint. No buttons, no navigation, no menu. The user scrolls, the experience unfolds, and at the end a single interaction — touching the screen — completes the narrative.",
            "Typography was custom-drawn for the project — a single weight, a single size, a single color — because typography had to carry the emotional weight that photography could not.",
          ],
          bullets: [
            "Single gesture: scroll reveals light",
            "No buttons, no navigation, no menu",
            "Custom typography: one weight, one size, one color",
            "Closing interaction: touch completes the narrative",
          ],
        },
        {
          kind: "user-journey",
          title: "User Journey",
          body: [
            "The recipient receives a link. They open it on their phone. The first frame loads in under two seconds — a single line of text on a dark surface. As they scroll, the surface lightens, additional text appears, ambient sound fades in, and the narrative builds. The closing frame requires a touch — the recipient holds their finger on the screen for three seconds, and the final message is revealed.",
            "There is no skip, no fast-forward, no menu. The experience is the length it is, and the recipient either gives it their attention or they do not.",
          ],
        },
        {
          kind: "system-architecture",
          title: "System Architecture",
          body: [
            "A single Next.js page with no routing — the experience is one continuous surface. All assets (typography, audio, image data) are inlined or pre-loaded on the first paint, with a minimal loading sequence that masks the asset preparation without blocking interaction.",
            "The scroll-driven animation is built on the Web Animations API with IntersectionObserver triggers, avoiding the weight of a full animation library. Audio is gated behind user interaction to respect browser autoplay policies.",
          ],
          bullets: [
            "Single Next.js page, no routing",
            "Assets inlined / pre-loaded on first paint",
            "Web Animations API + IntersectionObserver",
            "Audio gated behind first user interaction",
          ],
        },
        {
          kind: "design-system",
          title: "UI Design System",
          body: [
            "There is no UI in the traditional sense — no buttons, no inputs, no cards. The design system here is a typographic system and a color system, both built around a single warm-neutral palette and a custom-drawn typeface. Every visual decision is in service of the scroll.",
            "The only interactive affordance — the touch-and-hold on the closing frame — is signaled by a subtle pulse animation that the user discovers rather than is told about.",
          ],
          bullets: [
            "No traditional UI — typography + color only",
            "Single warm-neutral palette",
            "Custom-drawn typeface",
            "Touch affordance signaled by subtle pulse",
          ],
        },
        {
          kind: "key-screens",
          title: "Key Screens",
          body: [
            "The opening frame is a single line on darkness. The middle frames are a slow build — text fragments, ambient imagery, rising light. The closing frame is the touch-and-hold interaction. There are no other screens — the experience is a single continuous surface, not a sequence of pages.",
          ],
        },
        {
          kind: "mobile",
          title: "Mobile Experience",
          body: [
            "Built mobile-first because the link would be opened on a phone. The touch-and-hold gesture is mobile-native. The audio is mixed for phone speakers, not headphones — most recipients will not have headphones in when they open the link.",
          ],
        },
        {
          kind: "engineering",
          title: "Engineering Approach",
          body: [
            "Aggressive performance budget: first frame under 2 seconds on a mid-tier Android over 4G, total payload under 500KB including audio. Achieved through aggressive image compression, audio in Opus format, and zero JavaScript framework overhead beyond Next.js itself.",
            "Accessibility was a deliberate tradeoff — the experience is not screen-reader compatible because the narrative is the visual and audio, not the text. We accepted this tradeoff knowingly because forcing compatibility would have destroyed the experience.",
          ],
          bullets: [
            "First frame < 2s on mid-tier Android / 4G",
            "Total payload < 500KB including audio",
            "Opus audio format for size efficiency",
            "Accessibility tradeoff accepted knowingly",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "The recipient revisited the link multiple times in the week following delivery — which is the only metric that mattered for this brief. The piece was shared privately with a small circle, each of whom reportedly spent longer than the experience's runtime on the page, suggesting they scrolled back.",
            "More importantly for the studio: this project validated our ability to ship work that is not a website in any conventional sense, but is still built on the same engineering foundation. It expanded the range of briefs we can credibly accept.",
          ],
          bullets: [
            "Recipient revisited multiple times post-delivery",
            "Average time on page exceeded experience runtime",
            "Validated studio's range beyond conventional websites",
            "Engineering foundation reused for unconventional briefs",
          ],
        },
        {
          kind: "lessons",
          title: "What We Learned",
          body: [
            "The hardest discipline on this project was subtraction. Every draft had more — more text, more imagery, more interaction. The shipped piece has almost nothing. What it has, it earns.",
            "We also learned that performance budgets are creative constraints. The 500KB payload limit forced decisions about what actually mattered, and the result is more focused than any version that could have shipped at 2MB.",
          ],
        },
      ],
      nextProjectSlug: "nauka-motion-labs",
    },
  },

  {
    slug: "nauka-motion-labs",
    index: "06",
    name: "Nauka Motion Labs",
    category: "Experimental System",
    tagline:
      "The studio's own experimental surface — where motion language is researched, not applied.",
    summary:
      "An in-house experimental surface where we test motion language, interaction patterns, and AI surfaces before they ship in client work. Not a portfolio piece — a research environment.",
    services: ["Brand Experience", "Platform Engineering"],
    year: "2025 — Ongoing",
    role: "Studio Research",
    client: "Nauka Motion",
    industry: "Internal R&D",
    cover: "/portfolio/nauka-gadget.png",
    accent: "#C8E641",
    featured: true,
    order: 6,
    caseStudy: {
      overview:
        "Nauka Motion Labs is the studio's own experimental surface — a continuously evolving environment where we test motion language, interaction patterns, AI behaviors, and visual systems before they ship in client work. It is not a product, not a portfolio piece, and not publicly accessible. It is where the studio learns in private before it teaches in public.",
      blocks: [
        {
          kind: "challenge",
          title: "The Challenge",
          body: [
            "Client work is not the place to learn. The pressure of deadlines, budget, and stakeholder review makes experimentation impossible — every decision has to be defensible. The studio needed a separate surface where experiments could fail without consequence, where motion language could be researched before it was applied, and where AI behaviors could be observed over weeks before they shipped.",
            "The challenge was treating Labs as a research environment rather than as another product to ship. The temptation is always to polish and publish — the discipline is to let it stay rough, stay private, and stay useful.",
          ],
          bullets: [
            "Client work is not the place to learn",
            "Need a surface where failure is acceptable",
            "Motion language must be researched before applied",
            "AI behaviors must be observed over weeks, not minutes",
          ],
        },
        {
          kind: "direction",
          title: "Strategic Direction",
          body: [
            "Labs has no roadmap. It has a set of standing questions — what does small movement produce at scale, how does memory change AI surfaces, what does editorial typography look like on the web in 2025 — and a practice of spending studio time on those questions between client engagements.",
            "The output is not always shippable. Sometimes the output is a documented negative result — 'we tried this, it does not work, here is why' — which is just as valuable.",
          ],
          bullets: [
            "No roadmap — only standing questions",
            "Practice of working on questions between engagements",
            "Negative results documented as valuable output",
            "Output is research, not product",
          ],
        },
        {
          kind: "outcome",
          title: "Outcome",
          body: [
            "Labs has directly informed three shipped client projects — the motion language on the studio's own site, the memory model in Anima Companion, and the typography system on Jejak Cahaya. None of those would have shipped at the same level of polish without the private research surface that preceded them.",
            "More importantly, Labs has shaped how the studio thinks about its own work. We no longer ask 'can we build this' — we ask 'have we built this before, and if not, where do we build it first'.",
          ],
          bullets: [
            "Informed motion language on studio site",
            "Informed memory model in Anima Companion",
            "Informed typography system on Jejak Cahaya",
            "Reshaped studio's pre-project research practice",
          ],
        },
      ],
      nextProjectSlug: "jasaprotect",
    },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface StudioInsight {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export const studioInsights: StudioInsight[] = [
  {
    slug: "premium-calculator-trust",
    title: "Designing a Premium Calculator That Users Trust",
    category: "Product Design",
    excerpt:
      "Why most insurance calculators fail at the moment of truth — and how transparency, not accuracy, is the real design problem.",
    readTime: "6 min",
    date: "2025-06-12",
  },
  {
    slug: "landing-page-to-product",
    title: "From Landing Page to Digital Product",
    category: "Product Strategy",
    excerpt:
      "The hardest leap for a marketing team is not from no website to a landing page — it is from a landing page to a product. Here is how we make that leap.",
    readTime: "8 min",
    date: "2025-05-28",
  },
  {
    slug: "reusable-cms-architecture",
    title: "Building Reusable CMS Architecture",
    category: "Engineering",
    excerpt:
      "Why most custom CMS projects become a maintenance nightmare — and the architectural decisions that prevent it.",
    readTime: "10 min",
    date: "2025-05-10",
  },
  {
    slug: "mobile-first-not-stacked",
    title: "Why Mobile-First Is Not Mobile-Stacked",
    category: "Experience Design",
    excerpt:
      "Mobile-first is a design philosophy, not a layout technique. Stacking desktop sections on a phone is not mobile-first — it is mobile-defeated.",
    readTime: "5 min",
    date: "2025-04-22",
  },
  {
    slug: "ai-changes-product-builder-role",
    title: "How AI Changes the Role of a Product Builder",
    category: "Studio Practice",
    excerpt:
      "AI does not replace the product builder. It changes what the product builder is responsible for — and that is a harder shift than replacement.",
    readTime: "7 min",
    date: "2025-04-05",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface StudioProcessStep {
  index: string;
  title: string;
  body: string;
}

export const studioProcess: StudioProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the business, the users, and the real constraints. We start with stakeholder interviews, competitive review, and a hard look at the existing data — not with a Figma file.",
  },
  {
    index: "02",
    title: "Define",
    body: "Shape the product direction, the architecture, and the priorities. The output of this phase is a brief that the team can execute without re-architecting every quarter.",
  },
  {
    index: "03",
    title: "Design",
    body: "Build the visual system and the interaction model. Design system, component library, prototype — designed state by state, not screen by screen.",
  },
  {
    index: "04",
    title: "Develop",
    body: "Turn the system into a reliable working product. Type-safe end to end, performance budget enforced, deployment pipeline that ships daily if needed.",
  },
  {
    index: "05",
    title: "Evolve",
    body: "Launch, learn, measure, and improve. The first launch is the start of the work, not the end. We instrument what matters and iterate against real usage data.",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface StudioCapability {
  metric: string;
  label: string;
  note: string;
}

export const studioCapabilities: StudioCapability[] = [
  {
    metric: "40+",
    label: "Products Explored",
    note: "Across business platforms, commerce, identity, and storytelling — shipped and in-progress.",
  },
  {
    metric: "6",
    label: "Business Domains",
    note: "Insurance, retail, automotive, hospitality, consumer AI, and cultural commission.",
  },
  {
    metric: "End-to-End",
    label: "Delivery",
    note: "Strategy, design, engineering, and post-launch iteration under one roof.",
  },
  {
    metric: "Mobile-First",
    label: "By Default",
    note: "Every product is designed for the phone in the user's hand before the laptop on the desk.",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function getProjectBySlug(slug: string): StudioProject | undefined {
  return studioProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return studioProjects.map((p) => p.slug);
}
