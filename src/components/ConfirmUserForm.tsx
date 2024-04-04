import { useState } from 'react'
import type { User, ConfirmUser } from '../types/auth'

export function ConfirmUserForm (): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const searchParams = new URLSearchParams(window.location.search)
  const userId = searchParams.get('userid') as string
  console.log(userId)

  const handleConfirmUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const authCode = formData.get('authCode') as string

    const response = confirmUser({ userId, authCode }).catch(() => {
      setError('Ocurrió un error, intenta de nuevo')
    })

    if (response instanceof Error) {
      setError(response.message)
    } else {
      setError(null)
    }
  }

  async function confirmUser ({ userId, authCode }: ConfirmUser): Promise<User | Error> {
    try {
      const response = await fetch(`api/confirmUser?userId=${userId}&authCode=${authCode}`)
      if (response.ok) {
        window.location.href = '/'
        return await response.json()
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      throw new Error('Ocurrió un error, intenta de nuevo')
    }
  }

  return (
    <section className='flex flex-col h-auto w-full max-w-screen-sm items-center justify-center text-lg bg-neutral-900 rounded-md py-5 relative'>
      <div className='absolute -z-10 -inset-[2px] w-auto h-auto bg-gradient-to-br from-logan-300/80 via-transparent to-logan-300/80 rounded-md shadow-md' />
      <h1 className='text-3xl font-medium '>Confirmación</h1>
      <hr className='h-px w-full mt-6 mb-2 bg-gradient-to-r from-transparent via-logan-300 to-transparent border-0' />
      <form method='post' onSubmit={handleConfirmUser} className='flex flex-col items-center w-full px-10 mt-10 mb-2'>
        <div className='relative w-full py-1 px-3 ring-2 ring-logan-300 rounded-full bg-gray-400/30'>
          <label htmlFor='username' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>User Id</label>
          <input type='text' id='username' name='username' value={userId} readOnly className='relative z-0 rounded-full focus:outline-none border-2 border-none bg-transparent w-full px-1 cursor-default' />
        </div>
        <div className='relative w-full py-1 px-3 mt-10 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='authCode' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Código de Autenticación</label>
          <input type='text' id='authCode' name='authCode' className='relative z-0 rounded-full focus:outline-none border-2 border-none bg-inherit w-full px-1' />
        </div>
        {error !== null && <p className='text-red-500 mt-8'>{error}</p>}
        <div className='flex relative z-0 mt-10 mb-2 justify-center bg-gradient-to-r from-logan-400/50 to-transparent p-1 rounded-full backdrop-blur-lg'>
          <div className='absolute top-1/2 left-1/2 -z-10 w-[300%] h-[2px] bg-gradient-to-r from-transparent via-logan-300 to-transparent rounded-full transform -translate-x-1/2' />
          <div className='flex w-full justify-center bg-gradient-to-r from-logan-400 to-transparent p-[2px] rounded-full backdrop-blur-lg'>
            <button
              type='submit'
              className='w-full text-white text-lg px-6 bg-neutral-900 rounded-full hover:bg-gradient-to-r hover:from-logan-400/50 hover:to-transparent duration-200'
            >
              Confirmar Usuario
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
