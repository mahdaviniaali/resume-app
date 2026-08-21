'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiteAtmosphere } from '@/components/SiteAtmosphere'
import { Vignette } from '@/components/Vignette'
import { Navigation } from '@/components/Navigation'
import { SectionHeader } from '@/components/SectionHeader'
import { workItems, workPage, type WorkItem } from '@/data/workContent'
import { fetchSite, type SiteSettings } from '@/lib/api'
import { homeContent } from '@/data/homeContent'

const fallbackSite: SiteSettings = {
  brand_name: 'ISEMPTY',
  tagline: 'From the void of is empty; We code the light.',
  contacts: { email: '', telegram: '', linkedin: '', github: '' },
  home_content: homeContent,
}

function WorkCase({ item, index }: { item: WorkItem; index: number }) {
  const inner = (
    <>
      <div className="work-row-meta">
        <span className="work-row-idx">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-row-tag">{item.tag}</span>
        {item.status === 'live' ? <span className="work-row-status">Live</span> : null}
        {item.status === 'building' ? (
          <span className="work-row-status work-row-status-dim">Building</span>
        ) : null}
      </div>
      <p className="work-row-title">{item.title}</p>
      <p className="work-row-summary">{item.summary}</p>
      <p className="work-row-tech">{item.tech.join(' · ')}</p>
    </>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="work-row work-row-link"
        style={{ ['--i' as string]: index }}
      >
        {inner}
        <span className="work-row-cta">Open →</span>
      </a>
    )
  }

  return (
    <div className="work-row" style={{ ['--i' as string]: index }}>
      {inner}
    </div>
  )
}

export default function WorkPage() {
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
        <div className="mx-auto max-w-[1280px] px-6 pt-6 sm:px-10">
          <Navigation brandName={site.brand_name} />
        </div>

        <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-14">
          <SectionHeader
            index="WORK"
            kicker={workPage.subtitle}
            title={workPage.title}
            lead={workPage.lead}
          />

          <div className="work-strip work-strip-page">
            {workItems.map((item, i) => (
              <WorkCase key={item.id} item={item} index={i} />
            ))}
          </div>

          <p className="mt-14 font-inter text-sm font-light tracking-[0.04em] text-[#cfcfcf]">
            Want the full path behind a build?{' '}
            <Link href="/#team" className="text-gold transition-colors hover:text-white">
              Meet the circle →
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
