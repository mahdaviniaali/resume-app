'use client'

import { FormEvent, useEffect, useState } from 'react'
import { adminFetch, type SiteSettings } from '@/lib/api'
import { requireAuth } from '@/lib/admin/auth'
import styles from '../admin.module.css'

export default function AdminSitePage() {
  const [brandName, setBrandName] = useState('')
  const [tagline, setTagline] = useState('')
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [homeContentJson, setHomeContentJson] = useState('{}')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = requireAuth()
    if (!token) return
    adminFetch<SiteSettings>('/api/admin/site', token)
      .then((site) => {
        setBrandName(site.brand_name)
        setTagline(site.tagline)
        setEmail(site.contacts?.email ?? '')
        setTelegram(site.contacts?.telegram ?? '')
        setLinkedin(site.contacts?.linkedin ?? '')
        setGithub(site.contacts?.github ?? '')
        setHomeContentJson(JSON.stringify(site.home_content ?? {}, null, 2))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const token = requireAuth()
    if (!token) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const home_content = JSON.parse(homeContentJson)
      const updated = await adminFetch<SiteSettings>('/api/admin/site', token, {
        method: 'PUT',
        body: JSON.stringify({
          brand_name: brandName,
          tagline,
          email,
          telegram,
          linkedin,
          github,
          home_content,
        }),
      })
      setHomeContentJson(JSON.stringify(updated.home_content ?? {}, null, 2))
      setSuccess('Site settings saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className={styles.muted}>Loading…</p>

  return (
    <div>
      <h1 className={styles.pageTitle}>Site Settings</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={`${styles.card} ${styles.form}`} onSubmit={onSubmit} style={{ maxWidth: 720 }}>
        <div className={styles.formGrid}>
          <label className={styles.label}>
            Brand name
            <input
              className={styles.input}
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Tagline
            <input
              className={styles.input}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Email
            <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={styles.label}>
            Telegram
            <input
              className={styles.input}
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            LinkedIn
            <input
              className={styles.input}
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            GitHub
            <input className={styles.input} value={github} onChange={(e) => setGithub(e.target.value)} />
          </label>
        </div>

        <label className={styles.label}>
          Home content (JSON)
          <textarea
            className={styles.textarea}
            style={{ minHeight: 320 }}
            value={homeContentJson}
            onChange={(e) => setHomeContentJson(e.target.value)}
            spellCheck={false}
          />
        </label>

        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </form>
    </div>
  )
}
