import { API_URL } from '../constants/api'
import type { ConfirmUser } from '../types/auth'

export async function confirmUser ({ userId, authCode }: ConfirmUser): Promise<string> {
  const response = await fetch(`${API_URL}/ConfirmUser?authCode=${authCode}&userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    return await response.text()
  } else {
    throw new Error('Código de autenticación incorrecto')
  }
}
