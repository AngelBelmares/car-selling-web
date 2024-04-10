export interface User {
  email: string
  password: string
  username: string
}

export interface Session {
  userId: string
  token: string
}

export interface ConfirmUser {
  userId: string
  authCode: string
}

export interface SignIn {
  userName: string
  password: string
  email: string
  city?: string
  id_country?: number
  firstName?: string
  lastName?: string
  postalCode?: number
  telephone?: number
  address?: string
}

export interface Login {
  email: string
  password: string
}
