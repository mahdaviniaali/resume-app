'use client'

import { AuroraCanvas } from '@/components/AuroraCanvas'
import { CustomCursor } from '@/components/CustomCursor'
import { Vignette } from '@/components/Vignette'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { BentoGrid } from '@/components/BentoGrid'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AuroraCanvas />
      <Vignette />
      <CustomCursor />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:px-8 sm:py-16">
        <Navigation />
        <HeroSection />
        <BentoGrid />
      </div>
    </main>
  )
}
