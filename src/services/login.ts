import type { Login, Session } from '../types/auth'
import { API_URL } from '../constants/api'

export async function loginUser ({ email, password }: Login): Promise<Session> {
  const response = await fetch(`${API_URL}/LogIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  if (response.ok) {
    return await response.json() as Session
  } else {
    throw new Error('Usuario o contraseña incorrectos')
  }
}
