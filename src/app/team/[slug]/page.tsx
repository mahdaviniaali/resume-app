import { notFound } from 'next/navigation'
import { ResumeView } from '@/components/resume/ResumeView'
import { prisma } from '@/lib/db'
import type { ResumeData } from '@/lib/api'
import { ensureSeeded } from '@/lib/seed'
import { memberToDetail } from '@/lib/serializers'

export const dynamic = 'force-dynamic'

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  await ensureSeeded()

  const member = await prisma.teamMember.findFirst({
    where: { slug: params.slug, isPublished: true },
    include: { resume: true },
  })

  if (!member?.resume) notFound()

  const detail = memberToDetail(member)
  const resume = detail.resume as ResumeData | null
  if (!resume || Object.keys(resume).length === 0) notFound()

  return (
    <ResumeView
      resume={resume}
      memberName={detail.name_en || detail.name_fa}
    />
  )
}
