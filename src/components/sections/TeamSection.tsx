'use client'

import Link from 'next/link'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { resolveMediaUrl, type TeamMember } from '@/lib/api'

interface TeamSectionProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.2 })

  return (
    <section id="team" className="scroll-mt-24" ref={ref}>
      <SectionHeader index="05" kicker={subtitle} title={title} />

      <div className={`team-field ${visible ? 'is-live' : ''}`}>
        {members.length === 0 ? (
          <p className="team-empty">Circle loading — check back in a moment.</p>
        ) : (
          <ul className="team-row">
            {members.map((member, i) => {
              const name = member.name_en || member.name_fa
              const role = member.role_en || member.role_fa
              const bio = member.short_bio_en || member.short_bio_fa
              const initial = name.slice(0, 1)

              return (
                <li key={member.id} className="team-person" style={{ ['--i' as string]: i }}>
                  <Link href={`/team/${member.slug}`} className="team-person-link group">
                    <div className="team-avatar">
                      {member.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolveMediaUrl(member.avatar_url)}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="team-avatar-initial">{initial}</span>
                      )}
                    </div>
                    <p className="team-name">{name}</p>
                    <p className="team-role">{role}</p>
                    <p className="team-bio">{bio}</p>
                    <span className="team-cta">Resume →</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
