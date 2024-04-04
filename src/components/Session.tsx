import { Button } from './Button'

interface SessionProps {
  isLogged: boolean | undefined
  sessionID: string
}

export function Session ({ isLogged = false, sessionID }: SessionProps): JSX.Element {
  return (
    <div className='flex gap-x-2 justify-center items-center'>
      {!isLogged
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
  document.cookie = 'isLogged=false; sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.href = '/'
}
