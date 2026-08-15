'use client'

import { useEffect, useState } from 'react'
import { adminFetch } from '@/lib/api'
import { requireAuth } from '@/lib/admin/auth'
import styles from './admin.module.css'

type Dashboard = {
  members_count: number
  published_count: number
  brand_name: string
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = requireAuth()
    if (!token) return
    adminFetch<Dashboard>('/api/admin/dashboard', token)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
  }, [])

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!data && !error && <p className={styles.muted}>Loading…</p>}
      {data && (
        <div className={styles.stats}>
          <div className={styles.card}>
            <div className={styles.statValue}>{data.brand_name}</div>
            <div className={styles.statLabel}>Brand</div>
          </div>
          <div className={styles.card}>
            <div className={styles.statValue}>{data.members_count}</div>
            <div className={styles.statLabel}>Members</div>
          </div>
          <div className={styles.card}>
            <div className={styles.statValue}>{data.published_count}</div>
            <div className={styles.statLabel}>Published</div>
          </div>
        </div>
      )}
    </div>
  )
}
