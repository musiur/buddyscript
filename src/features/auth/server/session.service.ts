import { SessionRepository } from "@/infra/db/repositories/session.repository"
import { generateSessionToken, hashSessionToken } from "@/lib/crypto"
import { cookieService } from "./cookie.service"
import { AuthSession } from "@/entities/session/model"

const SESSION_TTL = process.env.SESSION_TTL!

const createSessionService = async (userId: string): Promise<void> => {
  const token = generateSessionToken()

  const tokenHash = hashSessionToken(token)

  const expiresAt = new Date(Date.now() + SESSION_TTL)

  await SessionRepository.create({
    tokenHash,

    userId,

    expiresAt,
  })

  await cookieService.setSession(token, expiresAt)
}

const validate = async (): Promise<AuthSession | null> => {
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

  if (authSession.session.expiresAt < new Date()) {
    await SessionRepository.deleteByTokenHash(tokenHash)

    await cookieService.deleteSession()

    return null
  }

  return authSession
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
