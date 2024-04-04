export interface User {
  email: string
  password: string
  username: string
}

export interface ConfirmUser {
  userId: string
  authCode: string
}
