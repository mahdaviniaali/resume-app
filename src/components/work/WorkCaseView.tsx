'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiteAtmosphere } from '@/components/SiteAtmosphere'
import { Vignette } from '@/components/Vignette'
import { Navigation } from '@/components/Navigation'
import type { WorkCase } from '@/data/workContent'
import { fetchSite, type SiteSettings } from '@/lib/api'
import { homeContent } from '@/data/homeContent'

const fallbackSite: SiteSettings = {
  brand_name: 'ISEMPTY',
  tagline: 'From the void of is empty; We code the light.',
  contacts: { email: '', telegram: '', linkedin: '', github: '' },
  home_content: homeContent,
}

function markLead(text: string, phrase?: string) {
  if (!phrase) return text
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="case-mark">{text.slice(i, i + phrase.length)}</em>
      {text.slice(i + phrase.length)}
    </>
  )
}

function CaseHero({ c }: { c: WorkCase }) {
  return (
    <header className="case-hero">
      <p className="case-eyebrow">
        <Link href="/work" className="case-back">
          ← Work
        </Link>
        <span className="case-eyebrow-sep" aria-hidden>
          /
        </span>
        {c.eyebrow}
      </p>
      <h1 className="case-title">{c.title}</h1>
      <p className="case-tagline">{c.tagline}</p>
      <p className="case-lead">{markLead(c.lead, c.leadMark)}</p>
      <div className="case-meta-row">
        {c.status === 'live' ? <span className="work-row-status">Live</span> : null}
        {c.status === 'building' ? (
          <span className="work-row-status work-row-status-dim">Building</span>
        ) : null}
        <span className="case-audience">{c.audience}</span>
      </div>
    </header>
  )
}

function LayoutTrustMap({ c }: { c: WorkCase }) {
  return (
    <div className="case-layout case-layout-trust">
      <div className="case-map-field" aria-hidden>
        <span className="case-map-ring" />
        <span className="case-map-ring case-map-ring-b" />
        <span className="case-map-pin case-map-pin-a">owner</span>
        <span className="case-map-pin case-map-pin-b">walker</span>
        <span className="case-map-path" />
      </div>
      <div className="case-promise-grid">
        {c.promises.map((p) => (
          <div key={p.label} className="case-promise">
            <p className="case-promise-label">{p.label}</p>
            <p className="case-promise-text">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LayoutBeforeAfter({ c }: { c: WorkCase }) {
  const before = c.promises[0]
  const after = c.promises[1]
  const third = c.promises[2]
  return (
    <div className="case-layout case-layout-ba">
      <div className="case-ba-pair">
        {before ? (
          <div className="case-ba-card case-ba-before">
            <p className="case-ba-kicker">{before.label}</p>
            <p className="case-ba-text">{before.text}</p>
          </div>
        ) : null}
        <span className="case-ba-arrow" aria-hidden>
          →
        </span>
        {after ? (
          <div className="case-ba-card case-ba-after">
            <p className="case-ba-kicker">{after.label}</p>
            <p className="case-ba-text">{after.text}</p>
          </div>
        ) : null}
      </div>
      {third ? (
        <p className="case-ba-extra">
          <em className="case-mark">{third.label}</em>
          {' — '}
          {third.text}
        </p>
      ) : null}
    </div>
  )
}

function LayoutB2bFlow({ c }: { c: WorkCase }) {
  return (
    <div className="case-layout case-layout-flow">
      <ol className="case-flow">
        {c.promises.map((p, i) => (
          <li key={p.label} className="case-flow-step">
            <span className="case-flow-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="case-flow-label">{p.label}</p>
              <p className="case-flow-text">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function LayoutAgentIdea({ c }: { c: WorkCase }) {
  return (
    <div className="case-layout case-layout-agent">
      <blockquote className="case-quote">
        <span className="case-quote-bar" aria-hidden />
        <p>{c.tagline}</p>
      </blockquote>
      <div className="case-promise-grid case-promise-grid-agent">
        {c.promises.map((p) => (
          <div key={p.label} className="case-promise">
            <p className="case-promise-label">{p.label}</p>
            <p className="case-promise-text">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseBody({ c }: { c: WorkCase }) {
  return (
    <>
      {c.layout === 'trust-map' ? <LayoutTrustMap c={c} /> : null}
      {c.layout === 'before-after' ? <LayoutBeforeAfter c={c} /> : null}
      {c.layout === 'b2b-flow' ? <LayoutB2bFlow c={c} /> : null}
      {c.layout === 'agent-idea' ? <LayoutAgentIdea c={c} /> : null}

      <section className="case-features">
        <p className="case-section-kicker">01 — What ships</p>
        <h2 className="case-section-title">In the product</h2>
        <ul className="case-feature-list">
          {c.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="case-tech">
        <p className="case-section-kicker">02 — Stack</p>
        <p className="case-tech-line">{c.tech.join(' · ')}</p>
        <p className="case-eng-teaser">{c.engineeringTeaser}</p>
        <div className="case-cta-row">
          <Link href="/resume" className="case-cta">
            Engineering on the resume →
          </Link>
          {c.externalHref ? (
            <a
              href={c.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="case-cta case-cta-dim"
            >
              Open live →
            </a>
          ) : null}
        </div>
      </section>
    </>
  )
}

export function WorkCaseView({ workCase }: { workCase: WorkCase }) {
  const [site, setSite] = useState<SiteSettings>(fallbackSite)

  useEffect(() => {
    fetchSite()
      .then((data) => setSite({ ...data, brand_name: 'ISEMPTY', home_content: homeContent }))
      .catch(() => undefined)
  }, [])

  return (
    <main className="relative min-h-screen bg-void">
      <SiteAtmosphere />
      <Vignette />

      <div className="relative z-10">
        <Navigation brandName={site.brand_name} />

        <article className="case-page mx-auto max-w-[920px] px-6 pb-24 pt-10 sm:px-10 sm:pb-32 sm:pt-14">
          <CaseHero c={workCase} />
          <CaseBody c={workCase} />
        </article>
      </div>
    </main>
  )
}
