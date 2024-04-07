import { Button } from './Button'
import { useState, useEffect } from 'react'

export function Session (): JSX.Element {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('userId'))
    const userId = userCookie !== undefined ? userCookie.split('=')[1] : null
    setUserId(userId)
  }, [])

  const handleCloseSession = (): void => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setUserId(null)
  }

  return (
    <div className='flex gap-x-2 justify-center items-center'>
      {userId === null
        ? (
          <div className='flex'>
            <a href='/register'>
              <Button>
                Registrarse
              </Button>
            </a>
            <a href='/login'>
              <Button>
                Iniciar sesión
              </Button>
            </a>
          </div>
          )
        : (
          <div>
            <Button onClick={handleCloseSession}>
              Cerrar sesión
            </Button>
          </div>
          )}
    </div>
  )
}
