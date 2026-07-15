export interface CreateSessionInput {
  tokenHash: string

  userId: string

  expiresAt: Date

  ipAddress?: string | null

  userAgent?: string | null
}
