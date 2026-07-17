import { CreateUserInput } from "@/entities/user/dto"
import { User, UserWithPasswordHash } from "@/entities/user/model"
import { db } from "@/infra/db"
import { convertObjectKeysCase } from "@/lib/convert-case"
import { v4 as uuid } from "uuid"

const findByEmail = async (email: string): Promise<User | null> => {
  const rows = await db<Array<User>>`
            SELECT *
            FROM users
            WHERE email = ${email}
            LIMIT 1
        `

  if (!rows.length) {
    return null
  }

  return convertObjectKeysCase<User>(rows[0])
}

const findByEmailWithPasswordHash = async (email: string): Promise<UserWithPasswordHash | null> => {
  const rows = await db<Array<UserWithPasswordHash>>`
            SELECT *
            FROM users
            WHERE email = ${email}
            LIMIT 1
        `

  if (!rows.length) {
    return null
  }

  return convertObjectKeysCase<UserWithPasswordHash>(rows[0])
}

const findById = async (id: string) => {
  const rows = await db<Array<User>>`
    SELECT *
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `

  if (!rows.length) {
    return null
  }

  return convertObjectKeysCase<User>(rows[0])
}

const create = async (input: CreateUserInput) => {
  const rows = await db<Array<User>>`
    INSERT INTO users (
      id,
      first_name,
      last_name,
      email,
      password_hash
    )
    VALUES (
      ${uuid()},
      ${input.firstName},
      ${input.lastName},
      ${input.email},
      ${input.passwordHash}
    )
    RETURNING *
  `

  return convertObjectKeysCase<User>(rows[0])
}

const update = async (user: User) => {
  const rows = await db<Array<User>>`
    UPDATE users
    SET
      first_name = ${user.firstName},
      last_name = ${user.lastName},
      update_at = NOW()
    WHERE id = ${user.id}
    RETURNING *
  `

  return convertObjectKeysCase<User>(rows[0])
}

const deleteUser = async (id: string) => {
  await db`
    DELETE FROM users
    WHERE id = ${id}
  `
}

export const UserRepository = {
  findById,
  findByEmail,
  findByEmailWithPasswordHash,
  create,
  update,
  deleteUser,
}
