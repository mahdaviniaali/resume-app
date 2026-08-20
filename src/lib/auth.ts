import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

import { prisma } from '@/lib/db'

const encoder = new TextEncoder()

function secretKey() {
  return encoder.encode(process.env.SECRET_KEY || 'genesis-dev-secret-change-me')
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed)
}

export async function createAccessToken(subject: string) {
  const minutes = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 1440)
  return new SignJWT({ sub: subject })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${minutes}m`)
    .sign(secretKey())
}

export async function decodeToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey())
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}

export async function requireAdmin(request: NextRequest) {
  const header = request.headers.get('authorization') || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) return null
  const username = await decodeToken(match[1])
  if (!username) return null
  return prisma.adminUser.findUnique({ where: { username } })
}
