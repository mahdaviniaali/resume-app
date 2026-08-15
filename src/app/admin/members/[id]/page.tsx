'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { adminFetch, type TeamMember } from '@/lib/api'
import { requireAuth } from '@/lib/admin/auth'
import styles from '../../admin.module.css'

type FormState = {
  slug: string
  name_en: string
  name_fa: string
  role_en: string
  role_fa: string
  short_bio_en: string
  short_bio_fa: string
  avatar_url: string
  email: string
  github: string
  linkedin: string
  telegram: string
  sort_order: number
  is_published: boolean
}

const empty: FormState = {
  slug: '',
  name_en: '',
  name_fa: '',
  role_en: '',
  role_fa: '',
  short_bio_en: '',
  short_bio_fa: '',
  avatar_url: '',
  email: '',
  github: '',
  linkedin: '',
  telegram: '',
  sort_order: 0,
  is_published: true,
}

export default function AdminMemberEditPage() {
  const params = useParams()
  const id = Number(params.id)
  const [form, setForm] = useState<FormState>(empty)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = requireAuth()
    if (!token || !id) return
    adminFetch<TeamMember>(`/api/admin/members/${id}`, token)
      .then((m) => {
        setForm({
          slug: m.slug,
          name_en: m.name_en,
          name_fa: m.name_fa,
          role_en: m.role_en,
          role_fa: m.role_fa,
          short_bio_en: m.short_bio_en,
          short_bio_fa: m.short_bio_fa,
          avatar_url: m.avatar_url,
          email: m.email,
          github: m.github,
          linkedin: m.linkedin,
          telegram: m.telegram,
          sort_order: m.sort_order,
          is_published: m.is_published,
        })
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [id])

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const token = requireAuth()
    if (!token) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await adminFetch(`/api/admin/members/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(form),
      })
      setSuccess('Saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className={styles.muted}>Loading…</p>

  return (
    <div>
      <div className={styles.row} style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 className={styles.pageTitle} style={{ margin: 0 }}>
          Edit member
        </h1>
        <div className={styles.row}>
          <Link href={`/admin/members/${id}/resume`} className={styles.btn}>
            Edit resume
          </Link>
          <Link href="/admin/members" className={styles.btn}>
            ← Members
          </Link>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={`${styles.card} ${styles.form}`} onSubmit={onSubmit} style={{ maxWidth: 720 }}>
        <div className={styles.formGrid}>
          <label className={styles.label}>
            Slug
            <input
              className={styles.input}
              value={form.slug}
              onChange={(e) => setField('slug', e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Sort order
            <input
              className={styles.input}
              type="number"
              value={form.sort_order}
              onChange={(e) => setField('sort_order', Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Name (EN)
            <input
              className={styles.input}
              value={form.name_en}
              onChange={(e) => setField('name_en', e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Name (FA)
            <input
              className={styles.input}
              value={form.name_fa}
              onChange={(e) => setField('name_fa', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Role (EN)
            <input
              className={styles.input}
              value={form.role_en}
              onChange={(e) => setField('role_en', e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Role (FA)
            <input
              className={styles.input}
              value={form.role_fa}
              onChange={(e) => setField('role_fa', e.target.value)}
            />
          </label>
        </div>

        <label className={styles.label}>
          Short bio (EN)
          <textarea
            className={styles.textarea}
            style={{ minHeight: 80, fontFamily: 'inherit' }}
            value={form.short_bio_en}
            onChange={(e) => setField('short_bio_en', e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Short bio (FA)
          <textarea
            className={styles.textarea}
            style={{ minHeight: 80, fontFamily: 'inherit' }}
            value={form.short_bio_fa}
            onChange={(e) => setField('short_bio_fa', e.target.value)}
          />
        </label>

        <div className={styles.formGrid}>
          <label className={styles.label}>
            Avatar URL
            <input
              className={styles.input}
              value={form.avatar_url}
              onChange={(e) => setField('avatar_url', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            GitHub
            <input
              className={styles.input}
              value={form.github}
              onChange={(e) => setField('github', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            LinkedIn
            <input
              className={styles.input}
              value={form.linkedin}
              onChange={(e) => setField('linkedin', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Telegram
            <input
              className={styles.input}
              value={form.telegram}
              onChange={(e) => setField('telegram', e.target.value)}
            />
          </label>
          <label className={styles.label} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setField('is_published', e.target.checked)}
            />
            Published
          </label>
        </div>

        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  )
}
