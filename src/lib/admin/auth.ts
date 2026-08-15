const TOKEN_KEY = 'genesis_admin_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/** Client-only: redirect to login if no token. Returns token or null after redirect. */
export function requireAuth(): string | null {
  const token = getToken()
  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
    return null
  }
  return token
}
