import { API_URL } from '../constants/api'
import type { ConfirmUser, Session } from '../types/auth'

export async function confirmUser ({ userId, authCode }: ConfirmUser): Promise<Session> {
  const response = await fetch(`${API_URL}/ConfirmUser?authCode=${authCode}&userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    return await response.json() as Session
  } else {
    throw new Error('Código de autenticación incorrecto')
  }
}
