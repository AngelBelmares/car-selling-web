import { API_URL } from '../constants/api'
import type { Session, SignIn } from '../types/auth'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function registerUser ({ userName, email, password, firstName = '', lastName = '', id_country = 1, city = '', address = '', postalCode = 0, telephone = 0 }: SignIn): Promise<Session> {
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
    throw new Error('Ocurrió un error, intenta de nuevo')
  }
}

export function validateData (data: SignIn & { password2: string }): SignIn | Error {
  const result = signInSchema.safeParse(data)

  if (!result.success) {
    return Error(result.error.message)
  }

  return result.data
}

const signInSchema = z.object({
  userName: z.string().min(4, 'El nombre de usuario debe tener al menos 4 caracteres'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  password2: z.string()
}).refine(data => data.password === data.password2, {
  message: 'Las contraseñas no coinciden',
  path: ['password2']
})
