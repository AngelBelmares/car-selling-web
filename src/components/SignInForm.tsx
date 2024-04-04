import { useState } from 'react'
import type { User } from '../types/auth'

export function SignInForm (): JSX.Element {
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log('submit')
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const form = event.currentTarget
    const formData = new FormData(form)
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const password2 = formData.get('password2') as string
    console.log({ username, email, password, password2 })

    if (username === '' || email === '' || password === '' || password2 === '') {
      setError('Por favor llena todos los campos')
      return
    }
    if (username.length < 4) {
      setError('El nombre de usuario debe tener al menos 4 caracteres')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (!emailRegex.test(email)) {
      setError('Correo inválido')
      return
    }

    const response = registerUser({ email, password, username }).catch(() => {
      setError('Ocurrió un error, intenta de nuevo')
    })

    if (response instanceof Error) {
      setError(response.message)
    } else {
      setError(null)
    }
  }

  async function registerUser ({ email, password, username }: User): Promise<User | Error> {
    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      })
      if (response.ok) {
        window.location.href = `/confirmUser?userid=${'userId'}`
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
      <h1 className='text-3xl font-medium '>Registro</h1>
      <hr className='h-px w-full mt-6 mb-2 bg-gradient-to-r from-transparent via-logan-300 to-transparent border-0' />
      <form method='post' onSubmit={handleSignIn} className='flex flex-col items-center w-full px-10 mt-10 mb-2'>
        <div className='relative w-full py-1 px-3 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='username' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Nombre de Usuario</label>
          <input type='text' id='username' name='username' className='relative z-0 rounded-full focus:outline-none border-2 border-none bg-inherit w-full px-1' />
        </div>
        <div className='relative w-full py-1 px-3 mt-10 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='email' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Correo</label>
          <input type='text' id='email' name='email' className='relative z-0 rounded-full focus:outline-none border-2 border-none bg-inherit w-full px-1' />
        </div>
        <div className='relative w-full py-1 px-3 mt-10 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='password' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Contraseña</label>
          <input type='password' id='password' name='password' className='relative z-0 rounded-full focus:outline-none border-none bg-inherit w-full px-1' />
        </div>
        <div className='relative w-full py-1 px-3 mt-10 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='password2' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Confirmar Contraseña</label>
          <input type='password' id='password2' name='password2' className='relative z-0 rounded-full focus:outline-none border-none bg-inherit w-full px-1' />
        </div>
        <a href='/login' className='text-sm underline ml-1 mt-2 self-start text-logan-300 pl-3'>Ya tengo una cuenta</a>
        {error !== null && <p className='text-red-500 mt-8'>{error}</p>}
        <div className='flex relative z-0 mt-8 mb-1 justify-center bg-gradient-to-r from-logan-400/50 to-transparent p-1 rounded-full backdrop-blur-lg'>
          <div className='absolute top-1/2 left-1/2 -z-10 w-[300%] h-[2px] bg-gradient-to-r from-transparent via-logan-300 to-transparent rounded-full transform -translate-x-1/2' />
          <div className='flex w-full justify-center bg-gradient-to-r from-logan-400 to-transparent p-[2px] rounded-full backdrop-blur-lg'>
            <button
              type='submit'
              className='w-full text-white text-lg px-6 bg-neutral-900 rounded-full hover:bg-gradient-to-r hover:from-logan-400/50 hover:to-transparent duration-200'
            >
              Registrarse
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
