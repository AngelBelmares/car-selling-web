interface ButtonProps {
  children: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  showBackgroundLine?: boolean
}

export function Button ({ children, type = 'button', onClick, showBackgroundLine }: ButtonProps): JSX.Element {
  return (
    <div className='flex relative z-0 justify-center bg-gradient-to-r from-logan-400/50 to-transparent p-1 rounded-full backdrop-blur-lg'>
      {showBackgroundLine === true &&
        <div className='absolute top-1/2 left-1/2 -z-10 w-[300%] h-[2px] bg-gradient-to-r from-transparent via-logan-300 to-transparent rounded-full transform -translate-x-1/2' />}

      <div className='flex w-full justify-center bg-gradient-to-r from-logan-400 to-transparent p-[2px] rounded-full backdrop-blur-lg'>
        <button
          type={type}
          onClick={onClick}
          className='w-full text-white text-lg px-6 bg-neutral-900 rounded-full hover:bg-gradient-to-r hover:from-logan-400/50 hover:to-transparent duration-200'
        >
          {children}
        </button>
      </div>
    </div>
  )
}
