/** Homepage = thin focus lines. /work = case list. /work/[slug] = product stories. */

export interface WorkFocus {
  id: string
  label: string
  blurb: string
}

export interface WorkItem {
  id: string
  title: string
  tag: string
  summary: string
  tech: string[]
  href?: string
  /** Internal case page when set */
  caseSlug?: string
  status?: 'live' | 'building'
}

export type CaseLayout = 'trust-map' | 'before-after' | 'b2b-flow' | 'agent-idea'

export interface WorkCase {
  slug: string
  layout: CaseLayout
  title: string
  eyebrow: string
  tagline: string
  /** Short gold-highlightable phrase inside lead */
  leadMark?: string
  lead: string
  audience: string
  promises: { label: string; text: string }[]
  features: string[]
  status?: 'live' | 'building'
  externalHref?: string
  tech: string[]
  engineeringTeaser: string
}

/** Homepage section copy */
export const workHome = {
  title: 'Work we’ve done',
  subtitle: 'Focus · Ship',
  lead: 'Four lanes we keep returning to — systems that hold past the demo. Full cases on the list.',
}

/** Thin homepage focus lines — what we’ve done, not the full brief */
export const workFocus: WorkFocus[] = [
  {
    id: 'agents',
    label: 'Enterprise agents & RAG',
    blurb: 'Agents, RAG, and self-serve builders that hold in real org workflows.',
  },
  {
    id: 'b2b',
    label: 'B2B systems',
    blurb: 'Purchasing, RFQs, proposals, staged ops.',
  },
  {
    id: 'saas',
    label: 'Multi-tenant SaaS',
    blurb: 'Isolated architectures past the demo stage.',
  },
  {
    id: 'systems',
    label: 'Performance under load',
    blurb: 'Heavy document pipelines and precise concurrency where uptime matters.',
  },
]

export const workPage = {
  title: 'Selected work',
  subtitle: 'Case list',
  lead: 'The builds behind the focus lines — open a case for the product story; resume carries the engineering depth.',
}

export const workItems: WorkItem[] = [
  {
    id: 'chatbot-ir',
    title: 'Enterprise AI Platform — chatbot.ir',
    tag: 'AI · Enterprise',
    summary:
      'Enterprise agents that follow org rules: grounded knowledge, controlled runtime, multi-tenant builders that hold past the demo.',
    tech: ['Enterprise RAG', 'AI Agents', 'Multi-tenant', 'Queues'],
    href: 'https://chatbot.ir/',
    caseSlug: 'chatbot-ir',
    status: 'building',
  },
  {
    id: 'ehdasino',
    title: 'Ehdasino',
    tag: 'B2B · Domain',
    summary:
      'Construction-materials reverse auction: RFQs, supplier proposals, and transparent comparison of price and delivery.',
    tech: ['RFQ / Proposals', 'B2B', 'Domain Architecture'],
    href: 'http://ehdasino.ir/',
    caseSlug: 'ehdasino',
    status: 'live',
  },
  {
    id: 'amreton',
    title: 'Amreton',
    tag: 'Multi-tenant SaaS',
    summary:
      'Turns fragmented Instagram DM order-taking into online invoices, bank payment, and trackable orders—no Instagram password required.',
    tech: ['Order Lifecycle', 'Payments', 'Multi-tenant', 'SMS'],
    href: 'https://amreton.com/',
    caseSlug: 'amreton',
    status: 'building',
  },
  {
    id: 'hopgo',
    title: 'HopGo',
    tag: 'Marketplace · Trust',
    summary:
      'Trusted local dog-walking in Iran: verified walkers, map-first matching, and coordinated care—built for calm owners.',
    tech: ['Matching', 'Maps', 'OTP Auth', 'Outbox'],
    caseSlug: 'hopgo',
    status: 'building',
  },
]

