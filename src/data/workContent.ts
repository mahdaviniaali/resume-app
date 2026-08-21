/** Homepage = thin focus lines. /work = detailed case list. */

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
  status?: 'live' | 'building'
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
    blurb: 'Purchasing, wholesale, RFQs, proposals, staged ops.',
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
  lead: 'The builds behind the focus lines — architecture you can run, not demos that stall.',
}

export const workItems: WorkItem[] = [
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG — chatbot.ir',
    tag: 'AI · Enterprise',
    summary:
      'Enterprise knowledge module on chatbot.ir — scalable RAG for large document corpora, multi-user access, and regulation-grounded answers under load.',
    tech: ['RAG Pipelines', 'Multi-user', 'Ingestion', 'Retrieval'],
    href: 'https://chatbot.ir/',
    status: 'building',
  },
  {
    id: 'knowledge-crawler',
    title: 'Knowledge Crawler & Search — chatbot.ir',
    tag: 'AI · Discovery',
    summary:
      'Enterprise capability on chatbot.ir: crawl a target site, turn project content into usable knowledge, and return reference sources with links.',
    tech: ['Crawling', 'Knowledge Extraction', 'Search'],
    href: 'https://chatbot.ir/',
    status: 'building',
  },
  {
    id: 'agent-builder',
    title: 'Custom Agent Builder — chatbot.ir',
    tag: 'AI · Agents',
    summary:
      'Enterprise product on chatbot.ir for businesses to create and configure custom agents for sales, support, and AI response scenarios.',
    tech: ['Agent Orchestration', 'Self-serve', 'Automation'],
    href: 'https://chatbot.ir/',
    status: 'building',
  },
  {
    id: 'amreton',
    title: 'Amreton',
    tag: 'Multi-tenant SaaS',
    summary:
      'Turns fragmented Instagram DM order-taking into online invoices, bank payment, and trackable orders—no Instagram password required.',
    tech: ['Order Lifecycle', 'Payments', 'Multi-tenant', 'SMS'],
    href: 'https://amreton.com/',
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
  },
  {
    id: 'waterrisen',
    title: 'Industrial Pump E-commerce',
    tag: 'Commerce',
    summary:
      'Online store for industrial pumps with cart, order tracking, customer notifications, and a custom card-to-card payment flow.',
    tech: ['E-commerce', 'PostgreSQL', 'Payments'],
    href: 'https://waterrisen.com',
    status: 'live',
  },
  {
    id: 'wholesale',
    title: 'Wholesale Ordering System',
    tag: 'B2B operations',
    summary:
      'B2B ordering with dynamic pricing and a staged path: submit → approve → pay, plus interactive buyer–admin notifications.',
    tech: ['B2B Ordering', 'Pricing', 'Admin Workflow'],
  },
]
