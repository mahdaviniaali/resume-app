'use client'

import { useEffect, useState } from 'react'
import { SiteAtmosphere } from '@/components/SiteAtmosphere'
import { HeroStage } from '@/components/HeroStage'
import { Vignette } from '@/components/Vignette'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { BeyondCodeSection } from '@/components/sections/BeyondCodeSection'
import { VoidSection } from '@/components/sections/VoidSection'
import { CrossingSection } from '@/components/sections/CrossingSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { MethodSection } from '@/components/sections/MethodSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { homeContent } from '@/data/homeContent'
import { fetchMembers, fetchSite, type SiteSettings, type TeamMember } from '@/lib/api'

const fallbackSite: SiteSettings = {
  brand_name: 'ISEMPTY',
  tagline: 'From the void of is empty; We code the light.',
  contacts: { email: '', telegram: '', linkedin: '', github: '' },
  home_content: homeContent,
}

export default function Home() {
  const [site, setSite] = useState<SiteSettings>(fallbackSite)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchSite(), fetchMembers()])
      .then(([siteData, memberData]) => {
        setSite({
          ...siteData,
          brand_name: 'ISEMPTY',
          home_content: homeContent,
        })
        setMembers(memberData)
      })
      .catch(() => setError('API offline — check the Next.js server'))
  }, [])

  const home = homeContent
  const beyond = home.beyond
  const voidBlock = home.void
  const crossing = home.crossing
  const capabilities = home.capabilities
  const method = home.method
  const team = home.team
  const contact = home.contact

  return (
    <main className="relative min-h-screen bg-void">
      <SiteAtmosphere />
      <Vignette />

      <div className="relative z-10">
        <HeroStage>
          <div className="absolute inset-x-0 top-0 z-20 px-10">
            <Navigation brandName={site.brand_name} />
          </div>

          {error && (
            <p className="absolute left-10 top-[4.5rem] z-[2] border border-gold/30 bg-black/50 px-4 py-3 font-mono text-sm text-gold backdrop-blur-sm">
              {error}
            </p>
          )}

          <HeroSection />
        </HeroStage>

        <div className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-8 sm:pb-24">
          {beyond && (
            <BeyondCodeSection
              title={beyond.title}
              subtitle={beyond.subtitle}
              lead={beyond.lead}
              stages={beyond.stages}
            />
          )}

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
            title={team?.title || 'The circle'}
            subtitle={team?.subtitle || 'Architects of idea, system, and experience'}
            members={members}
          />

          <ContactSection
            title={contact?.title || 'Got chaos? Good.'}
            subtitle={
              contact?.subtitle ||
              'Half-built idea. Lost users. System that fights you. Throw it our way.'
            }
            button={contact?.button || 'Send your chaos →'}
            contacts={site.contacts}
          />
        </div>
      </div>
    </main>
  )
}
