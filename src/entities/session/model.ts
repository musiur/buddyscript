import type { User, UserWithPasswordHash } from "@/entities/user/model"

export interface Session {
  id: string
  sessionId?: string
  tokenHash: string
  userId: string
  expiresAt: Date
  createdAt: Date
  lastSeenAt: Date
  ipAddress: string | null
  userAgent: string | null
}

export interface AuthSession {
  session: Session
  user: UserWithPasswordHash
}

export interface AuthSessionWithoutPasswordHash {
  session: Session
  user: User
}

export interface AuthSessionJoin extends Session, UserWithPasswordHash {}
