import { SessionRepository } from "@/infra/db/repositories/session.repository"
import { generateSessionToken, hashSessionToken } from "@/lib/crypto"
import { cookieService } from "./cookie.service"
import { AuthSession, AuthSessionWithoutPasswordHash, Session } from "@/entities/session/model"
import { User, UserWithPasswordHash } from "@/entities/user/model"

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS! || "3600")

const createSessionService = async (userId: string): Promise<void> => {
  const token = generateSessionToken()

  const tokenHash = hashSessionToken(token)

  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000)

  await SessionRepository.create({
    tokenHash,

    userId,

    expiresAt,
  })

  await cookieService.setSession(token, expiresAt)
}

const validate = async (): Promise<AuthSessionWithoutPasswordHash | null> => {
  const token = await cookieService.getSession()

  if (!token) {
    return null
  }

  const tokenHash = hashSessionToken(token)

  const authSession = await SessionRepository.findAuthSessionByTokenHash(tokenHash)

  if (!authSession) {
    await cookieService.deleteSession()

    return null
  }

  if (authSession.expiresAt < new Date()) {
    await SessionRepository.deleteByTokenHash(tokenHash)

    await cookieService.deleteSession()

    return null
  }

  const formatedAuthSession: AuthSessionWithoutPasswordHash = {
    user: {
      id: authSession.userId,
      firstName: authSession.firstName,
      lastName: authSession.lastName,
      email: authSession.email,
      avatar: authSession.avatar,
      createdAt: authSession.createdAt,
      updatedAt: authSession.updatedAt,
    },
    session: {
      id: authSession.sessionId as string,
      tokenHash: authSession.tokenHash,
      userId: authSession.userId,
      expiresAt: authSession.expiresAt,
      createdAt: authSession.createdAt,
      lastSeenAt: authSession.lastSeenAt,
      ipAddress: authSession.ipAddress,
      userAgent: authSession.userAgent,
    },
  }

  return formatedAuthSession
}

const destroy = async (): Promise<void> => {
  const token = await cookieService.getSession()

  if (!token) {
    return
  }

  const tokenHash = hashSessionToken(token)

  await SessionRepository.deleteByTokenHash(tokenHash)

  await cookieService.deleteSession()
}

export const SessionService = {
  createSessionService,
  validate,
  destroy,
}
