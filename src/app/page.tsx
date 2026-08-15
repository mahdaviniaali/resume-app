'use client'

import { useEffect, useState } from 'react'
import { AuroraCanvas } from '@/components/AuroraCanvas'
import { CustomCursor } from '@/components/CustomCursor'
import { Vignette } from '@/components/Vignette'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { VoidSection } from '@/components/sections/VoidSection'
import { CrossingSection } from '@/components/sections/CrossingSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { MethodSection } from '@/components/sections/MethodSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { fetchMembers, fetchSite, type SiteSettings, type TeamMember } from '@/lib/api'

const fallbackSite: SiteSettings = {
  brand_name: 'Genesis',
  tagline: 'From the void of "is empty"; We code the light.',
  contacts: { email: '', telegram: '', linkedin: '', github: '' },
  home_content: {},
}

export default function Home() {
  const [site, setSite] = useState<SiteSettings>(fallbackSite)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchSite(), fetchMembers()])
      .then(([siteData, memberData]) => {
        setSite(siteData)
        setMembers(memberData)
      })
      .catch(() => setError('Backend offline — start FastAPI on :8000'))
  }, [])

  const home = site.home_content || {}
  const hero = home.hero || {}
  const voidBlock = home.void
  const crossing = home.crossing
  const capabilities = home.capabilities
  const method = home.method
  const team = home.team
  const contact = home.contact

  return (
    <main className="relative min-h-screen">
      <AuroraCanvas />
      <Vignette />
      <CustomCursor />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:px-8 sm:py-16">
        <Navigation brandName={site.brand_name} />
        {error && (
          <p className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {error}
          </p>
        )}

        <HeroSection
          eyebrow={hero.eyebrow}
          line1={hero.line1}
          line2Prefix={hero.line2_prefix}
          line2Stroke={hero.line2_stroke}
          line3Prefix={hero.line3_prefix}
          line3Accent={hero.line3_accent}
          description={hero.description}
        />

        {voidBlock && (
          <VoidSection title={voidBlock.title} subtitle={voidBlock.subtitle} items={voidBlock.items} />
        )}

        {crossing && (
          <CrossingSection
            title={crossing.title}
            subtitle={crossing.subtitle}
            steps={crossing.steps}
          />
        )}

        {capabilities && (
          <CapabilitiesSection
            title={capabilities.title}
            subtitle={capabilities.subtitle}
            cards={capabilities.cards}
          />
        )}

        {method && (
          <MethodSection title={method.title} subtitle={method.subtitle} steps={method.steps} />
        )}

        <TeamSection
          title={team?.title || 'The Circle'}
          subtitle={team?.subtitle || 'Architects of the unseen'}
          members={members}
        />

        <ContactSection
          title={contact?.title || "Let's weave the light."}
          subtitle={contact?.subtitle || 'Transmit a signal.'}
          button={contact?.button || 'Transmit Signal →'}
          contacts={site.contacts}
        />
      </div>
    </main>
  )
}
