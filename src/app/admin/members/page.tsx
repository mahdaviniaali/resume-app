'use client'

import Link from 'next/link'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { adminFetch, type TeamMember } from '@/lib/api'
import { requireAuth } from '@/lib/admin/auth'
import styles from '../admin.module.css'

export default function AdminMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [slug, setSlug] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [roleEn, setRoleEn] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    const token = requireAuth()
    if (!token) return
    adminFetch<TeamMember[]>('/api/admin/members', token)
      .then(setMembers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function togglePublish(m: TeamMember) {
    const token = requireAuth()
    if (!token) return
    try {
      await adminFetch(`/api/admin/members/${m.id}`, token, {
        method: 'PUT',
        body: JSON.stringify({ is_published: !m.is_published }),
      })
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    }
  }

  async function removeMember(m: TeamMember) {
    if (!confirm(`Delete member “${m.name_en}”?`)) return
    const token = requireAuth()
    if (!token) return
    try {
      await adminFetch(`/api/admin/members/${m.id}`, token, { method: 'DELETE' })
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  async function createMember(e: FormEvent) {
    e.preventDefault()
    const token = requireAuth()
    if (!token) return
    setSaving(true)
    setError('')
    try {
      await adminFetch('/api/admin/members', token, {
        method: 'POST',
        body: JSON.stringify({
          slug: slug.trim(),
          name_en: nameEn.trim(),
          role_en: roleEn.trim(),
        }),
      })
      setSlug('')
      setNameEn('')
      setRoleEn('')
      setShowCreate(false)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className={styles.row} style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 className={styles.pageTitle} style={{ margin: 0 }}>
          Members
        </h1>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => setShowCreate((v) => !v)}
        >
          {showCreate ? 'Cancel' : 'New member'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {showCreate && (
        <form className={`${styles.card} ${styles.form}`} onSubmit={createMember}>
          <div className={styles.formGrid}>
            <label className={styles.label}>
              Slug
              <input
                className={styles.input}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                minLength={2}
              />
            </label>
            <label className={styles.label}>
              Name (EN)
              <input
                className={styles.input}
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
              />
            </label>
            <label className={styles.label}>
              Role (EN)
              <input
                className={styles.input}
                value={roleEn}
                onChange={(e) => setRoleEn(e.target.value)}
                required
              />
            </label>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
            {saving ? 'Creating…' : 'Create'}
          </button>
        </form>
      )}

      <div className={styles.card} style={{ padding: 0, overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.name_en}</td>
                <td>{m.slug}</td>
                <td>{m.role_en}</td>
                <td>
                  <span className={`${styles.badge} ${m.is_published ? styles.badgeOn : styles.badgeOff}`}>
                    {m.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className={styles.row}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnSm}`}
                      onClick={() => togglePublish(m)}
                    >
                      {m.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link href={`/admin/members/${m.id}`} className={`${styles.btn} ${styles.btnSm}`}>
                      Edit
                    </Link>
                    <Link
                      href={`/admin/members/${m.id}/resume`}
                      className={`${styles.btn} ${styles.btnSm}`}
                    >
                      Resume
                    </Link>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnSm} ${styles.btnDanger}`}
                      onClick={() => removeMember(m)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.muted}>
                  No members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
