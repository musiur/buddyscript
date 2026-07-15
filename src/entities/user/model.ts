export interface User {
  id: string

  firstName: string
  lastName: string

  email: string

  passwordHash: string

  createdAt: Date
  updatedAt: Date
}

export interface UserWithPassword extends User {
  passwordHash: string
}
