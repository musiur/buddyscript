import { db } from "..";
import { AuthSession, Session } from "@/entities/session/model";
import { CreateSessionInput } from "@/entities/session/dto";
import { v4 as uuid } from "uuid";

const findById = async (id: string): Promise<Session | null> => {
  const rows = await db<Session[]>`
    SELECT *
    FROM sessions
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!rows.length) {
    return null;
  }

  return rows[0];
}

const findByTokenHash = async (tokenHash: string): Promise<Session | null> => {
  const rows = await db<Session[]>`
    SELECT *
    FROM sessions
    WHERE tokenHash = ${tokenHash}
    LIMIT 1
  `;

  if (!rows.length) {
    return null;
  }

  return rows[0];
}

const create = async (input: CreateSessionInput): Promise<Session> => {
  const rows = await db<Session[]>`
    INSERT INTO sessions (
      id,
      tokenHash,
      userId,
      expiresAt,
      ipAddress,
      userAgent
    )
    VALUES (
      ${uuid()},
      ${input.tokenHash},
      ${input.userId},
      ${input.expiresAt},
      ${input.ipAddress ?? null},
      ${input.userAgent ?? null}
    )
    RETURNING *
  `;

  return rows[0];
}

const updateLastSeen = async (id: string): Promise<void> => {
  await db`
    UPDATE sessions
    SET
      lastSeenAt = NOW()
    WHERE id = ${id}
  `;
}

const deleteByTokenHash = async (tokenHash: string): Promise<void> => {
  await db`
    DELETE
    FROM sessions
    WHERE tokenHash = ${tokenHash}
  `;
}

const deleteByUserId = async (userId: string): Promise<void> => {
  await db`
    DELETE
    FROM sessions
    WHERE userId = ${userId}
  `;
}

const deleteExpired = async (): Promise<number> => {
  const rows = await db<{ count: number }[]>`
    DELETE
    FROM sessions
    WHERE expiresAt <= NOW()
    RETURNING 1
  `;

  return rows.length;
}

const findAuthSessionByTokenHash = async (
  tokenHash: string
): Promise<AuthSession | null> => {
  const rows = await db<AuthSession[]>`
      SELECT
        s.id             AS session_id,
        s.tokenHash,
        s.userId,
        s.expiresAt,
        s.createdAt,
        s.lastSeenAt,
        s.ipAddress,
        s.userAgent,

        u.id             AS id,
        u.firstName,
        u.lastName,
        u.email,
        u.passwordHash,
        u.createdAt,
        u.updatedAt

      FROM sessions s
      INNER JOIN users u
        ON u.id = s.userId

      WHERE s.tokenHash = ${tokenHash}
      LIMIT 1
    `;

  if (!rows.length) {
    return null;
  }

  const row = rows[0];

  return row;
}

export const SessionRepository = {
  findById,
  findByTokenHash,
  create,
  updateLastSeen,
  deleteByTokenHash,
  deleteByUserId,
  deleteExpired,
  findAuthSessionByTokenHash
}