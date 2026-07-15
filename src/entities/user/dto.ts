export interface CreateUserInput {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
}

export interface UpdateUserInput {
  firstName?: string
  lastName?: string
  email?: string
}

export interface UpdatePasswordInput {
  passwordHash: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}
