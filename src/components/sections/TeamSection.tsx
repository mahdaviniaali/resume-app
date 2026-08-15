'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { resolveMediaUrl, type TeamMember } from '@/lib/api'

interface TeamSectionProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="team" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#666]">{subtitle}</p>
      <h2 className="mb-12 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {members.map((member, i) => (
          <Link
            key={member.id}
            href={`/team/${member.slug}`}
            className="glass-card group block transition-transform duration-500 hover:-translate-y-1"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 font-display text-2xl text-white">
              {member.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveMediaUrl(member.avatar_url)}
                  alt={member.name_en}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                member.name_en.slice(0, 1)
              )}
            </div>
            <h3 className="mb-1 font-display text-2xl text-white group-hover:text-[#eee]">
              {member.name_en}
            </h3>
            <p className="mb-4 text-xs uppercase tracking-[2px] text-[#666]">{member.role_en}</p>
            <p className="text-sm font-light leading-relaxed text-[#888]">{member.short_bio_en}</p>
            <span className="mt-6 inline-block text-sm text-white/70 transition group-hover:text-white">
              View resume →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
