'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { resolveMediaUrl, type TeamMember } from '@/lib/api'

interface TeamSectionProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section id="team" ref={ref} className="mt-32 scroll-mt-24 sm:mt-40">
      <p className="section-kicker">{subtitle}</p>
      <h2 className="section-title">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {members.map((member, i) => {
          const name = member.name_fa || member.name_en
          const role = member.role_fa || member.role_en
          const bio = member.short_bio_fa || member.short_bio_en
          return (
            <Link
              key={member.id}
              href={`/team/${member.slug}`}
              className={`glass-card void-shard group block transition-transform duration-500 hover:-translate-y-1 ${
                visible ? 'is-on' : ''
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 font-display text-2xl text-white transition duration-500 group-hover:border-white/35 group-hover:shadow-[0_0_24px_rgba(138,43,226,0.3)]">
                {member.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveMediaUrl(member.avatar_url)}
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  name.slice(0, 1)
                )}
              </div>
              <h3 className="mb-1 font-display text-2xl text-white group-hover:text-[#eee]">{name}</h3>
              <p className="mb-4 text-xs tracking-[1px] text-[#8a8a8a]">{role}</p>
              <p className="body-soft">{bio}</p>
              <span className="mt-6 inline-block text-sm text-white/65 transition group-hover:text-white">
                مشاهده رزومه ←
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
