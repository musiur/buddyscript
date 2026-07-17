export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}

export interface UserWithPasswordHash extends User {
  passwordHash: string
}
