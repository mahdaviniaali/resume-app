'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearToken } from '@/lib/admin/auth'
import styles from './admin.module.css'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/site', label: 'Site Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  function handleLogout() {
    clearToken()
    router.push('/admin/login')
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Genesis Admin</div>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${isActive(item.href, item.exact) ? styles.navLinkActive : ''}`}
          >
            {item.label}
          </Link>
        ))}
        <div className={styles.navSpacer} />
        <Link href="/" className={styles.navLink}>
          ← Public site
        </Link>
        <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
