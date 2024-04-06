import { Button } from './Button'

interface SessionProps {
  userId?: string
}

export function Session ({ userId = '' }: SessionProps): JSX.Element {
  return (
    <div className='flex gap-x-2 justify-center items-center'>
      {userId.length <= 0
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

const handleCloseSession = (): void => {
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
