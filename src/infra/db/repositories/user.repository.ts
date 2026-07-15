import { CreateUserInput } from "@/entities/user/dto"
import { User } from "@/entities/user/model"
import { db } from "@/infra/db"
import { v4 as uuid } from "uuid"

const findByEmail = async (email: string) => {
  const rows = await db`
            SELECT *
            FROM users
            WHERE email = ${email}
            LIMIT 1
        `

  if (!rows.length) {
    return null
  }

  return rows[0]
}

const findById = async (id: string) => {
  const rows = await db<User[]>`
    SELECT *
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `

  if (!rows.length) {
    return null
  }

  return rows[0]
}

const create = async (input: CreateUserInput) => {
  const rows = await db<User[]>`
    INSERT INTO users (
      id,
      firstName,
      lastName,
      email,
      passwordHash
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

  console.log(rows[0])

  return rows[0]
}

const update = async (user: User) => {
  const rows = await db<User[]>`
    UPDATE users
    SET
      firstName = ${user.firstName},
      lastName = ${user.lastName},
      updateAt = NOW()
    WHERE id = ${user.id}
    RETURNING *
  `

  return rows[0]
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
  create,
  update,
  deleteUser,
}
