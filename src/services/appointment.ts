import { API_URL } from '../constants/api'
import type { RegisterAppointment, Appointment } from '../types/cars'
import { z } from 'zod'

export async function registerAppointment ({ userId, idCar, date, token }: RegisterAppointment): Promise<string> {
  const response = await fetch(`${API_URL}/api/Appointments/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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
  date: z.date().refine((date) => date > new Date(), { message: 'La fecha de la cita no puede ser en el pasado' }),
  token: z.string().min(1, { message: 'Hubo un problema, vuelva a iniciar sesión' })
})

export const getCurrentTime = (): string => {
  const date = new Date()
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - (offset * 60000)).toISOString().slice(0, 16)
}

export async function getAppointments ({ userId, token }: { userId: string, token: string }): Promise<Appointment[]> {
  const res = await fetch(`${API_URL}/api/Appointments/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) {
    throw new Error('Error fetching appointments')
  }
  const data = await res.json()
  return data as Appointment[]
}
