'use client'

import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

export function HeroSection() {
  const tagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useReveal(tagRef)
  useReveal(titleRef)
  useReveal(descRef)

  return (
    <section className="flex min-h-[80vh] flex-col justify-center">
      <div ref={tagRef} className="mb-12 text-xs uppercase tracking-[4px] text-[#888]">
        [ The Genesis Protocol ]
      </div>

      <h1
        ref={titleRef}
        className="mb-12 font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[1.1] text-[#f5f5f5]"
      >
        <span className="font-normal italic text-[#aaa]">From the void</span>
        <br />
        of{' '}
        <span className="inline-block -translate-y-3.5 px-2 py-1 font-sans text-[0.3em] font-light uppercase tracking-[2px] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
          is empty
        </span>
        ;
        <br />
        We code the{' '}
        <span className="bg-gradient-to-r from-white to-[#ccc] bg-clip-text font-bold italic text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          light
        </span>
        .
      </h1>

      <p
        ref={descRef}
        className="ml-auto max-w-[450px] border-r border-white/10 pr-6 text-right text-lg font-light leading-[1.8] text-[#888]"
      >
        We are architects of the unseen. Building robust multi-tenant SaaS ecosystems,
        domain-driven designs, and high-performance async systems that turn empty states into
        illuminated realities.
      </p>
    </section>
  )
}
