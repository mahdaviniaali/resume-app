'use client'

import Link from 'next/link'
import { SectionHeader } from '@/components/SectionHeader'
import { resolveMediaUrl, type TeamMember } from '@/lib/api'

interface TeamSectionProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section id="team" className="scroll-mt-24">
      <SectionHeader index="06" kicker={subtitle} title={title} />

      <ul className="flex flex-wrap gap-x-10 gap-y-10">
        {members.map((member) => {
          const name = member.name_en || member.name_fa
          const role = member.role_en || member.role_fa
          const bio = member.short_bio_en || member.short_bio_fa
          const initial = name.slice(0, 1)

          return (
            <li key={member.id} className="max-w-[16rem]">
              <Link href={`/team/${member.slug}`} className="group block text-left">
                <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden border border-line bg-ink font-display text-sm text-white">
                  {member.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveMediaUrl(member.avatar_url)}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-bright">
                  {name}
                </p>
                <p className="mt-1 font-inter text-[10px] font-light uppercase tracking-[0.12em] text-muted">
                  {role}
                </p>
                <p className="mt-3 font-quote text-[0.85rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf] group-hover:text-white">
                  {bio}
                </p>
                <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  Resume →
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
