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

/** Thin homepage strip — what we’ve done, not the full brief */
export const workFocus: WorkFocus[] = [
  {
    id: 'agents',
    label: 'Enterprise agents & chatbots',
    blurb: 'Stood up org agents and chat systems that hold in real workflows.',
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
    label: 'High-performance cores',
    blurb: 'Rust / async where speed and load matter.',
  },
]

export const workPage = {
  title: 'Selected work',
  subtitle: 'Case list',
  lead: 'The builds behind the focus lines — architecture you can run, not demos that stall.',
}

export const workItems: WorkItem[] = [
  {
    id: 'instagram-saas',
    title: 'Smart Instagram Automation Platform',
    tag: 'Multi-tenant SaaS',
    summary:
      'Backend and system architecture for a multi-tenant automation platform — message queues, AI-assisted flows, and modules that stay isolated under real client load.',
    tech: ['Django/DRF', 'Multi-tenant', 'RabbitMQ', 'CQRS / Saga'],
    status: 'building',
  },
  {
    id: 'reverse-auction',
    title: 'Reverse Auction B2B System',
    tag: 'B2B · Domain',
    summary:
      'Corporate purchasing from scratch: RFQs, supplier proposals, OTP auth, and a framework-agnostic domain core built for testability.',
    tech: ['Django', 'DDD', 'PostgreSQL', 'TDD'],
    status: 'building',
  },
  {
    id: 'mini-siem',
    title: 'Mini SIEM',
    tag: 'Rust · Real-time',
    summary:
      'Lightweight security event monitoring — async ingestion, rule-based detection, alert pipeline, containerized for straightforward deploy.',
    tech: ['Rust', 'Axum', 'Tokio', 'Redis'],
  },
  {
    id: 'waterrisen',
    title: 'Industrial Pump E-commerce',
    tag: 'Commerce',
    summary:
      'Online store for industrial pumps with cart, order tracking, customer notifications, and a custom card-to-card payment flow.',
    tech: ['Django', 'PostgreSQL', 'Payments'],
    href: 'https://waterrisen.com',
    status: 'live',
  },
  {
    id: 'wholesale',
    title: 'Wholesale Ordering System',
    tag: 'B2B operations',
    summary:
      'B2B ordering with dynamic pricing and a staged path: submit → approve → pay, plus interactive buyer–admin notifications.',
    tech: ['Django', 'PostgreSQL', 'Pricing'],
  },
]
