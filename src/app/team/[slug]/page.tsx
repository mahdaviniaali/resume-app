'use client'

import { useEffect, useState } from 'react'
import { ResumeView } from '@/components/resume/ResumeView'
import { fetchMember, type ResumeData, type TeamMember } from '@/lib/api'

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const [member, setMember] = useState<TeamMember | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMember(params.slug)
      .then(setMember)
      .catch(() => setError('عضو پیدا نشد یا API در دسترس نیست'))
  }, [params.slug])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050607] text-[#ccc]">
        {error}
      </div>
    )
  }

  if (!member || !member.resume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050607] text-[#888]">
        در حال بارگذاری…
      </div>
    )
  }

  return (
    <ResumeView
      resume={member.resume as ResumeData}
      memberName={member.name_fa || member.name_en}
    />
  )
}
