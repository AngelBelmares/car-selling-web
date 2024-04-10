import { API_URL } from '../constants/api'
import type { RegisterAppointment } from '../types/cars'
import { z } from 'zod'

export async function registerAppointment ({ userId, idCar, date }: RegisterAppointment): Promise<string> {
  const response = await fetch(`${API_URL}/api/Appointments/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idCar, date })
  })

  if (!response.ok) {
    throw new Error('Error al registrar la cita')
  }

  return 'Cita registrada con éxito'
}

export const appointmentSchema = z.object({
  userId: z.string().min(1, { message: 'Hubo un problema, vuelva a iniciar sesión' }),
  idCar: z.string().min(1, { message: 'Hubo un problema, vuelva a seleccionar el auto' }),
  date: z.date().refine((date) => date > new Date(), { message: 'La fecha de la cita no puede ser en el pasado' })
})
