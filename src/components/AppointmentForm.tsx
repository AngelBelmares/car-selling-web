import { useEffect, useState } from 'react'
import { carListApi } from '../services/carApi'
import { registerAppointment, appointmentSchema } from '../services/appointment'
import type { CarApi } from '../types/cars'

export function AppointmenForm (): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [cars, setCars] = useState<CarApi[]>([])
  const [selectedCar, setSelectedCar] = useState<CarApi | null >(null)
  const carId = new URLSearchParams(window.location.search).get('idCar')

  useEffect(() => {
    carListApi()
      .then((cars) => {
        setCars(cars)
        setSelectedCar((cars.find((car) => car.idCar === Number(carId)) != null) || null)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [])

  const session = document.cookie.split(';').find((cookie) => cookie.includes('userId'))
  const userId = session?.split('=')[1]

  const getCurrentTime = (): string => {
    const date = new Date()
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset * 60000)).toISOString().slice(0, 16)
  }

  const currentTime = getCurrentTime()

  const handleAppointmentSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const date = formData.get('date') as string
    const idCar = formData.get('cars') as string
    console.log(idCar)

    const validatedData = appointmentSchema.safeParse({
      userId,
      idCar: carId,
      date: new Date(date)
    })

    if (!validatedData.success) {
      setError(validatedData.error.errors[0].message)
      setLoading(false)
      return
    }

    registerAppointment({ userId, idCar, date })
      .then((message) => {
        setMessage(message)
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <section className='flex flex-col h-auto w-full max-w-screen-sm items-center justify-center text-lg bg-neutral-900 rounded-md py-5 relative'>
      <div className='absolute -z-10 -inset-[2px] w-auto h-auto bg-gradient-to-br from-logan-300/80 via-transparent to-logan-300/80 rounded-md shadow-md' />
      <h1 className='text-3xl font-medium '>Agenda una Cita</h1>
      <hr className='h-px w-full mt-6 mb-2 bg-gradient-to-r from-transparent via-logan-300 to-transparent border-0' />
      {
        session !== undefined
          ? (
            <form onSubmit={handleAppointmentSubmit} className='flex flex-col items-center w-full px-10 mt-10 mb-2'>
              <div className='relative w-full py-1 px-3 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
                <label htmlFor='name' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Auto</label>
                <select name='cars' className='bg-inherit'>
                  <option className='bg-neutral-800 text-white' value={selectedCar?.idCar}>{selectedCar?.name}</option>
                  {cars.length > 0 && cars.map((car) => (
                    <option className='bg-neutral-800' key={car.idCar} value={car.idCar}>{car.name}</option>
                  ))}
                </select>
              </div>
              <div className='relative w-full py-1 px-3 mt-10 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
                <label htmlFor='date' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Ingrese la Fecha</label>
                <input type='datetime-local' id='date' name='date' defaultValue={currentTime} min={currentTime} required className='relative z-0 rounded-full focus:outline-none border-none bg-inherit w-full px-1 text-white' />
              </div>
              <small className='self-start p-1 pl-4'>Horario de citas (10:00am - 5pm)</small>

              <div className='flex items-center justify-center mt-4 h-6'>
                {loading && <span className='w-3 h-3 rounded-full block mx-4 my-auto relative text-logan-300 -left-24 box-border animate-shadow-rolling' />}
                <p className='text-red-500 '>{error}</p>
                <p className='text-green-500 '>{message}</p>
              </div>
              <div className='flex relative z-0 mt-10 mb-1 justify-center bg-gradient-to-r from-logan-400/50 to-transparent p-1 rounded-full backdrop-blur-lg'>
                <div className='absolute top-1/2 left-1/2 -z-10 w-[300%] h-[2px] bg-gradient-to-r from-transparent via-logan-300 to-transparent rounded-full transform -translate-x-1/2' />
                <div className='flex w-full justify-center bg-gradient-to-r from-logan-400 to-transparent p-[2px] rounded-full backdrop-blur-lg'>
                  <button
                    type='submit'
                    className='w-full text-white text-lg px-6 bg-neutral-900 rounded-full hover:bg-gradient-to-r hover:from-logan-400/50 hover:to-transparent duration-200'
                  >
                    Agendar Cita
                  </button>
                </div>
              </div>
            </form>
            )
          : (
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <p className='text-lg mt-2'>Inicia sesión para agendar una cita</p>
              <a href='/login' className='mt-2 text-lg text-logan-300'>Iniciar Sesión</a>
            </div>

            )
      }
    </section>
  )
}
