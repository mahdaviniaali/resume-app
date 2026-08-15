'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface HeroSectionProps {
  eyebrow?: string
  line1?: string
  line2Prefix?: string
  line2Stroke?: string
  line3Prefix?: string
  line3Accent?: string
  description?: string
}

export function HeroSection({
  eyebrow = '[ The Genesis Protocol ]',
  line1 = 'From the void',
  line2Prefix = 'of',
  line2Stroke = 'is empty',
  line3Prefix = 'We code the',
  line3Accent = 'light',
  description = 'We turn messy systems and hard problems into clear architectures.',
}: HeroSectionProps) {
  const tagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useReveal(tagRef)
  useReveal(titleRef)
  useReveal(descRef)

  return (
    <section id="hero" className="flex min-h-[80vh] flex-col justify-center scroll-mt-8">
      <div ref={tagRef} className="mb-12 text-xs uppercase tracking-[4px] text-[#888]">
        {eyebrow}
      </div>

      <h1
        ref={titleRef}
        className="mb-12 font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[1.1] text-[#f5f5f5]"
      >
        <span className="font-normal italic text-[#aaa]">{line1}</span>
        <br />
        {line2Prefix}{' '}
        <span className="inline-block -translate-y-3.5 px-2 py-1 font-sans text-[0.3em] font-light uppercase tracking-[2px] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
          {line2Stroke}
        </span>
        ;
        <br />
        {line3Prefix}{' '}
        <span className="bg-gradient-to-r from-white to-[#ccc] bg-clip-text font-bold italic text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          {line3Accent}
        </span>
        .
      </h1>

      <p
        ref={descRef}
        className="ml-auto max-w-[480px] border-r border-white/10 pr-6 text-right text-lg font-light leading-[1.8] text-[#888]"
      >
        {description}
      </p>
    </section>
  )
}