export const workCases: WorkCase[] = [
  {
    slug: 'hopgo',
    layout: 'trust-map',
    title: 'HopGo',
    eyebrow: 'Trust · Local · Care',
    tagline: 'A walker nearby you can actually trust.',
    leadMark: 'trust',
    lead:
      'Dog ownership in Iran is rising. Finding a reliable walker still means asking friends or guessing on social. HopGo closes that gap: verified local walkers, map-first matching, and a path you can follow—starting with walks.',
    audience: 'Dog owners who need calm coverage · Walkers who want flexible nearby work',
    promises: [
      { label: 'Trust first', text: 'Verification and admin review before a walker earns real demand.' },
      { label: 'Local by design', text: 'Coverage radius and map homes—not a national bulletin board.' },
      { label: 'Clear coordination', text: 'Requests, ranked offers, accept/reject—without chasing DMs.' },
    ],
    features: [
      'OTP login with one phone = one role',
      'Owner dogs + walker ops profiles (area, schedule, price, capacity)',
      'Map-first owner and walker homes',
      'Multi-dog service requests with dual-path area matching',
      'Public walker search with opt-in map presence',
      'Start/end geo snapshot for the walk window',
    ],
    status: 'building',
    tech: ['FastAPI', 'Hexagonal / DDD', 'PostgreSQL', 'RabbitMQ outbox', 'Next.js'],
    engineeringTeaser:
      'Hexagonal FastAPI, transactional outbox, and dual-path matching—engineering depth on the resume.',
  },
  {
    slug: 'amreton',
    layout: 'before-after',
    title: 'Amreton',
    eyebrow: 'Social commerce · Clarity',
    tagline: 'From Instagram chaos to a paid, trackable order.',
    leadMark: 'chaos',
    lead:
      'Social sellers live in DMs: addresses in chat, card-to-card with no trail, shipping updates scattered. Amreton turns that mess into one seller link—invoice, pay, track—without asking for an Instagram password.',
    audience: 'Instagram-first sellers · Their customers on mobile checkout',
    promises: [
      { label: 'Before', text: 'Addresses in DMs. Payments without a trail. Tracking by guesswork.' },
      { label: 'After', text: 'Dedicated invoice, online payment, SMS updates, trackable order status.' },
      { label: 'Seller calm', text: 'One panel for products, orders, and channel templates—tenant-isolated.' },
    ],
    features: [
      'Per-seller invoice / pay / track surfaces',
      'Seller panel for catalog and order lifecycle',
      'Pluggable payments (card-to-card default, online gateways)',
      'SMS status updates',
      'Instagram channel connect with editable pay DM templates',
      'Multi-tenant shop isolation',
    ],
    status: 'building',
    externalHref: 'https://amreton.com/',
    tech: ['FastAPI', 'Outbox', 'PostgreSQL', 'Redis', 'Next.js', 'SSE'],
    engineeringTeaser:
      'Modular monolith, outbox workers, and pluggable payment/SMS ports—see the resume for architecture bullets.',
  },
  {
    slug: 'ehdasino',
    layout: 'b2b-flow',
    title: 'Ehdasino',
    eyebrow: 'B2B · Reverse auction',
    tagline: 'Materials purchasing that stops hiding the better bid.',
    leadMark: 'better bid',
    lead:
      'Construction buyers need materials. Suppliers need fair access. Ehdasino runs reverse auctions: post an RFQ, collect proposals, compare price and delivery in one transparent place.',
    audience: 'Buyers / contractors · Material suppliers',
    promises: [
      { label: 'Request', text: 'Buyer publishes an RFQ with items, terms, and deadlines.' },
      { label: 'Compete', text: 'Relevant suppliers submit proposals—not one opaque quote.' },
      { label: 'Decide', text: 'Compare price, delivery, and conditions side by side.' },
    ],
    features: [
      'Buyer and supplier roles',
      'RFQ lifecycle with attachments and material dictionaries',
      'Multiple proposals per request',
      'Transparent comparison of price and delivery',
      'OTP / JWT session for both sides',
    ],
    status: 'live',
    externalHref: 'http://ehdasino.ir/',
    tech: ['Django / DRF', 'Next.js', 'PostgreSQL', 'Redis', 'Celery'],
    engineeringTeaser:
      'Domain-driven RFQ/Proposal rules and hexagonal Django—engineering story lives on the resume.',
  },
  {
    slug: 'chatbot-ir',
    layout: 'agent-idea',
    title: 'Agent Studio',
    eyebrow: 'Enterprise agents · chatbot.ir',
    tagline: 'Assistants that follow the organization—not just the prompt.',
    leadMark: 'follow the organization',
    lead:
      'Enterprises do not need another chat toy. They need assistants grounded in their knowledge, constrained by their rules, and safe under multi-tenant load. Agent Studio is that product idea on chatbot.ir.',
    audience: 'Organizations that want controllable AI in real workflows',
    promises: [
      { label: 'Grounded', text: 'Answers tied to retrieved knowledge—not free-floating improvisation.' },
      { label: 'Controlled', text: 'The model proposes; the system keeps hard decisions.' },
      { label: 'Tenant-safe', text: 'Isolation and custom surfaces so one org never bleeds into another.' },
    ],
    features: [
      'Multi-tenant enterprise agents',
      'Knowledge from sites and documents',
      'Grounded RAG against org policies',
      'Tools and human-in-the-loop in the same run',
      'Builders that aim past the demo',
    ],
    status: 'building',
    externalHref: 'https://chatbot.ir/',
    tech: ['FastAPI', 'LLM · RAG', 'Vector search', 'Queues', 'Multi-tenant'],
    engineeringTeaser:
      'Runtime, RAG accuracy, and load numbers are spelled out on the resume—this page is the product idea.',
  },
]

export function getWorkCase(slug: string): WorkCase | undefined {
  return workCases.find((c) => c.slug === slug)
}
