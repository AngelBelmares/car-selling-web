import { API_URL } from '../constants/api'
import type { Session, SignIn } from '../types/auth'

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function registerUser ({ userName, email, password, firstName = '', lastName = '', id_country = 1, city = '', address = '', postalCode = 0, telephone = 0 }: SignIn): Promise<Session | Error> {
  const response = await fetch(`${API_URL}/SignUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, email, password, firstName, lastName, id_country, city, address, postalCode, telephone })
  })
  if (response.ok) {
    return await response.json() as Session
  } else {
    const error = await response.json()
    throw new Error(error.message)
  }
}

export function validateData ({ userName, email, password, password2 }: SignIn & { password2: string }): SignIn | Error {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (userName === '' || email === '' || password === '' || password2 === '') {
    return Error('Por favor llena todos los campos')
  }
  if (userName.length < 4) {
    return Error('El nombre de usuario debe tener al menos 4 caracteres')
  }
  if (password !== password2) {
    return Error('Las contraseñas no coinciden')
  }
  if (password.length < 8) {
    return Error('La contraseña debe tener al menos 8 caracteres')
  }
  if (!emailRegex.test(email)) {
    return Error('Correo inválido')
  }

  return { userName, email, password }
}
