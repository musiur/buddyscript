import { LoginInput, RegisterInput } from "@/entities/user/dto"
import { User } from "@/entities/user/model"
import { UserRepository } from "@/infra/db/repositories/user.repository"
import { PasswordService } from "./password.service"
import { SessionService } from "./session.service"
import { tryCatch } from "@/lib/error-handlers/tryCatch"

export const authService = {
  register: async (input: RegisterInput): Promise<User> => {
    const existingUser = await UserRepository.findByEmail(input.email)

    if (existingUser) {
      throw new Error("Email already exists.")
    }

    const passwordHash = await PasswordService.hash(input.password)

    const user = await UserRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
    })

    await SessionService.createSessionService(user.id)

    return user
  },

  login: async (input: LoginInput): Promise<User | null> => {
    const user = await UserRepository.findByEmail(input.email)

    if (!user) {
      throw new Error("Invalid email or password.")
    }

    console.log(input.password, user)

    const validPassword = await PasswordService.verify(input.password, user.passwordHash)

    if (!validPassword) {
      throw new Error("Invalid email or password.")
    }

    console.log(user)

    await SessionService.createSessionService(user.id)

    return user[0]
  },

  logout: async (): Promise<void> => {
    await SessionService.destroy()
  },

  getCurrentUser: async (): Promise<User | null> => {
    const authSession = await SessionService.validate()

    if (!authSession) {
      return null
    }

    return authSession.user
  },
}
