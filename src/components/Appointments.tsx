import { getAppointments } from '../services/appointment'
import type { Appointment } from '../types/cars'
import { useState } from 'react'

export function Appointments (): JSX.Element {
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const userId = document.cookie.split(';').find((cookie) => cookie.includes('userId'))?.split('=')[1]
  const token = document.cookie.split(';').find((cookie) => cookie.includes('token'))?.split('=')[1]

  if (userId !== undefined && token !== undefined) {
    getAppointments({ userId, token })
      .then((data) => {
        setAppointments(data)
      })
      .catch((error) => {
        setMessage(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && <span className='mt-9 w-3 h-3 rounded-full block mx-4 my-auto relative -left-24 box-border animate-shadow-rolling' />}
      {message !== null && <p>{message}</p>}
      <ul className='flex w-full max-w-screen-lg gap-y-8 mt-6'>
        {appointments.length > 0 && appointments.map((appointment) => (
          <li key={appointment.idAppointment} className='flex w-full h-28'>
            <header className='h-full aspect-video'>
              <img src={appointment.car.image} alt={appointment.car.name} className='h-full object-contain' />
            </header>
            <div className='flex flex-col p-4'>
              <h2 className='text-white text-2xl mb-2'>{appointment.car.name}</h2>
              <p className='text-logan-200 text-xl'>{new Date(appointment.date).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
