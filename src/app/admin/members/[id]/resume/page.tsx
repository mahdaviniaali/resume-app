'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { adminFetch, type TeamMember } from '@/lib/api'
import { requireAuth } from '@/lib/admin/auth'
import styles from '../../../admin.module.css'

export default function AdminResumeEditorPage() {
  const params = useParams()
  const id = Number(params.id)
  const [name, setName] = useState('')
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = requireAuth()
    if (!token || !id) return
    adminFetch<TeamMember>(`/api/admin/members/${id}`, token)
      .then((m) => {
        setName(m.name_en)
        setJsonText(JSON.stringify(m.resume ?? {}, null, 2))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const token = requireAuth()
    if (!token) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const data = JSON.parse(jsonText)
      await adminFetch(`/api/admin/members/${id}/resume`, token, {
        method: 'PUT',
        body: JSON.stringify({ data }),
      })
      setSuccess('Resume saved.')
      setJsonText(JSON.stringify(data, null, 2))
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
          Resume — {name || `#${id}`}
        </h1>
        <Link href={`/admin/members/${id}`} className={styles.btn}>
          ← Member
        </Link>
      </div>

      <p className={styles.muted} style={{ marginBottom: '1rem' }}>
        Edit the full resume JSON, then save. Invalid JSON will be rejected client-side.
      </p>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={styles.form} onSubmit={onSubmit} style={{ maxWidth: '100%' }}>
        <label className={styles.label}>
          Resume JSON
          <textarea
            className={styles.textarea}
            style={{ minHeight: 480 }}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
          />
        </label>
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save resume'}
        </button>
      </form>
    </div>
  )
}
