'use client'

import { useEffect, useState } from 'react'
import { SiteAtmosphere } from '@/components/SiteAtmosphere'
import { HeroBackdrop } from '@/components/HeroBackdrop'
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
import { homeFa } from '@/data/homeFa'
import { fetchMembers, fetchSite, type SiteSettings, type TeamMember } from '@/lib/api'

const fallbackSite: SiteSettings = {
  brand_name: 'جنسیس',
  tagline: 'از خلأِ خالی است؛ ما نور را می‌سازیم.',
  contacts: { email: '', telegram: '', linkedin: '', github: '' },
  home_content: homeFa,
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
          brand_name:
            !siteData.brand_name || siteData.brand_name === 'Genesis'
              ? 'جنسیس'
              : siteData.brand_name,
          // Landing copy is Persian; keep API contacts/members
          home_content: homeFa,
        })
        setMembers(memberData)
      })
      .catch(() => setError('API در دسترس نیست — سرور Next.js را بررسی کنید'))
  }, [])

  const home = homeFa
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
        <div className="relative min-h-svh w-full overflow-hidden">
          <HeroBackdrop />
          <div className="relative z-10 flex min-h-svh flex-col">
            <div className="absolute inset-x-0 top-0 z-20">
              <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                <Navigation brandName={site.brand_name} />
              </div>
            </div>

            <div className="mx-auto mt-auto flex w-full max-w-[1280px] flex-col px-4 pb-3 sm:px-8 sm:pb-5">
              {error && (
                <p className="mb-4 border border-gold/30 bg-black/50 px-4 py-3 font-mono text-sm text-gold backdrop-blur-sm">
                  {error}
                </p>
              )}
              <HeroSection />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-4 pb-12 sm:px-8 sm:pb-16">

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
          title={team?.title || 'حلقه'}
          subtitle={team?.subtitle || 'معماران نادیده'}
          members={members}
        />

        <ContactSection
          title={contact?.title || 'بیایید نور را ببافیم.'}
          subtitle={contact?.subtitle || 'یک سیگنال بفرستید.'}
          button={contact?.button || 'ارسال سیگنال ←'}
          contacts={site.contacts}
        />
        </div>
      </div>
    </main>
  )
}
