import { db } from "..";
import { AuthSession, Session } from "@/entities/session/model";
import { CreateSessionInput } from "@/entities/session/dto";

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
    WHERE token_hash = ${tokenHash}
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
      token_hash,
      user_id,
      expires_at,
      ip_address,
      user_agent
    )
    VALUES (
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
      last_seen_at = NOW()
    WHERE id = ${id}
  `;
}

const deleteByTokenHash = async (tokenHash: string): Promise<void> => {
    await db`
    DELETE
    FROM sessions
    WHERE token_hash = ${tokenHash}
  `;
}

const deleteByUserId = async (userId: string): Promise<void> => {
    await db`
    DELETE
    FROM sessions
    WHERE user_id = ${userId}
  `;
}

const deleteExpired = async (): Promise<number> => {
    const rows = await db<{ count: number }[]>`
    DELETE
    FROM sessions
    WHERE expires_at <= NOW()
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
        s.token_hash,
        s.user_id,
        s.expires_at,
        s.created_at,
        s.last_seen_at,
        s.ip_address,
        s.user_agent,

        u.id             AS id,
        u.first_name,
        u.last_name,
        u.email,
        u.password_hash,
        u.created_at,
        u.updated_at

      FROM sessions s
      INNER JOIN users u
        ON u.id = s.user_id

      WHERE s.token_hash = ${tokenHash}
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